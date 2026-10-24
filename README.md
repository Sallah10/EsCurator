# EsCurator

![EsCurator](https://github.com/user-attachments/assets/98a71edf-8e98-4be9-ba58-452ad1f48fed)

A small, opinionated art gallery with a recommendation engine you can read.
Browse 55 works, save what stays with you, and watch the "For you" shelf
re-rank itself - no account, no onboarding, no black box.

This is the React frontend. The Django REST API lives in the sibling
`art_recommendation_system` directory.

## What makes it different

- **Recommendations explain themselves.** Every pick carries a reason such as
  _"Because you liked Bungo Province"_, not an opaque score.
- **Anonymous by design.** A random session id in `localStorage` ties likes,
  saves and views together. Clear site data and you are a new visitor.
- **Hybrid, not hand-wavy.** Content similarity (55%), collaborative
  co-occurrence (25%) and popularity (20%) are combined in plain Python.
- **A real catalogue.** 55 seeded works, 5 curated shelves, 14 styles, and
  demo interaction data so the recommender has signal on first run.
- **Fast and quiet.** React Query caching, skeleton states, optimistic
  like/save feedback, and a 98 KB gzipped production bundle.

## Pages

| Route | What it does |
| --- | --- |
| `/` | Editorial landing page, personalised picks, featured works, shelves |
| `/gallery` | Search, filter by style, sort, infinite "load more" |
| `/collections` | Five curated shelves |
| `/collections/:slug` | Shelf detail with its works |
| `/artwork/:id` | Full record, like/save/share, similar works |
| `/saved` | Liked and saved works, kept in this browser |
| `/about` | The story, the recommender weights, honest limitations |

## Quick start

### 1. Run the API

```bash
cd ../art_recommendation_system
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
# Windows: copy .env.example .env
# macOS/Linux: cp .env.example .env
python manage.py migrate
python manage.py seed_gallery --demo-interactions
python manage.py runserver
```

The API is now at `http://127.0.0.1:8000`.

### 2. Run the frontend

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. Vite proxies `/api`, `/media`, `/admin` and
`/static` to the Django server, so there is no CORS setup in development.

### Production build

```bash
npm run build
npm run preview
```

## Configuration

| Variable | Default | Purpose |
| --- | --- | --- |
| `VITE_API_URL` | `/api` | API base URL when the frontend and API are on different hosts |
| `VITE_PROXY_TARGET` | `http://127.0.0.1:8000` | Dev/preview proxy target |
| `VITE_API_TIMEOUT` | `12000` | Axios timeout in milliseconds |

Copy `.env.example` to `.env.local` for local overrides.

## API surface

| Method | Endpoint | Notes |
| --- | --- | --- |
| `GET` | `/api/art_works/` | Paginated; `search`, `style`, `era`, `artist`, `featured`, `collection`, `ordering` |
| `GET` | `/api/art_works/:id/` | Single work with counts and session flags |
| `GET` | `/api/art_works/:id/similar/` | Content-similar works with reasons |
| `GET` | `/api/collections/` | Shelves with cover, tags and counts |
| `GET` | `/api/collections/:slug/` | One shelf |
| `GET` | `/api/facets/` | Style/era counts for filters |
| `GET` | `/api/stats/` | Catalogue totals |
| `GET`/`POST` | `/api/interactions/` | Read a session's signals; toggle `like`, `bookmark` or record `view` |
| `POST` | `/api/recommendations/` | Personalised picks with a `reason` per pick |
| `GET` | `/api/taste/` | Top styles, eras and tags for the session |
| `GET` | `/api/health/` | Liveness probe |

Anonymous requests send `X-Session-Id: <8-64 url-safe chars>`. The backend
validates the header; invalid values are rejected with `400`.

## How the recommender works

```
score = 0.55 * content_similarity
      + 0.25 * collaborative_signal
      + 0.20 * popularity
```

- **Content** - Jaccard overlap of style, era, medium, artist and tags with
  works the session liked or saved.
- **Collaborative** - how often other sessions that share a work with you also
  engaged with a candidate.
- **Popularity** - a damped like/save/view score, used as a tie-breaker.
- **Cold start** - featured works plus popularity, with an honest
  "Start with a curator's pick" reason.

Weights live in Django settings (`RECOMMENDATION_WEIGHTS`) and can be tuned
with environment variables.

## Project structure

```
src/
|-- api/            # axios client + React Query hooks
|-- components/     # Nav, Footer, cards, grid, filters, scroll restore
|-- context/        # accessible toast notifications
|-- lib/            # anonymous session id
|-- pages/          # Home, Gallery, Collections, ArtworkDetail, Saved, About, 404
|-- App.jsx         # routes
|-- index.css       # design tokens and shared styles
`-- main.jsx        # providers + entry point
```

## Quality

```bash
npm run lint       # 0 errors, 0 warnings
npm run build      # production build
npm audit          # 0 vulnerabilities
```

The Django side has 19 tests covering the catalogue, interactions,
recommendations and auth (`python manage.py test`).

## Deployment

- **Frontend** - `vercel.json` rewrites all routes to `index.html` for SPA
  routing. Set `VITE_API_URL` to the deployed API, e.g.
  `https://api.example.com/api`, and allow that origin in the API's
  `CORS_ALLOWED_ORIGINS`.
- **Media** - Django serves `/media` in development. In production, point
  `MEDIA_URL` at object storage or a reverse proxy; do not rely on Django for
  media in production.
- **API** - `Procfile` and `build.sh` are ready for Render/Railway-style
  hosts. Set `DJANGO_SECRET_KEY`, `DJANGO_DEBUG=0`, `DJANGO_ALLOWED_HOSTS`,
  `CORS_ALLOWED_ORIGINS` and `DATABASE_URL`.

## Honest notes

- Artist attribution was missing from the source archive, so records say
  **Unattributed** rather than inventing names.
- Style and era labels are demo metadata, editable in the Django admin.
- The API supports accounts (`/api/auth/`), but the interface deliberately
  works without one.
- Images are public-domain scans kept in `static/img` and copied to
  `media/artworks` by the seed command.

## Author

[Bello Muhammed](https://github.com/Sallah10)
