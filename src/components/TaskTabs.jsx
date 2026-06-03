export function TaskTabs({ activeTab, onTabChange }) {
  return (
    <nav aria-label="Task status filters" className="tabs">
      <button
        className={activeTab === "all" ? "tab active" : "tab"}
        onClick={() => onTabChange("all")}
        type="button"
      >
        All
      </button>

      <button
        className={activeTab === "todo" ? "tab active" : "tab"}
        onClick={() => onTabChange("todo")}
        type="button"
      >
        Todo
      </button>

      <button
        className={activeTab === "in progress" ? "tab active" : "tab"}
        onClick={() => onTabChange("in progress")}
        type="button"
      >
        In Progress
      </button>

      <button
        className={activeTab === "done" ? "tab active" : "tab"}
        onClick={() => onTabChange("done")}
        type="button"
      >
        Done
      </button>
    </nav>
  );
}
