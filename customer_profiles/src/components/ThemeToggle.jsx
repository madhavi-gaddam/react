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
      <span className="theme-toggle-icon theme-toggle-sun">Light</span>
      <span className="theme-toggle-track">
        <span className="theme-toggle-thumb" />
      </span>
      <span className="theme-toggle-icon theme-toggle-moon">Dark</span>
    </button>
  );
}
