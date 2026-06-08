import { StatusBadge } from "./StatusBadge.jsx";

export function TaskRow({ isSelected, onSelectTask, task }) {
  return (
    <tr className={isSelected ? "selected-row" : ""}>
      <td className="select-cell">
        <input
          aria-label={`Select task ${task.key}`}
          checked={isSelected}
          onChange={() => onSelectTask(task.id)}
          type="checkbox"
        />
      </td>
      <td className="key-cell">{task.key}</td>
      <td className="task-name-cell">{task.name}</td>
      <td>
        <StatusBadge status={task.status} />
      </td>
    </tr>
  );
}
