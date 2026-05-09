import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import "./UserStep.css" // shared styles

const EyeIcon = ({ open }) => open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
    </svg>
) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
)

function UserStep2() {
    const navigate = useNavigate()
    const location = useLocation()
    const step1Data = location.state?.step1 || {}

    const [confirmed, setConfirmed] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [form, setForm] = useState({
        mobileNumber: "", telephoneNumber: "",
        username: "", email: "",
        password: "", confirmPassword: "",
    })

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    const canSubmit = confirmed

    const handleSubmit = () => {
        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match.")
            return
        }
        const fullData = { ...step1Data, ...form }
        console.log("Registration data:", fullData)
        // TODO: send to API, then navigate to login or success
        navigate("/login")
    }

    return (
        <div className="reg-page">

            <h2 className="reg-page-title">USER ACCOUNT REGISTRATION</h2>

            <div className="reg-card">

                {/* Contact Information */}
                <p className="reg-section-title">Contact Information</p>
                <div className="reg-row reg-row-2">
                    <div className="reg-field">
                        <label className="reg-label">Mobile Number</label>
                        <input className="reg-input" name="mobileNumber" value={form.mobileNumber}
                               onChange={handleChange} type="tel" />
                    </div>
                    <div className="reg-field">
                        <label className="reg-label">Telephone Number</label>
                        <input className="reg-input" name="telephoneNumber" value={form.telephoneNumber}
                               onChange={handleChange} type="tel" />
                    </div>
                </div>

                <div className="reg-divider" />

                {/* Account Details */}
                <p className="reg-section-title">Account Details</p>
                <div className="reg-row reg-row-2">
                    <div className="reg-field">
                        <label className="reg-label">Create Username</label>
                        <input className="reg-input" name="username" value={form.username}
                               onChange={handleChange} required />
                    </div>
                    <div className="reg-field">
                        <label className="reg-label">Create Email</label>
                        <input className="reg-input" name="email" value={form.email}
                               onChange={handleChange} type="email" required />
                    </div>
                </div>

                <div className="reg-row reg-row-2">
                    <div className="reg-field">
                        <label className="reg-label">Create Password</label>
                        <div className="reg-password-wrapper">
                            <input
                                className="reg-input"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                required
                            />
                            <button type="button" className="reg-eye-btn"
                                    onClick={() => setShowPassword(s => !s)}>
                                <EyeIcon open={showPassword} />
                            </button>
                        </div>
                    </div>
                    <div className="reg-field">
                        <label className="reg-label">Confirm Password</label>
                        <div className="reg-password-wrapper">
                            <input
                                className="reg-input"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                type={showConfirm ? "text" : "password"}
                                required
                            />
                            <button type="button" className="reg-eye-btn"
                                    onClick={() => setShowConfirm(s => !s)}>
                                <EyeIcon open={showConfirm} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Create Account button */}
                <button
                    type="button"
                    className="reg-submit-btn"
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                >
                    Create Account
                </button>
            </div>

            {/* ── confirm row — below card, above footer ── */}
            <div className="reg-confirm-row">
                <label htmlFor="confirm2">Are you sure that all your information are correct?</label>
                <input
                    type="checkbox"
                    id="confirm2"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                />
            </div>

            {/* ── footer — Previous only, no Next on last step ── */}
            <div className="reg-footer">
                <div className="reg-footer-left">
                    <button
                        type="button"
                        className="reg-nav-btn"
                        onClick={() => navigate("/register/user/step1", { state: { step1: step1Data } })}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"/>
                            <polyline points="12 19 5 12 12 5"/>
                        </svg>
                        Previous
                    </button>
                </div>

                <div className="reg-dots">
                    <div className="reg-dot" />
                    <div className="reg-dot" />
                    <div className="reg-dot active" />
                </div>

                <div className="reg-footer-right" />
            </div>
        </div>
    )
}

export default UserStep2