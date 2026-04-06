import { useState, useEffect } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { getServiceById } from "../../../../services/healthcareService"
import "./HealthCareDetails.css"

function HealthCareDetails() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if service data was passed via React Router state
    if (location.state?.service) {
      setService(location.state.service)
      setLoading(false)
    } else {
      // Fetch service by ID if not passed via state
      getServiceById(id)
        .then((data) => {
          setService(data)
          setLoading(false)
        })
        .catch((err) => {
          setError(err.message)
          setLoading(false)
        })
    }
  }, [id, location.state])

  const handleBack = () => {
    navigate("/client/healthcare")
  }

  if (loading) {
    return <div className="hcd-loading">Loading service details...</div>
  }

  if (error) {
    return (
      <div className="hcd-error">
        <p>Error: {error}</p>
        <button onClick={handleBack} className="hcd-back-btn">
          Back to Services
        </button>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="hcd-error">
        <p>Service not found.</p>
        <button onClick={handleBack} className="hcd-back-btn">
          Back to Services
        </button>
      </div>
    )
  }

  return (
    <div className="hcd-page">
      <button onClick={handleBack} className="hcd-back-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="19" y1="12" x2="5" y2="12"/>
          <polyline points="12 19 5 12 12 5"/>
        </svg>
        Back to Services
      </button>

      <div className="hcd-container">
        <div className="hcd-image-section">
          <img src={service.image} alt={service.name} className="hcd-image" />
          <div className="hcd-badge-container">
            {service.status === "Open" ? (
              <span className="hcd-badge hcd-badge-open">Open Now</span>
            ) : (
              <span className="hcd-badge hcd-badge-closing">Closing Soon</span>
            )}
            <span className="hcd-badge hcd-badge-type">{service.type}</span>
          </div>
        </div>

        <div className="hcd-details-section">
          <h1 className="hcd-title">{service.name}</h1>

          <div className="hcd-info-grid">
            <div className="hcd-info-item">
              <h3 className="hcd-info-label">Location</h3>
              <p className="hcd-info-value">{service.location}</p>
            </div>

            <div className="hcd-info-item">
              <h3 className="hcd-info-label">Services Offered</h3>
              <p className="hcd-info-value">{service.services}</p>
            </div>

            <div className="hcd-info-item">
              <h3 className="hcd-info-label">Type</h3>
              <p className="hcd-info-value">{service.type}</p>
            </div>

            <div className="hcd-info-item">
              <h3 className="hcd-info-label">Cost</h3>
              <p className="hcd-info-value">{service.cost}</p>
            </div>

            <div className="hcd-info-item">
              <h3 className="hcd-info-label">Status</h3>
              <p className={`hcd-info-value ${service.status === "Open" ? "hcd-status-open" : "hcd-status-closing"}`}>
                {service.status}
              </p>
            </div>

            <div className="hcd-info-item">
              <h3 className="hcd-info-label">Rating</h3>
              <p className="hcd-info-value">
                <span className="hcd-rating">
                  {"⭐ ".repeat(service.rating)}{service.rating}/5
                </span>
              </p>
            </div>
          </div>

          {service.time && (
            <div className="hcd-timing">
              <h3 className="hcd-info-label">Operating Hours</h3>
              <p className="hcd-info-value">{service.time}</p>
            </div>
          )}

          <div className="hcd-actions">
            <button className="hcd-btn hcd-btn-primary">Get Directions</button>
            <button className="hcd-btn hcd-btn-secondary">Contact Service</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HealthCareDetails
