```markdown
# Architecture & Design Decisions

This document explains technical choices and UX reasoning for the **mr-wam Product Dashboard**.

---

## Folder & Component Structure

- **Separation of concerns**: `app/` for routes, `components/` for reusable UI, `lib/` for API + query client, `hooks/` for custom logic, `types/` for strict TypeScript interfaces.
- **Scalability**: Clear modular structure allows easy extension (e.g., adding cart, wishlist).

---

## Search & Filter Logic

- **Client-side filtering** (per requirements):
  - All products fetched once via `GET /products`
  - Filtered in-memory using `Array.filter`
- **AND logic** between search + category:
  - Searching "phone" + category "smartphones" → shows smartphones with "phone" in title.
- **Debounced input** (300ms) prevents unnecessary re-renders.

---

## Data Fetching & Caching

- Implemented with **React Query**:
  - Automatic caching
  - Retry on failure
  - Stale-while-revalidate
- API client (`lib/api.ts`) wraps `axios` for consistency.

---

## UI/UX Design & Responsiveness

- **Grid Layout**: 1 col mobile → 2 col tablet → 4 col desktop
- **Tailwind CSS v4**: Utility classes only, minimal custom CSS
- **Mobile-first** approach: Search + filter stacked vertically on small screens, inline on desktop
- **Dark Mode**:
  - Toggle with `localStorage` persistence
  - Respects system preference (`prefers-color-scheme`)

---

## Accessibility

- Semantic HTML tags (`<main>`, `<section>`, `<button>`)
- Alt text for all product images
- Keyboard navigation enabled
- ARIA labels on interactive elements

---

## Error Handling & User Feedback

- **Network errors** → “Unable to connect” + retry button
- **404 not found** → “Product not found” with back link
- **Rate limiting (429)** → React Query handles auto-retry

---

## Type Safety

- All API responses strictly typed in `types/product.ts`
- No `any` types used
- Future-ready for Zod schema validation

---

## Production Considerations

(Not implemented for the assessment but worth noting)

- Pagination / infinite scroll for large datasets
- Image optimization with Next.js `<Image />`
- SEO-friendly SSR for product pages
- Unit + E2E testing
- State persistence (query params for filters)

---

## Evaluation Criteria

| Focus Area                   | Approach                             |
| ---------------------------- | ------------------------------------ |
| Folder & Component Structure | Modular, scalable, clean separation  |
| UI/UX & Responsiveness       | Mobile-first, accessible, dark mode  |
| Code Readability             | TypeScript, reusable components      |
| Scalability                  | Clear architecture, modularity       |
| Error Handling               | React Query retries, custom messages |
| UX/Data Handling             | AND search + filter, debounced input |

---

**Summary:**  
This project balances **clean architecture** with **intuitive UX**. The emphasis is on readability, reusability, and progressive enhancement while following the exact assessment requirements.
```
