import { TaskTabs } from "./TaskTabs.jsx";

export function Header({ activeTab, onTabChange, taskCounts }) {
  return (
    <header className="dashboard-header">
      <h1>Tasks</h1>
      <div className="header-actions">
        <TaskTabs activeTab={activeTab} onTabChange={onTabChange} taskCounts={taskCounts} />
      </div>
    </header>
  );
}
