import { ThemeToggle } from "./ThemeToggle.jsx";

export function Sidebar({ isDarkTheme, onProfileClick, onToggleTheme, profile }) {
  const profileName = `${profile.firstName} ${profile.lastName}`.trim();
  const profileInitials = `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase();

  return (
    <nav className="navbar" aria-label="Primary navigation">
      <div className="navbar-title">Task Board</div>

      <div className="navbar-content">
        <div className="navbar-actions">
          <ThemeToggle isDarkTheme={isDarkTheme} onToggleTheme={onToggleTheme} />

          <button className="profile-badge" type="button" onClick={onProfileClick} aria-label="Open profile registration">
            <span className="profile-logo">{profileInitials}</span>
            <span className="profile-name">{profileName}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
