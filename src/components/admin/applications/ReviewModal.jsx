function ReviewModal({ application, type, onClose, onAccept, onDecline }) {
  if (!application) return null

  const isDoctor = type === "doctor"
  const canReview = application.status === "Pending"

  return (
    <div className="app-modal-overlay" onClick={onClose}>
      <div className="app-modal" onClick={(event) => event.stopPropagation()}>
        <div className="app-modal-header">
          <div>
            <h2>{isDoctor ? "Doctor Application Review" : "Healthcare Provider Review"}</h2>
            <p className="app-modal-subtitle">Review the application details and verify status before making a decision.</p>
          </div>
          <button className="app-modal-close" onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </div>

        <div className="app-modal-body">
          <section className="app-modal-section">
            <h3 className="app-modal-section-title">Basic Information</h3>
            <div className="app-modal-row">
              <span>Name</span>
              <strong>{application.name}</strong>
            </div>
            <div className="app-modal-row">
              <span>{isDoctor ? "Specialty" : "Location"}</span>
              <strong>{isDoctor ? application.specialty : application.location}</strong>
            </div>
            <div className="app-modal-row">
              <span>Date Applied</span>
              <strong>{application.dateApplied}</strong>
            </div>
            {isDoctor && (
              <div className="app-modal-row">
                <span>Clinic / Practice</span>
                <strong>{application.clinicName || "N/A"}</strong>
              </div>
            )}
          </section>

          <section className="app-modal-section">
            <h3 className="app-modal-section-title">Contact Details</h3>
            <div className="app-modal-row">
              <span>Email</span>
              <strong>{application.email || "Not provided"}</strong>
            </div>
            <div className="app-modal-row">
              <span>Phone</span>
              <strong>{application.phone || "Not provided"}</strong>
            </div>
            {isDoctor ? (
              <div className="app-modal-row">
                <span>Address</span>
                <strong>{application.address || "Not provided"}</strong>
              </div>
            ) : (
              <div className="app-modal-row">
                <span>Contact Person</span>
                <strong>{application.contactPerson || "Not provided"}</strong>
              </div>
            )}
          </section>

          <section className="app-modal-section">
            <h3 className="app-modal-section-title">{isDoctor ? "Professional Details" : "Healthcare Details"}</h3>
            {isDoctor ? (
              <>
                <div className="app-modal-row">
                  <span>License Number</span>
                  <strong>{application.licenseNumber || "N/A"}</strong>
                </div>
                <div className="app-modal-row">
                  <span>Years of Experience</span>
                  <strong>{application.experience || "N/A"}</strong>
                </div>
                <div className="app-modal-row">
                  <span>Board Status</span>
                  <strong>{application.boardStatus || "N/A"}</strong>
                </div>
              </>
            ) : (
              <>
                <div className="app-modal-row">
                  <span>Facility Type</span>
                  <strong>{application.facilityType || "N/A"}</strong>
                </div>
                <div className="app-modal-row">
                  <span>Bed Capacity</span>
                  <strong>{application.bedCapacity || "N/A"}</strong>
                </div>
                <div className="app-modal-row">
                  <span>Services Offered</span>
                  <strong>{application.servicesOffered || "N/A"}</strong>
                </div>
                <div className="app-modal-row">
                  <span>Accreditation</span>
                  <strong>{application.accreditation || "N/A"}</strong>
                </div>
              </>
            )}
          </section>

          <section className="app-modal-section app-modal-status-section">
            <h3 className="app-modal-section-title">Current Status</h3>
            <div className="app-modal-status-row">
              <span>Status</span>
              <span className={`app-modal-status-pill status-${application.status.toLowerCase()}`}>
                {application.status}
              </span>
            </div>
          </section>

          <p className="app-modal-note">
            {canReview
              ? "Use the buttons below to accept or decline the application. Cancel will close the window without changing status."
              : "This application has already been reviewed, so no action is available."}
          </p>
        </div>

        <div className="app-modal-footer">
          {canReview && (
            <>
              <button className="app-modal-btn decline" onClick={() => onDecline(application.id)}>
                Decline
              </button>
              <button className="app-modal-btn accept" onClick={() => onAccept(application.id)}>
                Accept
              </button>
            </>
          )}
          <button className="app-modal-btn cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReviewModal
