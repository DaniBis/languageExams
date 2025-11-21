# English with Daniel - Design System

**Complete Design Blueprint for Next.js + Tailwind CSS Implementation**

This document provides detailed design specifications for implementing the "English with Daniel" website using Next.js and Tailwind CSS. All specifications align with the brand identity and sitemap structure.

---

## 1. Color Palette

### Primary Colors

```css
--color-white: #FFFFFF
--color-soft-blue: #6BA3D4
--color-pastel-yellow: #FFE699
```

**Tailwind Configuration:**
```js
colors: {
  'white': '#FFFFFF',
  'soft-blue': {
    DEFAULT: '#6BA3D4',
    light: '#8BB8DD',
    dark: '#5A92C3',
  },
  'pastel-yellow': {
    DEFAULT: '#FFE699',
    light: '#FFF4CC',
    dark: '#FFD966',
  },
}
```

### Semantic Colors

```css
--color-text-primary: #1F2937      /* Gray-800 for main text */
--color-text-secondary: #6B7280    /* Gray-500 for secondary text */
--color-text-muted: #9CA3AF        /* Gray-400 for muted text */
--color-border: #E5E7EB            /* Gray-200 for borders */
--color-background: #F9FAFB        /* Gray-50 for subtle backgrounds */
--color-success: #10B981           /* Green-500 for success states */
--color-error: #EF4444             /* Red-500 for error states */
```

### Color Usage Guidelines

| Element | Color | Hex Code | Usage |
|---------|-------|----------|-------|
| Page Background | White | `#FFFFFF` | Main page background |
| Primary CTA Buttons | Soft Blue | `#6BA3D4` | Main action buttons |
| Secondary CTA Buttons | White with Soft Blue Border | `#FFFFFF` border `#6BA3D4` | Secondary actions |
| Accent Sections | Pastel Yellow Light | `#FFF4CC` | Highlight sections, badges |
| Headings | Text Primary | `#1F2937` | All headings |
| Body Text | Text Primary | `#1F2937` | Paragraph text |
| Links | Soft Blue | `#6BA3D4` | All hyperlinks |
| Link Hover | Soft Blue Dark | `#5A92C3` | Link hover state |
| Borders | Border Gray | `#E5E7EB` | Cards, inputs, dividers |

---

## 2. Typography

### Font Families

**Google Fonts Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

**Tailwind Configuration:**
```js
fontFamily: {
  'poppins': ['Poppins', 'sans-serif'],
  'inter': ['Inter', 'sans-serif'],
}
```

### Font Usage

| Element | Font | Weight | Size (Desktop) | Size (Mobile) | Line Height |
|---------|------|--------|----------------|---------------|-------------|
| H1 (Hero) | Poppins | Bold (700) | 56px (3.5rem) | 36px (2.25rem) | 1.1 |
| H2 (Page Title) | Poppins | Bold (700) | 48px (3rem) | 32px (2rem) | 1.2 |
| H3 (Section Title) | Poppins | Semi-Bold (600) | 36px (2.25rem) | 28px (1.75rem) | 1.3 |
| H4 (Subsection) | Poppins | Semi-Bold (600) | 24px (1.5rem) | 20px (1.25rem) | 1.4 |
| H5 (Card Title) | Poppins | Medium (500) | 20px (1.25rem) | 18px (1.125rem) | 1.4 |
| Body Large | Inter | Regular (400) | 18px (1.125rem) | 16px (1rem) | 1.6 |
| Body Regular | Inter | Regular (400) | 16px (1rem) | 16px (1rem) | 1.6 |
| Body Small | Inter | Regular (400) | 14px (0.875rem) | 14px (0.875rem) | 1.5 |
| Button Text | Poppins | Medium (500) | 16px (1rem) | 16px (1rem) | 1 |
| Navigation | Poppins | Medium (500) | 16px (1rem) | 16px (1rem) | 1 |

### Tailwind Classes

```
Hero H1: text-5xl md:text-6xl font-poppins font-bold leading-tight
Page H2: text-4xl md:text-5xl font-poppins font-bold leading-tight
Section H3: text-3xl md:text-4xl font-poppins font-semibold leading-snug
Subsection H4: text-xl md:text-2xl font-poppins font-semibold leading-normal
Card H5: text-lg md:text-xl font-poppins font-medium leading-normal
Body Large: text-base md:text-lg font-inter leading-relaxed
Body Regular: text-base font-inter leading-relaxed
Body Small: text-sm font-inter leading-normal
```

---

## 3. Spacing System

### Base Unit: 4px (0.25rem)

