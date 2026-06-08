function Sidebar({ eventCount, currentPage, onHome, onAddEvent }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-card">
        <h2>Navigation</h2>
        <button className="sidebar-link" onClick={onHome}>
          Home
        </button>
        <button className="sidebar-link" onClick={onAddEvent}>
          Add Event
        </button>
      </div>
      <div className="sidebar-card">
        <h2>Overview</h2>
        <p>Current page</p>
        <span>{currentPage === "home" ? "Home" : "Event Manager"}</span>
        <p className="sidebar-stat">Total events</p>
        <span>{eventCount}</span>
      </div>
    </aside>
  );
}

export default Sidebar;
