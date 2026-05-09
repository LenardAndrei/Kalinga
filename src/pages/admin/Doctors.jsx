import "./Doctors.css"
import DoctorTable from "../../components/admin/doctors/DoctorTable"

const doctorSummary = [
  { label: "Total Doctors", value: 167 },
  { label: "Active Doctors", value: 67 },
  { label: "Inactive Doctors", value: 2 },
  { label: "New This Month", value: 4 },
]

function Doctors() {
  return (
    <div className="doctors-page">
      <h1 className="doctors-title">Doctors</h1>

      <div className="doctors-cards-row">
        {doctorSummary.map((card) => (
          <div key={card.label} className="doctor-card">
            <p className="doctor-card-label">{card.label}</p>
            <p className="doctor-card-value">{card.value}</p>
          </div>
        ))}
      </div>

      <DoctorTable />
    </div>
  )
}

export default Doctors
