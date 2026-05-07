function DoctorDetailsModal({ doctor, onClose }) {
  if (!doctor) return null

  return (
    <div className="app-modal-overlay" onClick={onClose}>
      <div className="app-modal" onClick={(event) => event.stopPropagation()}>
        <div className="app-modal-header">
          <div>
            <h2>Doctor Details</h2>
            <p className="app-modal-subtitle">
              Review the doctor's profile and contact information.
            </p>
          </div>
          <button className="app-modal-close" onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </div>

        <div className="app-modal-body">
          <section className="app-modal-section">
            <h3 className="app-modal-section-title">Profile</h3>
            <div className="app-modal-row">
              <span>Name</span>
              <strong>{doctor.name}</strong>
            </div>
            <div className="app-modal-row">
              <span>Specialty</span>
              <strong>{doctor.specialty}</strong>
            </div>
            <div className="app-modal-row">
              <span>Clinic / Practice</span>
              <strong>{doctor.clinic}</strong>
            </div>
            <div className="app-modal-row">
              <span>Patients</span>
              <strong>{doctor.patients}</strong>
            </div>
          </section>

          <section className="app-modal-section">
            <h3 className="app-modal-section-title">Contact</h3>
            <div className="app-modal-row">
              <span>Email</span>
              <strong>{doctor.email}</strong>
            </div>
            <div className="app-modal-row">
              <span>Phone</span>
              <strong>{doctor.phone}</strong>
            </div>
            <div className="app-modal-row">
              <span>Address</span>
              <strong>{doctor.address}</strong>
            </div>
          </section>

          <section className="app-modal-section">
            <h3 className="app-modal-section-title">Professional Details</h3>
            <div className="app-modal-row">
              <span>License Number</span>
              <strong>{doctor.licenseNumber}</strong>
            </div>
            <div className="app-modal-row">
              <span>Years of Experience</span>
              <strong>{doctor.experienceYears}</strong>
            </div>
            <div className="app-modal-row">
              <span>Status</span>
              <strong>{doctor.status}</strong>
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

export default DoctorDetailsModal
