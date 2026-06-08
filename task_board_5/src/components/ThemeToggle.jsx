import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ isDarkTheme, onToggleTheme }) {
  return (
    <button
      aria-label={isDarkTheme ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDarkTheme}
      className="theme-toggle"
      onClick={onToggleTheme}
      title={isDarkTheme ? "Light theme" : "Dark theme"}
      type="button"
    >
      <Sun className="theme-toggle-icon theme-toggle-sun" size={16} />
      <span className="theme-toggle-track">
        <span className="theme-toggle-thumb" />
      </span>
      <Moon className="theme-toggle-icon theme-toggle-moon" size={16} />
    </button>
  );
}
