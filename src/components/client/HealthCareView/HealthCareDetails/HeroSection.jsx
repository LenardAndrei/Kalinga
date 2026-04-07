import "./HeroSection.css"
import { useNavigate } from "react-router-dom"

function HeroSection({ facility }) {
  const navigate = useNavigate()

  return (
    <section className="hero-wrapper" style={{ backgroundImage: `url(${facility.image})` }}>
      <button className="hero-back-btn" onClick={() => navigate(-1)} aria-label="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H6" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="hero-overlay" />

      <div className="hero-content">
        <span className={`hero-badge ${facility.status === "open" ? "open" : "closing"}`}>
          {facility.status === "open" ? "Open Now" : "Closing Soon"}
        </span>
        <h1 className="hero-title">{facility.name}</h1>
        <p className="hero-location">{facility.location}</p>
      </div>
    </section>
  )
}

export default HeroSection