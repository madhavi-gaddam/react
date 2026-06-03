import { TaskTabs } from "./TaskTabs.jsx";

export function Header({ activeTab, onTabChange }) {
  return (
    <header className="dashboard-header">
      <h1>Tasks</h1>
      <TaskTabs activeTab={activeTab} onTabChange={onTabChange} />
    </header>
  );
}
