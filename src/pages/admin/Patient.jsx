import { patientSummary } from "../../services/patientsData"
import PatientTable from "../../components/admin/patients/PatientTable"
import "../admin/Patient.css"   // reuse the same CSS

function Patients() {
  return (
    <div className="doctors-page">
      <h1 className="doctors-title">Patients</h1>

      <div className="doctors-cards-row">
        {patientSummary.map((card) => (
          <div key={card.label} className="doctor-card">
            <p className="doctor-card-label">{card.label}</p>
            <p className="doctor-card-value">{card.value}</p>
          </div>
        ))}
      </div>

      <PatientTable />
    </div>
  )
}

export default Patients