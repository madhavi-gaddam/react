import { statusOptions } from "../data/tasks.js";

export function StatusTabs({ activeTab, onTabChange }) {
  const tabs = ["all", ...statusOptions];

  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          className={activeTab === tab ? "tab active" : "tab"}
          key={tab}
          onClick={() => onTabChange(tab)}
          type="button"
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
