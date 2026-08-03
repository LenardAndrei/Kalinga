import { useState } from "react"
import { useNavigate } from "react-router-dom"
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

function ProviderStep1() {
    const navigate = useNavigate()
    const [confirmed, setConfirmed] = useState(false)

    const [form, setForm] = useState({
        facilityName: "",
        typeOfService: "",
        facilityDescription: "",
        nationality: "",
        houseNo: "",
        streetName: "",
        barangay: "",
        city: "",
        province: "",
        postalCode: "",
    })

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    const handleNext = () => {
        navigate("/register/provider/step2", { state: { step1: form } })
    }

    return (
        <div className="pr-page">
            <h2 className="pr-page-title">Healthcare Service Provider Registration</h2>

            <div className="pr-card">

                {/* Service Information */}
                <p className="pr-section-title">Service Information</p>

                <div className="pr-row pr-row-2" style={{ marginBottom: 14 }}>
                    <div className="pr-field">
                        <label className="pr-label">Service / Facility Name</label>
                        <input
                            className="pr-input"
                            name="facilityName"
                            value={form.facilityName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="pr-field">
                        <label className="pr-label">Type of Service</label>
                        <select
                            className="pr-select"
                            name="typeOfService"
                            value={form.typeOfService}
                            onChange={handleChange}
                        >
                            <option value=""></option>
                            <option value="hospital">Hospital</option>
                            <option value="clinic">Clinic</option>
                            <option value="pharmacy">Pharmacy</option>
                            <option value="laboratory">Laboratory</option>
                            <option value="dental">Dental Clinic</option>
                            <option value="optical">Optical</option>
                            <option value="rehabilitation">Rehabilitation Center</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                <div className="pr-row pr-row-2" style={{ marginBottom: 0 }}>
                    <div className="pr-field">
                        <label className="pr-label">Service / Facility Description</label>
                        <textarea
                            className="pr-textarea"
                            name="facilityDescription"
                            value={form.facilityDescription}
                            onChange={handleChange}
                            rows={3}
                        />
                    </div>
                    <div className="pr-field">
                        <label className="pr-label">Nationality</label>
                        <input
                            className="pr-input"
                            name="nationality"
                            value={form.nationality}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="pr-divider" />

                {/* Location information */}
                <p className="pr-section-title">Location Information</p>

                <div className="pr-row pr-row-3" style={{ marginBottom: 14 }}>
                    <div className="pr-field">
                        <label className="pr-label">House/BLK No./Building Name</label>
                        <input
                            className="pr-input"
                            name="houseNo"
                            value={form.houseNo}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="pr-field">
                        <label className="pr-label">Street Name</label>
                        <input
                            className="pr-input"
                            name="streetName"
                            value={form.streetName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="pr-field">
                        <label className="pr-label">Barangay</label>
                        <input
                            className="pr-input"
                            name="barangay"
                            value={form.barangay}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="pr-row pr-row-3">
                    <div className="pr-field">
                        <label className="pr-label">City/Municipality</label>
                        <input
                            className="pr-input"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="pr-field">
                        <label className="pr-label">Province</label>
                        <input
                            className="pr-input"
                            name="province"
                            value={form.province}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="pr-field">
                        <label className="pr-label">Postal Code</label>
                        <input
                            className="pr-input"
                            name="postalCode"
                            value={form.postalCode}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            {/* Confirm row */}
            <div className="pr-confirm-row">
                <label htmlFor="pr-confirm1">Are you sure that all your information are correct?</label>
                <input
                    type="checkbox"
                    id="pr-confirm1"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                />
            </div>

            {/* Footer — dot 2 active (index=1) */}
            <div className="pr-footer">
                <div className="pr-footer-left">
                    <button
                        type="button"
                        className="pr-nav-btn"
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

                <Dots active={1} />

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

export default ProviderStep1
