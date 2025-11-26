import { NextRequest, NextResponse } from 'next/server'
import { lockSlots, unlockSlots, addRecurringLock, removeRecurringLock, listRecurringLocks } from '@/lib/schedule'

function validateAdmin(request: NextRequest) {
  const adminKey = process.env.SCHEDULE_ADMIN_KEY
  if (!adminKey) {
    throw new Error('SCHEDULE_ADMIN_KEY is not configured.')
  }

  const provided = request.headers.get('x-admin-key') || request.nextUrl.searchParams.get('key')
  if (provided !== adminKey) {
    return false
  }
  return true
}

export async function POST(request: NextRequest) {
  try {
    const isAuthorized = validateAdmin(request)
    if (!isAuthorized) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    const body = await request.json()
    const { action } = body as { action?: string }

    if (!action) {
      return NextResponse.json({ error: 'Missing action.' }, { status: 400 })
    }

    if (action === 'lock' || action === 'unlock') {
      const { slotIds, note } = body as { slotIds?: string[]; note?: string }
      if (!Array.isArray(slotIds) || !slotIds.length) {
        return NextResponse.json({ error: 'Missing slot ids.' }, { status: 400 })
      }

      if (action === 'lock') {
        await lockSlots(slotIds, { note })
      } else {
        await unlockSlots(slotIds)
      }

      return NextResponse.json({ success: true })
    }

    if (action === 'add-recurring') {
      const { weekday, startMinutes, durationMinutes, note, timezone } = body as {
        weekday?: number
        startMinutes?: number
        durationMinutes?: number
        note?: string
        timezone?: string
      }

      if (
        typeof weekday !== 'number' ||
        typeof startMinutes !== 'number' ||
        typeof durationMinutes !== 'number'
      ) {
        return NextResponse.json({ error: 'Missing recurring lock parameters.' }, { status: 400 })
      }

      const recurringLocks = await addRecurringLock({
        weekday,
        startMinutes,
        durationMinutes,
        note,
        timezone,
      })
      return NextResponse.json({ success: true, recurringLocks })
    }

    if (action === 'remove-recurring') {
      const { recurringLockId } = body as { recurringLockId?: string }
      if (!recurringLockId) {
        return NextResponse.json({ error: 'Missing recurring lock id.' }, { status: 400 })
      }
      const recurringLocks = await removeRecurringLock(recurringLockId)
      return NextResponse.json({ success: true, recurringLocks })
    }

    if (action === 'list-recurring') {
      const recurringLocks = await listRecurringLocks()
      return NextResponse.json({ success: true, recurringLocks })
    }

    return NextResponse.json({ error: 'Invalid action.' }, { status: 400 })
  } catch (error) {
    if ((error as Error).message === 'SCHEDULE_ADMIN_KEY is not configured.') {
      return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
    console.error('Admin schedule update failed', error)
    return NextResponse.json({ error: (error as Error).message }, { status: 400 })
  }
}
