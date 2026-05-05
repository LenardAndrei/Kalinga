import "./DoctorSchedules.css"
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

    return (
        <section className="doctor-schedules">
            <div className="doctor-schedules__header">
                <h1 className="doctor-schedules__title">Doctor Schedule</h1>
                <button
                    className="doctor-schedules__add-schedule-btn"
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

        </section>
    )
}

export default DoctorSchedules