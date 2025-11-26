"use client"

import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ScheduleSlot } from '@/lib/schedule-types'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { lessonPackages, type LessonPackage } from '@/lib/packages'
import { useLanguage, type Locale } from '@/contexts/language-context'

const timezones = [
  'Europe/Bucharest',
  'UTC',
  'Europe/London',
  'America/New_York',
  'Asia/Bangkok',
]

const scheduleCopy: Record<Locale, {
  liveTag: string
  heading: string
  description: string
  timezoneLabel: string
  startDateLabel: string
  daysShownLabel: string
  loading: string
  confirmHeading: string
  selectedLabel: (count: number) => string
  bookingLabel: (label?: string) => string
  bookingPlaceholder: string
  customPlaceholder: string
  namePlaceholder: string
  emailPlaceholder: string
  notePlaceholder: string
  emptySlots: string
  bookedTag: string
  lockedTag: string
  errorMissing: string
  errorGeneric: string
  success: string
  submitIdle: string
  submitLoading: string
  footnote: string
  lessonCount: (count: number) => string
  slotLimitExceeded: string
  packageInfo: (lessons: number, slots: number) => string
  slotsProgress: (selected: number, required: number) => string
  lockTimeCta: string
  lockTimeHint: string
  lockTimeUnavailable: string
  errorSlotRequirement: string
}> = {
  en: {
    liveTag: 'Live availability',
    heading: 'Choose a slot that works for you.',
    description: 'Pick one or more 30-minute windows. Confirming a slot instantly blocks it for other visitors.',
    timezoneLabel: 'Timezone',
    startDateLabel: 'Start date',
    daysShownLabel: 'Days shown',
    loading: 'Loading slots…',
    confirmHeading: 'Confirm your slots',
    selectedLabel: (count) => `Selected slots: ${count || 'None yet'}`,
    bookingLabel: (label) => `Booking: ${label || 'Select what you plan to book'}`,
    bookingPlaceholder: 'What are you booking?',
    customPlaceholder: 'Describe your package or plan',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'Email for confirmation',
    notePlaceholder: 'Notes (optional)',
    emptySlots: 'Tap a time to add it here.',
    bookedTag: 'Booked',
    lockedTag: 'Locked by admin',
    errorMissing: 'Please add your name, email, booking type, and select at least one slot.',
    errorGeneric: 'Unable to book slots.',
    success: 'Slots booked! Please check your email for confirmation.',
    submitIdle: 'Book selected slots',
    submitLoading: 'Booking…',
    footnote: 'Booked slots show as blocked to everyone else. I will follow up via email with next steps.',
    lessonCount: (count) => `${count} lessons`,
    slotLimitExceeded: 'All required slots for this booking are already selected. Remove one to choose a different time.',
    packageInfo: (lessons, slots) => `${lessons} lessons • ${slots} x 30-minute slots`,
    slotsProgress: (selected, required) => `${selected} of ${required} slots selected`,
    lockTimeCta: 'Lock this time for upcoming days',
    lockTimeHint: 'Automatically selects the same time on future days while slots stay available.',
    lockTimeUnavailable: 'Not enough upcoming days have this time free. Please add the remaining slots manually.',
    errorSlotRequirement: 'Please select the exact number of slots required for this booking.',
  },
  ro: {
    liveTag: 'Disponibilitate live',
    heading: 'Alege intervalul perfect pentru tine.',
    description: 'Selecteaza unul sau mai multe intervale de 30 de minute. Dupa confirmare, intervalul devine indisponibil altora.',
    timezoneLabel: 'Fus orar',
    startDateLabel: 'Data de start',
    daysShownLabel: 'Zile afisate',
    loading: 'Se incarca intervalele…',
    confirmHeading: 'Confirma intervalele',
    selectedLabel: (count) => `Intervale selectate: ${count || 'Inca nimic'}`,
    bookingLabel: (label) => `Rezervare: ${label || 'Alege ce vrei sa blochezi'}`,
    bookingPlaceholder: 'Ce rezervi?',
    customPlaceholder: 'Descrie pachetul sau planul dorit',
    namePlaceholder: 'Numele tau',
    emailPlaceholder: 'Email pentru confirmare',
    notePlaceholder: 'Note (optional)',
    emptySlots: 'Apasa pe un interval pentru a-l adauga aici.',
    bookedTag: 'Rezervat',
    lockedTag: 'Blocat de admin',
    errorMissing: 'Completeaza numele, emailul, tipul rezervarii si alege cel putin un interval.',
    errorGeneric: 'Nu am putut finaliza rezervarea.',
    success: 'Intervalele au fost rezervate! Verifica emailul pentru confirmare.',
    submitIdle: 'Rezerva intervalele selectate',
    submitLoading: 'Se rezerva…',
    footnote: 'Intervalele rezervate devin indisponibile pentru ceilalti. Revin pe email cu pasii urmatori.',
    lessonCount: (count) => `${count} sedinte`,
    slotLimitExceeded: 'Ai selectat deja toate intervalele necesare pentru aceasta rezervare. Elimina unul pentru a schimba ora.',
    packageInfo: (lessons, slots) => `${lessons} sedinte • ${slots} intervale de 30 de minute`,
    slotsProgress: (selected, required) => `${selected} din ${required} intervale selectate`,
    lockTimeCta: 'Blocheaza acest interval pentru zilele urmatoare',
    lockTimeHint: 'Selectez automat acelasi interval in zilele urmatoare, cat timp este liber.',
    lockTimeUnavailable: 'Nu exista suficiente zile cu acest interval liber. Adauga manual restul orelor.',
    errorSlotRequirement: 'Selecteaza numarul exact de intervale necesare pentru aceasta rezervare inainte de a continua.',
  },
}

