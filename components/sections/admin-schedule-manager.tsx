"use client"

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import type { RecurringLock, ScheduleSlot } from '@/lib/schedule'
import { SCHEDULE_END_HOUR, SCHEDULE_SLOT_MINUTES, SCHEDULE_START_HOUR } from '@/lib/schedule'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AdminScheduleManagerProps {
  adminKey: string
  initialSlots: ScheduleSlot[]
  initialStartDate: string
  initialDays: number
  initialRecurringLocks: RecurringLock[]
}

const timezoneOptions = [
  'Europe/Bucharest',
  'UTC',
  'Europe/London',
  'America/New_York',
  'America/Los_Angeles',
  'Asia/Bangkok',
]

const dayOptions = [7, 14, 21, 28, 31]
const adminLocale = 'en-GB'
const weekdayOptions = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const dayStartMinutes = SCHEDULE_START_HOUR * 60
const dayEndMinutes = SCHEDULE_END_HOUR * 60
const timeOptions = Array.from({ length: ((dayEndMinutes - dayStartMinutes) / SCHEDULE_SLOT_MINUTES) }, (_, index) =>
  dayStartMinutes + index * SCHEDULE_SLOT_MINUTES
)
const durationOptions = [SCHEDULE_SLOT_MINUTES, 60, 90, 120, 150, 180]

