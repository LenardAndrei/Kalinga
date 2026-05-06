import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import "./DoctorStep.css"

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

function DoctorStep4() {
    const navigate = useNavigate()
    const location = useLocation()
    const step1Data = location.state?.step1 || {}
    const step2Data = location.state?.step2 || {}
    const step3Data = location.state?.step3 || {}

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    const allFieldsFilled =
        form.email.trim() !== "" &&
        form.password.trim() !== "" &&
        form.confirmPassword.trim() !== ""

    const canSubmit = allFieldsFilled

    const handleSubmit = () => {
        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match.")
            return
        }
        const fullData = { ...step1Data, ...step2Data, ...step3Data, ...form }
        console.log("Doctor Registration data:", fullData)
        // TODO: send to API, then navigate to login or success page
        navigate("/login")
    }

    return (
        <div className="dr-page">
            <h2 className="dr-page-title">Doctor Account Registration</h2>

            <div className="dr-card dr-card-narrow">
                <p className="dr-section-title">Account Details</p>

                <div className="dr-row dr-row-1">
                    <div className="dr-field">
                        <label className="dr-label">Create Email</label>
                        <input
                            className="dr-input"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="dr-row dr-row-1">
                    <div className="dr-field">
                        <label className="dr-label">Create Password</label>
                        <div className="dr-password-wrapper">
                            <input
                                className="dr-input"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                required
                            />
                            <button
                                type="button"
                                className="dr-eye-btn"
                                onClick={() => setShowPassword((s) => !s)}
                            >
                                <EyeIcon open={showPassword} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="dr-row dr-row-1">
                    <div className="dr-field">
                        <label className="dr-label">Confirm Password</label>
                        <div className="dr-password-wrapper">
                            <input
                                className="dr-input"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                type={showConfirm ? "text" : "password"}
                                required
                            />
                            <button
                                type="button"
                                className="dr-eye-btn"
                                onClick={() => setShowConfirm((s) => !s)}
                            >
                                <EyeIcon open={showConfirm} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Create Account button*/}
                <button
                    type="button"
                    className="dr-submit-btn"
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                >
                    Create Account
                </button>
            </div>

            {/* Footer — Previous only, no Next on last step and dot 5 active */}
            <div className="dr-footer">
                <div className="dr-footer-left">
                    <button
                        type="button"
                        className="dr-nav-btn"
                        onClick={() =>
                            navigate("/register/doctor/step3", {
                                state: {
                                    step1: step1Data,
                                    step2: step2Data,
                                    step3: step3Data,
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

                <div className="dr-dots">
                    <div className="dr-dot" />
                    <div className="dr-dot" />
                    <div className="dr-dot" />
                    <div className="dr-dot" />
                    <div className="dr-dot active" />
                </div>

                <div className="dr-footer-right" />
            </div>
        </div>
    )
}

export default DoctorStep4