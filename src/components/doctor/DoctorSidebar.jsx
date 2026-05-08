import {Link, useLocation} from "react-router-dom";
import "./DoctorSidebar.css"
import { useState } from "react";
import AnnouncementIcon from "./icons/AnnouncementIcon.jsx";
import AppointmentIcon from "./icons/AppointmentIcon.jsx";
import CalendarIcon from "./icons/CalendarIcon.jsx";
import HomeIcon from "./icons/HomeIcon.jsx";
import PeopleIcon from "./icons/PeopleIcon.jsx";
import ProfileIcon from "./icons/ProfileIcon.jsx";
import ReviewIcon from "./icons/ReviewIcon.jsx";


/* eslint-disable-next-line no-unused-vars */
function DoctorSidebarLink({to, Icon, children, onClick}){
    const isActive = useLocation().pathname === to;
    return (
        <Link to={to} className={`doctor-sidebar__link ${isActive ? "doctor-sidebar__link--active" : ""}`} onClick={onClick}>
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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleLinkClick = () => {
        setMobileMenuOpen(false);
    };

    return (
        <>
            {/* Hamburger Menu Button - visible on mobile */}
            <button className="doctor-sidebar__hamburger" onClick={handleMenuToggle} aria-label="Toggle menu">
                <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
                <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
                <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
            </button>

            {/* Mobile menu overlay */}
            {mobileMenuOpen && <div className="doctor-sidebar__overlay" onClick={handleMenuToggle}></div>}

            {/* Sidebar */}
            <div className={`doctor-sidebar ${mobileMenuOpen ? 'doctor-sidebar--mobile-open' : ''}`}>
                <div className="doctor-sidebar-logo__container">
                    <img src="/logo_white.png" alt="logo" className="doctor-sidebar-logo__image"/>
                    <h1 className="doctor-sidebar-logo__text">KALINGA</h1>
                </div>

                <div className="doctor-sidebar__links">
                    <DoctorSidebarLink to="/doctors/dashboard" Icon={HomeIcon} onClick={handleLinkClick}>
                        Dashboard
                    </DoctorSidebarLink>
                    <DoctorSidebarLink to="/doctors/profile" Icon={ProfileIcon} onClick={handleLinkClick}>
                        Doctor Profile
                    </DoctorSidebarLink>
                    <DoctorSidebarLink to="/doctors/patients" Icon={PeopleIcon} onClick={handleLinkClick}>
                        Patients
                    </DoctorSidebarLink>
                    <DoctorSidebarLink to="/doctors/appointments" Icon={AppointmentIcon} onClick={handleLinkClick}>
                        Appointments
                    </DoctorSidebarLink>
                    <DoctorSidebarLink to="/doctors/schedule" Icon={CalendarIcon} onClick={handleLinkClick}>
                        Schedule
                    </DoctorSidebarLink>
                    <DoctorSidebarLink to="/doctors/prescriptions" Icon={AnnouncementIcon} onClick={handleLinkClick}>
                        Prescriptions
                    </DoctorSidebarLink>
                </div>

                <SidebarFooter name="Brgy. San Isidro Medical Center"/>
            </div>
        </>
    )
}

export default DoctorSidebar