import { useState, useEffect, useCallback } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import "./SelectRole.css"
import userRoleImg from "../../assets/role-user.png"      // replace with your image
import doctorRoleImg from "../../assets/role-doctor.png"  // replace with your image
import clinicRoleImg from "../../assets/role-clinic.png"  // replace with your image

const roles = [
  { id: "user",     label: "User",                     image: userRoleImg   },
  { id: "doctor",   label: "Doctor",                   image: doctorRoleImg },
  { id: "provider", label: "Healthcare Service Provider", image: clinicRoleImg },
]

function SelectRole() {
  const navigate = useNavigate()
  const setFooterConfig = useOutletContext()
  const [selected, setSelected] = useState("user")

  const handleNext = useCallback(() => {
    if (!selected) return
    navigate(`/register/${selected}`)
  }, [navigate, selected])

  useEffect(() => {
    if (typeof setFooterConfig === "function") {
      setFooterConfig({
        step: 1,
        total: 3,
        showPrevious: false,
        previousLabel: "Previous",
        nextLabel: "Next",
        onPrevious: undefined,
        onNext: handleNext,
      })
    }
  }, [setFooterConfig, handleNext])

  return (
    <div className="sr-page">
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

    </div>
  )
}

export default SelectRole