**Tailwind Spacing Scale:**
```
0: 0px
1: 4px (0.25rem)
2: 8px (0.5rem)
3: 12px (0.75rem)
4: 16px (1rem)
5: 20px (1.25rem)
6: 24px (1.5rem)
8: 32px (2rem)
10: 40px (2.5rem)
12: 48px (3rem)
16: 64px (4rem)
20: 80px (5rem)
24: 96px (6rem)
32: 128px (8rem)
```

### Layout Spacing Rules

| Context | Desktop | Mobile | Tailwind Classes |
|---------|---------|--------|------------------|
| Section Vertical Padding | 80px (5rem) | 48px (3rem) | `py-12 md:py-20` |
| Section Horizontal Padding | 80px (5rem) | 24px (1.5rem) | `px-6 md:px-20` |
| Container Max Width | 1280px (80rem) | 100% | `max-w-7xl mx-auto` |
| Card Padding | 32px (2rem) | 24px (1.5rem) | `p-6 md:p-8` |
| Element Spacing (Small) | 16px (1rem) | 16px (1rem) | `space-y-4` |
| Element Spacing (Medium) | 24px (1.5rem) | 24px (1.5rem) | `space-y-6` |
| Element Spacing (Large) | 48px (3rem) | 32px (2rem) | `space-y-8 md:space-y-12` |
| Grid Gap | 32px (2rem) | 24px (1.5rem) | `gap-6 md:gap-8` |

### Component Spacing

**Buttons:**
- Padding: `px-8 py-3` (32px horizontal, 12px vertical)
- Margin between stacked buttons: `space-y-4`
- Margin between inline buttons: `space-x-4`

**Forms:**
- Input padding: `px-4 py-3`
- Label margin bottom: `mb-2`
- Field margin bottom: `mb-6`

**Cards:**
- Padding: `p-6 md:p-8`
- Margin between cards: `gap-6 md:gap-8`
- Border radius: `rounded-lg` (8px)

---

## 4. Button Styles

### Primary Button

**Default State:**
```html
<button class="
  px-8 py-3 
  bg-soft-blue 
  text-white 
  font-poppins font-medium 
  text-base 
  rounded-lg 
  transition-all duration-300 
  hover:bg-soft-blue-dark 
  hover:shadow-lg 
  active:scale-95
">
  Book Your Free Consultation
</button>
```

**CSS Properties:**
```css
background-color: #6BA3D4;
color: #FFFFFF;
padding: 12px 32px;
border-radius: 8px;
font-family: 'Poppins', sans-serif;
font-weight: 500;
font-size: 16px;
transition: all 0.3s ease;
cursor: pointer;
border: none;

&:hover {
  background-color: #5A92C3;
  box-shadow: 0 10px 25px rgba(107, 163, 212, 0.3);
  transform: translateY(-2px);
}

&:active {
  transform: scale(0.95);
}

&:focus {
  outline: 2px solid #6BA3D4;
  outline-offset: 2px;
}
```

### Secondary Button

**Default State:**
```html
<button class="
  px-8 py-3 
  bg-white 
  text-soft-blue 
  border-2 border-soft-blue 
  font-poppins font-medium 
  text-base 
  rounded-lg 
  transition-all duration-300 
  hover:bg-soft-blue 
  hover:text-white 
  hover:shadow-lg 
  active:scale-95
">
  View Prices
</button>
```

**CSS Properties:**
```css
background-color: #FFFFFF;
color: #6BA3D4;
border: 2px solid #6BA3D4;
padding: 12px 32px;
border-radius: 8px;
font-family: 'Poppins', sans-serif;
font-weight: 500;
font-size: 16px;
transition: all 0.3s ease;
cursor: pointer;

&:hover {
  background-color: #6BA3D4;
  color: #FFFFFF;
  box-shadow: 0 10px 25px rgba(107, 163, 212, 0.3);
  transform: translateY(-2px);
}

&:active {
  transform: scale(0.95);
}
```

### Button Variants

**Small Button:**
```html
class="px-6 py-2 text-sm"
```

**Large Button:**
```html
class="px-10 py-4 text-lg"
```

**Full Width Button (Mobile):**
```html
class="w-full md:w-auto"
```

**Disabled State:**
```html
class="opacity-50 cursor-not-allowed"
disabled
```

---

## 5. Layout Grid System

### Responsive Breakpoints

```js
screens: {
  'sm': '640px',   // Mobile landscape
  'md': '768px',   // Tablet
  'lg': '1024px',  // Desktop
  'xl': '1280px',  // Large desktop
  '2xl': '1536px', // Extra large desktop
}
```

### Container

```html
<div class="container max-w-7xl mx-auto px-6 md:px-20">
  <!-- Content -->
</div>
```

### Grid Layouts

**2-Column Grid (Desktop) / 1-Column (Mobile):**
```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
  <!-- Items -->
</div>
```

**3-Column Grid:**
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
  <!-- Items -->
</div>
```

**4-Column Grid:**
```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
  <!-- Items -->
</div>
```

**Service Cards (2x2 Grid):**
```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
  <!-- 4 service cards -->
</div>
```

---

## 6. Component Specifications

### 6.1 Navbar

**Structure:**
```html
<nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
  <div class="container max-w-7xl mx-auto px-6 md:px-20">
    <div class="flex justify-between items-center h-20">
      <!-- Logo -->
      <div class="font-poppins font-bold text-2xl text-soft-blue">
        English with Daniel
      </div>
      
      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-8">
        <a href="/" class="font-poppins font-medium text-base text-gray-800 hover:text-soft-blue transition-colors">Home</a>
        <a href="/about" class="font-poppins font-medium text-base text-gray-800 hover:text-soft-blue transition-colors">About Me</a>
        <!-- Dropdown for Services -->
        <div class="relative group">
          <button class="font-poppins font-medium text-base text-gray-800 hover:text-soft-blue transition-colors">
            Services ▼
          </button>
          <!-- Dropdown menu -->
        </div>
        <a href="/prices" class="font-poppins font-medium text-base text-gray-800 hover:text-soft-blue transition-colors">Prices</a>
        <a href="/reviews" class="font-poppins font-medium text-base text-gray-800 hover:text-soft-blue transition-colors">Reviews</a>
        <a href="/contact" class="font-poppins font-medium text-base text-gray-800 hover:text-soft-blue transition-colors">Contact</a>
      </div>
      
      <!-- CTA Button -->
      <div class="hidden md:block">
        <button class="px-6 py-2 bg-soft-blue text-white font-poppins font-medium text-base rounded-lg hover:bg-soft-blue-dark transition-all">
          Book a Lesson
        </button>
      </div>
      
      <!-- Mobile Menu Button -->
      <button class="md:hidden">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </div>
  </div>
</nav>
```

**Specifications:**
- Height: 80px (5rem) - `h-20`
- Sticky positioning: `sticky top-0 z-50`
- Background: White with bottom border
- Logo: Poppins Bold, 24px, Soft Blue
- Links: Poppins Medium, 16px, Gray-800, hover Soft Blue
- Mobile: Hamburger menu at 768px breakpoint

---

### 6.2 Footer

**Structure:**
```html
<footer class="bg-gray-50 border-t border-gray-200 mt-20">
  <div class="container max-w-7xl mx-auto px-6 md:px-20 py-12 md:py-16">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
      <!-- Column 1: Quick Links -->
      <div>
        <h5 class="font-poppins font-semibold text-lg text-gray-800 mb-4">Quick Links</h5>
        <ul class="space-y-3">
          <li><a href="/" class="font-inter text-base text-gray-600 hover:text-soft-blue transition-colors">Home</a></li>
          <!-- More links -->
        </ul>
      </div>
      
      <!-- Column 2: Services -->
      <!-- Column 3: Contact -->
      <!-- Column 4: Resources -->
    </div>
    
    <!-- Bottom Bar -->
    <div class="border-t border-gray-200 mt-12 pt-8 text-center">
      <p class="font-inter text-sm text-gray-600">© 2025 English with Daniel. All rights reserved.</p>
      <p class="font-poppins text-base text-soft-blue mt-2">Clear English. Confident You.</p>
    </div>
  </div>
</footer>
```

**Specifications:**
- Background: Gray-50 (`bg-gray-50`)
- Padding: 48-64px vertical, standard horizontal
- 4-column grid on desktop, stack on mobile
- Column titles: Poppins Semi-Bold, 18px
- Links: Inter Regular, 16px, Gray-600, hover Soft Blue
- Bottom bar: Border top, centered text

---

### 6.3 Hero Section

**Structure:**
```html
<section class="bg-white py-16 md:py-24 lg:py-32">
  <div class="container max-w-7xl mx-auto px-6 md:px-20">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <!-- Left: Text Content -->
      <div class="text-center lg:text-left">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-gray-900 leading-tight mb-6">
          Clear English. Confident You.
        </h1>
        <p class="text-lg md:text-xl font-inter text-gray-600 leading-relaxed mb-8">
          Cambridge & IELTS Exam Preparation with an Experienced International Tutor
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button class="px-8 py-3 bg-soft-blue text-white font-poppins font-medium text-base rounded-lg hover:bg-soft-blue-dark hover:shadow-lg transition-all">
            Book Your Free Consultation
          </button>
          <button class="px-8 py-3 bg-white text-soft-blue border-2 border-soft-blue font-poppins font-medium text-base rounded-lg hover:bg-soft-blue hover:text-white hover:shadow-lg transition-all">
            View Prices
          </button>
        </div>
      </div>
      
      <!-- Right: Image/Illustration -->
      <div class="hidden lg:block">
        <!-- Hero image or illustration -->
        <div class="bg-gradient-to-br from-soft-blue-light to-soft-blue rounded-2xl aspect-square flex items-center justify-center">
          <span class="text-white text-6xl">👨‍🏫</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Specifications:**
- Full-width section with container
- 2-column layout on large screens (text + visual)
- Stack vertically on mobile/tablet
- Vertical padding: 64px mobile, 96px tablet, 128px desktop
- H1: Maximum 2 lines, clear hierarchy
- Buttons: Stack on mobile, inline on desktop
- Image: Hidden on mobile, shown on lg+

---

### 6.4 Card Component

**Standard Card:**
```html
<div class="bg-white rounded-lg border border-gray-200 p-6 md:p-8 hover:shadow-lg transition-shadow duration-300">
  <!-- Icon or Image -->
  <div class="w-16 h-16 bg-pastel-yellow-light rounded-full flex items-center justify-center mb-4">
    <svg class="w-8 h-8 text-soft-blue"><!-- Icon --></svg>
  </div>
  
  <!-- Title -->
  <h3 class="text-xl md:text-2xl font-poppins font-semibold text-gray-900 mb-3">
    Card Title
  </h3>
  
  <!-- Description -->
  <p class="text-base font-inter text-gray-600 leading-relaxed mb-4">
    Card description text goes here.
  </p>
  
  <!-- CTA Link (Optional) -->
  <a href="#" class="text-soft-blue font-poppins font-medium hover:text-soft-blue-dark transition-colors">
    Learn More →
  </a>
</div>
```

**Service Card:**
```html
<div class="bg-white rounded-lg border border-gray-200 p-6 md:p-8 hover:border-soft-blue hover:shadow-xl transition-all duration-300 group">
  <div class="w-16 h-16 bg-soft-blue-light rounded-full flex items-center justify-center mb-4 group-hover:bg-soft-blue transition-colors">
    <svg class="w-8 h-8 text-white"><!-- Icon --></svg>
  </div>
  <h3 class="text-xl font-poppins font-semibold text-gray-900 mb-3">Service Name</h3>
  <p class="text-base font-inter text-gray-600 leading-relaxed mb-4">Service description...</p>
  <a href="#" class="inline-flex items-center text-soft-blue font-poppins font-medium hover:text-soft-blue-dark">
    Learn More 
    <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
    </svg>
  </a>
</div>
```

**Specifications:**
- Border radius: 8px (`rounded-lg`)
- Padding: 24px mobile, 32px desktop
- Border: 1px Gray-200
- Hover: Shadow lift and border color change
- Icon container: 64px circle, Pastel Yellow background
- Smooth transitions: 300ms

---

### 6.5 Testimonial Component

**Testimonial Card:**
```html
<div class="bg-white rounded-lg border border-gray-200 p-6 md:p-8 hover:shadow-lg transition-shadow">
  <!-- Star Rating -->
  <div class="flex items-center mb-4">
    <div class="flex text-pastel-yellow-dark">
      <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><!-- Star --></svg>
      <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><!-- Star --></svg>
      <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><!-- Star --></svg>
      <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><!-- Star --></svg>
      <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><!-- Star --></svg>
    </div>
  </div>
  
  <!-- Quote -->
  <p class="text-base font-inter text-gray-700 leading-relaxed mb-6 italic">
    "Testimonial text goes here..."
  </p>
  
  <!-- Author -->
  <div class="flex items-center">
    <div class="w-12 h-12 bg-soft-blue-light rounded-full flex items-center justify-center text-white font-poppins font-semibold mr-4">
      AN
    </div>
    <div>
      <p class="font-poppins font-semibold text-gray-900">Student Name</p>
      <p class="font-inter text-sm text-gray-600">Country • Exam Type</p>
    </div>
  </div>
</div>
```

