import { ThemeToggle } from "./ThemeToggle.jsx";

export function Sidebar({ currentPage, isDarkTheme, onNavigate, onProfileClick, onToggleTheme, profile }) {
  const profileName = `${profile.firstName} ${profile.lastName}`.trim();
  const profileInitials = `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase();

  return (
    <nav className="navbar" aria-label="Primary navigation">
      <div className="navbar-title">Task Board</div>

      <div className="navbar-content">
        <div className="nav-links" aria-label="Pages">
          <button
            className={currentPage === "tasks" ? "nav-link active" : "nav-link"}
            onClick={() => onNavigate("tasks")}
            type="button"
          >
            Tasks
          </button>
          <button
            className={currentPage === "products" ? "nav-link active" : "nav-link"}
            onClick={() => onNavigate("products")}
            type="button"
          >
            Products
          </button>
        </div>

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
