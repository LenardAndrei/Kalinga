import {Link, useLocation} from "react-router-dom";
import "./DoctorSidebar.css"
import { useState, useEffect, useRef } from "react";
import AnnouncementIcon from "./icons/AnnouncementIcon.jsx";
import AppointmentIcon from "./icons/AppointmentIcon.jsx";
import CalendarIcon from "./icons/CalendarIcon.jsx";
import HomeIcon from "./icons/HomeIcon.jsx";
import PeopleIcon from "./icons/PeopleIcon.jsx";
import ProfileIcon from "./icons/ProfileIcon.jsx";
import ReviewIcon from "./icons/ReviewIcon.jsx";

const BREAKPOINT = 768;

const navItems = [
  {
    to: "/doctors/dashboard",
    label: "Dashboard",
    icon: HomeIcon,
  },
  {
    to: "/doctors/profile",
    label: "Doctor Profile",
    icon: ProfileIcon,
  },
  {
    to: "/doctors/patients",
    label: "Patients",
    icon: PeopleIcon,
  },
  {
    to: "/doctors/appointments",
    label: "Appointments",
    icon: AppointmentIcon,
  },
  {
    to: "/doctors/schedule",
    label: "Schedule",
    icon: CalendarIcon,
  },
  {
    to: "/doctors/prescriptions",
    label: "Prescriptions",
    icon: AnnouncementIcon,
  },
];

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

