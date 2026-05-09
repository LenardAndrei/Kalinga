import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./UserStep.css"

function UserStep1() {
    const navigate = useNavigate()
    const [confirmed, setConfirmed] = useState(false)
    const [form, setForm] = useState({
        firstName: "", lastName: "",
        houseNo: "", streetName: "", subdivision: "",
        barangay: "", cityMunicipality: "", province: "",
        postalCode: "",
    })

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    const handleNext = () => {
        navigate("/register/user/step2", { state: { step1: form } })
    }

    return (
        <div className="reg-page">
            {/* ── title outside card ── */}
            <h2 className="reg-page-title">USER ACCOUNT REGISTRATION</h2>

            {/* ── card ── */}
            <div className="reg-card">

                {/* Personal Information */}
                <p className="reg-section-title">Personal Information</p>
                <div className="reg-row reg-row-2">
                    <div className="reg-field">
                        <label className="reg-label">First Name</label>
                        <input className="reg-input" name="firstName" value={form.firstName}
                               onChange={handleChange} required />
                    </div>
                    <div className="reg-field">
                        <label className="reg-label">Last Name</label>
                        <input className="reg-input" name="lastName" value={form.lastName}
                               onChange={handleChange} required />
                    </div>
                </div>

                <div className="reg-divider" />

                {/* Full Address */}
                <p className="reg-section-title">Full Address</p>
                <div className="reg-row reg-row-3">
                    <div className="reg-field">
                        <label className="reg-label">House/BLK No.</label>
                        <input className="reg-input" name="houseNo" value={form.houseNo}
                               onChange={handleChange} />
                    </div>
                    <div className="reg-field">
                        <label className="reg-label">Street Name</label>
                        <input className="reg-input" name="streetName" value={form.streetName}
                               onChange={handleChange} />
                    </div>
                    <div className="reg-field">
                        <label className="reg-label">Subdivision</label>
                        <input className="reg-input" name="subdivision" value={form.subdivision}
                               onChange={handleChange} />
                    </div>
                </div>

                <div className="reg-row reg-row-3">
                    <div className="reg-field">
                        <label className="reg-label">Barangay</label>
                        <input className="reg-input" name="barangay" value={form.barangay}
                               onChange={handleChange} />
                    </div>
                    <div className="reg-field">
                        <label className="reg-label">City/Municipality</label>
                        <input className="reg-input" name="cityMunicipality" value={form.cityMunicipality}
                               onChange={handleChange} />
                    </div>
                    <div className="reg-field">
                        <label className="reg-label">Province</label>
                        <input className="reg-input" name="province" value={form.province}
                               onChange={handleChange} />
                    </div>
                </div>

                <div className="reg-row reg-row-postal">
                    <div className="reg-field">
                        <label className="reg-label">Postal Code</label>
                        <input className="reg-input" name="postalCode" value={form.postalCode}
                               onChange={handleChange} />
                    </div>
                </div>
            </div>

            {/* ── confirm row — below card, above footer ── */}
            <div className="reg-confirm-row">
                <label htmlFor="confirm1">Are you sure that all your information are correct?</label>
                <input
                    type="checkbox"
                    id="confirm1"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                />
            </div>

            {/* ── footer ── */}
            <div className="reg-footer">
                <div className="reg-footer-left">
                    <button
                        type="button"
                        className="reg-nav-btn"
                        onClick={() => navigate("/register")}
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
                    <div className="reg-dot active" />
                    <div className="reg-dot" />
                </div>

                <div className="reg-footer-right">
                    <button
                        type="button"
                        className="reg-nav-btn"
                        onClick={handleNext}
                        disabled={!confirmed}
                    >
                        Next
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"/>
                            <polyline points="12 5 19 12 12 19"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserStep1