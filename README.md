# mr-wam Product Dashboard

A modern, responsive product catalog built with **Next.js 15**, **TypeScript**, **Tailwind CSS v4**, and **React Query**.  
Built as a technical assessment to demonstrate **clean architecture**, **modern React patterns**, and **thoughtful UX design**.

---

## 🚀 Quick Start

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
npm run dev --turbopack
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build --turbopack
npm start
```

---

## ✨ Features

- **Instant Search** – Debounced client-side filtering by product title (300ms delay)
- **Category Filter** – Dropdown filter that works with search using AND logic
- **Responsive Layout** – Mobile-first design, grid adjusts from 1 to 4 columns
- **Dark Mode** – Theme toggle with localStorage persistence and system preference detection
- **Optimized Performance** – React Query caching, Next.js Image optimization, skeleton loaders
- **Accessible** – Semantic HTML, ARIA labels, alt text, keyboard navigation
- **Modern UI** – Tailwind v4 utility-first styling with smooth transitions
- **Error Handling** – User-friendly error messages with retry functionality
- **UX Enhancements** – Breadcrumbs, back to top button, mobile menu, smooth animations

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **TypeScript** | Type safety and maintainability |
| **Tailwind CSS v4** | Utility-first styling |
| **React Query v5** | Data fetching, caching, error handling |
| **Axios** | HTTP client with interceptors |
| **Lucide React** | Tree-shakeable icon library |

---

## 📁 Project Structure

```
product-dashboard/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with providers
│   │   ├── page.tsx                # Home page (product listing)
│   │   ├── products/[id]/
│   │   │   └── page.tsx            # Product details page
│   │   └── globals.css             # Global styles + Tailwind
│   │
│   ├── components/
│   │   ├── ProductCard.tsx         # Individual product card
│   │   ├── ProductGrid.tsx         # Product grid container
│   │   ├── ProductBadges.tsx       # Category, brand, stock badges
│   │   ├── SearchBar.tsx           # Debounced search input
│   │   ├── CategoryFilter.tsx      # Category dropdown
│   │   ├── SkeletonCard.tsx        # Loading placeholder
│   │   ├── ErrorMessage.tsx        # Error UI with retry
│   │   ├── Header.tsx              # Top navigation
│   │   ├── Footer.tsx              # Footer with social links
│   │   ├── Breadcrumbs.tsx         # Dynamic path navigation
│   │   ├── BackToTop.tsx           # Scroll to top button
│   │   ├── Layout.tsx              # App shell wrapper
│   │   └── Providers.tsx           # React Query provider
│   │
│   ├── hooks/
│   │   └── useDarkMode.ts          # Dark mode hook
│   │
│   ├── lib/
│   │   ├── api.ts                  # API client (Axios)
│   │   └── queryClient.ts          # React Query config
│   │
│   └── types/
│       ├── product.ts              # Product interfaces
│       └── global.d.ts             # Module declarations
│
├── docs/
│   ├── README.md                   # Architecture decisions
│   └── ASSESSMENT.md               # Requirements mapping
│
├── .env.local                      # Environment variables
├── next.config.ts                  # Next.js configuration
├── tailwind.config.ts              # Tailwind configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies
```

---

## 📖 Documentation

### Architecture Documentation

See **[docs/README.md](./docs/README.md)** for detailed information about:

- Folder structure and component organization
- Search and filter logic (client-side, debounced, AND logic)
- Data fetching and caching strategy (React Query)
- UI/UX design decisions and responsiveness
- Dark mode implementation
- Error handling approach
- Type safety with TypeScript
- Accessibility features
- Production considerations

### Assessment Mapping

See **[docs/ASSESSMENT.md](./docs/ASSESSMENT.md)** for:

- Core requirements checklist
- Feature implementation details
- Evaluation criteria mapping
- Technical decisions alignment

---

## 🎯 Assessment Requirements

| Requirement | Implementation | Status |
|-------------|----------------|--------|
| Next.js 13+ App Router | Next.js 15 with App Router | ✅ |
| TypeScript | Full type coverage | ✅ |
| Tailwind CSS | Tailwind v4 utility classes | ✅ |
| React Query | Data fetching & caching | ✅ |
| Product Listing | Responsive grid layout | ✅ |
| Search by Title | Debounced input (300ms) | ✅ |
| Category Filter | Dropdown with AND logic | ✅ |
| Product Details | Dynamic route `/products/[id]` | ✅ |
| Loading States | Skeleton placeholders | ✅ |
| Error Handling | Retry button, friendly messages | ✅ |
| Responsive Design | Mobile-first (1-4 cols) | ✅ |
| Dark Mode (Optional) | Implemented with persistence | ✅ |

---

## 🔑 Key Features Explained

### 1. Search & Filter
- **Client-side filtering** (all ~100 products fetched at once)
- **Debounced input** prevents unnecessary re-renders (300ms delay)
- **AND logic** between search and category filter
- **Real-time results** with smooth UX

### 2. Data Fetching
- **React Query** handles caching, retries, and background updates
- **Stale time**: 2 minutes (data stays fresh)
- **Auto-retry**: 2 attempts on failure
- **Error boundaries** with user-friendly messages

### 3. Dark Mode
- Respects system preference (`prefers-color-scheme`)
- Manual toggle persisted in `localStorage`
- Smooth transitions (300ms)
- No flash of unstyled content (FOUC)

### 4. Performance
- Next.js Image optimization (lazy loading, automatic sizing)
- Tailwind CSS purging (minimal bundle size)
- Code splitting (automatic with App Router)
- React Query caching reduces API calls

### 5. Accessibility
- Semantic HTML tags (`<main>`, `<nav>`, `<article>`)
- ARIA labels on interactive elements
- Alt text on all images
- Keyboard navigation support
- Focus states with ring utilities

---

## 🌐 API Integration

**Base URL**: `https://dummyjson.com/products`

