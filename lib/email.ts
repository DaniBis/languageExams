import nodemailer from 'nodemailer'

export interface BookingEmailPayload {
  name: string
  email: string
  slots: { start: string; end: string }[]
  bookingType: string
  note?: string
}

export interface ContactEmailPayload {
  name: string
  email: string
  subject: string
  message: string
}

function getEnv(name: string, required = false) {
  const value = process.env[name]
  if (required && !value) {
    throw new Error(`${name} is not configured.`)
  }
  return value
}

export async function sendBookingEmail(payload: BookingEmailPayload) {
  const host = getEnv('SMTP_HOST', true) as string
  const port = Number(getEnv('SMTP_PORT', true))
  const user = getEnv('SMTP_USER', true) as string
  const pass = getEnv('SMTP_PASS', true) as string
  const to = getEnv('BOOKING_NOTIFICATION_TO') || getEnv('CONTACT_EMAIL_TO', true)

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })

  const slotLines = payload.slots
    .map((slot) => `• ${new Date(slot.start).toUTCString()} → ${new Date(slot.end).toUTCString()}`)
    .join('\n')

  const body = [
    `New booking received`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Booking: ${payload.bookingType}`,
    `Slots:\n${slotLines}`,
  ]
  if (payload.note) {
    body.push(`Note: ${payload.note}`)
  }

  await transporter.sendMail({
    from: `Booking Bot <${user}>`,
    to,
    subject: `New booking from ${payload.name} – ${payload.bookingType}`,
    text: body.join('\n\n'),
  })
}

export async function sendContactEmail(payload: ContactEmailPayload) {
  const host = getEnv('SMTP_HOST', true) as string
  const port = Number(getEnv('SMTP_PORT', true))
  const user = getEnv('SMTP_USER', true) as string
  const pass = getEnv('SMTP_PASS', true) as string
  const to = getEnv('CONTACT_EMAIL_TO', true)

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })

  await transporter.sendMail({
    from: `Website Contact <${user}>`,
    to,
    replyTo: payload.email,
    subject: `[Contact] ${payload.subject}`,
    text: [`Name: ${payload.name}`, `Email: ${payload.email}`, '', payload.message].join('\n'),
  })
}
