# Waste Zero Frontend

Frontend application for Waste Zero, built with React + Vite, styled with Tailwind CSS v4, and using Zustand for state management.

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 4 (`@tailwindcss/postcss`)
- Zustand 5
- ESLint 9

## Quick Setup

1. Install dependencies:

```bash
npm install
```

2. Create local environment file from template:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

3. Start development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## Scripts

- `npm run dev` starts local Vite dev server.
- `npm run build` builds production assets into `dist/`.
- `npm run preview` serves the production build locally.
- `npm run lint` runs ESLint checks.

## Project Structure

```text
src/
  App.jsx
  main.jsx
  index.css
  store/
    useAppStore.js
    slices/
      counterSlice.js
      themeSlice.js
```

## Environment Variables (.env)

### Rules

- Use only `VITE_` prefixed variables in frontend code.
- Do not commit `.env` files with real credentials.
- Keep `.env.example` updated whenever env keys change.
- Add short comments in `.env.example` for non-obvious keys.

### Current env template

Use `.env.example` as the source of truth for required keys.

### Adding a new env key

1. Add the key to `.env.example` with a safe placeholder value.
2. Add the key to each local `.env` file.
3. Use it in code via `import.meta.env.VITE_YOUR_KEY`.
4. Update this README if behavior/setup changes.

## Tailwind Setup and Theme (Dark/Light)

Tailwind is configured through PostCSS in `postcss.config.mjs`:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

Tailwind is imported in `src/index.css`:

```css
@import "tailwindcss";
```

Dark mode is manual and selector-driven using both class and data attribute:

- `html.dark`
- `html[data-theme="dark"]`

Theme syncing is handled in:

- `src/store/slices/themeSlice.js`
- bootstrapped before render in `src/main.jsx`

This keeps theme consistent across refreshes using `localStorage`.

## Zustand State Management

Global state is organized with a root store + feature slices.

- Root store: `src/store/useAppStore.js`
- Theme slice: `src/store/slices/themeSlice.js`
- Counter slice: `src/store/slices/counterSlice.js`

### Pattern to add new state

1. Create a new slice file in `src/store/slices/`.
2. Export a slice creator function, for example `createAuthSlice`.
3. Compose the slice in `src/store/useAppStore.js`.
4. Consume state/actions with selectors in components.

Example usage:

```js
import { useAppStore } from './store/useAppStore'

const value = useAppStore((state) => state.value)
const setValue = useAppStore((state) => state.setValue)
```

## How To Add New Features

1. Create component(s) under a clear folder (for example `src/components/` or `src/features/<feature-name>/`).
2. Keep UI logic in components and shared app state in Zustand slices.
3. Reuse Tailwind utility classes and existing theme-aware patterns (`dark:*`).
4. Keep responsive behavior intentional:
   - Start mobile-first.
   - Use breakpoints (`sm`, `md`, `lg`, `xl`) only when needed.
   - Validate on small and large screens before PR.
5. Run `npm run lint` and `npm run build` before pushing.

## Team Collaboration Workflow (Beginner Friendly)

This section is a step-by-step Git workflow for teammates who are new to command line and collaboration.

### 0) Basic CMD/PowerShell commands

- `cd <folder-path>`: move into a folder
- `cd ..`: move one folder up
- `dir`: list files/folders in current directory
- `cls`: clear terminal screen (CMD/PowerShell)
- `pwd`: show current directory (PowerShell)

Open terminal in project folder (`frontend`) before running commands below.

### 1) One-time Git setup (first time on your machine)

```bash
git --version
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

### 2) Start new work correctly

Always start from updated `main`:

```bash
git checkout main
git pull origin main
```

Create a feature branch (one task = one branch):

```bash
git checkout -b feat/short-task-name
```

Branch name examples:

- `feat/login-form`
- `fix/theme-toggle-bug`
- `docs/readme-env-guide`

### 3) Do development and run checks

Run the app while developing:

```bash
npm run dev
```

Before commit, run quality checks:

```bash
npm run lint
npm run build
```

### 4) Review your changes before commit

Check changed files:

```bash
git status
```

See exact code diff:

```bash
git diff
```

### 5) Commit changes (small and clear commits)

Add files and commit:

```bash
git add .
git commit -m "feat: add dark mode toggle using zustand"
```

Commit message pattern:

- `feat: ...` for new feature
- `fix: ...` for bug fix
- `docs: ...` for README/docs
- `refactor: ...` for internal code cleanup

### 6) Push branch and open Pull Request

Push your branch to remote:

```bash
git push -u origin feat/short-task-name
```

Then open a Pull Request on GitHub from your branch to `main`.

PR should include:

- what changed
- why it changed
- screenshots for UI changes
- env/setup updates (if any)
- testing notes (`npm run lint`, `npm run build`)

### 7) Handle review comments

After feedback, keep working on same branch:

```bash
git add .
git commit -m "fix: address PR review comments"
git push
```

Do not create a new PR for review fixes unless asked.

### 8) Keep your branch updated with latest main

If main changed while you were working:

```bash
git checkout main
git pull origin main
git checkout feat/short-task-name
git merge main
```

If merge conflicts appear, resolve files, then:

```bash
git add .
git commit -m "chore: resolve merge conflicts with main"
```

### 9) After PR is merged (cleanup)

```bash
git checkout main
git pull origin main
git branch -d feat/short-task-name
```

Optional remote cleanup:

```bash
git push origin --delete feat/short-task-name
```

### Team rules to follow every time

- Never push directly to `main`.
- Keep PRs focused on one task.
- Ask for review before merge.
- Ensure lint and build pass before pushing.

## README Maintenance Checklist

Update this README whenever you change:

- setup or install commands
- scripts
- folder conventions
- env keys
- state architecture
- theme behavior

If you add new required project knowledge, document it here in the same PR.

## Troubleshooting

- If styles do not apply, check `src/index.css` imports Tailwind and `postcss.config.mjs` has `@tailwindcss/postcss`.
- If dark mode does not switch, confirm `themeSlice` is updating `html` class/attribute.
- If env values are undefined, confirm key starts with `VITE_` and restart dev server.
