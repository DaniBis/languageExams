import { NextRequest, NextResponse } from 'next/server'
import { lockSlots, unlockSlots } from '@/lib/schedule'

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
    const { action, slotIds, note } = body as { action?: string; slotIds?: string[]; note?: string }

    if (!action || !Array.isArray(slotIds) || !slotIds.length) {
      return NextResponse.json({ error: 'Missing action or slot ids.' }, { status: 400 })
    }

    if (action === 'lock') {
      await lockSlots(slotIds, { note })
    } else if (action === 'unlock') {
      await unlockSlots(slotIds)
    } else {
      return NextResponse.json({ error: 'Invalid action.' }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    if ((error as Error).message === 'SCHEDULE_ADMIN_KEY is not configured.') {
      return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
    console.error('Admin schedule update failed', error)
    return NextResponse.json({ error: (error as Error).message }, { status: 400 })
  }
}
