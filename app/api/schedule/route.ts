import { NextRequest, NextResponse } from 'next/server'
import { bookSlots, listSlots } from '@/lib/schedule'
import { sendBookingEmail } from '@/lib/email'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const start = searchParams.get('start') ?? undefined
  const daysParam = searchParams.get('days')
  const parsedDays = daysParam ? Number(daysParam) : undefined
  const days = Number.isNaN(parsedDays ?? NaN) ? undefined : parsedDays

  const slots = await listSlots({ startDate: start, days })
  return NextResponse.json({ slots })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, note, slotIds, bookingType } = body as {
      name?: string
      email?: string
      note?: string
      slotIds?: string[]
      bookingType?: string
    }

    if (!name || !email || !slotIds?.length || !bookingType?.trim()) {
      return NextResponse.json({ error: 'Missing required information.' }, { status: 400 })
    }

    const bookedSlots = await bookSlots(slotIds, { name, email, note, bookingType })

    try {
      await sendBookingEmail({
        name,
        email,
        note,
        bookingType,
        slots: bookedSlots.map((slot) => ({ start: slot.start, end: slot.end })),
      })
    } catch (emailError) {
      console.error('Email notification failed', emailError)
    }

    return NextResponse.json({ success: true, slots: bookedSlots })
  } catch (error) {
    console.error('Booking error', error)
    return NextResponse.json({ error: (error as Error).message }, { status: 400 })
  }
}
