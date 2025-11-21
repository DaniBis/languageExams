# English with Daniel - Brand Quick Reference

> **Quick access guide for developers, designers, and content creators**
> 
> For complete details, see [BRAND_IDENTITY.md](./BRAND_IDENTITY.md)

---

## Color Palette

### Primary Colors
```css
--daniel-blue: #2563EB;        /* Primary brand color */
--success-green: #10B981;      /* Growth, achievement */
--warm-gray: #6B7280;          /* Body text */
--light-background: #F9FAFB;   /* Backgrounds */
--white: #FFFFFF;              /* Primary backgrounds */
```

### Accent Colors
```css
--accent-orange: #F59E0B;      /* CTAs, highlights */
--deep-navy: #1E3A8A;          /* Dark sections */
```

### RGB Values
```
Daniel Blue:       RGB(37, 99, 235)
Success Green:     RGB(16, 185, 129)
Warm Gray:         RGB(107, 114, 128)
Light Background:  RGB(249, 250, 251)
Accent Orange:     RGB(245, 158, 11)
Deep Navy:         RGB(30, 58, 138)
```

---

## Typography

### Font Families
```css
--font-heading: 'Poppins', sans-serif;    /* Headings */
--font-body: 'Open Sans', sans-serif;     /* Body text */
--font-code: 'Fira Code', monospace;      /* Code examples */
```

### Font Sizes
```css
--text-h1: 2.5rem;    /* 40px */
--text-h2: 2rem;      /* 32px */
--text-h3: 1.5rem;    /* 24px */
--text-h4: 1.25rem;   /* 20px */
--text-body: 1rem;    /* 16px */
--text-small: 0.875rem; /* 14px */
```

### Font Weights
```css
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

---

## Design Tokens

### Spacing
```css
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
--spacing-2xl: 3rem;     /* 48px */
```

### Border Radius
```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-full: 9999px;
```

### Shadows
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
```

---

## Logo Usage

### Tagline Options
- "Your Path to English Fluency"
- "Personalized Learning, Real Results"
- "Master English with Confidence"

### Logo Spacing
- Minimum clear space: Height of the letter 'E' on all sides
- Minimum size: 120px width (digital), 1 inch width (print)

---

## Brand Voice Quick Tips

### ✅ Do
- Use "you" and "your" (direct address)
- Use contractions (you'll, we're, let's)
- Be encouraging and positive
- Celebrate progress
- Ask engaging questions

### ❌ Don't
- Use overly complex jargon
- Talk down to students
- Make absolute claims
- Focus on fear or pressure
- Use passive voice excessively

---

## Key Messaging

### Primary Value Proposition
**"Personalized English Tutoring That Gets Results"**

### Tagline Variations
- Exam Prep: "Ace Your English Exam with Expert Guidance"
- Career: "Elevate Your Career with Professional English"
- General: "Learn English at Your Own Pace"

---

## Button Styles

### Primary Button
```css
background: var(--daniel-blue);
color: white;
border-radius: var(--radius-md);
padding: 12px 24px;
font-weight: 600;
```

### Secondary Button
```css
background: transparent;
color: var(--daniel-blue);
border: 2px solid var(--daniel-blue);
border-radius: var(--radius-md);
padding: 12px 24px;
font-weight: 600;
```

### Success Button
```css
background: var(--success-green);
color: white;
border-radius: var(--radius-md);
padding: 12px 24px;
font-weight: 600;
```

---

## Icon Style
- Style: Outline (not filled)
- Stroke width: 2px
- Size: 24px standard, 20px small, 32px large
- Color: Match text or use Daniel Blue for emphasis

---

## Image Guidelines

### Hero Images
- Minimum: 1920px × 1080px
- Format: WebP with JPG fallback
- Style: Natural, bright, authentic

### Profile Photos
- Minimum: 500px × 500px
- Format: JPG or WebP
- Background: Clean, uncluttered

### Thumbnail Images
- Size: 400px × 300px
- Aspect ratio: 4:3
- File size: <100KB optimized

---

## Common UI Components

### Card
```css
background: white;
border-radius: var(--radius-md);
padding: var(--spacing-xl);
box-shadow: var(--shadow-md);
```

### Input Field
```css
border: 1px solid var(--warm-gray);
border-radius: var(--radius-md);
padding: 12px 16px;
font-size: var(--text-body);
```

### Alert/Notification
```css
/* Success */
background: #D1FAE5;
border-left: 4px solid var(--success-green);
color: #065F46;

/* Info */
background: #DBEAFE;
border-left: 4px solid var(--daniel-blue);
color: #1E3A8A;

/* Warning */
background: #FEF3C7;
border-left: 4px solid var(--accent-orange);
color: #92400E;
```

---

## Accessibility Requirements

### Contrast Ratios
- Body text: Minimum 4.5:1
- Large text (18px+): Minimum 3:1
- UI components: Minimum 3:1

### Interactive Elements
- All clickable elements: Minimum 44×44px touch target
- Focus indicators: Visible on all interactive elements
- Alt text: Required for all images

---

## Social Media

### Profile Bio Template
> English Language Tutor | Exam Prep Specialist | Helping students achieve fluency and confidence 🎓 | Book your free consultation 👇

### Hashtags
Primary: #EnglishWithDaniel
Secondary: #EnglishLearning #IELTS #TOEFL #LanguageLearning #EnglishTutor

### Post Frequency
- Instagram: 3-4 times per week
- LinkedIn: 2-3 times per week
- Facebook: 2-3 times per week

---

## Email Signature
```
Daniel [Last Name]
English Language Tutor
English with Daniel

📧 contact@englishwithdaniel.com
📱 +1 (555) 123-4567
🌐 www.englishwithdaniel.com

"Your Path to English Fluency"
```
*Note: Template - replace with actual contact information*

---

## File Naming Conventions

### Images
```
component-descriptor-size.format
Example: hero-homepage-1920x1080.webp
         icon-success-24x24.svg
         photo-daniel-profile-500x500.jpg
```

### Documents
```
category-title-version.format
Example: brand-identity-v1.0.pdf
         lesson-plan-ielts-speaking.pdf
```

---

## Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 640px)

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px)

/* Desktop */
@media (min-width: 1025px)

/* Large Desktop */
@media (min-width: 1280px)
```

---

## Content Checklist

Before publishing any content, verify:
- [ ] Uses approved color palette
- [ ] Follows typography guidelines
- [ ] Matches brand voice
- [ ] No spelling or grammar errors
- [ ] Images are optimized and have alt text
- [ ] Mobile-responsive
- [ ] Meets accessibility standards
- [ ] Includes clear call-to-action
- [ ] Reflects brand values

---

## Quick Links

- [Full Brand Identity Guide](./BRAND_IDENTITY.md)
- [Color Palette Reference](#color-palette)
- [Typography System](#typography)
- [Voice & Tone Guidelines](./BRAND_IDENTITY.md#6-brand-voice--tone)

*Note: Logo asset files will be added once design is finalized*

---

**Version:** 1.0  
**Last Updated:** November 2025
