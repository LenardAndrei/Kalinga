import "./Healthcare.css"
import HealthcareTable from "../../components/admin/healthcare/HealthcareTable"

const healthcareSummary = [
  { label: "Total Healthcare", value: 167 },
  { label: "Active Healthcare", value: 67 },
  { label: "Inactive Doctors", value: 2 },
  { label: "New This Month", value: 4 },
]

function Healthcare() {
  return (
    <div className="healthcare-page">
      <h1 className="healthcare-title">Healthcare Provider</h1>

      <div className="healthcare-cards-row">
        {healthcareSummary.map((card) => (
          <div key={card.label} className="healthcare-card">
            <p className="healthcare-card-label">{card.label}</p>
            <p className="healthcare-card-value">{card.value}</p>
          </div>
        ))}
      </div>

      <HealthcareTable />
    </div>
  )
}

export default Healthcare
