import "./DoctorSchedulePage.css"
import ScheduleCalendar from "../../../components/doctor/schedule-calendar/ScheduleCalendar.jsx";

function DoctorSchedulePage() {
    return (
        <section className="doctor-schedule">
            <ScheduleCalendar onDateChange={() => {}}/>
        </section>
    )
}