# Design System

This document covers the visual design system for the **WAM Dashboard** — a product inventory interface built with Next.js and Tailwind CSS.

---

## Design Philosophy

The design follows a **Minimalism & Swiss Style** approach: clean, spacious, functional, with high contrast and geometric precision. Every visual choice is deliberate — no decoration without purpose.

**Core principles:**
- Content-first: products are the hero
- Functional color: emerald green for accents and positive states
- Typographic hierarchy through weight and size, not color alone
- Consistent spacing using an 8px rhythm

---

## Typography

### Font Family

| Role | Font | Source |
|------|------|--------|
| **Headings & Body** | Geist Sans | `geist/font/sans` (npm: `geist`) |
| **Code & Data** | Geist Mono | `geist/font/mono` (npm: `geist`) |

Geist is a variable font family designed for modern web interfaces — clean, neutral, with excellent readability at all sizes.

### Type Scale

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `text-2xl` | 24px | 700 | Page titles |
| `text-xl` | 20px | 600 | Section headings |
| `text-lg` | 18px | 600 | Card prices, emphasis |
| `text-base` | 16px | 400–500 | Body text, labels |
| `text-sm` | 14px | 400–500 | Secondary text, descriptions |
| `text-xs` | 12px | 500–600 | Badges, captions, metadata |

### Typographic Rules

- Headlines use `tracking-tight` for a modern, compact feel
- Prices and data use `tabular-nums` for aligned digits
- Line height: 1.5 for body, 1.25 for headings
- No all-caps except for footer section labels (uppercase + wide tracking)

---

## Color System

### Light Mode

| Token | Hex | Usage |
|-------|-----|-------|
| `primary-900` | `#0F172A` | Headings, primary text |
| `primary-600` | `#475569` | Secondary text |
| `primary-400` | `#94A3B8` | Muted text, placeholders |
| `primary-200` | `#E2E8F0` | Borders, dividers |
| `primary-100` | `#F1F5F9` | Subtle backgrounds |
| `accent-600` | `#059669` | Primary accent (buttons, links, active states) |
| `accent-500` | `#10B981` | Hover states, discount badges |
| `accent-50` | `#ECFDF5` | Accent background tint |
| `white` | `#FFFFFF` | Card surfaces, input backgrounds |

### Dark Mode

| Token | Hex | Usage |
|-------|-----|-------|
| `#0B0F14` | — | App background |
| `#111827` | — | Card surfaces |
| `#1F2937` | — | Elevated surfaces, borders |
| `#F1F5F9` | — | Primary text |
| `#94A3B8` | — | Secondary text |
| `#64748B` | — | Muted text |
| `accent-400` | `#34D399` | Primary accent (lighter for dark bg) |
| `accent-950` | `#022C22` | Accent background tint |

### Semantic Colors

| State | Light | Dark |
|-------|-------|------|
| **In Stock** | `emerald-50/700` | `emerald-950/400` |
| **Low Stock** (< 50) | `amber-50/700` | `amber-950/400` |
| **Critical Stock** (< 10) | `orange-50/700` | `orange-950/400` |
| **Out of Stock** | `red-50/700` | `red-950/400` |
| **Error** | `red-50/700` | `red-950/400` |
| **Discount Badge** | `emerald-500` (white text) | `emerald-500` (white text) |
| **Star Rating** | `amber-400` (fill) | `amber-400` (fill) |

---

## Spacing & Layout

### Spacing Scale

Based on Tailwind's default 4px increment:

| Token | Value | Usage |
|-------|-------|-------|
| `gap-1` | 4px | Tight inner spacing |
| `gap-2` | 8px | Badge gaps, icon-to-text |
| `gap-3` | 12px | Related items in cards |
| `gap-4` | 16px | Filter row spacing |
| `gap-5` | 20px | Card grid gaps |
| `p-5` | 20px | Card padding |
| `p-6` | 24px | Detail page sections |
| `p-8` | 32px | Page-level padding (large screens) |

### Container

- Max width: `max-w-7xl` (1280px) with auto margins
- Page padding: `p-4 sm:p-6 lg:p-8`

### Grid

- Product grid: `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`
- Card gap: `gap-5`
- Detail page: `grid-cols-1 lg:grid-cols-2`

---

## Components

### Cards (`.card`)

```
background: var(--color-surface)
border: 1px solid var(--color-border)
border-radius: 12px (rounded-xl)
padding: 20px (p-5)
shadow: shadow-card (subtle)
hover: shadow-card-hover + -translate-y-0.5
transition: all 200ms
```

Cards have a subtle shadow at rest and lift slightly on hover with a deeper shadow. No heavy borders — the shadow provides depth.

### Buttons (`.btn`)

- Base: white/surface background, subtle border, rounded-lg
- Hover: slight background shift + shadow-sm
- Active: `scale(0.98)` for press feedback
- Primary variant: emerald background, white text
- Focus: 2px ring with offset for keyboard accessibility