**Featured Testimonial (Larger):**
```html
<div class="bg-pastel-yellow-light rounded-lg p-8 md:p-10">
  <!-- 5 stars -->
  <div class="flex items-center mb-4">
    <!-- Stars in soft blue -->
  </div>
  
  <!-- Longer quote -->
  <p class="text-lg font-inter text-gray-800 leading-relaxed mb-6">
    "Longer, more detailed testimonial..."
  </p>
  
  <!-- Author with more details -->
  <div class="flex items-center">
    <div class="w-16 h-16 bg-soft-blue rounded-full flex items-center justify-center text-white font-poppins font-bold text-xl mr-4">
      AN
    </div>
    <div>
      <p class="font-poppins font-bold text-lg text-gray-900">Full Name</p>
      <p class="font-inter text-base text-gray-700">Country • Exam Type - Result</p>
      <p class="font-inter text-sm text-gray-600">Date</p>
    </div>
  </div>
</div>
```

---

### 6.6 Page Header Component

**Page Header:**
```html
<section class="bg-gradient-to-r from-soft-blue-light to-soft-blue py-16 md:py-20">
  <div class="container max-w-7xl mx-auto px-6 md:px-20 text-center">
    <h1 class="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">
      Page Title
    </h1>
    <p class="text-lg md:text-xl font-inter text-white opacity-90 max-w-3xl mx-auto">
      Page subtitle or description goes here
    </p>
  </div>
</section>
```

**Alternative (White Background):**
```html
<section class="bg-white border-b border-gray-200 py-12 md:py-16">
  <div class="container max-w-7xl mx-auto px-6 md:px-20 text-center">
    <h1 class="text-4xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">
      Page Title
    </h1>
    <p class="text-lg md:text-xl font-inter text-gray-600 max-w-3xl mx-auto">
      Page subtitle or description
    </p>
  </div>
</section>
```

---

### 6.7 Pricing Table Component

**Pricing Card:**
```html
<div class="bg-white rounded-lg border-2 border-gray-200 p-8 hover:border-soft-blue hover:shadow-xl transition-all relative">
  <!-- Popular Badge (if applicable) -->
  <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-pastel-yellow px-6 py-2 rounded-full">
    <span class="font-poppins font-semibold text-sm text-gray-900">Most Popular</span>
  </div>
  
  <!-- Package Name -->
  <h3 class="text-2xl font-poppins font-bold text-gray-900 mb-2 text-center">
    Standard Package
  </h3>
  
  <!-- Lessons Count -->
  <p class="text-base font-inter text-gray-600 mb-6 text-center">10 Lessons</p>
  
  <!-- Price -->
  <div class="text-center mb-6">
    <span class="text-5xl font-poppins font-bold text-soft-blue">€XX</span>
    <span class="text-lg font-inter text-gray-600"> per lesson</span>
  </div>
  <div class="text-center mb-8">
    <span class="text-2xl font-poppins font-semibold text-gray-900">Total: €XXX</span>
  </div>
  
  <!-- Features List -->
  <ul class="space-y-3 mb-8">
    <li class="flex items-start">
      <svg class="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
      </svg>
      <span class="font-inter text-base text-gray-700">Feature description</span>
    </li>
    <!-- More features -->
  </ul>
  
  <!-- CTA Button -->
  <button class="w-full px-8 py-3 bg-soft-blue text-white font-poppins font-medium text-base rounded-lg hover:bg-soft-blue-dark hover:shadow-lg transition-all">
    Book This Package
  </button>
  
  <!-- Best For -->
  <p class="text-sm font-inter text-gray-600 text-center mt-4">
    Best for: Description
  </p>
</div>
```

**Most Popular Package (Highlighted):**
- Border: 2px Soft Blue instead of Gray
- Scale slightly larger: `scale-105` on desktop
- Shadow by default

---

### 6.8 Contact Form Component

