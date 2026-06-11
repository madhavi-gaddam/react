export function StatusBadge({ status }) {
  const statusClassName = status.replaceAll(" ", "-");
  const statusLabel = status === "in progress" ? "In Progress" : status[0].toUpperCase() + status.slice(1);

  return <span className={`status status-${statusClassName}`}>{statusLabel}</span>;
}
