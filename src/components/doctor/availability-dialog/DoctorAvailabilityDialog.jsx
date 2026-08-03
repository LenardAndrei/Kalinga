import { useState } from "react";
import "./DoctorAvailabilityDialog.css"
import ClockIcon from "../../../components/doctor/icons/ClockIcon.jsx";
import TrashIcon from "../../../components/doctor/icons/TrashIcon.jsx";
import DoctorDialog from "../dialog/DoctorDialog.jsx";

const DAYS = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
];

function to24h(str) {
    if (!str) return "00:00";
    const match = str.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return str; // already 24h or unexpected format, pass through
    let [, h, m, period] = match;
    h = parseInt(h, 10);
    if (period.toUpperCase() === "AM") {
        if (h === 12) h = 0;
    } else {
        if (h !== 12) h += 12;
    }
    return `${String(h).padStart(2, "0")}:${m}`;
}

function to12h(str) {
    if (!str) return "";
    const [h, m] = str.split(":");
    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const display = hour % 12 === 0 ? 12 : hour % 12;
    return `${display}:${m} ${ampm}`;
}

let nextId = 1000;

function DoctorAvailabilityDialog({ schedules, onSave, onChange, onClose }) {
    const [rows, setRows] = useState(schedules);

    const update = (next) => {
        setRows(next);
        onChange?.(next);
    };

    const addRow = () => {
        update([
            ...rows,
            { id: nextId++, day: "Monday", start: "10:00 AM", end: "4:00 PM" },
        ]);
    };

    const removeRow = (id) => {
        update(rows.filter(r => r.id !== id));
    };

    const updateRow = (id, field, value) => {
        const stored = (field === "start" || field === "end") ? to12h(value) : value;
        update(rows.map(r => r.id === id ? { ...r, [field]: stored } : r));
    };

    return (
        <DoctorDialog onClose={onClose}>
            <div className="doctor-availability-dialog">
                <div className="doctor-availability-dialog__header">
                    <h2 className="doctor-availability-dialog__title">Edit Weekly Availability</h2>
                    <p className="doctor-availability-dialog__subtitle">Edit your weekly availability</p>
                </div>

                <div className="doctor-availability-dialog__table-header">
                    <span className="doctor-availability-dialog__col-label">Day</span>
                    <span className="doctor-availability-dialog__col-label">Time In</span>
                    <span className="doctor-availability-dialog__col-label">Time Out</span>
                    <button
                        className="doctor-availability-dialog__add-btn-header"
                        onClick={addRow}
                        aria-label="Add row"
                        title="Add availability row"
                    >
                        +
                    </button>
                </div>

                <div className="doctor-availability-dialog__rows">
                    {rows.map(row => (
                        <div key={row.id} className="doctor-availability-dialog__row">

                            <div className="doctor-availability-dialog__select-wrapper">
                                <select
                                    className="doctor-availability-dialog__select"
                                    value={row.day}
                                    onChange={e => updateRow(row.id, "day", e.target.value)}
                                >
                                    {DAYS.map(d => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                                <span className="doctor-availability-dialog__select-chevron">▾</span>
                            </div>

                            <div className="doctor-availability-dialog__time-wrapper">
                                <input
                                    type="time"
                                    className="doctor-availability-dialog__time-input"
                                    value={to24h(row.start)}
                                    onChange={e => updateRow(row.id, "start", e.target.value)}
                                    title={row.start}
                                />
                                <ClockIcon className="doctor-availability-dialog__time-icon" />
                            </div>

                            <div className="doctor-availability-dialog__time-wrapper">
                                <input
                                    type="time"
                                    className="doctor-availability-dialog__time-input"
                                    value={to24h(row.end)}
                                    onChange={e => updateRow(row.id, "end", e.target.value)}
                                    title={row.end}
                                />
                                <ClockIcon className="doctor-availability-dialog__time-icon" />
                            </div>

                            <button
                                className="doctor-availability-dialog__delete-btn"
                                onClick={() => removeRow(row.id)}
                                aria-label={`Remove ${row.day}`}
                                title="Remove row"
                            >
                                <TrashIcon className="doctor-availability-dialog__delete-icon" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="doctor-availability-dialog__footer">
                    <button
                        className="doctor-availability-dialog__save-btn"
                        onClick={() => onSave?.(rows)}
                    >
                        <span className="doctor-availability-dialog__save-icon">+</span>
                        Save Changes
                    </button>
                </div>
            </div>
        </DoctorDialog>
    );
}

export default DoctorAvailabilityDialog;