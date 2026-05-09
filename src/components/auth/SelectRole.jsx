import { useState, useEffect, useCallback } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import "./SelectRole.css"
import userRoleImg from "../../assets/role-user.png"
import doctorRoleImg from "../../assets/role-doctor.png"
import clinicRoleImg from "../../assets/role-clinic.png"

const roles = [
  { id: "user",     label: "User",                        image: userRoleImg   },
  { id: "doctor",   label: "Doctor",                      image: doctorRoleImg },
  { id: "provider", label: "Healthcare Service Provider",  image: clinicRoleImg },
]

// Dot counts per role
const TOTAL_DOTS = {
  user:     3,  // SelectRole + step1–2
  doctor:   5,  // SelectRole + step1–4
  provider: 8,  // SelectRole + step1–7
}

function SelectRole() {
  const navigate = useNavigate()
  const { setFooterConfig } = useOutletContext() || {}
  const [selected, setSelected] = useState("user")

  const handleNext = useCallback(() => {
    if (!selected) return
    navigate(`/register/${selected}/step1`)
  }, [navigate, selected])

  useEffect(() => {
    if (typeof setFooterConfig === "function") {
      setFooterConfig({
        step: 1,
        total: TOTAL_DOTS[selected] || 3,
        showPrevious: false,
        previousLabel: "Previous",
        nextLabel: "Next",
        onPrevious: undefined,
        onNext: handleNext,
      })
    }
  }, [setFooterConfig, handleNext, selected])

  const totalDots = TOTAL_DOTS[selected] || 3

  return (
      <div className="sr-page">
        {/* ── white top section ── */}
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

        {/* ── bottom gradient section ── */}
        <div className="sr-bottom-section">
          {/* left spacer — balances the grid so dots stay centred */}
          <div className="sr-bottom-spacer" />

          <div className="sr-dots">
            {Array.from({ length: totalDots }, (_, i) => (
                <div key={i} className={`sr-dot${i === 0 ? " active" : ""}`} />
            ))}
          </div>

          <button
              className="sr-next-btn"
              onClick={handleNext}
              disabled={!selected}
          >
            Next
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
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
