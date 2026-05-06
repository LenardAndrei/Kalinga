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

function ProviderStep2() {
    const navigate = useNavigate()
    const location = useLocation()
    const step1Data = location.state?.step1 || {}

    const [confirmed, setConfirmed] = useState(false)
    const [contactNumbers, setContactNumbers] = useState([""])
    const [form, setForm] = useState({
        emailAddress: "",
        website: "",
        facebookPage: "",
        instagramPage: "",
        otherSocialMedia: "",
    })

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    const handleContactChange = (index, value) => {
        setContactNumbers((prev) => {
            const updated = [...prev]
            updated[index] = value
            return updated
        })
    }

    const addContactNumber = () => {
        setContactNumbers((prev) => [...prev, ""])
    }

    const handleNext = () => {
        navigate("/register/provider/step3", {
            state: { step1: step1Data, step2: { ...form, contactNumbers } },
        })
    }

    return (
        <div className="pr-page">
            <h2 className="pr-page-title">Healthcare Service Provider Registration</h2>

            <div className="pr-card">
                <p className="pr-section-title">Contact Information</p>

                {/* Contact Number(s) with + button */}
                <div className="pr-field" style={{ marginBottom: 14 }}>
                    <label className="pr-label">Service / Facility Contact Number</label>
                    {contactNumbers.map((num, idx) => (
                        <div key={idx} className="pr-add-row" style={{ marginBottom: idx < contactNumbers.length - 1 ? 8 : 0 }}>
                            <input
                                className="pr-input"
                                type="tel"
                                value={num}
                                onChange={(e) => handleContactChange(idx, e.target.value)}
                            />
                            {idx === contactNumbers.length - 1 && (
                                <button
                                    type="button"
                                    className="pr-add-btn"
                                    onClick={addContactNumber}
                                    title="Add another contact number"
                                >
                                    +
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="pr-row pr-row-1" style={{ marginBottom: 14 }}>
                    <div className="pr-field">
                        <label className="pr-label">Email Address</label>
                        <input
                            className="pr-input"
                            name="emailAddress"
                            type="email"
                            value={form.emailAddress}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="pr-row pr-row-1" style={{ marginBottom: 14 }}>
                    <div className="pr-field">
                        <label className="pr-label">Website (optional)</label>
                        <input
                            className="pr-input"
                            name="website"
                            value={form.website}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="pr-row pr-row-2" style={{ marginBottom: 14 }}>
                    <div className="pr-field">
                        <label className="pr-label">Facebook Page (optional)</label>
                        <input
                            className="pr-input"
                            name="facebookPage"
                            value={form.facebookPage}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="pr-field">
                        <label className="pr-label">Other Social Media (ex. platform – Username)</label>
                        <input
                            className="pr-input"
                            name="otherSocialMedia"
                            value={form.otherSocialMedia}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="pr-row pr-row-1">
                    <div className="pr-field">
                        <label className="pr-label">Instagram page (optional)</label>
                        <input
                            className="pr-input"
                            name="instagramPage"
                            value={form.instagramPage}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            {/* Confirm row */}
            <div className="pr-confirm-row">
                <label htmlFor="pr-confirm2">Are you sure that all your information are correct?</label>
                <input
                    type="checkbox"
                    id="pr-confirm2"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                />
            </div>

            {/* Footer — dot 3 active (index=2) */}
            <div className="pr-footer">
                <div className="pr-footer-left">
                    <button
                        type="button"
                        className="pr-nav-btn"
                        onClick={() => navigate("/register/provider/step1", { state: { step1: step1Data } })}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Previous
                    </button>
                </div>

                <Dots active={2} />

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

export default ProviderStep2
