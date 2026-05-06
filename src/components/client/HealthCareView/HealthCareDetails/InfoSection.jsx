import "./InfoSection.css"
import facebookIcon from "../../../../assets/facebook.svg"
import instagramIcon from "../../../../assets/instagram.svg"

function InfoSection({ facility }) {
  return (
    <div className="info-card">
      <h2 className="info-title">Information</h2>
      <p className="info-subtitle">{facility.fullName}</p>

      <div className="info-grid">
        <div className="info-left">
          <div className="info-row">
            <svg className="info-icon" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <div>
              <p className="info-text">{facility.location}</p>
              <p className="info-text">{facility.phone}</p>
            </div>
          </div>

          <div className="info-row">
            <svg className="info-icon" viewBox="0 0 24 24" fill="white">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <p className="info-text">{facility.email}</p>
          </div>
          <div className="info-social-row">
            <a href={facility.facebook} className="info-social-link">
              <img src={facebookIcon} alt="Facebook" className="social-icon-img" />
            </a>
            <a href={facility.instagram} className="info-social-link">
              <img src={instagramIcon} alt="Instagram" className="social-icon-img" />
            </a>
          </div>
        </div>

        <div className="info-right">
          <div className="info-row">
            <svg className="info-icon" viewBox="0 0 24 24" fill="white">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
            </svg>
            <div>
              <p className="info-label">Clinic Hours</p>
              {facility.clinicHours.map((h, i) => (
                <p key={i} className="info-text">{h.day}: {h.time}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoSection