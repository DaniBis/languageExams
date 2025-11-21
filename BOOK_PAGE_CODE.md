# Book a Lesson Page - Complete Implementation

This document provides the complete Next.js implementation for the Book a Lesson page (`/book`) with Calendly widget integration.

## Overview

The Book a Lesson page allows students to schedule their English lessons through an embedded Calendly scheduling widget. The page includes instructions, the Calendly iframe, and a payment reminder.

## Complete Page Code

### File: `app/book/page.tsx`

```tsx
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Calendar, Clock, CheckCircle2, CreditCard, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Book a Lesson | English with Daniel',
  description: 'Schedule your English lesson with Daniel. Choose a time that works for you and start improving your English today.',
  keywords: 'book english lesson, schedule english class, Cambridge exam preparation, IELTS preparation, online english tutoring',
}

export default function BookPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
              Book a Lesson
            </h1>
            <p className="text-xl md:text-2xl text-blue-50">
              Choose a time that works for you and let's start learning together
            </p>
          </div>
        </div>
      </section>

      {/* How to Book Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-poppins">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Booking your lesson is simple. Just follow these three easy steps:
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Step 1 */}
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-poppins">
                1. Choose Your Time
              </h3>
              <p className="text-gray-600">
                Select a date and time that fits your schedule from the calendar below.
              </p>
            </Card>

            {/* Step 2 */}
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-poppins">
                2. Confirm Your Booking
              </h3>
              <p className="text-gray-600">
                Fill in your details and confirm the appointment. You'll receive a confirmation email.
              </p>
            </Card>

            {/* Step 3 */}
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-poppins">
                3. Complete Payment
              </h3>
              <p className="text-gray-600">
                After booking, complete your payment via Revolut to secure your lesson.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Calendly Widget Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3 font-poppins">
                Select Your Lesson Time
              </h2>
              <p className="text-lg text-gray-600 mb-2">
                Choose a convenient time from the calendar below
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>All times are shown in your local timezone</span>
              </div>
            </div>

            {/* Calendly Embed */}
            <div className="calendly-embed-container">
              <iframe
                src="https://calendly.com/your-calendly-username/english-lesson"
                width="100%"
                height="700"
                frameBorder="0"
                className="rounded-lg"
                title="Book a lesson with Daniel"
              ></iframe>
            </div>

            {/* Calendly Badge (Optional) */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                Powered by{' '}
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Calendly
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Reminder Section */}
      <section className="py-12 bg-yellow-50 border-t-4 border-yellow-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-poppins">
              Important: Complete Your Payment
            </h2>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              After booking your lesson, please complete payment via Revolut to confirm your spot.
              Your lesson is only confirmed once payment is received.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pay">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Pay via Revolut
                </Button>
              </Link>
              <Link href="/prices">
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  View Prices
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center font-poppins">
            Before You Book
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-poppins">
                What to Prepare
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Stable internet connection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Computer or tablet with camera and microphone</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Notebook and pen for taking notes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Your learning goals (if it's your first lesson)</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-poppins">
                Good to Know
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Lessons are conducted via Zoom or Google Meet</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>You'll receive a meeting link via email</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Cancellations must be made 24 hours in advance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Rescheduling is always possible with notice</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
            Need Help Booking?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            If you have any questions or need assistance, I'm here to help!
          </p>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              Contact Me
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
```

## Customization Instructions

### 1. Update Calendly URL

Replace the placeholder Calendly URL with your actual Calendly link:

```tsx
// Find this line in the code:
src="https://calendly.com/your-calendly-username/english-lesson"

// Replace with your actual Calendly URL, for example:
src="https://calendly.com/daniel-english/60min"
```

### 2. Calendly Setup

To get your Calendly URL:

1. Go to [calendly.com](https://calendly.com) and sign up/log in
2. Create an event type (e.g., "English Lesson - 60 minutes")
3. Configure your availability and settings
4. Copy your event link from the Calendly dashboard
5. Paste it into the iframe `src` attribute

### 3. Optional: Add Calendly Script for Advanced Features

If you want to use Calendly's advanced features (like inline widget with better styling), add this to your `app/layout.tsx` in the `<head>` section:

```tsx
<Script
  src="https://assets.calendly.com/assets/external/widget.js"
  strategy="lazyOnload"
/>
```

Then replace the iframe with:

```tsx
<div
  className="calendly-inline-widget"
  data-url="https://calendly.com/your-calendly-username/english-lesson"
  style={{ minWidth: '320px', height: '700px' }}
></div>
```

### 4. Adjust Timezone Display

Calendly automatically detects the user's timezone. You can customize timezone behavior in your Calendly settings.

### 5. Customize Meeting Platform

Update the "Good to Know" section to match your preferred video platform:

```tsx
// Change this line to match your platform:
<span>Lessons are conducted via Zoom or Google Meet</span>

// Examples:
<span>Lessons are conducted via Zoom</span>
<span>Lessons are conducted via Google Meet</span>
<span>Lessons are conducted via Skype</span>
```

## Required Components

This page uses the following Shadcn UI components:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
```

## Required Icons

The page uses these Lucide React icons (already included if you installed Shadcn UI):

- `Calendar`
- `Clock`
- `CheckCircle2`
- `CreditCard`
- `ArrowRight`

## Styling Notes

### Colors Used
- **Primary Blue**: `bg-blue-600`, `text-blue-600` (Soft Blue from brand)
- **Yellow Accent**: `bg-yellow-400`, `bg-yellow-50` (Pastel Yellow from brand)
- **Grays**: For text and backgrounds

### Fonts
- **Headings**: `font-poppins` (Poppins)
- **Body**: Default Inter font

### Responsive Design
- Mobile-first approach
- 1-column layout on mobile
- 2-3 column grids on desktop
- Calendly iframe adjusts to container width

## Page Features

### ✅ Clean Page Title
- Gradient header with title and subtitle
- Consistent with other pages

### ✅ Booking Instructions
- "How It Works" section with 3 clear steps
- Visual icons for each step
- Card-based layout with hover effects

### ✅ Embedded Calendly Widget
- Full-width responsive iframe
- 700px height (adjustable)
- Timezone indicator
- Rounded corners for modern look

### ✅ Payment Reminder
- Prominent yellow section
- Clear call-to-action
- Links to payment and pricing pages
- Important notice that payment confirms booking

### ✅ Additional Information
- "What to Prepare" checklist
- "Good to Know" information
- Help section with contact link

### ✅ Brand Consistency
- Warm, friendly, supportive tone
- Brand colors (Soft Blue, Pastel Yellow)
- Brand fonts (Poppins, Inter)
- Consistent with overall design system

## Directory Structure

```
app/
  book/
    page.tsx          # The complete booking page
```

## Testing Checklist

- [ ] Calendly iframe loads correctly
- [ ] Page is responsive on mobile, tablet, desktop
- [ ] All internal links work (Pay, Prices, Contact)
- [ ] Payment reminder is clearly visible
- [ ] Icons display correctly
- [ ] SEO metadata is present
- [ ] Page matches brand identity
- [ ] Timezone indicator is visible
- [ ] "How It Works" cards are readable
- [ ] All CTAs are functional

## SEO & Accessibility

### SEO Features
- Proper page title and description
- Relevant keywords
- Semantic HTML structure
- Descriptive headings (H1, H2, H3)

### Accessibility Features
- Semantic HTML elements
- Proper heading hierarchy
- Alt text equivalent (via aria labels where needed)
- Sufficient color contrast
- Focus states on interactive elements
- Keyboard navigation support

## Performance Considerations

- Calendly iframe loads from external source
- Consider using `loading="lazy"` for iframe if below fold
- Icons are SVG (lightweight)
- Minimal custom styling

## Optional Enhancements

### 1. Add Loading State

```tsx
'use client'

import { useState } from 'react'

// Add loading state
const [isLoading, setIsLoading] = useState(true)

// In iframe:
<iframe
  onLoad={() => setIsLoading(false)}
  // ... other props
/>

// Show loading spinner while iframe loads
{isLoading && <div>Loading calendar...</div>}
```

### 2. Add Calendly Popup Trigger

Instead of inline embed, use a button to open Calendly popup:

```tsx
'use client'

import { useEffect } from 'react'

useEffect(() => {
  const script = document.createElement('script')
  script.src = 'https://assets.calendly.com/assets/external/widget.js'
  document.body.appendChild(script)
}, [])

// Button to trigger popup
<Button
  onClick={() => {
    // @ts-ignore
    Calendly.initPopupWidget({
      url: 'https://calendly.com/your-calendly-username/english-lesson'
    })
  }}
>
  Schedule Now
</Button>
```

### 3. Pre-fill Calendly with User Info

If you have user data from a form:

```tsx
src="https://calendly.com/your-calendly-username/english-lesson?name=John%20Doe&email=john@example.com"
```

## Support

For Calendly-specific issues:
- [Calendly Help Center](https://help.calendly.com/)
- [Calendly Embed Documentation](https://help.calendly.com/hc/en-us/articles/223147027-Embed-options-overview)

## Implementation Time

- **5-10 minutes** to copy-paste the code
- **5-10 minutes** to set up Calendly account and get URL
- **5 minutes** to test and verify

Total: **15-25 minutes**
