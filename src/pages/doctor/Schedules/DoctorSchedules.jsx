import "./DoctorSchedules.css"
import DoctorDialog from "../../../components/doctor/dialog/DoctorDialog.jsx";
import EditIcon from "../../../components/doctor/icons/EditIcon.jsx";
import ScheduleCalendar from "../../../components/doctor/schedule-calendar/ScheduleCalendar.jsx";
import {useState} from "react";
import DoctorAvailabilityDialog from "../../../components/doctor/availability-dialog/DoctorAvailabilityDialog.jsx";


function AppointmentSummary({appointments}) {
    return (
        <>
            <div className="doctor-schedules__summary">
                <div className="doctor-schedules__summary__header">
                    <h2 className="doctor-schedules__summary__title">Appointments Today</h2>
                </div>
                <div className="doctor-schedules__summary__body">
                    <ul className="doctor-schedules__summary__list">
                        {appointments.map((appt, idx) => (
                            <>
                                <li key={idx} className="doctor-schedules__summary__item">
                                    <span className="doctor-schedules__summary__item__time">{appt.time}</span>
                                    <span className="doctor-schedules__summary__item__name">{appt.label}</span>
                                </li>
                                {idx < appointments.length - 1 && (
                                    <div className="doctor-schedules__summary__connector">
                                        <div className="doctor-schedules__summary__connector__line" />
                                    </div>
                                )}
                            </>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

function WeeklyAvailability({schedule, onEdit}) {
    return (
        <div className="doctor-schedules__weekly">
            <div className="doctor-schedules__weekly__header">
                <h2 className="doctor-schedules__weekly__title">Weekly Availability</h2>
                <button className="doctor-schedules__weekly__edit-btn" aria-label="Edit" onClick={onEdit}>
                    <EditIcon className="doctor-schedules__weekly__edit-icon" />
                </button>
            </div>
            <ul className="doctor-schedules__weekly__list">
                {schedule.map(({ day, start, end }) => (
                    <li key={day} className="doctor-schedules__weekly__item">
                        <span className="doctor-schedules__weekly__item__day">{day}:</span>
                        <span className="doctor-schedules__weekly__item__range">{start} – {end}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}


function CalendarIcon({ className }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    );
}

function ClockIcon({ className }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" />
        </svg>
    );
}

function AddSchedule({ onClose }) {
    return (
        <DoctorDialog onClose={onClose}>
            <div className="doctor-schedules-add-schedule__wrapper">
                <div className="doctor-schedules-add-schedule__header">
                    <h1 className="doctor-schedules-add-schedule__title">Add Schedule</h1>
                    <p className="doctor-schedules-add-schedule__subtitle">
                        Add your schedule for appointments
                    </p>
                </div>

                <form className="doctor-schedules-add-schedule__form">
                    <div className="doctor-schedules-add-schedule__form-group">
                        <label className="doctor-schedules-add-schedule__label">Name</label>
                        <div className="doctor-schedules-add-schedule__input-wrapper">
                            <input
                                type="text"
                                placeholder="Name"
                                className="doctor-schedules-add-schedule__input"
                            />
                        </div>
                    </div>

                    <div className="doctor-schedules-add-schedule__form-group">
                        <label className="doctor-schedules-add-schedule__label">Date</label>
                        <div className="doctor-schedules-add-schedule__input-wrapper doctor-schedules-add-schedule__input-wrapper--short">
                            <input
                                type="text"
                                placeholder="Date"
                                className="doctor-schedules-add-schedule__input"
                            />
                            <CalendarIcon className="doctor-schedules-add-schedule__icon" />
                        </div>
                    </div>

                    <div className="doctor-schedules-add-schedule__form-group">
                        <label className="doctor-schedules-add-schedule__label">Time</label>
                        <div className="doctor-schedules-add-schedule__input-wrapper doctor-schedules-add-schedule__input-wrapper--short">
                            <input
                                type="text"
                                placeholder="Time"
                                className="doctor-schedules-add-schedule__input"
                            />
                            <ClockIcon className="doctor-schedules-add-schedule__icon" />
                        </div>
                    </div>

                    <div className="doctor-schedules-add-schedule__submit-row">
                        <button
                            type="button"
                            className="doctor-schedules-add-schedule__submit-btn"
                        >
                            <div className="doctor-schedules-add-schedule__submit-icon-bg">
                                <span className="doctor-schedules-add-schedule__submit-icon">+</span>
                            </div>
                            Add Schedule
                        </button>
                    </div>
                </form>
            </div>
        </DoctorDialog>
    );
}


function DoctorSchedules() {

    // eslint-disable-next-line no-unused-vars
    const [appointments, setAppointments] = useState([
        { id: 1, time: "9:00 AM", label: "Leonor Rivera" },
        { id: 2, time: "11:00 AM", label: "Teodora Realonda" },
        { id: 3, time: "12:00 PM", label: "Lunch Break" },
    ]);

    // eslint-disable-next-line no-unused-vars
    const [schedule, setSchedule] = useState([
        {id: 1, day: "Monday", start: "10:00 AM", end: "4:00 PM" },
        {id: 2, day: "Wednesday", start: "10:00 AM", end: "4:00 PM" },
        {id: 3, day: "Friday", start: "10:00 AM", end: "4:00 PM" },
    ]);

    const [isAvailabilityDialogOpen, setIsAvailabilityDialogOpen] = useState(false)
    const [isAddScheduleDialogOpen, setIsAddScheduleDialogOpen] = useState(false)

    return (
        <section className="doctor-schedules">
            <div className="doctor-schedules__header">
                <h1 className="doctor-schedules__title">Doctor Schedule</h1>
                <button
                    className="doctor-schedules__add-schedule-btn"
                    onClick={() => setIsAddScheduleDialogOpen(true)}
                >
                    + Add Schedule
                </button>
            </div>
            <div className="doctor-schedules__body">
                <ScheduleCalendar onDateChange={() => {}}/>
                <AppointmentSummary appointments={appointments}/>
                <WeeklyAvailability
                    schedule={schedule}
                    onEdit={() => {
                        setIsAvailabilityDialogOpen(true)
                    }}
                />
            </div>

            {isAvailabilityDialogOpen &&
                <DoctorAvailabilityDialog
                    schedules={schedule}
                    onClose={() => setIsAvailabilityDialogOpen(false)}
                    onSave={() => setIsAvailabilityDialogOpen(false)}
                    onChange={() => {}}
                />
            }

            {isAddScheduleDialogOpen &&
                <AddSchedule onClose={() => setIsAddScheduleDialogOpen(false)}/>
            }

        </section>
    )
}

export default DoctorSchedules