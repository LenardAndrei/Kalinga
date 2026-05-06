import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import "./DoctorStep.css"

function DoctorStep2() {
    const navigate = useNavigate()
    const location = useLocation()
    const step1Data = location.state?.step1 || {}

    const [confirmed, setConfirmed] = useState(false)
    const [form, setForm] = useState({
        emailAddress: "",
        contactNumber: "",
        clinicAddress: "",
        clinicContactNumber: "",
    })

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    const handleNext = () => {
        navigate("/register/doctor/step3", {
            state: { step1: step1Data, step2: form },
        })
    }

    return (
        <div className="dr-page">
            <h2 className="dr-page-title">Doctor Account Registration</h2>

            { /* apply the line below to make the width of the card shorter if want nyo ng 1 column lang */
                /* <div className="dr-card dr-card-narrow"> */}
            <div className="dr-card">
                <p className="dr-section-title">Contact Information</p>

                { /* change row from 2 to 1 for 1 column in contact info (if want nyo), change  */
                    /* <div className="dr-row dr-row-1"> */}
                <div className="dr-row dr-row-2">
                    <div className="dr-field">
                        <label className="dr-label">Email Address</label>
                        <input
                            className="dr-input"
                            name="emailAddress"
                            type="email"
                            value={form.emailAddress}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="dr-field">
                        <label className="dr-label">Contact Number</label>
                        <input
                            className="dr-input"
                            name="contactNumber"
                            type="tel"
                            value={form.contactNumber}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                { /* for 1 column in contact info (if want nyo) */
                    /* <div className="dr-row dr-row-1"> */}
                <div className="dr-row dr-row-2">
                    <div className="dr-field">
                        <label className="dr-label">Clinic Address (optional)</label>
                        <input
                            className="dr-input"
                            name="clinicAddress"
                            value={form.clinicAddress}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="dr-field">
                        <label className="dr-label">Clinic Contact Number (optional)</label>
                        <input
                            className="dr-input"
                            name="clinicContactNumber"
                            type="tel"
                            value={form.clinicContactNumber}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            {/* Confirm row */}
            <div className="dr-confirm-row">
                <label htmlFor="dr-confirm2">Are you sure that all your information are correct?</label>
                <input
                    type="checkbox"
                    id="dr-confirm2"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                />
            </div>

            {/* Footer — 5 dots, dot 3 active */}
            <div className="dr-footer">
                <div className="dr-footer-left">
                    <button
                        type="button"
                        className="dr-nav-btn"
                        onClick={() =>
                            navigate("/register/doctor/step1", {
                                state: { step1: step1Data },
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

                <div className="dr-dots">
                    <div className="dr-dot" />
                    <div className="dr-dot" />
                    <div className="dr-dot active" />
                    <div className="dr-dot" />
                    <div className="dr-dot" />
                </div>

                <div className="dr-footer-right">
                    <button
                        type="button"
                        className="dr-nav-btn"
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

export default DoctorStep2