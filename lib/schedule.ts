import { promises as fs } from 'fs'
import path from 'path'

export type SlotStatus = 'available' | 'booked' | 'locked'

export interface ScheduleSlot {
  id: string
  start: string
  end: string
  status: SlotStatus
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

async function ensureFile() {
  await fs.mkdir(path.dirname(scheduleFile), { recursive: true })
  try {
    await fs.access(scheduleFile)
  } catch {
    await fs.writeFile(scheduleFile, '[]', 'utf8')
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

export async function listSlots({ startDate, days }: { startDate?: string; days?: number } = {}): Promise<ScheduleSlot[]> {
  const bookings = await readBookings()
  const bookingMap = new Map<string, StoredBooking>(bookings.map((booking) => [booking.id, booking]))

  let start = startDate ? new Date(startDate) : new Date()
  if (Number.isNaN(start.getTime())) {
    start = new Date()
  }
  const normalizedStart = normalizeDate(start)

  const totalDays = Math.min(Math.max(days ?? DEFAULT_DAY_SPAN, 1), MAX_DAYS)
  const slots = generateSlots(normalizedStart, totalDays)

  return slots.map((slot) => {
    const booking = bookingMap.get(slot.id)
    if (!booking) return slot
    const status: SlotStatus = booking.entryType === 'admin-lock' ? 'locked' : 'booked'
    return { ...slot, status }
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
