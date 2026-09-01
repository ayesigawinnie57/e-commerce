# Zavora — E-Commerce Frontend Monorepo

Multi-vendor marketplace frontend. Web, mobile, and admin apps sharing a single Django REST API.

## Stack

| Layer | Technology |
|---|---|
| Web | Next.js 15, Tailwind CSS |
| Mobile | Expo, React Native, NativeWind |
| Admin | Next.js 15, Tailwind CSS |
| State | TanStack Query + Zustand |
| Validation | Zod |
| Monorepo | pnpm workspaces + Turborepo |

## Structure

```
apps/
  web/      → Customer web app
  mobile/   → Customer mobile app
  admin/    → Admin dashboard
packages/
  api/      → Django API client
  types/    → Shared TypeScript types
  validation/ → Shared Zod schemas
  utils/    → Shared utilities
  config/   → Shared configuration
  ui/       → Shared design primitives
```

## Getting Started

```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

## API

All apps communicate with the Django REST API via `NEXT_PUBLIC_API_URL` / `EXPO_PUBLIC_API_URL`.
