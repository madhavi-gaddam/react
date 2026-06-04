const tabs = [
  { id: "all", label: "All" },
  { id: "todo", label: "Todo" },
  { id: "in progress", label: "In Progress" },
  { id: "done", label: "Done" },
];

export function TaskTabs({ activeTab, onTabChange, taskCounts }) {
  return (
    <nav aria-label="Task status filters" className="tabs">
      {tabs.map((tab) => (
        <button
          className={activeTab === tab.id ? "tab active" : "tab"}
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          type="button"
        >
          <span>{tab.label}</span>
          <span className="tab-count">{taskCounts?.[tab.id] ?? 0}</span>
        </button>
      ))}
    </nav>
  );
}
