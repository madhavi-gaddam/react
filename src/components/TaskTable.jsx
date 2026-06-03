import { TaskRow } from "./TaskRow.jsx";
import { Edit3, Trash2, X } from "lucide-react";

export function TaskTable({
  onClearSelection,
  onDeleteTask,
  onEditTask,
  onSelectAllTasks,
  onSelectTask,
  selectedTaskIds,
  tasks,
}) {
  const selectedTasks = tasks.filter((task) => selectedTaskIds.includes(task.id));
  const selectedTask = selectedTasks.length === 1 ? selectedTasks[0] : null;
  const areAllTasksSelected =
    tasks.length > 0 && tasks.every((task) => selectedTaskIds.includes(task.id));

  return (
    <div className="table-card">
      <div className="task-container">
        <table>
          <thead>
            <tr>
              <th className="select-heading">
                <input
                  aria-label="Select all tasks"
                  checked={areAllTasksSelected}
                  disabled={tasks.length === 0}
                  onChange={onSelectAllTasks}
                  type="checkbox"
                />
              </th>
              <th>Serial No</th>
              <th>Task Name</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskRow
                  isSelected={selectedTaskIds.includes(task.id)}
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

      {selectedTasks.length > 0 ? (
        <div className="selection-bar" role="toolbar" aria-label="Selected task actions">
          <button
            className="selection-clear"
            onClick={onClearSelection}
            title="Clear selection"
            type="button"
          >
            <X size={20} />
          </button>

          <span className="selection-count">
            {selectedTasks.length} {selectedTasks.length === 1 ? "task" : "tasks"} selected
          </span>

          {selectedTask ? (
            <>
              <span className="selection-divider" />

              <button
                className="selection-action edit-action"
                onClick={() => onEditTask(selectedTask.id)}
                type="button"
              >
                <Edit3 size={20} />
                Edit
              </button>
            </>
          ) : null}

          <span className="selection-divider" />

          <button
            className="selection-action delete-action"
            onClick={() => onDeleteTask(selectedTasks[0].id)}
            type="button"
          >
            <Trash2 size={20} />
            {selectedTasks.length === 1 ? "Delete" : "Delete All"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
