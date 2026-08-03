import DoctorApplicationsTable from "./DoctorApplicationsTable"
import HealthcareApplicationsTable from "./HealthcareApplicationsTable"

function ApplicationsTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: "doctor",     label: "Doctor Applications" },
    { id: "healthcare", label: "Healthcare Provider Application" },
  ]

  return (
    <div className="app-card">

      {/* tab buttons */}
      <div className="app-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`app-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* tab content */}
      <div className="app-tab-content">
        {activeTab === "doctor" && <DoctorApplicationsTable />}
        {activeTab === "healthcare" && <HealthcareApplicationsTable />}
      </div>

    </div>
  )
}

export default ApplicationsTabs