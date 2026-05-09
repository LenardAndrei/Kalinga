import { useState } from "react"

function HealthcareDetailsModal({ provider, onClose }) {
  const [showSuspendModal, setShowSuspendModal] = useState(false)
  const [suspendReason, setSuspendReason] = useState("")
  const [suspendDays, setSuspendDays] = useState("")
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
          <button
            className="app-modal-btn suspend"
            onClick={() => setShowSuspendModal(true)}
          >
            Suspend Healthcare
          </button>

          <button className="app-modal-btn cancel" onClick={onClose}>
            Close
          </button>
        </div>
        {showSuspendModal && (
          <div
            className="suspend-overlay"
            onClick={() => setShowSuspendModal(false)}
          >
            <div
              className="suspend-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Suspend Healthcare Account</h3>

              <div className="suspend-field">
                <label>Reason for Suspension</label>
                <textarea
                  placeholder="Enter suspension reason..."
                  value={suspendReason}
                  onChange={(e) => setSuspendReason(e.target.value)}
                />
              </div>

              <div className="suspend-field">
                <label>Suspension Duration (days)</label>
                <input
                  type="number"
                  placeholder="e.g. 7"
                  value={suspendDays}
                  onChange={(e) => setSuspendDays(e.target.value)}
                />
              </div>

              <div className="suspend-actions">
                <button
                  className="app-modal-btn cancel"
                  onClick={() => setShowSuspendModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="app-modal-btn confirm-suspend"
                  onClick={() => {
                    console.log({
                      provider: provider.name,
                      reason: suspendReason,
                      days: suspendDays,
                    })

                    alert("Healthcare account suspended.")

                    setShowSuspendModal(false)
                    setSuspendReason("")
                    setSuspendDays("")
                  }}
                >
                  Confirm Suspension
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HealthcareDetailsModal