**Contact Form:**
```html
<form class="bg-white rounded-lg border border-gray-200 p-8 md:p-10 shadow-sm">
  <!-- Form Title -->
  <h3 class="text-2xl font-poppins font-semibold text-gray-900 mb-6">Send Me a Message</h3>
  
  <!-- Name Field -->
  <div class="mb-6">
    <label class="block font-poppins font-medium text-sm text-gray-700 mb-2" for="name">
      Name *
    </label>
    <input 
      type="text" 
      id="name"
      class="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-soft-blue focus:border-transparent transition-all"
      placeholder="Your full name"
      required
    />
  </div>
  
  <!-- Email Field -->
  <div class="mb-6">
    <label class="block font-poppins font-medium text-sm text-gray-700 mb-2" for="email">
      Email Address *
    </label>
    <input 
      type="email" 
      id="email"
      class="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-soft-blue focus:border-transparent transition-all"
      placeholder="your.email@example.com"
      required
    />
  </div>
  
  <!-- Subject Dropdown -->
  <div class="mb-6">
    <label class="block font-poppins font-medium text-sm text-gray-700 mb-2" for="subject">
      Subject *
    </label>
    <select 
      id="subject"
      class="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-soft-blue focus:border-transparent transition-all"
      required
    >
      <option value="">Select a subject</option>
      <option value="general">General Question</option>
      <option value="cambridge">Cambridge Exam Preparation</option>
      <option value="ielts">IELTS Preparation</option>
      <option value="general-english">General English</option>
      <option value="pricing">Pricing Question</option>
    </select>
  </div>
  
  <!-- Message Textarea -->
  <div class="mb-6">
    <label class="block font-poppins font-medium text-sm text-gray-700 mb-2" for="message">
      Message *
    </label>
    <textarea 
      id="message"
      rows="5"
      class="w-full px-4 py-3 border border-gray-300 rounded-lg font-inter text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-soft-blue focus:border-transparent transition-all resize-y"
      placeholder="Tell me about your English learning goals..."
      required
    ></textarea>
  </div>
  
  <!-- Checkbox -->
  <div class="mb-6">
    <label class="flex items-start cursor-pointer">
      <input 
        type="checkbox" 
        class="w-5 h-5 text-soft-blue border-gray-300 rounded focus:ring-2 focus:ring-soft-blue mt-1"
      />
      <span class="ml-3 font-inter text-sm text-gray-700">
        I'd like to receive English learning tips via email
      </span>
    </label>
  </div>
  
  <!-- Submit Button -->
  <button 
    type="submit"
    class="w-full px-8 py-3 bg-soft-blue text-white font-poppins font-medium text-base rounded-lg hover:bg-soft-blue-dark hover:shadow-lg transition-all"
  >
    Send Message
  </button>
  
  <!-- Privacy Note -->
  <p class="text-xs font-inter text-gray-500 mt-4 text-center">
    Your information is private and will only be used to respond to your inquiry.
  </p>
</form>
```

**Input States:**
- Default: Border Gray-300
- Focus: 2px ring Soft Blue, remove border color
- Error: Border Red-500, red ring
- Success: Border Green-500

---

### 6.9 Pay via Revolut Block

**Payment Instructions Block:**
```html
<div class="bg-pastel-yellow-light rounded-lg border-2 border-pastel-yellow p-6 md:p-8">
  <!-- Title -->
  <div class="flex items-center mb-4">
    <div class="w-12 h-12 bg-soft-blue rounded-full flex items-center justify-center mr-4">
      <svg class="w-6 h-6 text-white"><!-- Icon --></svg>
    </div>
    <h3 class="text-xl font-poppins font-semibold text-gray-900">
      Pay via Revolut
    </h3>
  </div>
  
  <!-- Steps -->
  <div class="space-y-6">
    <!-- Step 1 -->
    <div class="flex items-start">
      <div class="w-8 h-8 bg-soft-blue rounded-full flex items-center justify-center text-white font-poppins font-semibold mr-4 flex-shrink-0">
        1
      </div>
      <div>
        <h4 class="font-poppins font-semibold text-base text-gray-900 mb-2">Step Title</h4>
        <p class="font-inter text-base text-gray-700">Step description...</p>
      </div>
    </div>
    <!-- More steps -->
  </div>
  
  <!-- Important Note -->
  <div class="mt-6 p-4 bg-white rounded-lg border border-pastel-yellow">
    <p class="font-poppins font-semibold text-sm text-gray-900 mb-1">Important!</p>
    <p class="font-inter text-sm text-gray-700">Include your name in the reference...</p>
  </div>
</div>
```

---

## 7. Mobile Responsiveness Rules

### Breakpoint Strategy

**Mobile First Approach:**
- Design for mobile (320px-767px) first
- Enhance for tablet (768px-1023px)
- Optimize for desktop (1024px+)

### Key Responsive Rules

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Container Padding | 24px (1.5rem) | 40px (2.5rem) | 80px (5rem) |
| Section Padding Vertical | 48px (3rem) | 64px (4rem) | 80px (5rem) |
| Grid Columns | 1 column | 2 columns | 3-4 columns |
| Font Sizes | Scale down 20-30% | Medium | Full size |
| Navigation | Hamburger menu | Hamburger menu | Full menu |
| Buttons | Full width | Auto width | Auto width |
| Hero Layout | Stack vertical | Stack vertical | 2-column horizontal |
| Cards | Full width | 2 per row | 3-4 per row |

