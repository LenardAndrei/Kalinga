function StatusBadge({ status }) {
  const colorMap = {
    Pending:  "#f59e0b",
    Decline:  "#ef4444",
    Accepted: "#22c55e",
  }

  return (
    <span style={{
      color: colorMap[status] || "#666",
      fontWeight: 700,
      fontSize: "14px",
      fontFamily: "'Poppins', sans-serif",
    }}>
      {status}
    </span>
  )
}

export default StatusBadge