function formatDateLabel(date: Date) {
  return new Intl.DateTimeFormat(adminLocale, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

function formatTime(date: Date, timezone: string) {
  return new Intl.DateTimeFormat(adminLocale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: timezone,
  }).format(date)
}

function minutesToLabel(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

function rangeLabel(startMinutes: number, durationMinutes: number) {
  const end = startMinutes + durationMinutes
  return `${minutesToLabel(startMinutes)} – ${minutesToLabel(end)}`
}

export function AdminScheduleManager({
  adminKey,
  initialSlots,
  initialStartDate,
  initialDays,
  initialRecurringLocks,
}: AdminScheduleManagerProps) {
  const [slots, setSlots] = useState<ScheduleSlot[]>(initialSlots)
  const [startDate, setStartDate] = useState(initialStartDate)
  const [daysShown, setDaysShown] = useState(initialDays)
  const [timezone, setTimezone] = useState('Europe/Bucharest')
  const [note, setNote] = useState('')
  const [lockSelection, setLockSelection] = useState<string[]>([])
  const [unlockSelection, setUnlockSelection] = useState<string[]>([])
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success'; message: string } | null>(null)
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState<'lock' | 'unlock' | null>(null)
  const [recurringLocks, setRecurringLocks] = useState<RecurringLock[]>(initialRecurringLocks)
  const [recurringLoading, setRecurringLoading] = useState(false)
  const [recurringForm, setRecurringForm] = useState({
    weekday: 0,
    startMinutes: dayStartMinutes,
    durationMinutes: 60,
    note: '',
  })

  const slotsByDay = useMemo(() => {
    return slots.reduce<Record<string, ScheduleSlot[]>>((acc, slot) => {
      const key = new Date(slot.start).toDateString()
      acc[key] = acc[key] ? [...acc[key], slot] : [slot]
      return acc
    }, {})
  }, [slots])

  const orderedDays = useMemo(() => {
    return Object.keys(slotsByDay)
      .map((key) => ({ key, date: new Date(key) }))
      .sort((a, b) => a.date.getTime() - b.date.getTime())
  }, [slotsByDay])

  const stats = useMemo(() => {
    return slots.reduce(
      (acc, slot) => {
        acc[slot.status] = (acc[slot.status] || 0) + 1
        return acc
      },
      { available: 0, booked: 0, locked: 0 } as Record<ScheduleSlot['status'], number>
    )
  }, [slots])

  const availableDurationOptions = useMemo(
    () => durationOptions.filter((minutes) => recurringForm.startMinutes + minutes <= dayEndMinutes),
    [recurringForm.startMinutes]
  )

  const orderedRecurringLocks = useMemo(() => {
    return [...recurringLocks].sort((a, b) => a.weekday - b.weekday || a.startMinutes - b.startMinutes)
  }, [recurringLocks])

  useEffect(() => {
    setLockSelection((prev) =>
      prev.filter((id) => {
        const slot = slots.find((item) => item.id === id)
        return slot?.status === 'available'
      })
    )
    setUnlockSelection((prev) =>
      prev.filter((id) => {
        const slot = slots.find((item) => item.id === id)
        return slot?.status === 'locked' && slot.lockType !== 'recurring'
      })
    )
  }, [slots])

  const refreshSlots = useCallback(async () => {
    try {
      setSlotsLoading(true)
      const params = new URLSearchParams()
      if (startDate) {
        const parsed = new Date(startDate)
        if (!Number.isNaN(parsed.getTime())) {
          params.set('start', parsed.toISOString())
        }
      }
      params.set('days', String(daysShown))
      const res = await fetch(`/api/schedule?${params.toString()}`)
      if (!res.ok) {
        throw new Error('Failed to load slots.')
      }
      const data = (await res.json()) as { slots: ScheduleSlot[] }
      setSlots(data.slots)
      const recurringRes = await fetch('/api/admin/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify({ action: 'list-recurring' }),
      })

      if (recurringRes.ok) {
        const recurringData = await recurringRes.json()
        if (Array.isArray(recurringData.recurringLocks)) {
          setRecurringLocks(recurringData.recurringLocks as RecurringLock[])
        }
      }
      setFeedback(null)
    } catch (error) {
      setFeedback({ type: 'error', message: (error as Error).message })
    } finally {
      setSlotsLoading(false)
    }
  }, [adminKey, daysShown, startDate])

  const handleSlotClick = (slot: ScheduleSlot) => {
    if (slot.lockType === 'recurring') {
      setFeedback({ type: 'error', message: 'Recurring locks are managed below. Remove them from the Weekly locks panel.' })
      return
    }

    if (slot.status === 'available') {
      setLockSelection((prev) => (prev.includes(slot.id) ? prev.filter((id) => id !== slot.id) : [...prev, slot.id]))
      setUnlockSelection((prev) => prev.filter((id) => id !== slot.id))
      setFeedback(null)
      return
    }

    if (slot.status === 'locked') {
      setUnlockSelection((prev) => (prev.includes(slot.id) ? prev.filter((id) => id !== slot.id) : [...prev, slot.id]))
      setLockSelection((prev) => prev.filter((id) => id !== slot.id))
      setFeedback(null)
    }
  }

  const performAction = async (action: 'lock' | 'unlock', slotIds: string[]) => {
    if (!slotIds.length) {
      setFeedback({ type: 'error', message: 'Select at least one slot first.' })
      return
    }

    try {
      setActionLoading(action)
      const res = await fetch('/api/admin/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify({ action, slotIds, note: action === 'lock' ? note : undefined }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Action failed.')
      }

      setFeedback({ type: 'success', message: action === 'lock' ? 'Slots locked.' : 'Slots unlocked.' })
      setNote(action === 'lock' ? '' : note)
      setLockSelection([])
      setUnlockSelection([])
      await refreshSlots()
    } catch (error) {
      setFeedback({ type: 'error', message: (error as Error).message })
    } finally {
      setActionLoading(null)
    }
  }

  const selectedLockSlots = useMemo(() => slots.filter((slot) => lockSelection.includes(slot.id)), [lockSelection, slots])
  const selectedUnlockSlots = useMemo(() => slots.filter((slot) => unlockSelection.includes(slot.id)), [unlockSelection, slots])

  const handleRecurringSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      setRecurringLoading(true)
      const res = await fetch('/api/admin/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify({ action: 'add-recurring', ...recurringForm }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create recurring lock.')
      }

      setRecurringLocks(data.recurringLocks as RecurringLock[])
      setFeedback({ type: 'success', message: 'Recurring lock saved.' })
      setRecurringForm((prev) => ({ ...prev, note: '' }))
      await refreshSlots()
    } catch (error) {
      setFeedback({ type: 'error', message: (error as Error).message })
    } finally {
      setRecurringLoading(false)
    }
  }

  const handleRecurringDelete = async (recurringLockId: string) => {
    try {
      setRecurringLoading(true)
      const res = await fetch('/api/admin/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify({ action: 'remove-recurring', recurringLockId }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Failed to remove recurring lock.')
      }

      setRecurringLocks(data.recurringLocks as RecurringLock[])
      setFeedback({ type: 'success', message: 'Recurring lock removed.' })
      await refreshSlots()
    } catch (error) {
      setFeedback({ type: 'error', message: (error as Error).message })
    } finally {
      setRecurringLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Available</p>
            <p className="text-lg font-semibold text-gray-900">{stats.available}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Booked</p>
            <p className="text-lg font-semibold text-gray-900">{stats.booked}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Locked</p>
            <p className="text-lg font-semibold text-gray-900">{stats.locked}</p>
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-white border" /> Free</span>
            <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-gray-300" /> Booked</span>
            <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-amber-300" /> Manual lock</span>
            <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-purple-300" /> Recurring lock</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <label className="text-sm font-medium text-gray-700">
              Start date
              <input
                type="date"
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Days
              <select
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm bg-white"
                value={daysShown}
                onChange={(event) => setDaysShown(Number(event.target.value) || initialDays)}
              >
                {dayOptions.map((days) => (
                  <option key={days} value={days}>
                    {days}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm font-medium text-gray-700">
              Timezone
              <select
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm bg-white"
                value={timezone}
                onChange={(event) => setTimezone(event.target.value)}
              >
                {timezoneOptions.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </label>
            <Button type="button" variant="outline" onClick={refreshSlots} disabled={slotsLoading}>
              {slotsLoading ? 'Refreshing…' : 'Refresh'}
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3 min-w-full">
            {orderedDays.map(({ key, date }) => (
              <div key={key} className="rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="border-b border-gray-100 px-4 py-3">
                  <p className="text-sm font-semibold text-gray-900">{formatDateLabel(date)}</p>
                </div>
                <div className="max-h-[480px] overflow-y-auto divide-y divide-gray-100">
                  {slotsByDay[key]
                    ?.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
                    .map((slot) => {
                      const slotStart = new Date(slot.start)
                      const slotEnd = new Date(slot.end)
                      const isSelectedForLock = lockSelection.includes(slot.id)
                      const isSelectedForUnlock = unlockSelection.includes(slot.id)

                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => handleSlotClick(slot)}
                          className={cn(
                            'w-full text-left px-4 py-3 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                            slot.status === 'booked' && 'bg-gray-100 text-gray-400 cursor-not-allowed',
                            slot.status === 'locked' && slot.lockType !== 'recurring' && 'bg-amber-50 text-amber-700',
                            slot.status === 'locked' && slot.lockType === 'recurring' && 'bg-purple-50 text-purple-700 cursor-not-allowed',
                            slot.status === 'available' && 'hover:bg-soft-blue-light/30 text-gray-800',
                            isSelectedForLock && 'ring-2 ring-soft-blue bg-soft-blue/20',
                            isSelectedForUnlock && 'ring-2 ring-amber-500'
                          )}
                          disabled={slot.status === 'booked' || slot.lockType === 'recurring'}
                        >
                          <p className="font-medium">
                            {formatTime(slotStart, timezone)} – {formatTime(slotEnd, timezone)}
                          </p>
                          <p className="text-xs text-gray-600 capitalize">
                            {slot.status === 'locked'
                              ? slot.lockType === 'recurring'
                                ? 'Recurring lock'
                                : 'Locked'
                              : slot.status}
                          </p>
                          {slot.lockNote && (
                            <p className="text-xs text-gray-500">{slot.lockNote}</p>
                          )}
                        </button>
                      )
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-4 rounded-3xl border border-white/70 bg-white/90 p-5 shadow-lg">
          <div>
            <p className="text-sm font-semibold text-gray-900">Ready to lock</p>
            <p className="text-sm text-gray-600">{selectedLockSlots.length || 'None selected'}</p>
            <div className="mt-2 max-h-32 overflow-y-auto space-y-1 text-sm text-gray-700">
              {selectedLockSlots.map((slot) => (
                <p key={slot.id}>
                  {formatDateLabel(new Date(slot.start))} · {formatTime(new Date(slot.start), timezone)}
                </p>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900">Ready to unlock</p>
            <p className="text-sm text-gray-600">{selectedUnlockSlots.length || 'None selected'}</p>
            <div className="mt-2 max-h-32 overflow-y-auto space-y-1 text-sm text-gray-700">
              {selectedUnlockSlots.map((slot) => (
                <p key={slot.id}>
                  {formatDateLabel(new Date(slot.start))} · {formatTime(new Date(slot.start), timezone)}
                </p>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Internal note (optional)
              <textarea
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
                rows={3}
                placeholder="Blocked for exam week, travel, etc."
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
            </label>
          </div>

          {feedback && (
            <div
              className={cn(
                'rounded-xl px-3 py-2 text-sm',
                feedback.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'
              )}
            >
              {feedback.message}
            </div>
          )}

          <div className="space-y-2">
            <Button
              type="button"
              className="w-full rounded-2xl bg-soft-blue text-white"
              disabled={actionLoading === 'lock' || !selectedLockSlots.length}
              onClick={() => performAction('lock', lockSelection)}
            >
              {actionLoading === 'lock' ? 'Locking…' : 'Lock selected slots'}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-2xl border-amber-500 text-amber-600"
              disabled={actionLoading === 'unlock' || !selectedUnlockSlots.length}
              onClick={() => performAction('unlock', unlockSelection)}
            >
              {actionLoading === 'unlock' ? 'Unlocking…' : 'Unlock selected slots'}
            </Button>
          </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-white/70 bg-white/90 p-5 shadow-lg">
            <div>
              <p className="text-sm font-semibold text-gray-900">Weekly locks</p>
              <p className="text-sm text-gray-600">Automatically repeat blocks (e.g. Thursdays 19:00–20:00).</p>
            </div>

            <form className="space-y-3" onSubmit={handleRecurringSubmit}>
              <label className="text-sm font-medium text-gray-700">
                Weekday
                <select
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm bg-white"
                  value={recurringForm.weekday}
                  onChange={(event) =>
                    setRecurringForm((prev) => ({ ...prev, weekday: Number(event.target.value) || 0 }))
                  }
                >
                  {weekdayOptions.map((label, index) => (
                    <option key={label} value={index}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-sm font-medium text-gray-700">
                Start time
                <select
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm bg-white"
                  value={recurringForm.startMinutes}
                  onChange={(event) => {
                    const value = Number(event.target.value)
                    setRecurringForm((prev) => {
                      const updated = { ...prev, startMinutes: value }
                      if (updated.startMinutes + updated.durationMinutes > dayEndMinutes) {
                        updated.durationMinutes = SCHEDULE_SLOT_MINUTES
                      }
                      return updated
                    })
                  }}
                >
                  {timeOptions.map((minutes) => (
                    <option key={minutes} value={minutes}>
                      {minutesToLabel(minutes)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-sm font-medium text-gray-700">
                Duration
                <select
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm bg-white"
                  value={recurringForm.durationMinutes}
                  onChange={(event) =>
                    setRecurringForm((prev) => ({ ...prev, durationMinutes: Number(event.target.value) || SCHEDULE_SLOT_MINUTES }))
                  }
                >
                  {availableDurationOptions.map((minutes) => (
                    <option key={minutes} value={minutes}>
                      {minutes} min ({rangeLabel(recurringForm.startMinutes, minutes)})
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-sm font-medium text-gray-700">
                Internal note (optional)
                <textarea
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
                  rows={2}
                  placeholder="Blocked for lessons, commute, etc."
                  value={recurringForm.note}
                  onChange={(event) => setRecurringForm((prev) => ({ ...prev, note: event.target.value }))}
                />
              </label>

              <Button type="submit" className="w-full rounded-2xl bg-soft-blue text-white" disabled={recurringLoading}>
                {recurringLoading ? 'Saving…' : 'Save weekly lock'}
              </Button>
            </form>

            <div className="space-y-2 max-h-56 overflow-y-auto">
              {orderedRecurringLocks.length === 0 ? (
                <p className="text-sm text-gray-600">No recurring locks yet.</p>
              ) : (
                orderedRecurringLocks.map((lock) => (
                  <div key={lock.id} className="flex items-start justify-between gap-3 rounded-2xl border border-gray-100 px-3 py-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {weekdayOptions[lock.weekday]} · {rangeLabel(lock.startMinutes, lock.durationMinutes)}
                      </p>
                      {lock.note && <p className="text-xs text-gray-600">{lock.note}</p>}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="rounded-xl border-gray-200 text-gray-700"
                      onClick={() => handleRecurringDelete(lock.id)}
                      disabled={recurringLoading}
                    >
                      Remove
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