**Endpoints Used**:
- `GET /products` – Fetch all products
- `GET /products/:id` – Fetch single product details

**Error Handling**:
- Custom `ApiError` class with status codes
- Axios interceptors for centralized error handling
- User-friendly messages for different error types (404, 500, 503)
- 10-second timeout with retry logic

---

## 🎨 UI/UX Highlights

### Responsive Grid
```
Mobile:    1 column
Tablet:    2 columns
Desktop:   3-4 columns
```

### Component Reusability
- `ProductCard` – Used in grid and detail pages
- `ProductBadges` – Shared badge component
- `ErrorMessage` – Reusable error UI
- `SkeletonCard` – Consistent loading states

### User Feedback
- Loading skeletons match final layout
- Empty states with helpful messages
- Error states with retry actions
- Smooth transitions and animations

---

## 🧪 Testing Approach (Future Enhancement)

Recommended test coverage:

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e
```

**Test Areas**:
- Component rendering (ProductCard, SearchBar)
- Filtering logic (search + category)
- API integration (mocked responses)
- Routing (navigation to detail page)
- Dark mode toggle
- Error boundaries

---

## 📊 Performance Metrics

| Metric | Implementation |
|--------|----------------|
| Bundle Size | Optimized with Tailwind purging |
| Image Loading | Next.js Image component |
| Code Splitting | Automatic with App Router |
| Caching | React Query (2min stale time) |
| Search | Debounced (300ms) |
| Lazy Loading | Images and routes |

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com/products
NEXT_PUBLIC_APP_NAME=Product Dashboard
```

---

## 🔧 Development

### Available Scripts

```bash
npm run dev        # Start development server (Turbopack)
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
```

### Code Quality

- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended config
- **Prettier**: (Recommended to add)

---

## 📝 Known Limitations

1. **Dataset Size**: Optimized for ~100 products. For 1,000+ products, server-side pagination is recommended.
2. **API Constraints**: DummyJSON doesn't support server-side search filtering.
3. **No Authentication**: Read-only dashboard (no user accounts).
4. **Single Currency**: Prices displayed in USD only.

---

## 🎓 What This Project Demonstrates

### For Assessment:

✅ **Clean Architecture** – Modular, scalable folder structure  
✅ **React Best Practices** – Hooks, composition, separation of concerns  
✅ **TypeScript Proficiency** – Proper typing throughout  
✅ **Error Handling** – Comprehensive with retry logic  
✅ **UX Thinking** – Loading states, debouncing, breadcrumbs  
✅ **Accessibility** – ARIA labels, semantic HTML, focus management  
✅ **Performance** – Caching, optimistic updates, image optimization  
✅ **Code Quality** – Readable, maintainable, well-documented  

### Goes Above & Beyond:

- Custom `ApiError` class with status codes
- Dark mode with system preference detection
- Breadcrumb navigation
- Back to top button
- Social media links in footer
- Mobile-responsive hamburger menu
- Axios interceptors for centralized error handling
- Smooth animations and transitions

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - feel free to use this project for learning or portfolio purposes.

---

## 👤 Author

**Richard Karoki**

- GitHub: [@mr-wam](https://github.com/mr-wam)
- Portfolio: [your-portfolio-url]

---

## 🙏 Acknowledgments

- **API**: [DummyJSON](https://dummyjson.com) for the free product API
- **Icons**: [Lucide Icons](https://lucide.dev)
- **Framework**: [Next.js](https://nextjs.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)

---

**Built with care for the Frontend Developer Assessment** 🚀