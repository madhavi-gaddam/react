import { statusOptions } from "../data/tasks.js";

export function TaskTabs({ activeTab, onTabChange }) {
  const tabs = ["all", ...statusOptions];
  const tabLabels = {
    all: "All",
    todo: "Todo",
    "in progress": "In Progress",
    done: "Done",
  };

  return (
    <nav aria-label="Task status filters" className="tabs">
      {tabs.map((tab) => (
        <button
          className={activeTab === tab ? "tab active" : "tab"}
          key={tab}
          onClick={() => onTabChange(tab)}
          type="button"
        >
          {tabLabels[tab]}
        </button>
      ))}
    </nav>
  );
}
