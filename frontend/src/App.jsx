import { useAppStore } from './store/useAppStore'

function App() {
  const theme = useAppStore((state) => state.theme)
  const toggleTheme = useAppStore((state) => state.toggleTheme)
  const count = useAppStore((state) => state.count)
  const increment = useAppStore((state) => state.increment)

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-8 flex items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Tailwind Setup
          </h1>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        <p className="mb-6 text-slate-600 dark:text-slate-300">
          This Vite React project is configured with Tailwind CSS and Zustand for
          state management.
        </p>

        <div className="rounded-xl bg-slate-100 p-6 dark:bg-slate-800">
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
            Counter example
          </p>
          <button
            type="button"
            onClick={increment}
            className="rounded-lg bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
          >
            count is {count}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
