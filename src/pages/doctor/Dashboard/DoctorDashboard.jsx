import "./DoctorDashboard.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function SummaryPanel({ stats, weekdays }) {
    const date = new Date(2026, 4, 21);
    return (
        <div className="doctor-dashboard__summary">
            <div className="doctor-dashboard__summary-date">
                <span className="doctor-dashboard__summary-date-main">May 21, 2026</span>
                <span className="doctor-dashboard__summary-date-divider" />
                <span className="doctor-dashboard__summary-date-day">{weekdays[date.getDay()]}</span>
            </div>
            <div className="doctor-dashboard__summary-stats">
                {stats.map((stat) => (
                    <div key={stat.label} className="doctor-dashboard__stat-row">
                        <span className="doctor-dashboard__stat-label">{stat.label}</span>
                        <span className="doctor-dashboard__stat-badge">{stat.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function AppointmentsPanel({ appointments }) {
    return (
        <div className="doctor-dashboard__appointments">
            <h2 className="doctor-dashboard__appointments-header">Today's Appointment</h2>
            <div className="doctor-dashboard__appointments-count">
                <span className="doctor-dashboard__appointments-count-num">5</span>
                <span className="doctor-dashboard__appointments-count-label">Today's Appointment</span>
            </div>
            {appointments.map((appt) => (
                <div key={appt.time} className="doctor-dashboard__appointment-item">
                    <span className="doctor-dashboard__appointment-time">{appt.time}</span>
                    <span className="doctor-dashboard__appointment-name">{appt.name}</span>
                </div>
            ))}
            <Link
                className="doctor-dashboard__appointments-cta"
                to="/doctors/appointments"
            >
                View Full Details
            </Link>
        </div>
    );
}

function QueuePanel({ queue }) {
    return (
        <div className="doctor-dashboard__queue">
            <h2 className="doctor-dashboard__queue-title">Patients Queue</h2>
            <div className="doctor-dashboard__queue-rows">
                {queue.map((item) => (
                    <div
                        key={item.modifier}
                        className={`doctor-dashboard__queue-row doctor-dashboard__queue-row--${item.modifier}`}
                    >
                        <span className="doctor-dashboard__queue-num">{item.count}</span>
                        <span className="doctor-dashboard__queue-label">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function NotificationsPanel({ notifications }) {
    return (
        <div className="doctor-dashboard__notifications">
            <h2 className="doctor-dashboard__notifications-title">Notifications</h2>
            <div className="doctor-dashboard__notifications-list">
                {notifications.map((note) => (
                    <div key={note} className="doctor-dashboard__notification-item">{note}</div>
                ))}
            </div>
        </div>
    );
}

function CalendarPanel({ calendarEvents, days, weekdays }) {
    const[currentDay, setCurrentDay] = useState(21);
    const idx = days.indexOf(currentDay);
    const date = new Date(2026, 4, currentDay);
    const events = calendarEvents[currentDay] ||[];

    return (
        <div className="doctor-dashboard__calendar">
            <div className="doctor-dashboard__calendar-nav">
                <button
                    className="doctor-dashboard__calendar-nav-btn"
                    onClick={() => setCurrentDay(days[idx - 1])}
                    disabled={idx === 0}
                    aria-label="Previous day"
                >‹</button>
                <div className="doctor-dashboard__calendar-month-display">
                    <div className="doctor-dashboard__calendar-month-name">MAY</div>
                    <div className="doctor-dashboard__calendar-month-day">{currentDay}</div>
                    <div className="doctor-dashboard__calendar-month-weekday">{weekdays[date.getDay()]}</div>
                </div>
                <button
                    className="doctor-dashboard__calendar-nav-btn"
                    onClick={() => setCurrentDay(days[idx + 1])}
                    disabled={idx === days.length - 1}
                    aria-label="Next day"
                >›</button>
            </div>
            <div className="doctor-dashboard__calendar-events">
                {events.map((evt) => (
                    <div key={evt.time} className="doctor-dashboard__calendar-event">
                        <span className="doctor-dashboard__calendar-event-time">{evt.time}</span>
                        <span className="doctor-dashboard__calendar-event-name">{evt.name}</span>
                        <span className="doctor-dashboard__calendar-event-type">{evt.type}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}


function DoctorDashboard() {

    // eslint-disable-next-line no-unused-vars
    const [stats, setStats] = useState([
        { label: "Appointments Today", value: 5 },
        { label: "Pending Consultations", value: 4 },
        { label: "Completed Consultations", value: 1 },
    ]);

    // eslint-disable-next-line no-unused-vars
    const [appointments, setAppointments] = useState([
        { time: "9:00 AM",  name: "Leonor Rivera" },
        { time: "11:00 AM", name: "Teodora Realonda" },
    ]);

    // eslint-disable-next-line no-unused-vars
    const [queue, setQueue] = useState([
        { label: "Waiting",   count: 3, modifier: "waiting" },
        { label: "Ongoing",   count: 1, modifier: "ongoing" },
        { label: "Completed", count: 1, modifier: "completed" },
    ]);

    // eslint-disable-next-line no-unused-vars
    const [notifications, setNotifications] = useState([
        "Next Patient in 10 minutes",
        "Follow-up needed for patient",
        "4 Pending Consultations",
    ]);

    // eslint-disable-next-line no-unused-vars
    const [calendarEvents, setCalendarEvents] = useState({
        21:[
            { time: "9:00 AM",  name: "Leonor Rivera",    type: "Checkup" },
            { time: "11:00 AM", name: "Teodora Realonda", type: "Consultation" },
            { time: "1:00 PM",  name: "Jose Rizal",       type: "Follow-up" },
            { time: "3:00 PM",  name: "Andres Bonifacio", type: "Checkup" },
            { time: "4:30 PM",  name: "Apolinario Mabini",type: "New Patient" },
        ],
        22:[
            { time: "10:00 AM", name: "Emilio Aguinaldo", type: "Consultation" },
            { time: "2:00 PM",  name: "Marcela Agoncillo",type: "Follow-up" },
        ],
        23:[
            { time: "9:30 AM",  name: "Juan Luna",         type: "Checkup" },
            { time: "11:30 AM", name: "Felix Resurreccion",type: "New Patient" },
            { time: "3:30 PM",  name: "Carlos P. Romulo", type: "Consultation" },
        ],
    });

    const [weekdays] = useState(["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]);
    const [days] = useState([21, 22, 23]);

    return (
        <section className="doctor-dashboard">
            <h1 className="doctor-dashboard__title">Dashboard</h1>
            <div className="doctor-dashboard__grid">
                <SummaryPanel stats={stats} weekdays={weekdays} />
                <AppointmentsPanel appointments={appointments} />
                <QueuePanel queue={queue} />
                <NotificationsPanel notifications={notifications} />
                <CalendarPanel
                    calendarEvents={calendarEvents}
                    days={days}
                    weekdays={weekdays}
                />
            </div>
        </section>
    );
}

export default DoctorDashboard;