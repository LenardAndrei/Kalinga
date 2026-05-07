function HealthcareDetailsModal({ provider, onClose }) {
  if (!provider) return null

  return (
    <div className="app-modal-overlay" onClick={onClose}>
      <div className="app-modal" onClick={(event) => event.stopPropagation()}>
        <div className="app-modal-header">
          <div>
            <h2>Healthcare Provider Details</h2>
            <p className="app-modal-subtitle">
              Review the provider's facility and contact profile.
            </p>
          </div>
          <button className="app-modal-close" onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </div>

        <div className="app-modal-body">
          <section className="app-modal-section">
            <h3 className="app-modal-section-title">Facility</h3>
            <div className="app-modal-row">
              <span>Name</span>
              <strong>{provider.name}</strong>
            </div>
            <div className="app-modal-row">
              <span>Specialty</span>
              <strong>{provider.specialty}</strong>
            </div>
            <div className="app-modal-row">
              <span>Facility Type</span>
              <strong>{provider.facilityType}</strong>
            </div>
          </section>

          <section className="app-modal-section">
            <h3 className="app-modal-section-title">Contact</h3>
            <div className="app-modal-row">
              <span>Email</span>
              <strong>{provider.email}</strong>
            </div>
            <div className="app-modal-row">
              <span>Phone</span>
              <strong>{provider.phone}</strong>
            </div>
            <div className="app-modal-row">
              <span>Address</span>
              <strong>{provider.address}</strong>
            </div>
          </section>

          <section className="app-modal-section">
            <h3 className="app-modal-section-title">Management</h3>
            <div className="app-modal-row">
              <span>Manager</span>
              <strong>{provider.manager}</strong>
            </div>
            <div className="app-modal-row">
              <span>Accreditation</span>
              <strong>{provider.accreditation}</strong>
            </div>
            <div className="app-modal-row">
              <span>Status</span>
              <strong>{provider.status}</strong>
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

export default HealthcareDetailsModal
