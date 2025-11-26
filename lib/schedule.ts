import 'server-only'
import { promises as fs } from 'fs'
import path from 'path'
import { Redis } from '@upstash/redis'
import {
  SCHEDULE_END_HOUR,
  SCHEDULE_MAX_DAYS,
  SCHEDULE_SLOT_MINUTES,
  SCHEDULE_START_HOUR,
} from './schedule-constants'
import type {
  BookingEntryType,
  RecurringLock,
  ScheduleSlot,
  SlotStatus,
  StoredBooking,
} from './schedule-types'

export type { SlotStatus, ScheduleSlot, RecurringLock, StoredBooking, BookingEntryType }

const SLOT_MINUTES = SCHEDULE_SLOT_MINUTES
const DEFAULT_DAY_SPAN = 7
const START_HOUR = SCHEDULE_START_HOUR
const END_HOUR = SCHEDULE_END_HOUR
const MAX_DAYS = SCHEDULE_MAX_DAYS
const scheduleFile = path.join(process.cwd(), 'data', 'schedule.json')
const recurringLocksFile = path.join(process.cwd(), 'data', 'recurring-locks.json')
const kvClient = initKvClient()
const hasKvConfig = Boolean(kvClient)
const bookingsKvKey = process.env.SCHEDULE_KV_BOOKINGS_KEY ?? 'schedule:bookings'
const recurringKvKey = process.env.SCHEDULE_KV_RECURRING_KEY ?? 'schedule:recurring-locks'

export { SCHEDULE_SLOT_MINUTES, SCHEDULE_START_HOUR, SCHEDULE_END_HOUR, SCHEDULE_MAX_DAYS }

async function ensureFile() {
  await fs.mkdir(path.dirname(scheduleFile), { recursive: true })
  try {
    await fs.access(scheduleFile)
  } catch {
    await fs.writeFile(scheduleFile, '[]', 'utf8')
  }
}

async function ensureRecurringFile() {
  await fs.mkdir(path.dirname(recurringLocksFile), { recursive: true })
  try {
    await fs.access(recurringLocksFile)
  } catch {
    await fs.writeFile(recurringLocksFile, '[]', 'utf8')
  }
}

function initKvClient() {
  const hasAnyKvEnv = Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ) || Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)

  if (!hasAnyKvEnv) {
    return null
  }

  try {
    return Redis.fromEnv()
  } catch (error) {
    console.error('Failed to initialize KV client. Falling back to filesystem storage.', error)
    return null
  }
}

function shouldSuppressKvError(error: unknown) {
  if (typeof error !== 'object' || error === null) return false
  const maybeDigest = (error as { digest?: unknown }).digest
  return maybeDigest === 'DYNAMIC_SERVER_USAGE'
}

async function readFromKv<T>(key: string): Promise<T | null> {
  if (!kvClient) return null
  try {
    const value = await kvClient.get<T>(key)
    if (!value) return null
    return value
  } catch (error) {
    if (!shouldSuppressKvError(error)) {
      console.error(`KV read failed for ${key}`, error)
    }
    return null
  }
}

async function writeToKv<T>(key: string, value: T): Promise<boolean> {
  if (!kvClient) return false
  try {
    await kvClient.set(key, value)
    return true
  } catch (error) {
    if (!shouldSuppressKvError(error)) {
      console.error(`KV write failed for ${key}`, error)
    }
    return false
  }
}

function normalizeDate(date: Date) {
  const normalized = new Date(date)
  normalized.setUTCHours(0, 0, 0, 0)
  return normalized
}

function generateSlots(startDate: Date, days: number): ScheduleSlot[] {
  const slots: ScheduleSlot[] = []

  for (let dayIndex = 0; dayIndex < days; dayIndex++) {
    const day = new Date(startDate)
    day.setUTCDate(startDate.getUTCDate() + dayIndex)

    for (let hour = START_HOUR; hour < END_HOUR; hour++) {
      for (let minute = 0; minute < 60; minute += SLOT_MINUTES) {
        const slotStart = new Date(day)
        slotStart.setUTCHours(hour, minute, 0, 0)
        const slotEnd = new Date(slotStart)
        slotEnd.setUTCMinutes(slotStart.getUTCMinutes() + SLOT_MINUTES)

        slots.push({
          id: slotStart.toISOString(),
          start: slotStart.toISOString(),
          end: slotEnd.toISOString(),
          status: 'available',
        })
      }
    }
  }

  return slots
}

function isSlotRecurringLocked(date: Date, locks: RecurringLock[]) {
  return locks.some((lock) => matchesRecurringLock(date, lock))
}

