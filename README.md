# English with Daniel

A Next.js 14 (App Router) site that showcases lesson packages and now includes a live booking grid inspired by Preply.

## Booking schedule

- Navigate to the home page and scroll to **Live availability** to view seven days of 30-minute slots.
- Visitors can pick multiple available slots, enter their details, and block those windows. Booked slots immediately appear as "Booked" for everyone else.
- Slot data is stored in `data/schedule.json`. The server lazily generates the next 7 days if the file is empty.

## Admin view

Visit `/admin/schedule?key=YOUR_KEY` to see student names, email addresses, and optional notes for each reservation. Set `SCHEDULE_ADMIN_KEY` in `.env.local` to secure this view.

## Email notifications

The booking API sends an email with the student's info and their selected timestamps. Provide SMTP credentials in `.env.local`:

```
BOOKING_NOTIFICATION_TO=bisceanudaniel@gmail.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=booking-bot@example.com
SMTP_PASS=super-secure-password
SCHEDULE_ADMIN_KEY=set-a-strong-key
```

You can reuse `CONTACT_EMAIL_TO` if you want both the contact form and booking notifications delivered to the same inbox.

## Development

```bash
npm install
npm run dev
```
