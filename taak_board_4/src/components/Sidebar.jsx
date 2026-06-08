import { ThemeToggle } from "./ThemeToggle.jsx";

export function Sidebar({ isDarkTheme, onToggleTheme, profile, onProfileClick }) {
  const displayName = [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") || "User";
  const initials = `${profile?.firstName?.charAt(0) || "U"}${profile?.lastName?.charAt(0) || ""}`.toUpperCase();

  return (
    <nav className="navbar" aria-label="Primary navigation">
      <div className="navbar-title">Task Board</div>

      <div className="navbar-content">
        <div className="navbar-actions">
          <ThemeToggle isDarkTheme={isDarkTheme} onToggleTheme={onToggleTheme} />

          <button className="profile-badge" onClick={onProfileClick} title="Registration form">
            <span className="profile-logo">{initials}</span>
            <span className="profile-name">{displayName}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