function SidebarFooter({ name, onLogout }){
    return (
        <div className="sidebar-footer">
            <h2 className="sidebar-footer__title">{name}</h2>
            <button className="sidebar-footer__logout-btn" onClick={onLogout}>
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
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(window.innerWidth < BREAKPOINT);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const drawerRef = useRef(null);

    // Track window width
    useEffect(() => {
        const onResize = () => {
            const mobile = window.innerWidth < BREAKPOINT;
            setIsMobile(mobile);
            if (!mobile) setDrawerOpen(false); // auto-close drawer on expand
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // Close drawer on route change
    useEffect(() => {
        setDrawerOpen(false);
    }, [location.pathname]);

    // Close on outside click
    useEffect(() => {
        if (!drawerOpen) return;
        const handler = (e) => {
            if (drawerRef.current && !drawerRef.current.contains(e.target)) {
                setDrawerOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [drawerOpen]);

    const handleNav = () => {
        setDrawerOpen(false);
    };

    const handleLogout = () => {
        // Add logout logic here
        console.log("Logout");
    };

    // Get active page label
    const activeItem = navItems.find(item => location.pathname === item.to);
    const activeLabel = activeItem ? activeItem.label : "Dashboard";

    // ── Shared nav content (used in both sidebar and drawer) ─────────────
    const NavContent = ({ compact = false }) => (
        <>
            {/* Header */}
            <div style={{
                display: "flex", alignItems: "center",
                gap: compact ? "10px" : "12px",
                paddingLeft: "8px",
                marginBottom: compact ? "24px" : "36px",
            }}>
                <img src="/logo_white.png" alt="logo" className="doctor-sidebar-logo__image" style={{width: compact ? "32px" : "2rem", height: compact ? "40px" : "2.6rem"}}/>
                {!compact && (
                    <span style={{
                        color: "white", fontSize: "26px", fontWeight: 900,
                        letterSpacing: "0px", fontFamily: "'Poppins', sans-serif",
                    }}>
                        KALINGA
                    </span>
                )}
            </div>

            {/* Nav Items */}
            <div className="doctor-sidebar__links">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.to;
                    return (
                        <DoctorSidebarLink
                            key={item.to}
                            to={item.to}
                            Icon={item.icon}
                            onClick={handleNav}
                        >
                            {item.label}
                        </DoctorSidebarLink>
                    );
                })}
            </div>

            {/* Footer */}
            <SidebarFooter name="Dr. John Doe" onLogout={handleLogout} />
        </>
    );

    // MOBILE
    if (isMobile) {
        return (
            <>
                <style>{`
                    @keyframes drawerSlideIn {
                        from { transform: translateX(-100%); opacity: 0.6; }
                        to   { transform: translateX(0);     opacity: 1; }
                    }
                    @keyframes overlayFadeIn {
                        from { opacity: 0; }
                        to   { opacity: 1; }
                    }
                    .burger-line {
                        display: block;
                        width: 22px;
                        height: 2.5px;
                        background: white;
                        border-radius: 2px;
                        transition: transform 0.25s ease, opacity 0.25s ease;
                        transform-origin: center;
                    }
                `}</style>

                {/* Top bar */}
                <div style={{
                    position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
                    height: 60,
                    background: "linear-gradient(90deg, #82ACAB 0%, #2A787C 33%, #032932 100%)",
                    display: "flex", alignItems: "center",
                    padding: "0 16px",
                    boxShadow: "0 2px 16px rgba(3,41,50,0.2)",
                    gap: 14,
                }}>
                    {/* Burger button */}
                    <button
                        onClick={() => setDrawerOpen(o => !o)}
                        style={{
                            background: "none", border: "none", cursor: "pointer",
                            display: "flex", flexDirection: "column", gap: 5,
                            padding: "6px", borderRadius: 8,
                            alignItems: "center", justifyContent: "center",
                            transition: "background 0.15s",
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
                        onMouseLeave={e => e.currentTarget.style.background = "none"}
                        aria-label="Open menu"
                    >
                        <span className="burger-line" style={{
                            transform: drawerOpen ? "translateY(7.5px) rotate(45deg)" : "none",
                        }} />
                        <span className="burger-line" style={{
                            opacity: drawerOpen ? 0 : 1,
                            transform: drawerOpen ? "scaleX(0)" : "none",
                        }} />
                        <span className="burger-line" style={{
                            transform: drawerOpen ? "translateY(-7.5px) rotate(-45deg)" : "none",
                        }} />
                    </button>

                    {/* Logo + name */}
                    <img src="/logo_white.png" alt="logo" style={{width: "32px", height: "40px"}} />
                    <span style={{
                        color: "white", fontSize: "20px", fontWeight: 900,
                        fontFamily: "'Poppins', sans-serif", letterSpacing: 0,
                    }}>
                        KALINGA
                    </span>

                    {/* Active page label */}
                    <span style={{
                        marginLeft: "auto",
                        color: "rgba(255,255,255,0.75)",
                        fontSize: 13, fontWeight: 600,
                        fontFamily: "'Poppins', sans-serif",
                    }}>
                        {activeLabel}
                    </span>
                </div>

                {/* Spacer so content doesn't hide under topbar */}
                <div style={{ height: 60, flexShrink: 0 }} />

                {/* Overlay */}
                {drawerOpen && (
                    <div
                        onClick={() => setDrawerOpen(false)}
                        style={{
                            position: "fixed", inset: 0, zIndex: 910,
                            background: "rgba(3,41,50,0.45)", backdropFilter: "blur(2px)",
                            animation: "overlayFadeIn 0.2s ease",
                        }}
                    />
                )}

                {/* Slide-in drawer */}
                {drawerOpen && (
                    <aside
                        ref={drawerRef}
                        style={{
                            position: "fixed", top: 0, left: 0, bottom: 0,
                            zIndex: 920,
                            width: 280,
                            background: "linear-gradient(180deg, #82ACAB 0%, #2A787C 33%, #032932 100%)",
                            borderRadius: "0 24px 24px 0",
                            padding: "28px 16px 24px",
                            boxSizing: "border-box",
                            boxShadow: "4px 0 24px rgba(0,0,0,0.25)",
                            fontFamily: "'Poppins', sans-serif",
                            display: "flex",
                            flexDirection: "column",
                            overflowY: "auto",
                            animation: "drawerSlideIn 0.25s ease",
                        }}
                    >
                        <NavContent compact={false} />
                    </aside>
                )}
            </>
        );
    }

    // DESKTOP
    return (
        <div className="doctor-sidebar">
            <div className="doctor-sidebar-logo__container">
                <img src="/logo_white.png" alt="logo" className="doctor-sidebar-logo__image"/>
                <h1 className="doctor-sidebar-logo__text">KALINGA</h1>
            </div>

            <div className="doctor-sidebar__links">
                {navItems.map((item) => (
                    <DoctorSidebarLink
                        key={item.to}
                        to={item.to}
                        Icon={item.icon}
                        onClick={() => {}}
                    >
                        {item.label}
                    </DoctorSidebarLink>
                ))}
            </div>

            <SidebarFooter name="Dr. John Doe" onLogout={handleLogout}/>
        </div>
    );
}

export default DoctorSidebar;