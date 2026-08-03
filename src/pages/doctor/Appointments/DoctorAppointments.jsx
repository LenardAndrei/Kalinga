import "./DoctorAppointments.css"
import {useState} from "react";
import DoctorSearchBar from "../../../components/doctor/search-bar/DoctorSearchBar.jsx";

function AppointmentFilterChip({isActive, item, onClick}) {
    return (
        <button
            className={`doctor-appointment__filter-chip ${isActive ? "doctor-appointment__filter-chip--active" : ""}`}
            onClick={onClick}
        >
            {item}
        </button>
    )
}

function AppointmentTable({children}){
    return (
        <table className="doctor-appointment__table">
            <thead className="doctor-appointment__table-header">
                <tr className="doctor-appointment__table-header-row">
                    <th className="doctor-appointment__table-title">Date</th>
                    <th className="doctor-appointment__table-title">Time</th>
                    <th className="doctor-appointment__table-title">Patient</th>
                    <th className="doctor-appointment__table-title">Concern</th>
                    <th className="doctor-appointment__table-title">Status</th>
                    <th className="doctor-appointment__table-title">Action</th>
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
    )
}

function AppointmentTableEntry({date, time, patient, concern, status, onClick}) {

    let actionButton = "";
    let statusClass = "";
    switch (status) {
        case "Pending":
            statusClass = "doctor-appointment__status--pending"
            actionButton = (
                <button className={`doctor-appointment-table__entry-action-btn doctor-appointment-table__entry-pending-btn`} onClick={onClick}>
                    Accept
                </button>
            )
            break;

        case "Approved":
            statusClass = "doctor-appointment__status--approved"
            actionButton = (
                <button className={`doctor-appointment-table__entry-action-btn doctor-appointment-table__entry-approved-btn`} onClick={onClick}>
                    Start
                </button>
            )
            break;

        case "Completed":
            statusClass = "doctor-appointment__status--approved"
            actionButton = (
                <button className={`doctor-appointment-table__entry-action-btn doctor-appointment-table__entry-approved-btn`} onClick={onClick}>
                    Start
                </button>
            )
            break;

        case "Cancelled":
            statusClass = "doctor-appointment__status--cancelled"
            actionButton = (
                <button className={`doctor-appointment-table__entry-action-btn doctor-appointment-table__entry-approved-btn--disabled`} onClick={onClick}>
                    Start
                </button>
            )
            break;
    }

    return (
        <tr className="doctor-appointment-table__entry">
            <td>{date}</td>
            <td>{time}</td>
            <td>{patient}</td>
            <td>{concern}</td>
            <td className={` ${statusClass}`}>{status}</td>
            <td>
                {actionButton}
            </td>
        </tr>
    )
}

function DoctorAppointments() {

    const filterCategories = ["All", "Today", "Upcoming", "Completed", "Cancelled"]
    const [activeFilter, setActiveFilter] = useState("All")

    const [searchTerm, setSearchTerm] = useState("")

    // eslint-disable-next-line
    const [appointments, setAppointments] = useState([
        {
            "date": "2026-04-20",
            "time": "09:00 AM",
            "patient": "Carlos Yulo",
            "concern": "Fever and cough",
            "status": "Completed"
        },
        {
            "date": "2026-04-20",
            "time": "09:00 AM",
            "patient": "Juan Dela Cruz",
            "concern": "Fever and cough",
            "status": "Pending"
        },
        {
            "date": "2026-04-20",
            "time": "10:30 AM",
            "patient": "Maria Santos",
            "concern": "Headache",
            "status": "Cancelled"
        },
        {
            "date": "2026-04-21",
            "time": "01:15 PM",
            "patient": "Carlos Reyes",
            "concern": "Back pain",
            "status": "Approved"
        },
        {
            "date": "2026-04-21",
            "time": "03:45 PM",
            "patient": "Ana Lopez",
            "concern": "Skin rash",
            "status": "Pending"
        },
        {
            "date": "2026-04-22",
            "time": "11:00 AM",
            "patient": "Miguel Torres",
            "concern": "Allergy",
            "status": "Approved"
        },
        {
            "date": "2026-09-22",
            "time": "11:00 AM",
            "patient": "Miles Morales",
            "concern": "Allergy",
            "status": "Approved"
        },
        {
            "date": "2026-04-25",
            "time": "11:00 AM",
            "patient": "Jeffrey Dahmer",
            "concern": "Allergy",
            "status": "Approved"
        }
    ])

    const filterByCategory = (category, appointment) => {
        if (category === "Today" || category === "Upcoming") {
            const values = appointment.date.split("-");
            const date = new Date(values[0], values[1] - 1, values[2]);
            date.setHours(0, 0, 0, 0);

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            switch (category) {
                case "Today":
                    return date.getTime() === today.getTime();
                case "Upcoming":
                    return date > today;
            }
        } else if (category === "Completed" || category === "Cancelled") {
            return appointment.status === category;
        } else {
            return true;
        }

    }

    return (
        <section className="doctor-appointments">
            <h1 className="doctor-appointments__title">Appointments</h1>

            <div className="doctor-appointment__filter-chip-container">
                {filterCategories.map((item, index) => (
                    <AppointmentFilterChip
                        key={index}
                        isActive={item === activeFilter}
                        item={item}
                        onClick={() => setActiveFilter(item)}
                    />
                ))}
            </div>

            <DoctorSearchBar onEdit={(e) => setSearchTerm(e.target.value.toLowerCase())}/>

            <AppointmentTable>
                {appointments.map((appointment, index) => (
                    appointment.patient.toLowerCase().startsWith(searchTerm) &&
                        filterByCategory(activeFilter, appointment) &&
                        <AppointmentTableEntry
                            key={index}
                            date={appointment.date}
                            time={appointment.time}
                            patient={appointment.patient}
                            concern={appointment.concern}
                            status={appointment.status}
                        />
                ))}
            </AppointmentTable>
        </section>
    )
}

export default DoctorAppointments