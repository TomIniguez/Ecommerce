# CLAUDE.md

This file provides guidance to Claude (and other AI assistants) when working on this ecommerce web app.

---

## Project Overview

This is an ecommerce web application built with **React + Vite**. It handles product listings, shopping cart, checkout, and order management.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite |
| Styling | (e.g. Tailwind CSS / CSS Modules — update as needed) |
| State Management | (e.g. Zustand / Redux / Context — update as needed) |
| Routing | React Router v6 |
| HTTP Client | (e.g. Axios / Fetch — update as needed) |
| Testing | (e.g. Vitest + React Testing Library — update as needed) |

---

## Project Structure

```
/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images, fonts, icons
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # Generic UI primitives (Button, Modal, Input…)
│   │   └── features/        # Feature-specific components (Cart, ProductCard…)
│   ├── pages/               # Route-level page components
│   ├── hooks/               # Custom React hooks
│   ├── store/               # Global state (Zustand / Redux slices)
│   ├── services/            # API calls and data fetching logic
│   ├── utils/               # Pure utility functions
│   ├── types/               # TypeScript types / JSDoc type definitions
│   ├── styles/              # Global styles and theme tokens
│   ├── App.jsx              # Root component and router setup
│   └── main.jsx             # Vite entry point
├── .env.example             # Template for required env vars (never commit .env)
├── vite.config.js
├── package.json
└── CLAUDE.md                # This file
```

---

## Coding Conventions

### General
- Use **functional components** and hooks exclusively — no class components.
- Prefer **named exports** for components; use default export only for pages.
- Keep components **small and focused** — if a component exceeds ~150 lines, consider splitting it.
- Co-locate tests next to the files they test (`Component.test.jsx` beside `Component.jsx`).

### Naming
- Components: `PascalCase` (`ProductCard.jsx`)
- Hooks: `camelCase` prefixed with `use` (`useCart.js`)
- Utilities: `camelCase` (`formatCurrency.js`)
- Constants: `UPPER_SNAKE_CASE`
- CSS classes (if using Tailwind): utility-first; extract repeated patterns into components, not custom classes.

### State Management
- **Local UI state** → `useState` / `useReducer`
- **Shared feature state** (cart, auth, filters) → global store
- **Server state** (products, orders) → dedicated fetching layer (React Query or similar)
- Avoid prop drilling beyond 2 levels — lift state or use context/store.

### API & Services
- All API calls live in `src/services/` — never call `fetch`/`axios` directly inside components.
- Handle loading, error, and success states explicitly.
- Never expose API keys in client code; use `import.meta.env.VITE_*` for public env vars.

### Ecommerce-Specific Rules
- **Cart logic** must be centralized in the store — never duplicated across components.
- **Price formatting** always goes through `formatCurrency()` utility to ensure consistency.
- **Product IDs** are the source of truth — never use product names as identifiers.
- Checkout flows must validate stock availability before submitting an order.
- Sensitive data (payment info, full addresses) must never be stored in local/session storage.

---

## AI Assistant Behavior

When working in this codebase, Claude should:

### Do
- Follow the project structure above — place new files in the correct directories.
- Reuse existing components from `src/components/ui/` before creating new ones.
- Write tests for any new utility functions or hooks.
- Keep business logic out of components — move it to hooks or services.
- Ask for clarification before changing shared state shape or API contracts.
- Prefer readability over cleverness.

### Don't
- Don't install new dependencies without noting the reason and asking for approval.
- Don't hardcode prices, product IDs, or API URLs — use constants or env vars.
- Don't modify `.env` files or commit secrets.
- Don't bypass the cart/store when mutating cart state.
- Don't use `any` types (if TypeScript is adopted later).
- Don't generate placeholder/lorem ipsum content in production code.

### When Adding Features
1. Check if a relevant component or hook already exists before creating a new one.
2. Follow the existing patterns in that feature area.
3. Update this `CLAUDE.md` if the feature introduces a new architectural pattern.

---

## Deployment & Infrastructure

### Environment Variables
- `.env.example` lists all required variables — keep it up to date.
- Never commit `.env` — it is gitignored.
- Production secrets are managed via the hosting platform's environment settings.

### Build
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

### Deployment
- **Platform:** (e.g. Vercel / Netlify / AWS — update as needed)
- Merges to `main` trigger automatic production deployments.
- PR previews are available per branch.
- Run `npm run build` locally before opening a PR to catch build errors early.

### Performance Targets
- Lazy-load route-level components with `React.lazy` + `Suspense`.
- Images must use correct dimensions and formats (WebP preferred).
- Bundle size: flag any new dependency that adds more than ~50 KB gzipped.

---

## Common Commands

```bash
npm run dev          # Start local dev server
npm run build        # Production build
npm run preview      # Preview prod build
npm run test         # Run test suite
npm run lint         # Lint with ESLint
npm run format       # Format with Prettier
```

---

## Notes for Future Claude Sessions

- This file is the authoritative source of truth for conventions — follow it over general best practices when they conflict.
- If you're unsure about a pattern not covered here, ask before inventing a new one.
- Keep this file updated as the project evolves.
