# English with Daniel

A Next.js 14 (App Router) site that showcases lesson packages and now includes a live booking grid inspired by Preply.

## Booking schedule

- Navigate to the home page and scroll to **Live availability** to view seven days of 30-minute slots.
- Visitors can pick multiple available slots, enter their details, and block those windows. Booked slots immediately appear as "Booked" for everyone else.
- Slot data is stored in `data/schedule.json` during local development. In production you should provision [Vercel KV](https://vercel.com/docs/storage/vercel-kv) (or any compatible Upstash Redis instance) so writes do not hit the read-only file system.
- Admins can also create **Weekly locks** that repeat (e.g., every Thursday 19:00–20:00). These live alongside ad-hoc locks, so recurring conflicts are prevented automatically.

## Admin view

Visit `/admin/schedule?key=YOUR_KEY` to see student names, email addresses, and optional notes for each reservation. Set `SCHEDULE_ADMIN_KEY` in `.env.local` to secure this view.

### Persistent storage in production

Serverless deployments such as Vercel cannot write to the repository at runtime, so configure Vercel KV credentials (or provide the equivalent Upstash Redis tokens – they are detected automatically):

```
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
KV_REST_API_READ_ONLY_TOKEN=...
SCHEDULE_KV_BOOKINGS_KEY=schedule:bookings   # optional override
SCHEDULE_KV_RECURRING_KEY=schedule:recurring # optional override
# Upstash Redis users can instead provide:
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

When these variables are present, bookings and recurring locks are persisted in KV. Locally (or whenever the env vars are missing) the app falls back to the JSON files inside `data/` so you can continue developing without extra services.

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
