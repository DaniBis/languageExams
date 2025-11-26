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

export interface RecurringLock {
  id: string
  weekday: number
  startMinutes: number
  durationMinutes: number
  note?: string
  timezone?: string
}