### Mobile-Specific Classes

```html
<!-- Stack on mobile, inline on desktop -->
<div class="flex flex-col md:flex-row">

<!-- Hide on mobile, show on desktop -->
<div class="hidden lg:block">

<!-- Show on mobile, hide on desktop -->
<div class="block lg:hidden">

<!-- Full width on mobile, auto on desktop -->
<button class="w-full md:w-auto">

<!-- Different padding on mobile vs desktop -->
<div class="p-6 md:p-10">

<!-- Different text size on mobile vs desktop -->
<h1 class="text-3xl md:text-5xl">

<!-- Different grid on mobile vs desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

### Touch Target Sizes

- Minimum touch target: 44px x 44px
- Buttons: At least 48px height
- Form inputs: At least 48px height
- Navigation links: At least 44px height with padding

---

## 8. Design Principles

### 8.1 Clean Design

**Characteristics:**
- Generous white space (never crowded)
- Clear visual hierarchy (F-pattern for reading)
- Limited color palette (3 main colors)
- Minimal decorative elements
- Focus on content over decoration

**Implementation:**
```html
<!-- Good: Generous spacing -->
<section class="py-20 md:py-32">
  <div class="space-y-12">
    <!-- Well-spaced content -->
  </div>
</section>

<!-- Avoid: Cramped spacing -->
<section class="py-4">
  <div class="space-y-2">
    <!-- Too tight -->
  </div>
</section>
```

---

### 8.2 Modern Design

**Characteristics:**
- Rounded corners (8px standard)
- Subtle shadows (not heavy)
- Smooth transitions (300ms)
- Gradient accents (used sparingly)
- Modern typography (Poppins + Inter)

**Implementation:**
```html
<!-- Modern card with subtle shadow -->
<div class="rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300">

<!-- Gradient background for headers -->
<div class="bg-gradient-to-r from-soft-blue-light to-soft-blue">

<!-- Smooth transitions on all interactive elements -->
<button class="transition-all duration-300 hover:scale-105">
```

---

### 8.3 Friendly Design

**Characteristics:**
- Warm color accents (Pastel Yellow)
- Friendly icons and illustrations
- Welcoming imagery
- Conversational UI copy
- Approachable font (Poppins)

**Implementation:**
- Use emoji or friendly icons: 👨‍🏫 📚 ⭐ ✓
- Rounded shapes over sharp edges
- Warm pastel yellow for highlights
- Encouraging micro-copy

---

### 8.4 High Readability

**Characteristics:**
- Minimum 16px body text
- Line height 1.6-1.8 for body text
- Maximum 75 characters per line
- High contrast (WCAG AA minimum)
- Clear font hierarchy

**Implementation:**
```html
<!-- Optimal line length -->
<p class="max-w-2xl mx-auto text-base leading-relaxed">

<!-- High contrast text -->
<p class="text-gray-900"> <!-- Not gray-500 for body text -->

<!-- Clear hierarchy -->
<h2 class="text-4xl font-bold mb-4">
<p class="text-lg leading-relaxed">
```

**Contrast Ratios:**
- Headings on white: 16:1 (Gray-900 on White)
- Body text on white: 16:1 (Gray-900 on White)
- Secondary text: 7:1 (Gray-600 on White)
- Muted text: 4.5:1 minimum (Gray-500 on White)

---

### 8.5 Minimalistic but Warm

**Balance:**
- Minimalistic: Clean layouts, limited elements, white space
- Warm: Friendly colors, welcoming imagery, personal touch

**Implementation:**
```html
<!-- Minimalistic structure -->
<section class="py-20 bg-white">
  <div class="container max-w-7xl mx-auto px-6">
    <!-- Clean, simple content -->
  </div>
</section>

<!-- Warm accents -->
<div class="bg-pastel-yellow-light rounded-lg p-8">
  <!-- Highlighted, warm section -->
</div>
```

---

## 9. Accessibility Guidelines

### WCAG 2.1 AA Compliance

**Color Contrast:**
- Normal text: Minimum 4.5:1 ratio
- Large text (18px+): Minimum 3:1 ratio
- UI components: Minimum 3:1 ratio

**Keyboard Navigation:**
- All interactive elements must be keyboard accessible
- Clear focus indicators: 2px Soft Blue ring
- Logical tab order

**Focus States:**
```html
<button class="focus:outline-none focus:ring-2 focus:ring-soft-blue focus:ring-offset-2">
```

**ARIA Labels:**
```html
<button aria-label="Open navigation menu">
<nav aria-label="Main navigation">
<form aria-label="Contact form">
```

**Alt Text:**
- All images must have descriptive alt text
- Decorative images: `alt=""`

---

## 10. Animation & Transitions

### Standard Transitions

```css
transition-all duration-300 ease-in-out
```

**Hover Effects:**
```html
<!-- Button hover -->
class="hover:bg-soft-blue-dark hover:shadow-lg hover:-translate-y-1 transition-all duration-300"

