import { promises as fs } from 'fs'
import path from 'path'

export type SlotStatus = 'available' | 'booked' | 'locked'

export interface ScheduleSlot {
  id: string
  start: string
  end: string
  status: SlotStatus
  lockType?: 'manual' | 'recurring'
  lockNote?: string
  recurringLockId?: string
}

export type BookingEntryType = 'user' | 'admin-lock'

export interface StoredBooking {
  id: string
  start: string
  end: string
  bookedByName: string
  bookedByEmail: string
  bookingType?: string
  note?: string
  bookedAt: string
  entryType?: BookingEntryType
}

const SLOT_MINUTES = 30
const DEFAULT_DAY_SPAN = 7
const START_HOUR = 7
const END_HOUR = 22
const MAX_DAYS = 31
const scheduleFile = path.join(process.cwd(), 'data', 'schedule.json')
const recurringLocksFile = path.join(process.cwd(), 'data', 'recurring-locks.json')

export const SCHEDULE_SLOT_MINUTES = SLOT_MINUTES
export const SCHEDULE_START_HOUR = START_HOUR
export const SCHEDULE_END_HOUR = END_HOUR

export interface RecurringLock {
  id: string
  weekday: number // 0 = Sunday
  startMinutes: number
  durationMinutes: number
  note?: string
}

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
  await ensureFile()
  const raw = await fs.readFile(scheduleFile, 'utf8')
  const data = raw.trim() ? JSON.parse(raw) : []
  if (!Array.isArray(data)) return []
  return data.map((entry) => ({
    ...entry,
    entryType: entry.entryType === 'admin-lock' ? 'admin-lock' : 'user',
  }))
}

async function saveBookings(bookings: StoredBooking[]) {
  await ensureFile()
  await fs.writeFile(scheduleFile, JSON.stringify(bookings, null, 2), 'utf8')
}

async function readRecurringLocks(): Promise<RecurringLock[]> {
  await ensureRecurringFile()
  const raw = await fs.readFile(recurringLocksFile, 'utf8')
  const data = raw.trim() ? JSON.parse(raw) : []
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
