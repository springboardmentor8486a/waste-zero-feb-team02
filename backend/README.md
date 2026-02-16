# Waste Zero Backend

Backend API for Waste Zero user authentication and profile management.

## What This Service Does
- Registers users (`volunteer` or `NGO`)
- Logs users in with JWT access + refresh tokens
- Returns authenticated user profile
- Updates authenticated user profile

## Tech Stack
- Node.js (ES modules)
- Express 5
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- Password hashing (`bcrypt`)
- Environment config (`dotenv`)

## Project Structure
```text
backend/
|- controllers/
|  `- user.controller.js
|- dbconfig/
|  `- config.js
|- middleware/
|  `- user.middleware.js
|- models/
|  `- User.js
|- routes/
|  `- user.routes.js
|- .env.samples
|- .gitignore
|- package.json
`- server.js
```

## Prerequisites
- Node.js 18+ (recommended)
- npm
- MongoDB connection string (Atlas or local)

## Quick Start
```bash
# 1) Install dependencies
npm install

# 2) Create local env file
cp .env.samples .env

# 3) Fill env values in .env

# 4) Start server
npm run dev
```

Server starts at `http://localhost:3000`.

`server.js` uses `PORT` from `.env` and falls back to `3000` if not set.

## Environment Variables
Use `.env.samples` as template.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
ACCESS_TOKEN_EXPIRY=1h
REFRESH_TOKEN_EXPIRY=7d
PORT=3000
```

### Variable Details
- `MONGO_URI` (required): MongoDB connection URI used by `dbconfig/config.js`
- `JWT_SECRET` (required): secret for access token signing and verification
- `JWT_REFRESH_SECRET` (required): secret for refresh token signing and verification
- `ACCESS_TOKEN_EXPIRY` (optional): access token lifetime (default fallback: `1h`)
- `REFRESH_TOKEN_EXPIRY` (optional): refresh token lifetime (default fallback: `7d`)
- `PORT` (optional): server port (default fallback: `3000`)

## API Guide
Base URL: `http://localhost:3000/api/v1`

### 1) Register
- Method: `POST`
- Path: `/register`
- Body:
```json
{
  "name": "Alex",
  "email": "alex@example.com",
  "password": "StrongPassword123",
  "role": "volunteer",
  "skills": ["sorting", "logistics"],
  "location": "Delhi",
  "bio": "Community volunteer"
}
```

### 2) Login
- Method: `POST`
- Path: `/login`
- Body:
```json
{
  "email": "alex@example.com",
  "password": "StrongPassword123"
}
```
- Success response returns:
  - `accessToken`
  - `refreshToken`
  - basic user payload

### 3) Get Current User
- Method: `GET`
- Path: `/me`
- Auth header:
```http
Authorization: Bearer <accessToken>
```

### 4) Update Current User
- Method: `PUT`
- Path: `/me`
- Auth header:
```http
Authorization: Bearer <accessToken>
```
- Body supports any of:
```json
{
  "name": "Alex Updated",
  "skills": ["sorting", "awareness"],
  "location": "Mumbai",
  "bio": "Updated bio"
}
```

### 5) Refresh Access Token
- Method: `POST`
- Path: `/refresh-token`
- Body:
```json
{
  "refreshToken": "<refreshToken>"
}
```

## cURL Usage Examples
```bash
# Register
curl -X POST http://localhost:3000/api/v1/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alex","email":"alex@example.com","password":"StrongPassword123","role":"volunteer"}'

# Login
curl -X POST http://localhost:3000/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alex@example.com","password":"StrongPassword123"}'

# Get profile
curl -X GET http://localhost:3000/api/v1/me \
  -H "Authorization: Bearer <accessToken>"
```

## `.gitignore` Instructions
Current `.gitignore`:
```gitignore
node_modules
.env
```

Team rules:
- Keep `.env` ignored at all times
- Never commit secrets or tokens
- Commit `.env.samples` with placeholder values only
- Keep `node_modules` ignored
- If new generated files appear (logs/build artifacts), add them to `.gitignore`

Recommended additions for this backend:
```gitignore
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*
.DS_Store
coverage
dist
```

## Team Collaboration Guide

### Branching Strategy
Use short-lived feature branches from `main`.

Branch naming:
- `feat/<ticket-or-topic>`
- `fix/<ticket-or-topic>`
- `chore/<topic>`

Example:
```bash
git checkout main
git pull origin main
git checkout -b feat/auth-refresh-token
```

### Daily Workflow (Commands)
```bash
# Get latest
git checkout main
git pull origin main

# Start work
git checkout -b feat/<topic>

# While coding
npm install
npm run dev

# Before commit
git status
git add <files>
git commit -m "feat(auth): add refresh token endpoint"

# Sync with main before PR
git fetch origin
git rebase origin/main

# Push branch
git push -u origin feat/<topic>
```

### Pull Request Checklist
- Scope is focused (single concern)
- No secrets in diff
- `.env` not tracked
- API behavior tested manually (or automated tests when added)
- Clear PR title and description
- Reviewer can run using README steps

### Commit Message Convention
Use Conventional Commits style:
- `feat:` new functionality
- `fix:` bug fix
- `refactor:` code restructuring without behavior change
- `chore:` maintenance/config changes
- `docs:` documentation

Examples:
- `feat(auth): add profile update endpoint`
- `fix(middleware): return 401 for missing token`
- `docs(readme): add setup and collaboration guide`

### Do and Don't

Do:
- Pull/rebase regularly to reduce conflicts
- Keep PRs small and reviewable
- Use environment variables for config and secrets
- Validate API changes with local requests
- Update docs when endpoints/env requirements change

Don't:
- Do not commit `.env`, credentials, or real tokens
- Do not push directly to `main`
- Do not mix unrelated changes in one PR
- Do not force push shared branches without team agreement
- Do not rename API contracts without notifying frontend team

## Troubleshooting

### MongoDB connection fails
- Verify `MONGO_URI` format and credentials
- Ensure IP/network access is allowed in MongoDB provider
- Check server logs for `Database connection failed`

### Invalid token / unauthorized
- Ensure `Authorization` header uses `Bearer <token>`
- Check that `JWT_SECRET` and `JWT_REFRESH_SECRET` are set correctly
- Re-login to generate fresh tokens

### Port already in use
- Stop the process using your current app port
- Or set a different `PORT` value in `.env`

## Current Gaps (Known)
- No automated tests yet (`npm test` is placeholder)

## License
ISC (from `package.json`)