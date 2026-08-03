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

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

/* Two small boxes with colon — HH : MM */
function TimeBox({ hour, minute, onHourChange, onMinuteChange, disabled }) {
    const boxStyle = {
        width: 38,
        height: 30,
        border: "1.5px solid #c5d6d8",
        borderRadius: 8,
        textAlign: "center",
        fontSize: 13,
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,
        color: disabled ? "#b0c4c7" : "#032932",
        background: disabled ? "rgba(255,255,255,0.45)" : "#ffffff",
        outline: "none",
        padding: 0,
        transition: "border-color 0.2s",
        cursor: disabled ? "not-allowed" : "text",
    }

    return (
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <input
                style={boxStyle}
                type="text"
                maxLength={2}
                placeholder="HH"
                value={hour}
                disabled={disabled}
                onChange={(e) => onHourChange(e.target.value.replace(/\D/g, "").slice(0, 2))}
                onFocus={(e) => { if (!disabled) e.target.style.borderColor = "#2A787C" }}
                onBlur={(e) => { e.target.style.borderColor = "#c5d6d8" }}
            />
            <span style={{
                fontWeight: 800,
                fontSize: 14,
                color: disabled ? "#b0c4c7" : "#032932",
                lineHeight: 1,
                userSelect: "none",
            }}>:</span>
            <input
                style={boxStyle}
                type="text"
                maxLength={2}
                placeholder="MM"
                value={minute}
                disabled={disabled}
                onChange={(e) => onMinuteChange(e.target.value.replace(/\D/g, "").slice(0, 2))}
                onFocus={(e) => { if (!disabled) e.target.style.borderColor = "#2A787C" }}
                onBlur={(e) => { e.target.style.borderColor = "#c5d6d8" }}
            />
        </div>
    )
}

function RoundCheckbox({ checked, onChange, id }) {
    return (
        <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={onChange}
            style={{
                appearance: "none",
                WebkitAppearance: "none",
                width: 17,
                height: 17,
                borderRadius: "50%",
                border: `2px solid ${checked ? "#032932" : "#9f9f9f"}`,
                background: checked ? "#032932" : "transparent",
                cursor: "pointer",
                flexShrink: 0,
                transition: "background 0.2s, border-color 0.2s",
            }}
        />
    )
}

function ProviderStep4() {
    const navigate = useNavigate()
    const location = useLocation()
    const step1Data = location.state?.step1 || {}
    const step2Data = location.state?.step2 || {}
    const step3Data = location.state?.step3 || {}

    const [confirmed, setConfirmed] = useState(false)
    const [open24, setOpen24] = useState(false)
    const [emergency, setEmergency] = useState(false)

    const [hours, setHours] = useState(
        DAYS.reduce((acc, day) => ({
            ...acc,
            [day]: { enabled: false, fromH: "", fromM: "", toH: "", toM: "" },
        }), {})
    )

    const toggleDay = (day) =>
        setHours((prev) => ({ ...prev, [day]: { ...prev[day], enabled: !prev[day].enabled } }))

    const updateHour = (day, field, value) =>
        setHours((prev) => ({ ...prev, [day]: { ...prev[day], [field]: value } }))

    const handleNext = () => {
        navigate("/register/provider/step5", {
            state: {
                step1: step1Data,
                step2: step2Data,
                step3: step3Data,
                step4: { hours, open24, emergency },
            },
        })
    }

    return (
        <div className="pr-page">
            <h2 className="pr-page-title">Healthcare Service Provider Registration</h2>

            <div className="pr-card" style={{ maxWidth: 550 }}>
                <p className="pr-section-title">Operating Hours</p>

                {/* ── Centered inner wrapper ── */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                    {/* ── Column header ── */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "26px 120px 1fr",
                        paddingBottom: 8,
                        borderBottom: "1.5px solid rgba(3,41,50,0.12)",
                        marginBottom: 4,
                        width: "100%",
                        maxWidth: 380,
                        alignItems: "center",
                    }}>
                        <div />
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#032932" }}>Day</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#032932", display: "flex", justifyContent: "center" }}>Time</span>
                    </div>

                    {/* ── Day rows ── */}
                    {DAYS.map((day) => {
                        const d = hours[day]
                        return (
                            <div
                                key={day}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "26px 120px 1fr",
                                    alignItems: "center",
                                    padding: "6px 0",
                                    borderBottom: "1px solid rgba(3,41,50,0.05)",
                                    width: "100%",
                                    maxWidth: 380,
                                }}
                            >
                                {/* Round checkbox */}
                                <RoundCheckbox
                                    checked={d.enabled}
                                    onChange={() => toggleDay(day)}
                                />

                                {/* Day label */}
                                <span style={{
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: d.enabled ? "#032932" : "#7a9fa3",
                                    transition: "color 0.2s",
                                }}>
                                {day}
                            </span>

                                {/* from HH:MM  to  HH:MM */}
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <span style={{ fontSize: 12, fontWeight: 500, color: "#6b8a8d", minWidth: 28 }}>from</span>
                                    <TimeBox
                                        hour={d.fromH} minute={d.fromM}
                                        disabled={!d.enabled}
                                        onHourChange={(v) => updateHour(day, "fromH", v)}
                                        onMinuteChange={(v) => updateHour(day, "fromM", v)}
                                    />
                                    <span style={{ fontSize: 12, fontWeight: 500, color: "#6b8a8d", minWidth: 14 }}>to</span>
                                    <TimeBox
                                        hour={d.toH} minute={d.toM}
                                        disabled={!d.enabled}
                                        onHourChange={(v) => updateHour(day, "toH", v)}
                                        onMinuteChange={(v) => updateHour(day, "toM", v)}
                                    />
                                </div>
                            </div>
                        )
                    })}

                </div>

                {/* ── Other checkboxes ── */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20, alignItems: "flex-start" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <RoundCheckbox id="open24" checked={open24} onChange={(e) => setOpen24(e.target.checked)} />
                        <label htmlFor="open24" style={{ fontSize: 13, fontWeight: 600, color: "#032932", cursor: "pointer" }}>
                            Open 24 hours
                        </label>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <RoundCheckbox id="emergency" checked={emergency} onChange={(e) => setEmergency(e.target.checked)} />
                        <label htmlFor="emergency" style={{ fontSize: 13, fontWeight: 600, color: "#032932", cursor: "pointer" }}>
                            Emergency Services Available
                        </label>
                    </div>
                </div>
            </div>

            {/* Confirm row */}
            <div className="pr-confirm-row">
                <label htmlFor="pr-confirm4">Are you sure that all your information are correct?</label>
                <input
                    type="checkbox"
                    id="pr-confirm4"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                />
            </div>

            {/* Footer - dot 5 active (index=4)*/}
            <div className="pr-footer">
                <div className="pr-footer-left">
                    <button
                        type="button"
                        className="pr-nav-btn"
                        onClick={() =>
                            navigate("/register/provider/step3", {
                                state: { step1: step1Data, step2: step2Data, step3: step3Data },
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

                <Dots active={4} />

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

export default ProviderStep4