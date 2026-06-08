import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";

function App() {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [page, setPage] = useState("home");
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState("");

  const showMessage = (text, type) => setMessage({ text, type });

  const isDuplicate = (name, skipIndex = -1) =>
    events.some(
      (event, index) =>
        index !== skipIndex && event.toLowerCase() === name.toLowerCase()
    );

  function openAddEvent() {
    setPage("events");
    setShowForm(true);
  }

  function addEvent() {
    const name = eventName.trim();

    if (!name) return showMessage("Please enter a valid event name", "error");
    if (isDuplicate(name)) return showMessage("This event already exists.", "error");

    setEvents([...events, name]);
    setEventName("");
    showMessage("Event added successfully.", "success");
  }

  function startEdit(index) {
    setEditIndex(index);
    setEditName(events[index]);
  }

  function saveEdit(index) {
    const name = editName.trim();

    if (!name) return showMessage("Please enter a valid event name", "error");
    if (isDuplicate(name, index)) return showMessage("This event already exists.", "error");

    setEvents(events.map((event, i) => (i === index ? name : event)));
    setEditIndex(null);
    setEditName("");
    showMessage("Event updated successfully.", "success");
  }

  function deleteEvent(index) {
    setEvents(events.filter((_, i) => i !== index));
    showMessage("Event deleted successfully.", "success");
  }

  function handleEditKey(event, index) {
    if (event.key === "Enter") saveEdit(index);
    if (event.key === "Escape") setEditIndex(null);
  }

  return (
    <div className="app-shell">
      <Navbar
        brand="Madhavi"
        eventCount={events.length}
        onHome={() => setPage("home")}
        onAddEvent={openAddEvent}
      />

      <div className="content-layout">
        <Sidebar
          eventCount={events.length}
          currentPage={page}
          onHome={() => setPage("home")}
          onAddEvent={openAddEvent}
        />

        <main className="app-container" id="events">
          {page === "home" ? (
            <section className="home-page">
              <h1>Welcome, Madhavi</h1>
              <div className="home-stats">
                <div>
                  <span>{events.length}</span>
                  <p>Total Events</p>
                </div>
              </div>
              <button onClick={openAddEvent}>Add Event</button>
            </section>
          ) : (
            <>
              <h1>Event Manager</h1>

              {showForm && (
                <div className="input-section">
                  <input
                    type="text"
                    placeholder="Type event name"
                    value={eventName}
                    onChange={(event) => setEventName(event.target.value)}
                    onKeyDown={(event) => event.key === "Enter" && addEvent()}
                  />
                  <button onClick={addEvent}>Add Event</button>
                </div>
              )}

              <p className={`message ${message.type}`}>{message.text}</p>

              {events.length > 0 && (
                <section className="events-section">
                  <ul>
                    {events.map((event, index) => (
                      <li key={`${event}-${index}`}>
                        {editIndex === index ? (
                          <>
                            <input
                              className="edit-input"
                              value={editName}
                              onChange={(event) => setEditName(event.target.value)}
                              onKeyDown={(event) => handleEditKey(event, index)}
                            />
                            <div className="event-actions">
                              <button className="edit-btn" onClick={() => saveEdit(index)}>
                                Save
                              </button>
                              <button className="cancel-btn" onClick={() => setEditIndex(null)}>
                                Cancel
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <span className="event-text">{event}</span>
                            <div className="event-actions">
                              <button className="edit-btn" onClick={() => startEdit(index)}>
                                Edit
                              </button>
                              <button className="delete-btn" onClick={() => deleteEvent(index)}>
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