<!-- Card hover -->
class="hover:shadow-xl hover:border-soft-blue transition-all duration-300"

<!-- Link hover -->
class="hover:text-soft-blue transition-colors duration-200"

<!-- Icon hover -->
class="group-hover:translate-x-1 transition-transform duration-300"
```

**Loading States:**
```html
<!-- Spinner -->
<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-soft-blue"></div>

<!-- Pulse (for skeleton loaders) -->
<div class="animate-pulse bg-gray-200 h-4 rounded"></div>
```

---

## 11. Icons & Imagery

### Icon System

**Heroicons (Recommended):**
- Use Heroicons for consistency
- 24px for standard icons
- 16px for small icons
- 32px for large feature icons

**Icon Colors:**
- Primary icons: Soft Blue (#6BA3D4)
- Success icons: Green (#10B981)
- Warning icons: Yellow (#F59E0B)
- Error icons: Red (#EF4444)
- Neutral icons: Gray-600

### Image Guidelines

**Photos:**
- Professional, friendly, authentic
- Avoid overly stock-looking images
- Show real teaching scenarios when possible
- Warm, natural lighting

**Aspect Ratios:**
- Hero images: 16:9 or 4:3
- Card images: 1:1 (square) or 4:3
- Profile images: 1:1 (circle)

---

## 12. Implementation Checklist

### Pre-Development
- [ ] Install Tailwind CSS in Next.js project
- [ ] Configure custom colors in `tailwind.config.js`
- [ ] Import Google Fonts (Poppins + Inter)
- [ ] Set up base styles and CSS variables
- [ ] Configure responsive breakpoints

### Component Development
- [ ] Build reusable Navbar component
- [ ] Build reusable Footer component
- [ ] Build Button components (primary, secondary)
- [ ] Build Card components (standard, service, testimonial)
- [ ] Build Page Header component
- [ ] Build Form Input components
- [ ] Build Pricing Card component
- [ ] Build Contact Form component

### Page Development
- [ ] Home page with Hero section
- [ ] About Me page
- [ ] Service pages (Cambridge, IELTS, General English)
- [ ] Prices & Packages page
- [ ] Student Reviews page
- [ ] Book a Lesson page
- [ ] Pay via Revolut page
- [ ] Contact page

### Testing
- [ ] Test on mobile (375px, 390px, 428px)
- [ ] Test on tablet (768px, 1024px)
- [ ] Test on desktop (1280px, 1920px)
- [ ] Keyboard navigation testing
- [ ] Screen reader testing
- [ ] Color contrast validation
- [ ] Performance testing (Lighthouse)

---

## 13. Tailwind Configuration File

```js
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'soft-blue': {
          light: '#8BB8DD',
          DEFAULT: '#6BA3D4',
          dark: '#5A92C3',
        },
        'pastel-yellow': {
          light: '#FFF4CC',
          DEFAULT: '#FFE699',
          dark: '#FFD966',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '90rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
```

---

## 14. Next.js Specific Guidelines

### File Structure

```
/app
  /components
    /ui
      Button.jsx
      Card.jsx
      Input.jsx
    /layout
      Navbar.jsx
      Footer.jsx
    /sections
      Hero.jsx
      Testimonials.jsx
      Pricing.jsx
  /pages
    page.jsx (Home)
    about/page.jsx
    cambridge/page.jsx
    ielts/page.jsx
    general-english/page.jsx
    prices/page.jsx
    reviews/page.jsx
    book/page.jsx
    pay-revolut/page.jsx
    contact/page.jsx
  layout.jsx
  globals.css
```

### Performance Optimization

- Use Next.js Image component for all images
- Lazy load images below the fold
- Implement dynamic imports for heavy components
- Use font optimization features
- Enable static generation where possible

---

**END OF DESIGN SYSTEM**

*This design system provides complete specifications for implementing the "English with Daniel" website with Next.js and Tailwind CSS. All components are designed to be clean, modern, friendly, highly readable, and minimalistic but warm, following the brand identity guidelines.*