const bookingLabels: Record<Locale, { free: string; custom: string }> = {
  en: {
    free: 'Free consultation (30 minutes)',
    custom: 'Custom plan or other request',
  },
  ro: {
    free: 'Consultatie gratuita (30 de minute)',
    custom: 'Plan personalizat sau altceva',
  },
}

type SlotsByDay = Record<string, ScheduleSlot[]>

function formatDateLabel(date: Date) {
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

function formatTime(date: Date, timezone: string) {
  return date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: timezone,
  })
}

export function ScheduleSection() {
  const { locale } = useLanguage()
  const copy = scheduleCopy[locale]
  const getPackageName = useCallback((pkg: LessonPackage) => (locale === 'ro' ? pkg.translations?.ro?.name ?? pkg.name : pkg.name), [locale])

  const [slots, setSlots] = useState<ScheduleSlot[]>([])
  const [startDate, setStartDate] = useState<string>(() => new Date().toISOString().split('T')[0])
  const [daysToShow, setDaysToShow] = useState<number>(7)
  const [timezone, setTimezone] = useState<string>('Europe/Bucharest')
  const [selectedSlots, setSelectedSlots] = useState<string[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [bookingChoice, setBookingChoice] = useState('')
  const [customBookingLabel, setCustomBookingLabel] = useState('')
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success'; message: string } | null>(null)
  const [slotsLoading, setSlotsLoading] = useState(false)
  const selectedPackage = useMemo(() => lessonPackages.find((pkg: LessonPackage) => pkg.id === bookingChoice), [bookingChoice])
  const requiredSlots = useMemo(() => {
    if (selectedPackage) {
      return selectedPackage.lessons * 2
    }
    if (bookingChoice === 'free-consultation') {
      return 1
    }
    return null
  }, [bookingChoice, selectedPackage])

  const loadSlots = useCallback(async () => {
    try {
      setSlotsLoading(true)
      const params = new URLSearchParams()
      if (startDate) {
        params.set('start', new Date(startDate).toISOString())
      }
      if (daysToShow) {
        params.set('days', String(daysToShow))
      }

      const res = await fetch(`/api/schedule${params.size ? `?${params.toString()}` : ''}`)
      const data = await res.json()
      setSlots(data.slots)
    } catch {
      setFeedback({ type: 'error', message: copy.errorGeneric })
    } finally {
      setSlotsLoading(false)
    }
  }, [copy.errorGeneric, daysToShow, startDate])

  useEffect(() => {
    loadSlots()
  }, [loadSlots])

  useEffect(() => {
    setSelectedSlots((prev) =>
      prev.filter((id) => {
        const slot = slots.find((item) => item.id === id)
        return slot && slot.status === 'available'
      })
    )
  }, [slots])

  const sortedSelectedSlots = useMemo(() => {
    return selectedSlots
      .map((id) => slots.find((slot) => slot.id === id))
      .filter((slot): slot is ScheduleSlot => Boolean(slot))
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
  }, [selectedSlots, slots])

  useEffect(() => {
    if (!requiredSlots) return
    if (selectedSlots.length <= requiredSlots) return
    const trimmedIds = sortedSelectedSlots.slice(0, requiredSlots).map((slot) => slot.id)
    setSelectedSlots(trimmedIds)
  }, [requiredSlots, selectedSlots.length, sortedSelectedSlots])

  const slotsByDay: SlotsByDay = useMemo(() => {
    return slots.reduce((acc: SlotsByDay, slot) => {
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

  const bookingOptions = useMemo(() => (
    [
      { value: 'free-consultation', label: bookingLabels[locale].free },
      ...lessonPackages.map((pkg: LessonPackage) => ({ value: pkg.id, label: `${getPackageName(pkg)} (${copy.lessonCount(pkg.lessons)})` })),
      { value: 'custom', label: bookingLabels[locale].custom },
    ]
  ), [copy, getPackageName, locale])

  const resolvedBookingLabel = useMemo(() => {
    if (bookingChoice === 'custom') {
      return customBookingLabel.trim()
    }
    const option = bookingOptions.find((item) => item.value === bookingChoice)
    return option?.label ?? ''
  }, [bookingChoice, bookingOptions, customBookingLabel])

  function toggleSlot(id: string, status: ScheduleSlot['status']) {
    if (status !== 'available') return
    const isSelected = selectedSlots.includes(id)
    if (isSelected) {
      setSelectedSlots((prev) => prev.filter((slotId) => slotId !== id))
      setFeedback(null)
      return
    }

    if (requiredSlots && selectedSlots.length >= requiredSlots) {
      setFeedback({ type: 'error', message: copy.slotLimitExceeded })
      return
    }

    setSelectedSlots((prev) => [...prev, id])
    setFeedback(null)
  }

  const lockRecurringSlots = useCallback(() => {
    if (!requiredSlots || !sortedSelectedSlots.length) {
      setFeedback({ type: 'error', message: copy.lockTimeUnavailable })
      return
    }

    const baseSlot = sortedSelectedSlots[0]
    const baseStart = new Date(baseSlot.start)
    const baseMinutes = baseStart.getUTCHours() * 60 + baseStart.getUTCMinutes()
    const baseTimestamp = baseStart.getTime()

    const candidates = slots
      .filter((slot) => slot.status === 'available')
      .filter((slot) => new Date(slot.start).getTime() >= baseTimestamp)
      .filter((slot) => {
        const slotDate = new Date(slot.start)
        return slotDate.getUTCHours() * 60 + slotDate.getUTCMinutes() === baseMinutes
      })
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())

    const current = new Set(selectedSlots)
    for (const slot of candidates) {
      if (current.size >= requiredSlots) break
      current.add(slot.id)
    }

    if (current.size === selectedSlots.length) {
      setFeedback({ type: 'error', message: copy.lockTimeUnavailable })
      return
    }

    setSelectedSlots(Array.from(current))
    setFeedback(null)
  }, [copy.lockTimeUnavailable, requiredSlots, selectedSlots, slots, sortedSelectedSlots])

  async function submitBooking() {
    if (!selectedSlots.length || !name || !email || !resolvedBookingLabel) {
      setFeedback({
        type: 'error',
        message: copy.errorMissing,
      })
      return
    }

    if (requiredSlots && selectedSlots.length !== requiredSlots) {
      setFeedback({ type: 'error', message: copy.errorSlotRequirement })
      return
    }

    setLoading(true)
    setFeedback(null)

    try {
      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, note, slotIds: selectedSlots, bookingType: resolvedBookingLabel }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Unable to book slots.')
      }

      await loadSlots()
      setSelectedSlots([])
      setNote('')
      setBookingChoice('')
      setCustomBookingLabel('')
      setFeedback({ type: 'success', message: copy.success })
    } catch (error) {
      setFeedback({ type: 'error', message: (error as Error).message || copy.errorGeneric })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="schedule" className="py-20 md:py-28 bg-gradient-to-b from-white to-soft-blue-light/30">
      <div className="container max-w-6xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mb-10">
          <p className="text-sm uppercase tracking-wide text-soft-blue font-semibold">{copy.liveTag}</p>
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
            {copy.heading}
          </h2>
          <p className="text-lg text-gray-600">
            {copy.description}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 overflow-x-auto">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">{copy.timezoneLabel}</label>
                <select
                  className="border border-gray-200 rounded-xl px-3 py-2 bg-white text-sm"
                  value={timezone}
                  onChange={(event) => setTimezone(event.target.value)}
                >
                  {timezones.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">{copy.startDateLabel}</label>
                <input
                  type="date"
                  className="border border-gray-200 rounded-xl px-3 py-2 text-sm"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value || new Date().toISOString().split('T')[0])}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">{copy.daysShownLabel}</label>
                <select
                  className="border border-gray-200 rounded-xl px-3 py-2 bg-white text-sm"
                  value={daysToShow}
                  onChange={(event) => setDaysToShow(Number(event.target.value) || 7)}
                >
                  {[7, 14, 21, 28, 31].map((days) => (
                    <option key={days} value={days}>
                      {days}
                    </option>
                  ))}
                </select>
              </div>
              {slotsLoading && <p className="text-sm text-gray-500">{copy.loading}</p>}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 min-w-[720px]">
              {orderedDays.map(({ key, date }) => (
                <div key={key} className="rounded-2xl bg-white/80 border border-white/70 shadow-sm">
                  <div className="p-4 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{formatDateLabel(date)}</p>
                  </div>
                  <div className="max-h-[520px] overflow-y-auto divide-y divide-gray-100">
                    {slotsByDay[key]
                      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
                      .map((slot) => {
                        const slotStart = new Date(slot.start)
                        const slotEnd = new Date(slot.end)
                        const isSelected = selectedSlots.includes(slot.id)
                        const isBooked = slot.status === 'booked'
                        const isLocked = slot.status === 'locked'
                        const isUnavailable = isBooked || isLocked

                        return (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => toggleSlot(slot.id, slot.status)}
                            disabled={isUnavailable}
                            className={cn(
                              'w-full text-left px-4 py-3 text-sm font-medium transition rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                              isBooked && 'bg-gray-100 text-gray-400 line-through cursor-not-allowed',
                              isLocked && 'bg-amber-50 text-amber-700 cursor-not-allowed',
                              !isUnavailable && 'hover:bg-soft-blue-light/40 text-gray-700',
                              isSelected && 'bg-soft-blue text-white hover:bg-soft-blue'
                            )}
                          >
                            <p>
                              {formatTime(slotStart, timezone)} – {formatTime(slotEnd, timezone)}
                            </p>
                            {isBooked && <p className="text-xs">{copy.bookedTag}</p>}
                            {isLocked && <p className="text-xs">{copy.lockedTag}</p>}
                          </button>
                        )
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-80 bg-white/80 border border-white/70 rounded-3xl p-6 shadow-lg space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{copy.confirmHeading}</h3>
              <p className="text-sm text-gray-500">{copy.selectedLabel(selectedSlots.length)}</p>
              <p className="text-sm text-gray-500">{copy.bookingLabel(resolvedBookingLabel)}</p>
            </div>

            {requiredSlots && selectedPackage && (
              <div className="bg-soft-blue-light/40 border border-soft-blue-light rounded-2xl p-4 text-sm">
                <p className="font-semibold text-gray-900">
                  {copy.packageInfo(selectedPackage.lessons, requiredSlots)}
                </p>
                <p className="text-gray-600">{copy.slotsProgress(selectedSlots.length, requiredSlots)}</p>
              </div>
            )}

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {sortedSelectedSlots.map((slot) => (
                <div key={slot.id} className="text-sm text-gray-700 flex justify-between">
                  <span>{formatDateLabel(new Date(slot.start))}</span>
                  <span>
                    {formatTime(new Date(slot.start), timezone)} – {formatTime(new Date(slot.end), timezone)}
                  </span>
                </div>
              ))}
              {!selectedSlots.length && <p className="text-sm text-gray-500">{copy.emptySlots}</p>}
            </div>

            {requiredSlots && selectedSlots.length > 0 && selectedSlots.length < requiredSlots && (
              <div className="space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={lockRecurringSlots}
                  className="w-full rounded-2xl border-dashed border-soft-blue text-soft-blue hover:bg-soft-blue/10"
                >
                  {copy.lockTimeCta}
                </Button>
                <p className="text-xs text-gray-500">{copy.lockTimeHint}</p>
              </div>
            )}

            <div className="space-y-3">
              <select
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white"
                value={bookingChoice}
                onChange={(event) => setBookingChoice(event.target.value)}
              >
                <option value="">{copy.bookingPlaceholder}</option>
                {bookingOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {bookingChoice === 'custom' && (
                <input
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
                  placeholder={copy.customPlaceholder}
                  value={customBookingLabel}
                  onChange={(event) => setCustomBookingLabel(event.target.value)}
                />
              )}
              <input
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
                placeholder={copy.namePlaceholder}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <input
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
                placeholder={copy.emailPlaceholder}
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <textarea
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
                placeholder={copy.notePlaceholder}
                rows={3}
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
            </div>

            {feedback && (
              <div
                className={cn(
                  'text-sm rounded-xl px-3 py-2',
                  feedback.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'
                )}
              >
                {feedback.message}
              </div>
            )}

            <Button disabled={loading} onClick={submitBooking} className="w-full rounded-2xl bg-soft-blue text-white">
              {loading ? copy.submitLoading : copy.submitIdle}
            </Button>
            <p className="text-xs text-gray-500">
              {copy.footnote}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
