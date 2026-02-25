# Waste Zero Backend

Backend API for Waste Zero. This service currently provides:
- User authentication and profile management
- Email verification flow
- Opportunity CRUD with NGO role + ownership enforcement

## Tech Stack
- Node.js (ES modules)
- Express 5
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- `bcrypt` for password hashing
- `nodemailer` for verification emails

## Current Project Structure
```text
backend/
|- controllers/
|  |- user.controller.js
|  `- opportunity.controller.js
|- dbconfig/
|  `- config.js
|- middleware/
|  |- user.middleware.js
|  `- error.middleware.js
|- models/
|  |- User.js
|  `- Opportunity.js
|- routes/
|  |- user.routes.js
|  `- opportunity.routes.js
|- utils/
|  |- email.js
|  `- AppError.js
|- .env.example
|- .env.samples
|- package.json
`- server.js
```

## Prerequisites
- Node.js 18+
- npm
- MongoDB connection string

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

Server default URL: `http://localhost:3000`

## Environment Variables
Use `.env.example` as template.

```env
# Database
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

# Server
PORT=3000
FRONTEND_URL=http://localhost:5173

# Email (SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_app_password
```

## API Basics
- Base URL: `http://localhost:3000/api/v1`
- Auth header format: `Authorization: Bearer <accessToken>`
- Common error response:
```json
{ "message": "Error text here" }
```

### Authorization Rules
- Only `NGO` users can `create/update/delete` opportunities.
- Only the owner NGO (`ngo_id`) can update or delete its opportunity.
- Volunteers have read-only access for opportunities.

### Status Code Rules
- `401`: unauthorized (missing/invalid token)
- `403`: forbidden (role/ownership violation)
- `400`: invalid request/invalid ID/input validation failure
- `404`: resource not found

## Endpoints Summary

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/register` | No | Register user (volunteer or NGO) |
| POST | `/login` | No | Login and receive access/refresh tokens |
| POST | `/refresh-token` | No | Get new access token from refresh token |
| GET | `/verify-email?token=...` | No | Verify email with token |
| GET | `/me` | Yes | Get current user profile |
| PUT | `/me` | Yes | Update current user profile |
| PUT | `/me/password` | Yes | Change password |
| POST | `/me/verify-email` | Yes | Generate and send verification link |
| POST | `/opportunities` | Yes (NGO only) | Create opportunity |
| GET | `/opportunities` | No | List opportunities (supports filters) |
| GET | `/opportunities/:id` | No | Get one opportunity |
| PUT | `/opportunities/:id` | Yes (NGO owner only) | Update opportunity |
| DELETE | `/opportunities/:id` | Yes (NGO owner only) | Delete opportunity |

## Detailed Endpoint Usage

### 1) Register
- `POST /register`
```json
{
  "name": "Green NGO",
  "email": "ngo@example.com",
  "password": "StrongPassword123",
  "role": "NGO",
  "skills": ["awareness", "logistics"],
  "location": "Delhi",
  "bio": "Community NGO"
}
```

### 2) Login
- `POST /login`
```json
{
  "email": "ngo@example.com",
  "password": "StrongPassword123"
}
```
- Success includes:
  - `accessToken`
  - `refreshToken`
  - `user` object

### 3) Refresh Access Token
- `POST /refresh-token`
```json
{
  "refreshToken": "<refreshToken>"
}
```

### 4) Start Email Verification
- `POST /me/verify-email` (auth required)
- Sends email and returns verification link in response.

### 5) Verify Email
- `GET /verify-email?token=<token>`

### 6) Get/Update Profile
- `GET /me`
- `PUT /me`
```json
{
  "name": "Updated Name",
  "skills": ["awareness", "field-work"],
  "location": "Mumbai",
  "bio": "Updated bio"
}
```

### 7) Change Password
- `PUT /me/password`
```json
{
  "currentPassword": "StrongPassword123",
  "newPassword": "NewStrongPassword456"
}
```

### 8) Create Opportunity (NGO only)
- `POST /opportunities`
```json
{
  "title": "Weekend Food Rescue Drive",
  "description": "Collect and redistribute excess food",
  "required_skills": ["coordination", "communication"],
  "duration": "6 weeks",
  "location": "Delhi",
  "status": "open"
}
```
- `ngo_id` is always extracted from JWT and cannot be supplied by client.

### 9) Get All Opportunities
- `GET /opportunities`
- Optional query params:
  - `location` (case-insensitive match)
  - `skills` (comma-separated or repeated values in query)
  - `status` (`open`, `closed`, `in-progress`)

Examples:
- `/opportunities?location=delhi`
- `/opportunities?skills=communication,coordination`
- `/opportunities?status=open`
- `/opportunities?location=delhi&skills=logistics&status=open`

### 10) Get Single Opportunity
- `GET /opportunities/:id`

### 11) Update Opportunity (NGO owner only)
- `PUT /opportunities/:id`
- Allowed fields only:
  - `title`, `description`, `required_skills`, `duration`, `location`, `status`
- `ngo_id` modification is blocked.

### 12) Delete Opportunity (NGO owner only)
- `DELETE /opportunities/:id`

## Postman API Testing Guide

### 1) Create environment variables
In Postman environment, create:
- `base_url` = `http://localhost:3000/api/v1`
- `access_token` = (empty initially)
- `refresh_token` = (empty initially)
- `opportunity_id` = (empty initially)
- `verification_token` = (optional, empty initially)

### 2) Create request collection
Recommended folders:
- `Auth`
- `User`
- `Opportunities`

Use request URL format: `{{base_url}}/...`

### 3) Token capture tests in Login request
In the `POST /login` request, add this to Tests tab:
```javascript
const json = pm.response.json();
if (json.accessToken) pm.environment.set("access_token", json.accessToken);
if (json.refreshToken) pm.environment.set("refresh_token", json.refreshToken);
```

For authenticated requests, set Authorization type to `Bearer Token` and value:
`{{access_token}}`

### 4) Opportunity ID capture tests
In `POST /opportunities` Tests tab:
```javascript
const json = pm.response.json();
if (json._id) pm.environment.set("opportunity_id", json._id);
```

### 5) Recommended manual test sequence
1. Register NGO user (`POST /register`)
2. Login NGO (`POST /login`) and store tokens
3. Create opportunity (`POST /opportunities`)
4. List opportunities (`GET /opportunities`)
5. Get by ID (`GET /opportunities/{{opportunity_id}}`)
6. Update same opportunity (`PUT /opportunities/{{opportunity_id}}`)
7. Delete same opportunity (`DELETE /opportunities/{{opportunity_id}}`)
8. Register + login volunteer and verify:
   - `GET /opportunities` works
   - `POST/PUT/DELETE /opportunities` returns `403`

### 6) Quick negative tests
- Invalid ID test: `GET /opportunities/123` should return `400`.
- Missing token on NGO-only route should return `401`.
- Non-owner NGO update/delete should return `403`.
- Deleted or missing record should return `404`.

## cURL Quick Examples
```bash
# Login
curl -X POST http://localhost:3000/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ngo@example.com","password":"StrongPassword123"}'

# Create opportunity
curl -X POST http://localhost:3000/api/v1/opportunities \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <accessToken>" \
  -d '{"title":"Drive","description":"Desc","required_skills":["communication"],"duration":"2 weeks","location":"Delhi","status":"open"}'

# Filter opportunities
curl "http://localhost:3000/api/v1/opportunities?location=delhi&status=open"
```

## Known Gaps
- No automated tests yet (`npm test` is placeholder).
- Opportunity-application cascade logic is not implemented yet (planned later milestone).

## License
ISC

