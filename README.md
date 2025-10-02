# mr-wam - Product Dashboard

A modern, responsive product catalog built with **Next.js 15**, **TypeScript**, **Tailwind CSS v4**, and **React Query**.  
Built as a technical assessment to demonstrate **clean architecture**, **modern React patterns**, and **thoughtful UX design**.

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd product-dashboard

# Install dependencies
npm install

# Run development server
npm run dev
Open http://localhost:3000 in your browser.

Production Build
bash
Copy code
npm run build
npm start

✨ Features

🔍 Instant Search – Debounced client-side filtering by product title
🗂️ Category Filter – Dropdown filter (works with search using AND logic)
📱 Responsive Layout – Mobile-first, grid adjusts across breakpoints
🌙 Dark Mode – Theme toggle persisted in localStorage
⚡ Optimized Performance – React Query caching + skeleton loaders
♿ Accessible – Semantic HTML, alt text, focus states, ARIA labels
🎨 Modern UI – Tailwind utility-first styling

🛠️ Tech Stack
| Technology       | Purpose                                |
| ---------------- | -------------------------------------- |
| **Next.js 15**   | React framework with App Router        |
| **TypeScript**   | Type safety, maintainability           |
| **Tailwind CSS** | Utility-first styling (v4)             |
| **React Query**  | Data fetching, caching, error handling |
| **Axios**        | HTTP client for API calls              |


📂 Project Structure

bash
Copy code

product-dashboard/
├── src/
│   ├── app/
│   │   ├── page.tsx               # Product listing page
│   │   ├── products/[id]/page.tsx # Product details page
│   │   └── layout.tsx             # Root layout
│   ├── components/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── SearchBar.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── SkeletonCard.tsx
│   │   ├── ErrorMessage.tsx
│   │   └── Layout.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   └── queryClient.ts
│   ├── hooks/
│   │   └── useDarkMode.ts
│   └── types/
│       ├── product.ts
│       └── global.d.ts
├── public/
├── docs/
│   └── README.md, ASSESSMENT.md
└── [config files]           


📖 Documentation

See [docs/README.md ]for:

Architecture decisions

Error handling approach
Search + filter logic
Accessibility
Production considerations

 Assessment Requirements

| Requirement            | Implementation                    |
| ---------------------- | --------------------------------- |
| Next.js 13+ App Router |  Next.js 15                      |
| TypeScript             |  Full coverage                   |
| Tailwind CSS           |  Utility-first styling           |
| React Query            |  Data fetching & caching         |
| Product Listing        |  Responsive grid                 |
| Search by Title        |  Debounced input                 |
| Category Filter        |  Dropdown (AND logic)            |
| Product Details Page   |  Dynamic route `/products/[id]`  |
| Loading States         |  Skeleton placeholders           |
| Error Handling         |  Retry button, friendly messages |
| Responsive Design      |  Mobile-first                    |
| Dark Mode (Optional)   |  Implemented                     |


👤 Author
Richard Karoki
```
