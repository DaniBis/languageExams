import { AdminScheduleManager } from '@/components/sections/admin-schedule-manager'
import { getBookings, listSlots, type StoredBooking } from '@/lib/schedule'

interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function AdminSchedulePage({ searchParams }: PageProps) {
  const params = searchParams || {}
  const adminKey = process.env.SCHEDULE_ADMIN_KEY

  if (!adminKey) {
    return (
      <section className="container max-w-3xl mx-auto py-20 px-6">
        <p className="text-red-600 font-semibold">Please set SCHEDULE_ADMIN_KEY in your environment.</p>
      </section>
    )
  }

  const providedKey = Array.isArray(params.key) ? params.key[0] : params.key

  if (providedKey !== adminKey) {
    return (
      <section className="container max-w-3xl mx-auto py-20 px-6">
        <p className="text-lg font-semibold text-gray-900">Unauthorized.</p>
        <p className="text-gray-600">Provide ?key=YOUR_KEY in the URL to view bookings.</p>
      </section>
    )
  }

  const booked = (await getBookings()).sort(
    (a: StoredBooking, b: StoredBooking) => new Date(a.start).getTime() - new Date(b.start).getTime()
  )

  const today = new Date()
  const initialStartDate = today.toISOString().split('T')[0]
  const defaultDays = 14
  const initialSlots = await listSlots({ startDate: today.toISOString(), days: defaultDays })
  const safeKey = providedKey || adminKey

  return (
    <section className="container mx-auto max-w-6xl py-16 px-6 space-y-10">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-soft-blue font-semibold">Admin tools</p>
        <h1 className="text-3xl font-bold text-gray-900">Manage schedule locks</h1>
        <p className="text-gray-600">
          Lock slots before vacations or exams, or unlock them when plans change. Data visible only with the correct key.
        </p>
      </div>

      <AdminScheduleManager
        adminKey={safeKey}
        initialSlots={initialSlots}
        initialStartDate={initialStartDate}
        initialDays={defaultDays}
      />

      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Upcoming bookings</h2>
          <p className="text-gray-600">Chronological list of everything currently reserved.</p>
        </div>
        {booked.length === 0 ? (
          <p className="rounded-2xl border border-gray-200 bg-white/80 p-4 text-sm text-gray-600">
            No bookings yet. Slots will appear here as soon as they are reserved.
          </p>
        ) : (
          <div className="space-y-4">
            {booked.map((slot: StoredBooking) => (
              <div key={slot.id} className="rounded-2xl border border-gray-200 p-4 bg-white/80">
                <p className="text-sm text-gray-500">{new Date(slot.start).toLocaleString()}</p>
                <p className="font-semibold text-gray-900">{slot.bookedByName}</p>
                <p className="text-sm text-gray-700">{slot.bookedByEmail}</p>
                {slot.bookingType && <p className="text-sm text-gray-700">Booking: {slot.bookingType}</p>}
                {slot.note && <p className="text-sm text-gray-600 mt-2">Note: {slot.note}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
