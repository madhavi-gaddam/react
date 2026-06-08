import { ThemeToggle } from "./ThemeToggle.jsx";

export function Sidebar({ isDarkTheme, onProfileClick, onToggleTheme }) {
  return (
    <nav className="navbar" aria-label="Primary navigation">
      <div className="navbar-title">Task Board</div>

      <div className="navbar-content">
        <div className="navbar-actions">
          <ThemeToggle isDarkTheme={isDarkTheme} onToggleTheme={onToggleTheme} />

          <button className="profile-badge" type="button" onClick={onProfileClick} aria-label="Open profile registration">
            <span className="profile-logo">MG</span>
            <span className="profile-name">Madhavi Gaddam</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
