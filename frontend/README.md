# Waste Zero Frontend

Frontend web app for Waste Zero, built with React + Vite.

Current scope includes:
- Landing page and auth pages
- Role-based dashboard routing (Volunteer / NGO)
- Protected profile page
- Auth token handling with refresh flow
- Email verification page

## Tech Stack
- React 19
- React Router DOM 7
- Vite 7
- Tailwind CSS 4
- Zustand 5
- Axios
- MUI + Lucide React (UI/icons)

## Prerequisites
- Node.js 18+
- npm
- Running backend API (default `http://localhost:3000`)

## Setup and Run
```bash
npm install
cp .env.example .env
npm run dev
```

PowerShell:
```powershell
Copy-Item .env.example .env
npm install
npm run dev
```

Frontend default URL: `http://localhost:5173`

## Scripts
- `npm run dev` start local dev server
- `npm run build` build production assets in `dist/`
- `npm run preview` preview built app
- `npm run lint` run ESLint

## Environment Variables
Use `.env.example`:

```env
VITE_APP_ENV=development
VITE_APP_NAME=Waste Zero
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_ENABLE_DEBUG_LOGS=false
```

Required for API connectivity:
- `VITE_API_BASE_URL`

## Routing (Current)

| Route | Access | Notes |
|---|---|---|
| `/` | Public | Landing page |
| `/login` | Public-only | Redirects authenticated users to role dashboard |
| `/signup` | Public-only | Register user |
| `/verify-email?token=...` | Public | Email verification flow |
| `/dashboard/volunteer` | Protected (`volunteer`) | Volunteer dashboard |
| `/dashboard/ngo` | Protected (`NGO`) | NGO dashboard |
| `/profile` | Protected | Profile + password change |

## API Integration (Current)
Frontend currently consumes these backend endpoints:
- `POST /register`
- `POST /login`
- `POST /refresh-token`
- `GET /verify-email`
- `GET /me`
- `PUT /me`
- `PUT /me/password`
- `POST /me/verify-email`

Note: Opportunity APIs exist in backend, but dedicated frontend opportunity screens are not integrated yet.

## Auth and State Flow
- Auth state is managed with Zustand slices.
- Tokens are stored in local storage.
- Axios request interceptor attaches `Authorization: Bearer <accessToken>`.
- Axios response interceptor attempts refresh on `401` using `POST /refresh-token`.
- Failed refresh clears local auth and user state.

Main state files:
- `src/store/useAppStore.js`
- `src/store/slices/authSlice.js`
- `src/store/slices/userSlice.js`
- `src/store/slices/themeSlice.js`

## Project Structure
```text
frontend/
|- public/
|- src/
|  |- api/
|  |- assets/
|  |- components/
|  |- pages/
|  |  `- Auth/
|  |- store/
|  |  `- slices/
|  |- utils/
|  |- App.jsx
|  `- main.jsx
|- .env.example
|- package.json
`- vite.config.js
```

## Development Notes
- Keep env keys prefixed with `VITE_`.
- Keep `.env` out of git; commit only `.env.example`.
- Run `npm run lint` before creating PRs.
- Verify route protection after auth-related changes.

## Troubleshooting
- If API calls fail, verify `VITE_API_BASE_URL` and backend is running.
- If protected routes loop, clear local storage and login again.
- If refresh flow fails repeatedly, validate backend `JWT_SECRET` and `JWT_REFRESH_SECRET`.
