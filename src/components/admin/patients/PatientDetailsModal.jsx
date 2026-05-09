function PatientDetailsModal({ patient, onClose }) {
  if (!patient) return null

  return (
    <div className="app-modal-overlay" onClick={onClose}>
      <div className="app-modal" onClick={(e) => e.stopPropagation()}>

        <div className="app-modal-header">
          <div>
            <h2>Patient Details</h2>
            <p className="app-modal-subtitle">
              Review the patient's profile and medical information.
            </p>
          </div>
          <button className="app-modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="app-modal-body">

          <section className="app-modal-section">
            <h3 className="app-modal-section-title">Profile</h3>
            <div className="app-modal-row">
              <span>Name</span>
              <strong>{patient.name}</strong>
            </div>
            <div className="app-modal-row">
              <span>Gender</span>
              <strong>{patient.gender}</strong>
            </div>
            <div className="app-modal-row">
              <span>Age</span>
              <strong>{patient.age}</strong>
            </div>
            <div className="app-modal-row">
              <span>Blood Type</span>
              <strong>{patient.bloodType}</strong>
            </div>
            <div className="app-modal-row">
              <span>Status</span>
              <strong>{patient.status}</strong>
            </div>
          </section>

          <section className="app-modal-section">
            <h3 className="app-modal-section-title">Contact</h3>
            <div className="app-modal-row">
              <span>Email</span>
              <strong>{patient.email}</strong>
            </div>
            <div className="app-modal-row">
              <span>Phone</span>
              <strong>{patient.phone}</strong>
            </div>
            <div className="app-modal-row">
              <span>Address</span>
              <strong>{patient.address}</strong>
            </div>
          </section>

          <section className="app-modal-section">
            <h3 className="app-modal-section-title">Medical Information</h3>
            <div className="app-modal-row">
              <span>Assigned Doctor</span>
              <strong>{patient.doctor}</strong>
            </div>
            <div className="app-modal-row">
              <span>Condition</span>
              <strong>{patient.condition}</strong>
            </div>
            <div className="app-modal-row">
              <span>Last Visit</span>
              <strong>{patient.lastVisit}</strong>
            </div>
            <div className="app-modal-row">
              <span>Total Appointments</span>
              <strong>{patient.patients}</strong>
            </div>
          </section>

        </div>

        <div className="app-modal-footer">
          <button className="app-modal-btn cancel" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default PatientDetailsModal