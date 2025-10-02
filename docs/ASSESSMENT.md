# Assessment Mapping: Product Dashboard

This document maps each **assessment requirement** to its **implementation** in the project.

---

## Core Requirements

| Requirement                | Implementation |
|----------------------------|----------------|
| Next.js 13+ App Router     | Built with **Next.js 15** App Router |
| TypeScript                 | Full type coverage in `/types` and component props |
| Tailwind CSS               | Styling with **Tailwind v4** utility classes |
| React Query                | Data fetching, caching, retries via TanStack Query |

---

## Features

| Feature                    | Implementation |
|----------------------------|----------------|
| Product Listing Page       | `/app/page.tsx` with `ProductGrid` + `ProductCard` |
| Search by Title            | `SearchBar.tsx` with **debounced** client-side filtering |
| Filter by Category         | `CategoryFilter.tsx` with dropdown, AND logic with search |
| Product Details Page       | `/app/products/[id]/page.tsx` with dynamic route |
| Loading States             | `SkeletonCard.tsx` displayed during fetch |
| Error States               | `ErrorMessage.tsx` with retry button |
| Responsive Layout          | Grid adjusts: 1 col mobile → 4 cols desktop |
| Dark Mode (Optional)       | `useDarkMode.ts` hook + Tailwind `dark:` classes |

---

## Evaluation Focus Areas

| Focus Area                 | Evidence in Project |
|-----------------------------|----------------------|
| Folder & Component Structure | Modular separation: `components/`, `lib/`, `hooks/`, `types/` |
| UI/UX & Responsiveness     | Mobile-first grid, accessible UI, dark mode |
| Code Readability           | TypeScript, strict mode, reusable components |
| Scalability                | Clear architecture, extendable structure |
| Error Handling             | React Query retries + custom error messages |
| Critical Thinking (UX/Data)| Debounced input, AND search + filter, client-side filtering |

---

## 🚀 Notes

- **Client-side filtering** used as per assessment instructions.  
- **Pagination** omitted (all ~100 products fetched at once) → acceptable for dataset size.  
- **Dark mode** added as bonus feature.  
- **Production-ready considerations** (pagination, SSR, testing) documented in `docs/README.md`.  

---
