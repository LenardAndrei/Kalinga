import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./SelectRole.css"
import logo from "../../assets/LOGO.svg"
import userRoleImg from "../../assets/role-user.png"      // replace with your image
import doctorRoleImg from "../../assets/role-doctor.png"  // replace with your image
import clinicRoleImg from "../../assets/role-clinic.png"  // replace with your image

const roles = [
  { id: "user",     label: "User",                     image: userRoleImg   },
  { id: "doctor",   label: "Doctor",                   image: doctorRoleImg },
  { id: "provider", label: "Healthcare Service\nProvider", image: clinicRoleImg },
]

function SelectRole() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState("user")

  const handleNext = () => {
    if (!selected) return
    // pass selected role to register page
    navigate(`/register/${selected}`)
  }

  return (
    <div className="sr-page">

      {/* top bar */}
      <div className="sr-topbar">
        <img src={logo} alt="Kalinga" className="sr-logo" />
        <span className="sr-brand">KALINGA</span>
      </div>

      {/* white section */}
      <div className="sr-top-section">
        <h1 className="sr-title">Select your role</h1>
        <p className="sr-subtitle">
          Choose the role that best describes how you will use Kalinga.
        </p>

        {/* role cards */}
        <div className="sr-cards-row">
          {roles.map((role) => (
            <div
              key={role.id}
              className={`sr-card ${selected === role.id ? "selected" : ""}`}
              onClick={() => setSelected(role.id)}
            >
              <img
                src={role.image}
                alt={role.label}
                className="sr-card-img"
              />
              <div className="sr-card-footer">
                <p className="sr-card-label">
                  {role.label.split("\n").map((line, i) => (
                    <span key={i}>{line}{i < role.label.split("\n").length - 1 && <br />}</span>
                  ))}
                </p>
                <div className={`sr-radio ${selected === role.id ? "checked" : ""}`}>
                  {selected === role.id && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="#2A787C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* teal gradient bottom section */}
      <div className="sr-bottom-section">

        {/* step dots */}
        <div className="sr-dots">
          <div className="sr-dot active" />
          <div className="sr-dot" />
          <div className="sr-dot" />
        </div>

        {/* next button */}
        <button
          className="sr-next-btn"
          onClick={handleNext}
          disabled={!selected}
        >
          Next
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>

      </div>
    </div>
  )
}

export default SelectRole