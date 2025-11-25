import { NextResponse } from 'next/server'
import { getBookings } from '@/lib/schedule'

export async function GET() {
  try {
    const bookings = await getBookings()
    const now = Date.now()

    const nextLesson = bookings
      .filter((booking) => booking.entryType !== 'admin-lock')
      .filter((booking) => new Date(booking.start).getTime() > now)
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())[0]

    if (!nextLesson) {
      return NextResponse.json({ nextLesson: null })
    }

    return NextResponse.json({
      nextLesson: {
        start: nextLesson.start,
        end: nextLesson.end,
        studentName: nextLesson.bookedByName,
        bookingType: nextLesson.bookingType || null,
      },
    })
  } catch (error) {
    console.error('Failed to load next lesson', error)
    return NextResponse.json({ error: 'Failed to load next lesson' }, { status: 500 })
  }
}
