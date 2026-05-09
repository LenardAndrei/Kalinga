import { useState, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import "./DoctorStep.css"

function DoctorStep3() {
    const navigate = useNavigate()
    const location = useLocation()
    const step1Data = location.state?.step1 || {}
    const step2Data = location.state?.step2 || {}

    const [confirmed, setConfirmed] = useState(false)
    const [professionalIdPreview, setProfessionalIdPreview] = useState(null)
    const fileInputRef = useRef(null)

    const [form, setForm] = useState({
        medicalLicenseNumber: "",
        specialization: "",
        medicalSchool: "",
        subspecialty: "",
        yearsOfExperience: "",
    })

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setProfessionalIdPreview(url)
        }
    }

    const handleNext = () => {
        navigate("/register/doctor/step4", {
            state: { step1: step1Data, step2: step2Data, step3: form },
        })
    }

    return (
        <div className="dr-page">
            <h2 className="dr-page-title">Doctor Account Registration</h2>

            <div className="dr-card">
                <p className="dr-section-title">Professional Information</p>

                {/* Two-column layout: left fields | right fields + upload */}
                <div className="dr-prof-grid">

                    {/* LEFT COLUMN */}
                    <div className="dr-prof-col">
                        <div className="dr-field">
                            <label className="dr-label">Medical License Number</label>
                            <input
                                className="dr-input"
                                name="medicalLicenseNumber"
                                value={form.medicalLicenseNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="dr-field">
                            <label className="dr-label">Medical School / University</label>
                            <input
                                className="dr-input"
                                name="medicalSchool"
                                value={form.medicalSchool}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="dr-field">
                            <label className="dr-label">Years of Experience</label>
                            <input
                                className="dr-input"
                                name="yearsOfExperience"
                                type="number"
                                min="0"
                                value={form.yearsOfExperience}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="dr-prof-col">
                        <div className="dr-field">
                            <label className="dr-label">Specialization</label>
                            <input
                                className="dr-input"
                                name="specialization"
                                value={form.specialization}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="dr-field">
                            <label className="dr-label">Subspecialty</label>
                            <input
                                className="dr-input"
                                name="subspecialty"
                                value={form.subspecialty}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Upload box centered in right column */}
                        <div className="dr-upload-wrapper">
                            <label className="dr-label dr-upload-label-text">Professional ID Upload</label>
                            <div
                                className="dr-upload-box"
                                style={professionalIdPreview
                                    ? { border: "2px solid rgba(94,207,207,0.6)", padding: 0, overflow: "hidden" }
                                    : {}}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {professionalIdPreview ? (
                                    <img
                                        src={professionalIdPreview}
                                        alt="Professional ID"
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                ) : (
                                    <>
                                        <svg className="dr-upload-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="8" y="14" width="48" height="36" rx="6" fill="rgba(255,255,255,0.25)" />
                                            <circle cx="22" cy="28" r="6" fill="rgba(255,255,255,0.4)" />
                                            <path d="M8 44l14-12 10 10 8-8 16 16" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinejoin="round" />
                                        </svg>
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

                </div>
            </div>

            {/* Confirm row */}
            <div className="dr-confirm-row">
                <label htmlFor="dr-confirm3">Are you sure that all your information are correct?</label>
                <input
                    type="checkbox"
                    id="dr-confirm3"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                />
            </div>

            {/* Footer — 5 dots, dot 4 active */}
            <div className="dr-footer">
                <div className="dr-footer-left">
                    <button
                        type="button"
                        className="dr-nav-btn"
                        onClick={() =>
                            navigate("/register/doctor/step2", {
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

                <div className="dr-dots">
                    <div className="dr-dot" />
                    <div className="dr-dot" />
                    <div className="dr-dot" />
                    <div className="dr-dot active" />
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

export default DoctorStep3