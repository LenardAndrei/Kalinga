import "./HeroSection.css"
import { useNavigate } from "react-router-dom"
import backButton from "../../../../assets/back-button.png"

function HeroSection({ facility }) {
  const navigate = useNavigate()

  return (
    <div
      className="hero-wrapper"
      style={{ backgroundImage: `url(${facility.image})` }}
    >
    <button className="hero-back-btn" onClick={() => navigate(-1)}>
      <img src={backButton} alt="back" className="back-btn-img" />
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