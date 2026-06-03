import { TaskRow } from "./TaskRow.jsx";
import { Edit3, Trash2, X } from "lucide-react";

export function TaskTable({ onDeleteTask, onEditTask, onSelectTask, selectedTaskId, tasks }) {
  const selectedTask = tasks.find((task) => task.id === selectedTaskId);

  return (
    <div className="table-card">
      <div className="task-container">
        <table>
          <thead>
            <tr>
              <th className="select-heading">Checkbox</th>
              <th>Serial No</th>
              <th>Task Name</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskRow
                  isSelected={selectedTaskId === task.id}
                  key={task.id}
                  onSelectTask={onSelectTask}
                  task={task}
                />
              ))
            ) : (
              <tr>
                <td className="empty-row" colSpan="4">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedTask ? (
        <div className="selection-bar" role="toolbar" aria-label="Selected task actions">
          <button
            className="selection-clear"
            onClick={() => onSelectTask(selectedTask.id)}
            title="Clear selection"
            type="button"
          >
            <X size={20} />
          </button>

          <span className="selection-count">1 task selected</span>

          <span className="selection-divider" />

          <button
            className="selection-action edit-action"
            onClick={() => onEditTask(selectedTask.id)}
            type="button"
          >
            <Edit3 size={20} />
            Edit
          </button>

          <span className="selection-divider" />

          <button
            className="selection-action delete-action"
            onClick={() => onDeleteTask(selectedTask.id)}
            type="button"
          >
            <Trash2 size={20} />
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
}
