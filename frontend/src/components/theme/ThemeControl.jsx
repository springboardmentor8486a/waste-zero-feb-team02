import { Moon, Sun } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";

const ThemeControl = ({ compact = false }) => {
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle theme"
      className={`inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/85 px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-100/70 dark:border-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-100 dark:hover:bg-emerald-900/60 ${
        compact ? "px-3 py-1.5 text-xs" : ""
      }`}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      <span>{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
};

export default ThemeControl;
