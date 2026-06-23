import React from "react";

export function TaskForm({
  editingTask,
  onAddTask,
  onSaveTask,
  selectedTask,
  statusOptions,
  validationMessage,
}) {
  const [taskName, setTaskName] = React.useState("");
  const [taskStatus, setTaskStatus] = React.useState("todo");
  const taskNameInputRef = React.useRef(null);

  const isEditing = Boolean(editingTask);

  React.useEffect(() => {
    if (editingTask) {
      setTaskName(editingTask.name);
      setTaskStatus(editingTask.status);
      taskNameInputRef.current?.focus();
      return;
    }

    setTaskName("");
    setTaskStatus("todo");
  }, [editingTask]);

  function handleSubmit(event) {
    event.preventDefault();

    if (taskName.trim() === "") {
      return;
    }

    if (isEditing) {
      const wasSaved = onSaveTask({
        ...editingTask,
        name: taskName.trim(),
        status: taskStatus,
      });

      if (!wasSaved) {
        return;
      }
    } else {
      const wasAdded = onAddTask(taskName.trim(), taskStatus);

      if (!wasAdded) {
        return;
      }

      setTaskName("");
      setTaskStatus("todo");
    }
  }

  return (
    <div className="form-card">
      <div className="form-meta">
        <p className="form-mode">{isEditing ? `Editing #${editingTask.key}` : "Add New Task"}</p>
        {selectedTask ? <p className="selected-note">Selected #{selectedTask.key}</p> : null}
      </div>

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          aria-label="Task name"
          onChange={(event) => setTaskName(event.target.value)}
          placeholder="Task Name"
          ref={taskNameInputRef}
          type="text"
          value={taskName}
        />

        <select
          aria-label="Task status"
          onChange={(event) => setTaskStatus(event.target.value)}
          value={taskStatus}
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status === "in progress" ? "In Progress" : status[0].toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>

        <button type="submit">
          {!isEditing && <span>+</span>}
          {isEditing ? "Save" : "Add"}
        </button>
      </form>

      {validationMessage ? <p className="validation-message">{validationMessage}</p> : null}
    </div>
  );
}