### Badges (`.badge`)

- Small, rounded-md pills
- Surface-raised background with subtle border
- Used for: categories, brands, stock counts

### Inputs (`.input`)

- Clean white background with subtle border
- Focus: emerald ring + border color shift
- Rounded-lg matching card radius
- Search includes inline icon (magnifying glass)

### Stock Indicator

- Inline pill with colored dot + text
- 4 states: In Stock (green), Low (amber), Critical (orange), Out (red)
- Uses semantic color tokens for light/dark mode

### Star Rating

- SVG star icon (Lucide `Star`) with amber fill
- Tabular-nums for aligned decimal values

### Discount Badge

- Absolute-positioned overlay on product images
- Emerald background, white text
- Format: `-XX%`

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-card` | `0 1px 3px rgb(0,0,0/0.04)` | Card rest state |
| `shadow-card-hover` | `0 4px 6px rgb(0,0,0/0.07)` | Card hover state |
| `shadow-card-lg` | `0 10px 15px rgb(0,0,0/0.08)` | Elevated elements |
| `shadow-sm` | `0 1px 2px rgb(0,0,0/0.05)` | Buttons, inputs |

Dark mode shadows use higher opacity (0.3–0.5) to remain visible on dark backgrounds.

---

## Animations

| Animation | Duration | Usage |
|-----------|----------|-------|
| `transition-colors` | 200ms | Dark mode toggle, nav links |
| `transition-all` | 150–200ms | Buttons, inputs, cards |
| `hover:-translate-y-0.5` | 200ms | Card lift on hover |
| `hover:scale-105` | 300ms | Image zoom on card hover |
| `animate-pulse` | — | Skeleton loading states |
| `animate-slide-down` | 200ms | Mobile menu open |

### Reduced Motion

`prefers-reduced-motion: reduce` is respected — all animations and transitions are disabled when the user has requested reduced motion.

---

## Dark Mode

### Implementation

- Class-based strategy (`darkMode: "class"` in Tailwind config)
- Theme persisted in `localStorage` under key `theme`
- Inline `<script>` in layout prevents FOUC (Flash of Unstyled Content)
- System preference detected as fallback

### Dark Mode Tokens

CSS custom properties in `globals.css` switch between light and dark values:

```css
:root {
  --color-surface: #FFFFFF;
  --color-border: #E2E8F0;
  /* ... */
}

.dark {
  --color-surface: #111827;
  --color-border: #1F2937;
  /* ... */
}
```

All components use these tokens, ensuring consistent theming without per-component dark mode overrides.

---

## Accessibility

### Focus Management

- All interactive elements have visible focus rings (`focus-visible:ring-2`)
- Focus ring color matches accent (emerald)
- 2px ring with offset for visibility

### Contrast Ratios

- Primary text on white: ~15:1 (AAA)
- Secondary text on white: ~7:1 (AAA)
- Accent on white: ~4.6:1 (AA)
- White on accent: ~4.6:1 (AA)

### Keyboard Navigation

- Logical tab order matching visual layout
- Skip link not implemented (noted for future)
- All buttons and links are keyboard accessible

### Screen Reader Support

- Semantic HTML: `<nav>`, `<main>`, `<header>`, `<footer>`
- ARIA labels on icon-only buttons
- Alt text on all product images
- `aria-live="polite"` on error messages

---

## Responsive Breakpoints

| Breakpoint | Width | Behavior |
|------------|-------|----------|
| Default | < 640px | Single column, stacked filters |
| `sm` | ≥ 640px | 2-column grid, inline badges |
| `md` | ≥ 768px | 3-column grid, desktop nav visible |
| `lg` | ≥ 1024px | 4-column grid, filter row horizontal |
| `xl` | ≥ 1280px | Max container width reached |

---

## File Mapping

| Design Token | CSS File | Tailwind Config |
|-------------|----------|-----------------|
| Colors | `globals.css` (CSS vars) | `tailwind.config.ts` |
| Typography | `layout.tsx` (font imports) | `tailwind.config.ts` (fontFamily) |
| Shadows | `globals.css` | `tailwind.config.ts` (boxShadow) |
| Radius | `globals.css` | `tailwind.config.ts` (borderRadius) |
| Animations | `globals.css` (reduced motion) | `tailwind.config.ts` (keyframes) |
| Component styles | `globals.css` (.card, .btn, .badge, .input) | — |

---

## Anti-Patterns Avoided

- **No emoji as icons** — Lucide SVG icons throughout
- **No generic gray monotone** — Emerald accent provides visual identity
- **No pure black backgrounds** — Off-black (#0B0F14) for dark mode
- **No unsystematic spacing** — 4px/8px rhythm enforced
- **No missing hover states** — All interactive elements respond to hover/active
- **No color-only information** — Stock indicators use dot + text, not color alone
- **No layout shift** — Skeleton loaders match final card layout
