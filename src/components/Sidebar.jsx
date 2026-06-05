import { ThemeToggle } from "./ThemeToggle.jsx";

export function Sidebar({ isDarkTheme, onToggleTheme }) {
  return (
    <nav className="navbar" aria-label="Primary navigation">
      <div className="navbar-title">Task Board</div>

      <div className="navbar-content">
        <div className="navbar-actions">
          <ThemeToggle isDarkTheme={isDarkTheme} onToggleTheme={onToggleTheme} />

          <div className="profile-badge" aria-label="Madhavi Gaddam profile">
            <span className="profile-logo">MG</span>
            <span className="profile-name">Madhavi Gaddam</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
