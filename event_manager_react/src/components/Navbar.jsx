function Navbar({ brand, eventCount, onHome, onAddEvent }) {
  return (
    <nav className="navbar">
      <div className="brand">{brand}</div>
      <div className="navbar-actions">
        <span className="event-count">Events: {eventCount}</span>
        <button className="nav-link" onClick={onHome}>
          Home
        </button>
        <button className="nav-link" onClick={onAddEvent}>
          Add Event
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
