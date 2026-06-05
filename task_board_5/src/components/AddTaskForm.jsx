import React from "react";
import { Plus } from "lucide-react";

export function AddTaskForm({ onAddTask, statusOptions }) {
  const [taskName, setTaskName] = React.useState("");
  const [taskStatus, setTaskStatus] = React.useState("todo");

  function handleSubmit(event) {
    event.preventDefault();

    if (taskName.trim() === "") {
      return;
    }

    onAddTask(taskName.trim(), taskStatus);
    setTaskName("");
    setTaskStatus("todo");
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        onChange={(event) => setTaskName(event.target.value)}
        placeholder="Add a new task"
        type="text"
        value={taskName}
      />

      <select onChange={(event) => setTaskStatus(event.target.value)} value={taskStatus}>
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <button type="submit">
        <Plus size={18} />
        Add
      </button>
    </form>
  );
}