async function readBookings(): Promise<StoredBooking[]> {
  const kvData = await readFromKv<StoredBooking[]>(bookingsKvKey)
  const source = kvData ?? (await (async () => {
    await ensureFile()
    const raw = await fs.readFile(scheduleFile, 'utf8')
    return raw.trim() ? JSON.parse(raw) : []
  })())
  const data = Array.isArray(source) ? source : []
  if (!Array.isArray(data)) return []
  return data.map((entry) => ({
    ...entry,
    entryType: entry.entryType === 'admin-lock' ? 'admin-lock' : 'user',
  }))
}

async function saveBookings(bookings: StoredBooking[]) {
  const savedToKv = await writeToKv(bookingsKvKey, bookings)
  if (savedToKv) return
  await ensureFile()
  await fs.writeFile(scheduleFile, JSON.stringify(bookings, null, 2), 'utf8')
}

async function readRecurringLocks(): Promise<RecurringLock[]> {
  const kvData = await readFromKv<RecurringLock[]>(recurringKvKey)
  const source = kvData ?? (await (async () => {
    await ensureRecurringFile()
    const raw = await fs.readFile(recurringLocksFile, 'utf8')
    return raw.trim() ? JSON.parse(raw) : []
  })())
  const data = Array.isArray(source) ? source : []
  if (!Array.isArray(data)) return []
  return data
    .map((entry) => ({
      id: String(entry.id),
      weekday: Number(entry.weekday),
      startMinutes: Number(entry.startMinutes),
      durationMinutes: Number(entry.durationMinutes),
      note: entry.note ? String(entry.note) : undefined,
    }))
    .filter((entry) => !Number.isNaN(entry.weekday) && !Number.isNaN(entry.startMinutes) && !Number.isNaN(entry.durationMinutes))
}

async function saveRecurringLocks(locks: RecurringLock[]) {
  const savedToKv = await writeToKv(recurringKvKey, locks)
  if (savedToKv) return
  await ensureRecurringFile()
  await fs.writeFile(recurringLocksFile, JSON.stringify(locks, null, 2), 'utf8')
}

function matchesRecurringLock(date: Date, lock: RecurringLock) {
  const weekday = date.getUTCDay()
  if (weekday !== lock.weekday) return false
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes()
  return minutes >= lock.startMinutes && minutes < lock.startMinutes + lock.durationMinutes
}

export async function listSlots({ startDate, days }: { startDate?: string; days?: number } = {}): Promise<ScheduleSlot[]> {
  const bookings = await readBookings()
  const bookingMap = new Map<string, StoredBooking>(bookings.map((booking) => [booking.id, booking]))
  const recurringLocks = await readRecurringLocks()

  let start = startDate ? new Date(startDate) : new Date()
  if (Number.isNaN(start.getTime())) {
    start = new Date()
  }
  const normalizedStart = normalizeDate(start)

  const totalDays = Math.min(Math.max(days ?? DEFAULT_DAY_SPAN, 1), MAX_DAYS)
  const slots = generateSlots(normalizedStart, totalDays)

  return slots.map((slot) => {
    const booking = bookingMap.get(slot.id)
    if (booking) {
      const status: SlotStatus = booking.entryType === 'admin-lock' ? 'locked' : 'booked'
      return {
        ...slot,
        status,
        lockType: booking.entryType === 'admin-lock' ? 'manual' : undefined,
        lockNote: booking.entryType === 'admin-lock' ? booking.bookingType : undefined,
      }
    }

    const slotStart = new Date(slot.start)
    const recurringMatch = recurringLocks.find((lock) => matchesRecurringLock(slotStart, lock))
    if (recurringMatch) {
      return {
        ...slot,
        status: 'locked',
        lockType: 'recurring',
        lockNote: recurringMatch.note,
        recurringLockId: recurringMatch.id,
      }
    }

    return slot
  })
}

export async function getBookings(): Promise<StoredBooking[]> {
  return readBookings()
}

