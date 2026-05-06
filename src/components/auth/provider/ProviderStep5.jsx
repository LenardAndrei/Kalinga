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

function ProviderStep5() {
    const navigate = useNavigate()
    const location = useLocation()
    const step1Data = location.state?.step1 || {}
    const step2Data = location.state?.step2 || {}
    const step3Data = location.state?.step3 || {}
    const step4Data = location.state?.step4 || {}

    const [confirmed, setConfirmed] = useState(false)
    const [staff, setStaff] = useState([
        { name: "", position: "" },
        { name: "", position: "" },
        { name: "", position: "" },
        { name: "", position: "" },
        { name: "", position: "" },
    ])

    const handleStaffChange = (index, field, value) => {
        setStaff((prev) => {
            const updated = [...prev]
            updated[index] = { ...updated[index], [field]: value }
            return updated
        })
    }

    const addStaff = () => {
        setStaff((prev) => [...prev, { name: "", position: "" }])
    }

    const handleNext = () => {
        navigate("/register/provider/step6", {
            state: {
                step1: step1Data,
                step2: step2Data,
                step3: step3Data,
                step4: step4Data,
                step5: { staff },
            },
        })
    }

    return (
        <div className="pr-page">
            <h2 className="pr-page-title">Healthcare Service Provider Registration</h2>

            <div className="pr-card">
                <p className="pr-section-title">Staff / Assigned Doctors</p>

                <div className="pr-staff-list">
                    {staff.map((member, idx) => (
                        <div key={idx} className="pr-staff-row">
                            <div className="pr-field">
                                <label className="pr-label">Name</label>
                                <input
                                    className="pr-input"
                                    value={member.name}
                                    onChange={(e) => handleStaffChange(idx, "name", e.target.value)}
                                />
                            </div>
                            <div className="pr-field">
                                <label className="pr-label">Position</label>
                                <input
                                    className="pr-input"
                                    value={member.position}
                                    onChange={(e) => handleStaffChange(idx, "position", e.target.value)}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add more staff */}
                <div className="pr-staff-actions">
                    <button
                        type="button"
                        className="pr-add-btn"
                        onClick={addStaff}
                        title="Add another staff member"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Confirm row */}
            <div className="pr-confirm-row">
                <label htmlFor="pr-confirm5">Are you sure that all your information are correct?</label>
                <input
                    type="checkbox"
                    id="pr-confirm5"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                />
            </div>

            {/* Footer — dot 6 active (index=5) */}
            <div className="pr-footer">
                <div className="pr-footer-left">
                    <button
                        type="button"
                        className="pr-nav-btn"
                        onClick={() =>
                            navigate("/register/provider/step4", {
                                state: {
                                    step1: step1Data,
                                    step2: step2Data,
                                    step3: step3Data,
                                    step4: step4Data,
                                },
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

                <Dots active={5} />

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

export default ProviderStep5
