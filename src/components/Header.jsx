import { TaskTabs } from "./TaskTabs.jsx";
import { ThemeToggle } from "./ThemeToggle.jsx";

export function Header({ activeTab, isDarkTheme, onTabChange, onToggleTheme }) {
  return (
    <header className="dashboard-header">
      <h1>Tasks</h1>
      <div className="header-actions">
        <TaskTabs activeTab={activeTab} onTabChange={onTabChange} />
        <ThemeToggle isDarkTheme={isDarkTheme} onToggleTheme={onToggleTheme} />
      </div>
    </header>
  );
}