export async function bookSlots(
  slotIds: string[],
  { name, email, note, bookingType }: { name: string; email: string; note?: string; bookingType?: string }
) {
  if (!slotIds.length) {
    throw new Error('No slot ids provided.')
  }

  const bookings = await readBookings()
  const bookingMap = new Map(bookings.map((booking) => [booking.id, booking]))
  const recurringLocks = await readRecurringLocks()

  const bookedSlots: ScheduleSlot[] = []

  for (const id of slotIds) {
    if (bookingMap.has(id)) {
      throw new Error('One or more slots have just been booked by another student.')
    }

    const start = new Date(id)
    if (Number.isNaN(start.getTime())) {
      throw new Error('Invalid slot selected.')
    }

    const minutes = start.getUTCMinutes()
    if (minutes % SLOT_MINUTES !== 0) {
      throw new Error('Slot is not aligned to the 30-minute grid.')
    }

    const hour = start.getUTCHours()
    if (hour < START_HOUR || hour >= END_HOUR) {
      throw new Error('Slot is outside of bookable hours.')
    }

    if (isSlotRecurringLocked(start, recurringLocks)) {
      throw new Error('This slot is blocked by the tutor. Please pick another time.')
    }

    const end = new Date(start)
    end.setUTCMinutes(start.getUTCMinutes() + SLOT_MINUTES)

    const record: StoredBooking = {
      id,
      start: start.toISOString(),
      end: end.toISOString(),
      bookedByName: name,
      bookedByEmail: email,
      bookingType: bookingType?.trim() || undefined,
      note,
      bookedAt: new Date().toISOString(),
      entryType: 'user',
    }

    bookings.push(record)
    bookingMap.set(id, record)
    bookedSlots.push({ id, start: record.start, end: record.end, status: 'booked' })
  }

  await saveBookings(bookings)
  return bookedSlots
}

export async function lockSlots(slotIds: string[], { note, adminLabel }: { note?: string; adminLabel?: string } = {}) {
  if (!slotIds.length) {
    throw new Error('No slot ids provided for locking.')
  }

  const bookings = await readBookings()
  const bookingMap = new Map(bookings.map((booking) => [booking.id, booking]))

  for (const id of slotIds) {
    if (bookingMap.has(id)) {
      throw new Error('One or more selected slots are already booked or locked.')
    }

    const start = new Date(id)
    if (Number.isNaN(start.getTime())) {
      throw new Error('Invalid slot selected for locking.')
    }

    const minutes = start.getUTCMinutes()
    if (minutes % SLOT_MINUTES !== 0) {
      throw new Error('Slot is not aligned to the 30-minute grid.')
    }

    const hour = start.getUTCHours()
    if (hour < START_HOUR || hour >= END_HOUR) {
      throw new Error('Slot is outside of bookable hours.')
    }

    const end = new Date(start)
    end.setUTCMinutes(start.getUTCMinutes() + SLOT_MINUTES)

    const record: StoredBooking = {
      id,
      start: start.toISOString(),
      end: end.toISOString(),
      bookedByName: adminLabel || 'Admin Hold',
      bookedByEmail: 'admin@englishwithdaniel.com',
      bookingType: note?.trim() || undefined,
      bookedAt: new Date().toISOString(),
      entryType: 'admin-lock',
    }

    bookings.push(record)
    bookingMap.set(id, record)
  }

  await saveBookings(bookings)
}

export async function unlockSlots(slotIds: string[]) {
  if (!slotIds.length) {
    throw new Error('No slot ids provided for unlocking.')
  }

  const bookings = await readBookings()
  const slotSet = new Set(slotIds)
  const filtered = bookings.filter((booking) => !(booking.entryType === 'admin-lock' && slotSet.has(booking.id)))
  await saveBookings(filtered)
}

export async function listRecurringLocks(): Promise<RecurringLock[]> {
  return readRecurringLocks()
}

export async function addRecurringLock(params: {
  weekday: number
  startMinutes: number
  durationMinutes: number
  note?: string
}) {
  const { weekday, startMinutes, durationMinutes, note } = params

  if (!Number.isInteger(weekday) || weekday < 0 || weekday > 6) {
    throw new Error('Weekday must be between 0 (Sunday) and 6 (Saturday).')
  }

  if (startMinutes % SLOT_MINUTES !== 0) {
    throw new Error('Start time must align with the 30-minute grid.')
  }

  if (durationMinutes < SLOT_MINUTES || durationMinutes % SLOT_MINUTES !== 0) {
    throw new Error('Duration must be in 30-minute increments.')
  }

  const dayStartMinutes = START_HOUR * 60
  const dayEndMinutes = END_HOUR * 60

  if (startMinutes < dayStartMinutes || startMinutes >= dayEndMinutes) {
    throw new Error('Start time is outside of bookable hours.')
  }

  if (startMinutes + durationMinutes > dayEndMinutes) {
    throw new Error('Recurring lock exceeds the bookable day range.')
  }

  const locks = await readRecurringLocks()
  const newLock: RecurringLock = {
    id: `${weekday}-${startMinutes}-${Date.now()}`,
    weekday,
    startMinutes,
    durationMinutes,
    note: note?.trim() || undefined,
  }

  locks.push(newLock)
  await saveRecurringLocks(locks)
  return locks
}

export async function removeRecurringLock(id: string) {
  const locks = await readRecurringLocks()
  const filtered = locks.filter((lock) => lock.id !== id)
  await saveRecurringLocks(filtered)
  return filtered
}
