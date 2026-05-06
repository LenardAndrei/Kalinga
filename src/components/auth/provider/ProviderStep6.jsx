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

const UploadIcon = () => (
    <svg className="pr-upload-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="14" width="48" height="36" rx="6" fill="rgba(0,0,0,0.15)" />
        <circle cx="22" cy="28" r="6" fill="rgba(0,0,0,0.2)" />
        <path d="M8 44l14-12 10 10 8-8 16 16" stroke="rgba(0,0,0,0.25)" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
)

function UploadBox({ label, preview, onFileChange }) {
    const ref = useRef(null)
    return (
        <div className="pr-upload-group">
            <span className="pr-upload-group-label">{label}</span>
            <div
                className="pr-upload-box"
                style={preview ? { border: "2px solid rgba(42,120,124,0.6)", padding: 0 } : {}}
                onClick={() => ref.current?.click()}
            >
                {preview ? (
                    <img
                        src={preview}
                        alt={label}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                ) : (
                    <>
                        <UploadIcon />
                        <span>Upload</span>
                    </>
                )}
                <input
                    ref={ref}
                    type="file"
                    accept="image/*,.pdf"
                    onChange={onFileChange}
                />
            </div>
        </div>
    )
}

function ProviderStep6() {
    const navigate = useNavigate()
    const location = useLocation()
    const step1Data = location.state?.step1 || {}
    const step2Data = location.state?.step2 || {}
    const step3Data = location.state?.step3 || {}
    const step4Data = location.state?.step4 || {}
    const step5Data = location.state?.step5 || {}

    const [confirmed, setConfirmed] = useState(false)
    const [businessPermitPreview, setBusinessPermitPreview] = useState(null)
    const [facilityPhotoPreview, setFacilityPhotoPreview] = useState(null)
    const [dohLicensePreview, setDohLicensePreview] = useState(null)

    const makeFileHandler = (setter) => (e) => {
        const file = e.target.files[0]
        if (file) setter(URL.createObjectURL(file))
    }

    const handleNext = () => {
        navigate("/register/provider/step7", {
            state: {
                step1: step1Data,
                step2: step2Data,
                step3: step3Data,
                step4: step4Data,
                step5: step5Data,
                step6: { businessPermit: !!businessPermitPreview, facilityPhoto: !!facilityPhotoPreview, dohLicense: !!dohLicensePreview },
            },
        })
    }

    return (
        <div className="pr-page">
            <h2 className="pr-page-title">Healthcare Service Provider Registration</h2>

            <div className="pr-card" style={{ maxWidth: 700 }}>
                <p className="pr-section-title">Verification Documents</p>

                {/* Top row: Business Permit + Facility Photo */}
                <div className="pr-upload-row" style={{ marginBottom: 24 }}>
                    <UploadBox
                        label="Business Permit"
                        preview={businessPermitPreview}
                        onFileChange={makeFileHandler(setBusinessPermitPreview)}
                    />
                    <UploadBox
                        label="Facility Photo"
                        preview={facilityPhotoPreview}
                        onFileChange={makeFileHandler(setFacilityPhotoPreview)}
                    />
                </div>

                {/* Bottom center: DOH License */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <UploadBox
                        label="DOH License / Accreditation"
                        preview={dohLicensePreview}
                        onFileChange={makeFileHandler(setDohLicensePreview)}
                    />
                </div>
            </div>

            {/* Confirm row */}
            <div className="pr-confirm-row">
                <label htmlFor="pr-confirm6">Are you sure that all your information are correct?</label>
                <input
                    type="checkbox"
                    id="pr-confirm6"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                />
            </div>

            {/* Footer — dot 7 active (index=6) */}
            <div className="pr-footer">
                <div className="pr-footer-left">
                    <button
                        type="button"
                        className="pr-nav-btn"
                        onClick={() =>
                            navigate("/register/provider/step5", {
                                state: {
                                    step1: step1Data,
                                    step2: step2Data,
                                    step3: step3Data,
                                    step4: step4Data,
                                    step5: step5Data,
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

                <Dots active={6} />

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

export default ProviderStep6
