# Zavora - Multi-Vendor E-Commerce Frontend Monorepo

A production-ready, TypeScript-first frontend monorepo for a multi-vendor e-commerce marketplace similar to Jumia.

## 🏗️ Architecture

```
                    FRONTEND MONOREPO

             ┌────────────┬────────────┐
             │            │            │
             ▼            ▼            ▼
           WEB          MOBILE       ADMIN
         Next.js         Expo        Next.js
             │            │            │
             └────────────┼────────────┘
                          │
                     Shared packages
                          │
                          ▼
                   Django REST API
                       Railway
```

### Three Frontend Applications

- **Web** (`apps/web`): Next.js customer shopping application for browsers
- **Mobile** (`apps/mobile`): React Native/Expo customer mobile application  
- **Admin** (`apps/admin`): Next.js admin dashboard for marketplace management

### Shared Packages

- `@zavora/api` - Centralized HTTP client and API endpoints
- `@zavora/types` - Shared TypeScript domain types
- `@zavora/validation` - Zod validation schemas
- `@zavora/config` - Constants, routes, configuration
- `@zavora/utils` - Shared utilities (formatting, slugs, etc)
- `@zavora/ui` - Design system tokens

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9
- Django backend running (separate repository)

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Edit .env.local with your API URL
# NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Development

```bash
# Start all apps in development mode
pnpm dev

# Or start specific apps:
pnpm --filter @zavora/web dev      # Web app on http://localhost:3000
pnpm --filter @zavora/mobile dev   # Mobile app (Expo)
pnpm --filter @zavora/admin dev    # Admin on http://localhost:3001
```

### Building

```bash
# Build all apps
pnpm build

# Or build specific apps:
pnpm --filter @zavora/web build
pnpm --filter @zavora/mobile build
pnpm --filter @zavora/admin build
```

### Type Checking & Linting

```bash
pnpm type-check   # TypeScript validation
pnpm lint         # ESLint
pnpm format       # Prettier formatting
```

## 📦 Project Structure

```
zavora/
├── apps/
│   ├── web/                    # Next.js customer web app
│   │   ├── app/               # App Router pages
│   │   ├── components/        # Shared components
│   │   ├── features/          # Feature-based organization
│   │   │   ├── auth/
│   │   │   ├── cart/
│   │   │   ├── checkout/
│   │   │   ├── orders/
│   │   │   └── products/
│   │   ├── hooks/             # Global hooks
│   │   ├── store/             # Zustand stores
│   │   └── lib/               # Utilities
│   ├── mobile/                 # Expo React Native app
│   │   ├── app/               # Expo Router
│   │   ├── components/
│   │   ├── features/
│   │   └── store/
│   └── admin/                  # Next.js admin dashboard
├── packages/
│   ├── api/                   # API client
│   ├── types/                 # Shared types
│   ├── validation/            # Zod schemas
│   ├── utils/                 # Utilities
│   ├── config/                # Constants
│   └── ui/                    # Design tokens
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── tsconfig.json
```

## 🛍️ Core Features

### Authentication
- Login / Register
- Forgot Password / Reset Password
- Email/Phone verification (via Django API)
- Token refresh mechanism
- Secure token storage (localStorage on web, SecureStore on mobile)

### Product Catalog
- Product listing with filtering
- Search with suggestions
- Category navigation
- Product details with variants
- Seller/store pages
- Product reviews and ratings
- Wishlist

### Shopping Cart
- Add/remove items
- Update quantities
- Product availability validation
- Cart totals calculation (validated by backend)
- Persist cart between sessions

### Checkout
- Multi-step checkout flow
- Address management
- Delivery method selection
- Coupon/discount application
- Order confirmation
- Payment integration (via Django backend)

### Orders
- Order history
- Order tracking
- Order details
- Order cancellation

### Customer Account
- Profile management
- Address management
- Wishlist
- Notifications
- Order history

## 🔌 API Integration

All API calls go through the centralized client in `@zavora/api`:

```typescript
// Example: Using the API
import { authApi, productsApi, cartApi } from '@zavora/api';

// Login
const { access, refresh } = await authApi.login(credentials);

// Get products
const products = await productsApi.list(filters);

// Add to cart
const cart = await cartApi.addItem({ productId, quantity });
```

### Environment Configuration

**Web app** (`NEXT_PUBLIC_API_URL`):
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Mobile app** (`EXPO_PUBLIC_API_URL`):
```
EXPO_PUBLIC_API_URL=http://localhost:8000
```

## 🎨 Design System

Located in `@zavora/ui`, includes:
- Color palette (Primary: Orange #F97316)
- Spacing scale
- Typography
- Border radius
- Responsive breakpoints

## 📊 State Management

### Server State (TanStack Query)
- Products, categories, sellers
- User profile
- Orders
- Cart (with stale time of 2 minutes)
- Wishlist
- Notifications

### Client State (Zustand)
- Authentication (user, tokens)
- UI state (cart drawer, mobile menu)
- Filters
- Form state

## ✅ TypeScript & Validation

- Strict mode enabled
- No `any` types
- Shared types across all apps
- Runtime validation with Zod

## 🚦 Deployment

### Web App (Vercel, Netlify, etc)
```bash
pnpm --filter @zavora/web build
```

### Mobile App (Expo EAS)
```bash
pnpm --filter @zavora/mobile build
```

### Admin (Vercel, Netlify, etc)
```bash
pnpm --filter @zavora/admin build
```

## 🔒 Security

- Access tokens stored securely (localStorage web, SecureStore mobile)
- Refresh token rotation
- No hardcoded credentials
- API URLs configurable per environment
- Backend enforces authorization (frontend should never assume auth based on UI hiding)
- HTTPS only in production

## 📝 Development Rules

1. **Always use shared packages** - Don't duplicate types, utilities, or API logic
2. **Use feature-based organization** - Group related code by feature (auth, cart, etc)
3. **Environment variables** - Never hardcode URLs or secrets
4. **Backend is source of truth** - All business logic validated by Django
5. **Type safety** - Avoid `any`, use proper typing
6. **Reusable hooks** - Create hooks for common patterns
7. **Component organization** - Keep components focused and composable

## 🐛 Common Issues

### CORS Errors
Ensure Django backend is running and `CORS_ALLOWED_ORIGINS` includes your frontend URL.

### Token Expired
The API client automatically handles token refresh. Ensure refresh tokens are properly stored.

### Products Not Loading
Check:
1. Django backend is running on correct port
2. `NEXT_PUBLIC_API_URL` / `EXPO_PUBLIC_API_URL` is correct
3. Django database has product data

## 📖 Documentation

- **Architecture**: See top of this file
- **API Client**: [packages/api/src/README.md](packages/api/src/README.md)
- **Types**: [packages/types/src/README.md](packages/types/src/README.md)
- **Web App**: [apps/web/README.md](apps/web/README.md)
- **Mobile App**: [apps/mobile/README.md](apps/mobile/README.md)

## 🤝 Contributing

1. Follow the established folder structure
2. Use TypeScript strictly
3. Run `pnpm type-check && pnpm lint` before committing
4. Create feature branches
5. Keep components small and focused

## 📄 License

MIT
