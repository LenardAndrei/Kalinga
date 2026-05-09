import { useState, useRef } from "react"
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

const EyeIcon = ({ open }) => open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
)

const UploadIcon = () => (
    <svg className="pr-upload-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="14" width="48" height="36" rx="6" fill="rgba(0,0,0,0.15)" />
        <circle cx="22" cy="28" r="6" fill="rgba(0,0,0,0.2)" />
        <path d="M8 44l14-12 10 10 8-8 16 16" stroke="rgba(0,0,0,0.25)" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
)

function ProviderStep7() {
    const navigate = useNavigate()
    const location = useLocation()
    const step1Data = location.state?.step1 || {}
    const step2Data = location.state?.step2 || {}
    const step3Data = location.state?.step3 || {}
    const step4Data = location.state?.step4 || {}
    const step5Data = location.state?.step5 || {}
    const step6Data = location.state?.step6 || {}

    const fileInputRef = useRef(null)
    const [ownerIdPreview, setOwnerIdPreview] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [confirmed, setConfirmed] = useState(false)

    const [form, setForm] = useState({
        adminName: "",
        adminEmail: "",
        password: "",
        confirmPassword: "",
    })

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) setOwnerIdPreview(URL.createObjectURL(file))
    }

    const handleSubmit = () => {
        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match.")
            return
        }
        const fullData = {
            ...step1Data, ...step2Data, ...step3Data,
            ...step4Data, ...step5Data, ...step6Data, ...form
        }
        console.log("Provider Registration data:", fullData)
        // TODO: send to API, then navigate to login
        navigate("/login")
    }

    return (
        <div className="pr-page">
            <h2 className="pr-page-title">Healthcare Service Provider Registration</h2>

            <div className="pr-card pr-card-narrow">
                <p className="pr-section-title">Account Credentials</p>

                <div className="pr-account-grid">
                    {/* Left: fields */}
                    <div className="pr-account-fields">
                        <div className="pr-field">
                            <label className="pr-label">Admin Name (Representative)</label>
                            <input
                                className="pr-input"
                                name="adminName"
                                value={form.adminName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="pr-field">
                            <label className="pr-label">Admin Email</label>
                            <input
                                className="pr-input"
                                name="adminEmail"
                                type="email"
                                value={form.adminEmail}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="pr-field">
                            <label className="pr-label">Create Password</label>
                            <div className="pr-password-wrapper">
                                <input
                                    className="pr-input"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={form.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="pr-eye-btn"
                                    onClick={() => setShowPassword((s) => !s)}
                                >
                                    <EyeIcon open={showPassword} />
                                </button>
                            </div>
                        </div>

                        <div className="pr-field">
                            <label className="pr-label">Confirm Password</label>
                            <div className="pr-password-wrapper">
                                <input
                                    className="pr-input"
                                    name="confirmPassword"
                                    type={showConfirm ? "text" : "password"}
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="pr-eye-btn"
                                    onClick={() => setShowConfirm((s) => !s)}
                                >
                                    <EyeIcon open={showConfirm} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Owner/Representative ID upload */}
                    <div className="pr-account-upload">
                        <span className="pr-upload-group-label">Owner / Representative ID</span>
                        <div
                            className="pr-upload-box"
                            style={ownerIdPreview
                                ? { border: "2px solid rgba(42,120,124,0.6)", padding: 0 }
                                : {}}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {ownerIdPreview ? (
                                <img
                                    src={ownerIdPreview}
                                    alt="Owner ID"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            ) : (
                                <>
                                    <UploadIcon />
                                    <span>Upload</span>
                                </>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*,.pdf"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Create Account button */}
                <button
                    type="button"
                    className="pr-submit-btn"
                    onClick={handleSubmit}
                    disabled={!confirmed}
                >
                    Create Account
                </button>
            </div>

            {/* Confirm row */}
            <div className="pr-confirm-row">
                <label htmlFor="pr-confirm7">Are you sure that all your information are correct?</label>
                <input
                    type="checkbox"
                    id="pr-confirm7"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                />
            </div>

            {/* Footer — dot 8 active (index=7), Previous button only */}
            <div className="pr-footer">
                <div className="pr-footer-left">
                    <button
                        type="button"
                        className="pr-nav-btn"
                        onClick={() =>
                            navigate("/register/provider/step6", {
                                state: {
                                    step1: step1Data,
                                    step2: step2Data,
                                    step3: step3Data,
                                    step4: step4Data,
                                    step5: step5Data,
                                    step6: step6Data,
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

                <Dots active={7} />

                <div className="pr-footer-right" />
            </div>
        </div>
    )
}

export default ProviderStep7