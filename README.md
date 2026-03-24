# CosmosExplorer

A full-stack web application that aggregates NASA's open APIs into a single interface. Built as a technical assessment for Bounce Insights.

Live: https://cosmosexplorer-zeta.vercel.app
API: https://cosmosexplorer-backend.onrender.com

---

## What it does

CosmosExplorer pulls data from five NASA APIs and presents it across four main sections:

- APOD: NASA's daily astronomy image or video. Browse any date since June 16, 1995 or pick a random one.
- Near Earth Objects: Real-time asteroid tracking with charts, filters, and detailed data table.
- Discover: Search and browse 140,000+ NASA images spanning 60 years of space exploration.
- Earth Events: Live natural events (wildfires, storms, volcanoes) on a map, plus solar flares and geomagnetic storms.

---

## Tech Stack

Frontend: React 19, Vite, Bootstrap 5, Recharts, React Leaflet, Axios, CSS Modules, FontAwesome

Backend: Node.js, Express, Redis (Upstash), Axios

APIs: NASA APOD, NeoWs, Image Library, EONET v3, DONKI

Deployment: Vercel (frontend), Render (backend), Upstash (Redis)

## Prerequisites

- Node.js 20 or higher
- npm 9 or higher
- NASA API key from https://api.nasa.gov (free)
- Redis — see setup below

---

## Redis Setup

CosmosExplorer uses Redis for caching NASA API responses.
You have two options:

### Option 1 — Upstash (recommended, no installation needed)

Upstash is a managed Redis service with a free tier. This is what production uses.

1. Go to https://upstash.com and create a free account
2. Create a new Redis database
3. Copy the connection details
4. Add to your backend .env:

```
REDIS_HOST=your-upstash-host.upstash.io
REDIS_PORT=6379
REDIS_PASSWORD=your-upstash-password
REDIS_TLS=true
```

### Option 2 — Local Redis (requires WSL on Windows)

If you are on Mac or Linux, Redis installs directly:

```bash
# Mac
brew install redis
brew services start redis

# Linux
sudo apt-get install redis-server
sudo service redis-server start

# Test
redis-cli ping
# should return PONG
```

If you are on Windows, you need WSL (Windows Subsystem for Linux):

1. Open PowerShell as Administrator and run:

```
wsl --install
```

2. Restart your computer
3. Open WSL terminal and run:

```bash
sudo apt-get update
sudo apt-get install redis-server
sudo service redis-server start
redis-cli ping
```

If you do not want to install WSL, use Upstash (Option 1) instead. The app works identically with both options. Upstash is simpler and requires no local installation.

---

## Getting Started

### 1. Clone

```bash
git clone https://github.com/yash586/cosmosexplorer.git
cd cosmosexplorer
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit .env and fill in your values:

```
NASA_API_KEY=your_nasa_api_key
REDIS_HOST=your_redis_host
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
REDIS_TLS=true
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

Start the backend:

```bash
npm run dev
# running on http://localhost:5000
```

### 3. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
```

Edit .env:

```
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
# running on http://localhost:5173
```

---

## Running Tests

### Backend (Jest + Supertest — integration tests)

Tests make real HTTP requests through the full Express stack including controllers and services.

```bash
cd backend
npm test
```

Tests cover: health check, APOD endpoint, asteroids endpoint, discover endpoint.

### Frontend (Vitest + React Testing Library — unit tests)

Tests render components in isolation and verify output.

```bash
cd frontend
npm test
```

Tests cover: Navbar renders correctly, ErrorMessage displays and handles retry, NotFound page renders.

---

## Caching

All NASA API responses are cached in Redis using a cache-aside pattern. Cache is checked first on every request. If no cache exists, the NASA API is called and the result is stored.

Cache durations:

- APOD today: 1 hour
- APOD past dates: 7 days
- Asteroids: 1 hour
- NASA images: 1 hour
- Earth events: 30 minutes
- Categories: 24 hours
- Location names: 30 days

---

## API Reference

```
GET /health

GET /api/apod
GET /api/apod?date=2024-01-15
GET /api/apod?count=5

GET /api/asteroids
GET /api/asteroids?start_date=2026-03-10&end_date=2026-03-17
GET /api/asteroids/today

GET /api/discover?query=mars
GET /api/discover?query=nebula&page=2

GET /api/earth-events
GET /api/earth-events?category=wildfires
GET /api/earth-events/categories
GET /api/earth-events/flares
GET /api/earth-events/storms
```

---

## Deployment

Frontend is deployed to Vercel. Set VITE_API_URL to your backend URL in Vercel environment variables.

Backend is deployed to Render as a web service. Set all .env variables in the Render dashboard. Note that Render's free tier spins down after 15 minutes of inactivity. The first request after inactivity may take 30-60 seconds while the server wakes up. Subsequent requests are instant.

---

## Planned Features

The AI explanation feature is implemented and ready in both backend and frontend.

Backend:
→ POST /api/ai/explain endpoint built
→ Gemini API integration complete
→ Redis cached same APOD never calls API twice

Frontend:
→ "Get AI Explanation" button on APOD description
→ Shows simple explanation fun fact
→ Loading and error states handled

Status: Disabled in production pending Gemini API credits.
To enable, add GEMINI_API_KEY to backend environment variables.

---

## Author

Yash Kalan
GitHub: https://github.com/yash586
LinkedIn: https://www.linkedin.com/in/yash-kalan-35b294155/

Built for Bounce Insights Technical Assessment 2026
