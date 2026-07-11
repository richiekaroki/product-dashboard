# Code Review: Product Dashboard

**Date:** July 9, 2026
**Reviewer:** opencode (AI)

---

## Executive Summary

Well-architected project with a modern stack (Next.js 15, React 19, Tailwind v4, React Query v5). Documentation is exceptional. Primary gaps: no tests, build hygiene issues, and several code quality issues.

---

## Critical Issues

### 1. `.env.local` potentially committed to Git

**File:** `.env.local`

Even though `.gitignore` lists `.env.local`, the file exists in the repo — it was likely committed before the gitignore rule was added. Environment files should never be in version control.

**Fix:**

```bash
git rm --cached .env.local
git commit -m "chore: remove .env.local from tracking"
```

---

### 2. `package-lock.json` is in `.gitignore`

**File:** `.gitignore` (lines 58-60)

Lockfiles must be committed to ensure deterministic builds across environments. Different developers and CI systems may install different dependency versions without it.

**Fix:** Remove `package-lock.json` from `.gitignore` and commit it.

---

### 3. `.next/` build output tracked in Git

The `.next/` directory (cached images, server bundles, build manifests) bloats the repository significantly.

**Fix:**

```bash
git rm -r --cached .next
git commit -m "chore: remove .next build output from tracking"
```

---

## High Priority Issues

### 4. Duplicate API calls across components

**Files:**

- `src/app/page.tsx:24`
- `src/components/ProductGrid.tsx:29`
- `src/components/CategoryFilter.tsx:16`
- `src/components/RelatedProducts.tsx:15`

`useQuery(["products"])` is called in 4 places. While React Query deduplicates via queryKey, the architecture is confusing — `page.tsx` fetches data it barely uses (only for price range calculation).

**Fix:** Remove the query from `page.tsx` and pass the price range as a prop, or compute it from `ProductGrid`'s data. Alternatively, use a single shared query in a context or custom hook.

---

### 5. Hardcoded API URL ignores environment variable

**File:** `src/lib/api.ts:5`

```typescript
const BASE_URL = "https://dummyjson.com/products"; // hardcoded
```

The `.env.local` defines `NEXT_PUBLIC_API_BASE_URL` but it's never used. This defeats the purpose of environment-based configuration.

**Fix:**

```typescript
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://dummyjson.com/products";
```

---

### 6. Dark mode FOUC (Flash of Unstyled Content)

**File:** `src/app/layout.tsx`

`suppressHydrationWarning` masks the hydration mismatch but doesn't prevent the visual flash of light theme before dark mode is applied.

**Fix:** Add an inline `<script>` in the `<head>` that reads localStorage and applies the `dark` class before React hydrates:

```tsx
<head>
  <script
    dangerouslySetInnerHTML={{
      __html: `
        (function() {
          try {
            var theme = localStorage.getItem('darkMode');
            if (theme === 'true' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark');
            }
          } catch(e) {}
        })()
      `,
    }}
  />
</head>
```

---

### 7. `PriceRangeFilter` useEffect re-renders

**File:** `src/components/PriceRangeFilter.tsx:15-20`

The `useEffect` depends on `onChange`. The parent (`page.tsx:72-75`) passes inline arrow functions, creating a new reference every render and triggering unnecessary effect runs.

**Fix:** Wrap the callbacks in `page.tsx` with `useCallback`, or move the timeout logic into the component without depending on `onChange` in the dependency array.

---

## Medium Priority Issues

### 8. Dead code in `api.ts`

**File:** `src/lib/api.ts:74-105`

`searchProducts()` and `getProductsByCategory()` are defined but never used. The app uses client-side filtering instead.

**Fix:** Remove these functions or integrate them for server-side search/filter.

---

### 9. No SEO configuration

**File:** `src/app/layout.tsx`

No `metadata` export, no `<title>`, no meta descriptions, no robots.txt, no sitemap, no favicon.

**Fix:** Add metadata to `layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Product Dashboard",
  description: "Browse and discover products with advanced filtering",
  openGraph: { ... },
};
```

---

### 10. No tests

Zero tests. No test framework (Jest, Vitest, Playwright, Testing Library) is configured.

**Fix:** Add Vitest + React Testing Library for unit/component tests, and optionally Playwright for E2E.

---

### 11. Footer links to non-existent pages

**File:** `src/components/Footer.tsx:37`

`/privacy` route doesn't exist — clicking produces a 404.

**Fix:** Either create the page or remove/update the link.

---

### 12. No input validation on price filter

**File:** `src/components/PriceRangeFilter.tsx`

Users can enter negative numbers, NaN, or very large values. No `min`/`max` attributes or validation.

**Fix:** Add `min={0}` to inputs and validate before applying filter.

---

## Low Priority Issues

### 13. Unthrottled scroll listener

**File:** `src/components/BackToTop.tsx`

Scroll event handler fires on every scroll event without throttling.

**Fix:** Add `requestAnimationFrame` throttling or use `IntersectionObserver`.

---

### 14. `getRelatedProducts` fetches all products

**File:** `src/lib/productUtils.ts`

Fetches entire product catalog just to find 4 related items.

**Fix:** Use the API's category endpoint (`/products/category/{category}`) instead.

---

### 15. No Prettier configured

README recommends Prettier but it's not set up.

**Fix:** Add `.prettierrc` and a format script to `package.json`.

---

### 16. No CI/CD configuration

No GitHub Actions, no Vercel config, no Docker setup.

---

### 17. Social links point to generic homepages

**File:** `src/components/Footer.tsx`

Links go to `https://github.com`, `https://twitter.com` — not actual profiles.

---

## Strengths

| Area | Notes |
|------|-------|
| **Project Structure** | Clean, modular, clear separation of concerns |
| **Documentation** | Exceptionally thorough (692-line architecture doc) |
| **TypeScript** | Strict mode, well-defined interfaces |
| **Error Handling** | Three-layer approach (API, React Query, UI) |
| **Accessibility** | ARIA labels, semantic HTML, keyboard navigation |
| **Responsive Design** | Mobile-first grid, hamburger menu, proper breakpoints |
| **UX Decisions** | Debouncing, skeleton loaders, breadcrumbs |

---

## Recommended Fix Order

| Priority | Issue | Effort |
|----------|-------|--------|
| 1 | Remove `.env.local` from git tracking | 5 min |
| 2 | Remove `.next/` from git tracking | 5 min |
| 3 | Un-gitignore `package-lock.json` | 2 min |
| 4 | Use environment variable in `api.ts` | 2 min |
| 5 | Fix dark mode FOUC | 15 min |
| 6 | Add SEO metadata | 10 min |
| 7 | Deduplicate product queries | 30 min |
| 8 | Fix `PriceRangeFilter` re-renders | 15 min |
| 9 | Remove dead code from `api.ts` | 5 min |
| 10 | Add price filter validation | 5 min |
| 11 | Fix footer links | 5 min |
| 12 | Add tests | 2+ hours |
