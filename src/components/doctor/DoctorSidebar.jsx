import {Link, useLocation} from "react-router-dom";
import "./DoctorSidebar.css"
import AnnouncementIcon from "./icons/AnnouncementIcon.jsx";
import AppointmentIcon from "./icons/AppointmentIcon.jsx";
import CalendarIcon from "./icons/CalendarIcon.jsx";
import HomeIcon from "./icons/HomeIcon.jsx";
import PeopleIcon from "./icons/PeopleIcon.jsx";
import ProfileIcon from "./icons/ProfileIcon.jsx";
import ReviewIcon from "./icons/ReviewIcon.jsx";


/* eslint-disable-next-line no-unused-vars */
function DoctorSidebarLink({to, Icon, children}){
    const isActive = useLocation().pathname === to;
    return (
        <Link to={to} className={`doctor-sidebar__link ${isActive ? "doctor-sidebar__link--active" : ""}`}>
            <Icon className="doctor-sidebar-link__icon"/>
            <p className={`doctor-sidebar-link__text `}>
                {children}
            </p>
        </Link>
    )
}

function SidebarFooter({ name }){
    return (
        <div className="sidebar-footer">
            <h2 className="sidebar-footer__title">{name}</h2>
            <button className="sidebar-footer__logout-btn">
                Log out
                <svg
                    className="sidebar-footer__icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
            </button>
        </div>
    );
}

function DoctorSidebar() {
    return (
        <div className="doctor-sidebar">
            <div className="doctor-sidebar-logo__container">
                <img src="/logo_white.png" alt="logo" className="doctor-sidebar-logo__image"/>
                <h1 className="doctor-sidebar-logo__text">KALINGA</h1>
            </div>

            <div className="doctor-sidebar__links">
                <DoctorSidebarLink to="/doctors/dashboard" Icon={HomeIcon}>
                    Dashboard
                </DoctorSidebarLink>
                <DoctorSidebarLink to="/doctors/profile" Icon={ProfileIcon}>
                    Doctor Profile
                </DoctorSidebarLink>
                <DoctorSidebarLink to="/doctors/patients" Icon={PeopleIcon}>
                    Patients
                </DoctorSidebarLink>
                <DoctorSidebarLink to="/doctors/appointments" Icon={AppointmentIcon}>
                    Appointments
                </DoctorSidebarLink>
                <DoctorSidebarLink to="/doctors/schedule" Icon={CalendarIcon}>
                    Schedule
                </DoctorSidebarLink>
                <DoctorSidebarLink to="/doctors/prescriptions" Icon={AnnouncementIcon}>
                    Prescriptions
                </DoctorSidebarLink>
                <DoctorSidebarLink to="/doctors/records" Icon={ReviewIcon}>
                    Medical Records
                </DoctorSidebarLink>
            </div>

            <SidebarFooter name="Brgy. San Isidro Medical Center"/>
        </div>
    )
}

export default DoctorSidebar