import "./HeroSection.css"
import { useNavigate } from "react-router-dom"

function HeroSection({ facility }) {
  const navigate = useNavigate()

  return (
    <div
      className="hero-wrapper"
      style={{ backgroundImage: `url(${facility.image})` }}
    >
      <button className="hero-back-btn" onClick={() => navigate(-1)}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
      </button>

      <div className="hero-overlay" />

      <div className="hero-content">
        {/* title + badge on same row */}
        <div className="hero-title-row">
          <h1 className="hero-title">{facility.name}</h1>
          <span className={`hero-badge ${facility.status === "open" ? "open" : "closing"}`}>
            {facility.status === "open" ? "Open Now" : "Closing Soon"}
          </span>
        </div>
        <p className="hero-location">{facility.location}</p>
      </div>
    </div>
  )
}

export default HeroSection