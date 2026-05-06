import "./AdminDashboard.css"

const summaryCards = [
  { label: "Total Patients",  value: 167, color: "#1a4a52" },
  { label: "Active Doctors",  value: 67,  color: "#1e5c5a" },
  { label: "Healthcare",      value: 31,  color: "#236e68" },
  { label: "Appointments",    value: 18,  color: "#2a7c72" },
]

const activities = [
  {
    id: 1,
    icon: "🏥",
    iconBg: "#e6f4f4",
    title: "New Healthcare Provider Added",
    subtitle: "Kalinga Pharmacy",
    time: "1 hour ago",
  },
  {
    id: 2,
    icon: "🏥",
    iconBg: "#e6f4f4",
    title: "New Healthcare Provider Added",
    subtitle: "Barangay San Isidro Health Center",
    time: "2 hours ago",
  },
  {
    id: 3,
    icon: "👩‍⚕️",
    iconBg: "#e6f4f4",
    title: "Dr. Ada Loveyou completed 3 appointments",
    subtitle: "OB-GYN",
    time: "3 hours ago",
  },
  {
    id: 4,
    icon: "❌",
    iconBg: "#fee2e2",
    title: "Dr. Luka Doncic application rejected",
    subtitle: "Pediatrician",
    time: "3 hours ago",
  },
  {
    id: 5,
    icon: "⭐",
    iconBg: "#fef9c3",
    title: "New 5-star review received",
    subtitle: "Dr. Lenard Panganiban - Dentist",
    time: "4 hours ago",
  },
]

function AdminDashboard() {
  return (
    <div className="dash-page">
      <h1 className="dash-title">Dashboard</h1>

      {/* summary cards */}
      <div className="dash-cards-row">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="dash-card"
            style={{ background: card.color }}
          >
            <p className="dash-card-label">{card.label}</p>
            <p className="dash-card-value">{card.value}</p>
          </div>
        ))}
      </div>

      {/* recent activity */}
      <div className="dash-activity-card">
        <h2 className="dash-activity-title">Recent Activity</h2>

        <div className="dash-activity-list">
          {activities.map((item) => (
            <div key={item.id} className="dash-activity-item">
              <div
                className="dash-activity-icon"
                style={{ background: item.iconBg }}
              >
                {item.icon}
              </div>
              <div className="dash-activity-info">
                <p className="dash-activity-name">{item.title}</p>
                <p className="dash-activity-sub">{item.subtitle}</p>
              </div>
              <p className="dash-activity-time">{item.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard