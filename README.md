# Zavora Marketplace

A full-stack multi-vendor e-commerce marketplace with a Django REST API backend and a Next.js + React Native frontend monorepo.

## Project Structure

```
Zavora/
├── backend/        # Django REST Framework API
└── frontend/       # Turborepo monorepo
    ├── apps/
    │   ├── web/    # Next.js 15 storefront
    │   └── admin/  # Admin dashboard
    └── packages/
        ├── api/    # Shared API client
        ├── types/  # Shared TypeScript types
        └── config/ # Shared config & constants
```

## Prerequisites

- Python 3.11+
- Node.js 18+
- pnpm 8+
- Redis (for caching & Celery)

## Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your values

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start dev server
python manage.py runserver
```

API runs at `http://localhost:8000`
API docs at `http://localhost:8000/api/docs/`

## Frontend Setup

```bash
cd frontend

# Install dependencies
pnpm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your values

# Start dev servers
pnpm dev
```

Web app runs at `http://localhost:3000`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — new feature
- `fix:` — bug fix
- `chore:` — maintenance / tooling
- `docs:` — documentation only
- `refactor:` — code change that is not a fix or feature
- `style:` — formatting, missing semicolons, etc.

## Environment Variables

See `backend/.env.example` and `frontend/.env.example` for all required variables.
