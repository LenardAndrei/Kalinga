import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import "./ProviderStep.css"

const TOTAL_DOTS = 8

function Dots({ active }) {
    return (
        <div className="pr-dots">
            {Array.from({ length: TOTAL_DOTS }, (_, i) => (
                <div key={i} className={`pr-dot${i === active ? " active" : ""}`} />
            ))}
        </div>
    )
}

function ProviderStep3() {
    const navigate = useNavigate()
    const location = useLocation()
    const step1Data = location.state?.step1 || {}
    const step2Data = location.state?.step2 || {}

    const [confirmed, setConfirmed] = useState(false)
    const [services, setServices] = useState(["", "", "", "", "", ""])

    const handleServiceChange = (index, value) => {
        setServices((prev) => {
            const updated = [...prev]
            updated[index] = value
            return updated
        })
    }

    const addService = () => {
        setServices((prev) => [...prev, ""])
    }

    const handleNext = () => {
        navigate("/register/provider/step4", {
            state: { step1: step1Data, step2: step2Data, step3: { services } },
        })
    }

    return (
        <div className="pr-page">
            <h2 className="pr-page-title">Healthcare Service Provider Registration</h2>

            <div className="pr-card" style={{ maxWidth: 600 }}>
                <p className="pr-section-title">Services Offered</p>

                <div className="pr-services-list">
                    {services.map((service, idx) => (
                        <input
                            key={idx}
                            className="pr-input"
                            value={service}
                            onChange={(e) => handleServiceChange(idx, e.target.value)}
                        />
                    ))}
                </div>

                {/* Add more button */}
                <div className="pr-staff-actions">
                    <button
                        type="button"
                        className="pr-add-btn"
                        onClick={addService}
                        title="Add another service"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Confirm row */}
            <div className="pr-confirm-row">
                <label htmlFor="pr-confirm3">Are you sure that all your information are correct?</label>
                <input
                    type="checkbox"
                    id="pr-confirm3"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                />
            </div>

            {/* Footer — dot 4 active (index=3) */}
            <div className="pr-footer">
                <div className="pr-footer-left">
                    <button
                        type="button"
                        className="pr-nav-btn"
                        onClick={() =>
                            navigate("/register/provider/step2", {
                                state: { step1: step1Data, step2: step2Data },
                            })
                        }
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Previous
                    </button>
                </div>

                <Dots active={3} />

                <div className="pr-footer-right">
                    <button
                        type="button"
                        className="pr-nav-btn"
                        onClick={handleNext}
                        disabled={!confirmed}
                    >
                        Next
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProviderStep3
