let events = [];
let messageTimer;
let editingIndex = -1;

function addEvent() {
  let input = document.getElementById("eventInput");
  let name = input.value.trim();

  if (!isValidEvent(name)) return;

  events.push(name);
  input.value = "";
  showMessage("Event added successfully.", "success");
  showEvents();
}

function showEvents() {
  let list = document.getElementById("eventList");
  let emptyState = document.getElementById("emptyState");
  let counter = document.getElementById("eventCounter");

  list.innerHTML = "";
  counter.textContent = `Total Events: ${events.length}`;
  emptyState.style.display = events.length ? "none" : "block";

  events.forEach((event, i) => {
    let item = document.createElement("li");
    let text = document.createElement(editingIndex === i ? "input" : "span");
    let actions = document.createElement("div");
    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    text.className = "event-text";
    editingIndex === i ? text.value = event : text.textContent = event;
    actions.className = "event-actions";
    editButton.className = editingIndex === i ? "save-btn" : "edit-btn";
    deleteButton.className = "delete-btn";
    editButton.textContent = editingIndex === i ? "Save" : "Edit";
    deleteButton.textContent = editingIndex === i ? "Cancel" : "Delete";
    editButton.onclick = () => editingIndex === i ? saveEvent(i, text.value) : editEvent(i);
    deleteButton.onclick = () => editingIndex === i ? cancelEdit() : deleteEvent(i);
    if (editingIndex === i) text.onkeydown = (e) => {
      if (e.key === "Enter") saveEvent(i, text.value);
      if (e.key === "Escape") cancelEdit();
    };

    actions.append(editButton, deleteButton);
    item.append(text, actions);
    list.appendChild(item);
    if (editingIndex === i) text.focus();
  });
}

function editEvent(i) {
  editingIndex = i;
  showEvents();
}

function saveEvent(i, value) {
  let name = value.trim();
  if (!isValidEvent(name, i)) return;

  events[i] = name;
  editingIndex = -1;
  showMessage("Event updated successfully.", "success");
  showEvents();
}

function cancelEdit() {
  editingIndex = -1;
  showEvents();
}

function deleteEvent(i) {
  events.splice(i, 1);
  showMessage("Event deleted successfully.", "success");
  showEvents();
}

// Validates empty values and duplicates for add and edit actions.
function isValidEvent(name, editingIndex = -1) {
  if (!name) {
    showMessage("Event name cannot be empty.", "error");
    return false;
  }

  let duplicate = events.some((event, i) =>
    i !== editingIndex && event.toLowerCase() === name.toLowerCase()
  );

  if (duplicate) {
    showMessage("This event already exists.", "error");
    return false;
  }

  return true;
}

// Shows temporary success and error messages below the input.
function showMessage(text, type) {
  let message = document.getElementById("message");
  clearTimeout(messageTimer);
  message.textContent = text;
  message.className = type;
  messageTimer = setTimeout(() => {
    message.textContent = "";
    message.className = "";
  }, 3000);
}

document.getElementById("eventInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") addEvent();
});

showEvents();
