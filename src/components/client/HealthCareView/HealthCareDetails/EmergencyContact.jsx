import "./EmergencyContact.css"

function EmergencyContact({ data }) {
  return (
    <div className="emergency-card">
      <div className="emergency-header">
        <h2 className="emergency-title">Emergency Contact Information</h2>
        <p className="emergency-subtitle">{data.facilityName}</p>
      </div>

      <div className="emergency-grid">
        <div className="emergency-item">
          <svg className="emergency-icon" viewBox="0 0 24 24" fill="white">
            <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
          </svg>
          <div>
            <p className="emergency-label">Emergency Ambulance</p>
            <p className="emergency-value">{data.ambulance}</p>
          </div>
        </div>

        <div className="emergency-item">
          <svg className="emergency-icon" viewBox="0 0 24 24" fill="white">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
          </svg>
          <div>
            <p className="emergency-label">Nearest Hospital</p>
            <p className="emergency-value">{data.nearestHospital}</p>
            <p className="emergency-distance">{data.distance}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmergencyContact