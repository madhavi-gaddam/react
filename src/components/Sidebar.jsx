import { Home, ListTodo } from "lucide-react";

const navItems = [
  { id: "home", label: "Home Page", icon: Home },
  { id: "tasks", label: "Tasks", icon: ListTodo },
];

export function Sidebar({ activePage, onPageChange }) {
  return (
    <nav className="navbar" aria-label="Primary navigation">
      <div className="navbar-title">Task Board</div>

      <div className="navbar-links">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              aria-current={isActive ? "page" : undefined}
              className={`navbar-link${isActive ? " active" : ""}`}
              key={item.id}
              onClick={() => onPageChange(item.id)}
              type="button"
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
