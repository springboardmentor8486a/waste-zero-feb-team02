# Waste Zero (Full Stack)

Waste Zero is a full-stack web platform connecting NGOs and volunteers for social impact opportunities.

This repository contains:
- `frontend` (React + Vite client)
- `backend` (Node.js + Express + MongoDB API)

## Current Scope
- User registration/login with JWT auth
- Role model: `volunteer` and `NGO`
- Profile management and password change
- Email verification flow
- Opportunity CRUD API with role + ownership enforcement

## Repository Structure
```text
waste-zero-feb-team02/
|- backend/
|  `- README.md
|- frontend/
|  `- README.md
`- README.md
```

## Tech Stack

### Frontend
- React 19
- React Router DOM 7
- Zustand
- Axios
- Tailwind CSS 4
- Vite 7

### Backend
- Node.js + Express 5
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- `bcrypt`, `nodemailer`, `dotenv`, `cors`

## Prerequisites
- Node.js 18+
- npm
- MongoDB database

## Quick Start (Run Full Project)

### 1) Start backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

PowerShell:
```powershell
cd backend
npm install
Copy-Item .env.example .env
npm run dev
```

Backend default URL: `http://localhost:3000`

### 2) Start frontend (new terminal)
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

PowerShell:
```powershell
cd frontend
npm install
Copy-Item .env.example .env
npm run dev
```

Frontend default URL: `http://localhost:5173`

## Environment Files
- Backend env template: `backend/.env.example`
- Frontend env template: `frontend/.env.example`

Keep real `.env` files private and never commit secrets.

## API Base URL
Frontend expects backend API at:
- `VITE_API_BASE_URL=http://localhost:3000/api/v1`

## Documentation By Module
- Backend docs and full endpoint guide: [backend/README.md](./backend/README.md)
- Frontend docs, routing, and state flow: [frontend/README.md](./frontend/README.md)

## Project Status Notes
- Backend opportunity APIs are implemented and ready for Postman testing.
- Frontend currently uses auth/profile APIs.
- Opportunity UI integration in frontend is not yet completed in this repository state.

## Team Workflow (Recommended)
1. Create feature branch from `main`.
2. Keep frontend and backend changes scoped per PR.
3. Update related README(s) when endpoints, env keys, or setup steps change.
4. Validate locally before pushing.

## License
- Backend `package.json`: ISC
- Frontend: private project package

