import { ThemeToggle } from "./ThemeToggle.jsx";

export function Sidebar({
  isDarkTheme,
  onToggleTheme,
  profileDisplayName,
  profileInitials,
  onProfileClick,
}) {
  return (
    <nav className="navbar" aria-label="Primary navigation">
      <div className="navbar-title">Task Board</div>

      <div className="navbar-content">
        <div className="navbar-actions">
          <ThemeToggle isDarkTheme={isDarkTheme} onToggleTheme={onToggleTheme} />

          <button
            type="button"
            className="profile-badge"
            aria-label={`Open profile form for ${profileDisplayName}`}
            onClick={onProfileClick}
          >
            <span className="profile-logo">{profileInitials}</span>
            <span className="profile-name">{profileDisplayName}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
