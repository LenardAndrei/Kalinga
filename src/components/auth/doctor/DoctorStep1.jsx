import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import "./DoctorStep.css"

function DoctorStep1() {
    const navigate = useNavigate()
    const [confirmed, setConfirmed] = useState(false)
    const [profilePhoto, setProfilePhoto] = useState(null)
    const fileInputRef = useRef(null)

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        nationality: "",
    })

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    const handlePhotoChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setProfilePhoto(url)
        }
    }

    const handleNext = () => {
        navigate("/register/doctor/step2", { state: { step1: form } })
    }

    return (
        <div className="dr-page">
            <h2 className="dr-page-title">Doctor Account Registration</h2>

            {/* Personal Information */}
            <div className="dr-card">
                <p className="dr-section-title">Personal Information</p>

                <div className="dr-row dr-row-2">
                    <div className="dr-field">
                        <label className="dr-label">First Name</label>
                        <input
                            className="dr-input"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            placeholder=""
                        />
                    </div>
                    <div className="dr-field">
                        <label className="dr-label">Last Name</label>
                        <input
                            className="dr-input"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            placeholder=""
                        />
                    </div>
                </div>

                <div className="dr-row dr-row-3">
                    <div className="dr-field">
                        <label className="dr-label">Date of Birth</label>
                        <input
                            className="dr-input"
                            name="dateOfBirth"
                            type="date"
                            value={form.dateOfBirth}
                            onChange={handleChange}
                            placeholder="MM/DD/YYYY"
                        />
                    </div>
                    <div className="dr-field">
                        <label className="dr-label">Gender</label>
                        <select
                            className="dr-select"
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                        >
                            <option value="">Sex</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer_not">Prefer not to say</option>
                        </select>
                    </div>
                    <div className="dr-field">
                        <label className="dr-label">Nationality</label>
                        <input
                            className="dr-input"
                            name="nationality"
                            value={form.nationality}
                            onChange={handleChange}
                            placeholder=""
                        />
                    </div>
                </div>

                {/* Profile Photo */}
                <div className="dr-field" style={{ alignItems: "center", marginTop: "6px" }}>
                    <label className="dr-label" style={{ textAlign: "center", marginBottom: "8px" }}>
                        Profile Photo
                    </label>
                    <div
                        className="dr-upload-box"
                        onClick={() => fileInputRef.current?.click()}
                        style={profilePhoto ? { border: "2px solid rgba(94,207,207,0.6)", padding: 0, overflow: "hidden" } : {}}
                    >
                        {profilePhoto ? (
                            <img
                                src={profilePhoto}
                                alt="Profile"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        ) : (
                            <>
                                <svg className="dr-upload-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="32" cy="22" r="12" fill="rgba(255,255,255,0.4)" />
                                    <path d="M8 56c0-13.255 10.745-24 24-24s24 10.745 24 24" fill="rgba(255,255,255,0.4)" />
                                </svg>
                                <span>Upload</span>
                            </>
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                        />
                    </div>
                </div>
            </div>

            {/* Confirm row */}
            <div className="dr-confirm-row">
                <label htmlFor="dr-confirm1">Are you sure that all your information are correct?</label>
                <input
                    type="checkbox"
                    id="dr-confirm1"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                />
            </div>

            {/* Footer — 5 dots, dot 2 active */}
            <div className="dr-footer">
                <div className="dr-footer-left">
                    <button
                        type="button"
                        className="dr-nav-btn"
                        onClick={() => navigate("/register")}
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
                    <div className="dr-dot active" />
                    <div className="dr-dot" />
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

export default DoctorStep1