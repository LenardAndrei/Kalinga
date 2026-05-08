import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import coloredLogo from "../../assets/colored-logo.svg";
import whiteLogo from "../../assets/white-logo.svg";
import profile from "../../assets/profile.svg";
import "./Navbar.css";

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const isTransparent = location.pathname === "/client/home" || location.pathname.includes("/client/healthcare/")
  const [servicesOpen, setServicesOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)   
  const dropdownRef = useRef(null)
  const profileRef = useRef(null)                         

  const isServicesActive =
    location.pathname.startsWith("/client/services") ||
    location.pathname === "/client/healthcare" ||
    location.pathname.includes("/client/healthcare/") ||
    location.pathname === "/client/specialists" ||
    location.pathname.includes("/client/specialists/")

  // close services dropdown outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // close profile dropdown outside click
  useEffect(() => {
    function handleProfileOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleProfileOutside)
    return () => document.removeEventListener("mousedown", handleProfileOutside)
  }, [])

  // close both dropdowns on route change
  useEffect(() => {
    setServicesOpen(false)
    setProfileOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    setProfileOpen(false)
    navigate("/")   // change to your logout/login route
  }

  const handleProfile = () => {
    setProfileOpen(false)
    navigate("/client/profile")   // change to your profile route
  }

  const [menuOpen, setMenuOpen] = useState(false)

  const getNavLinkClass = ({ isActive }) => (isActive ? "navLink active" : "navLink")
  const serviceBtnClass = isServicesActive || servicesOpen ? "servicesBtn active" : "servicesBtn"
  const logoTextClass = isTransparent ? "logoText" : "logoText opaque"

  useEffect(() => {
    setServicesOpen(false)
    setProfileOpen(false)
    setMenuOpen(false)
  }, [location.pathname])

  const dropdownItemStyle = {
    padding: "14px 24px",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "clamp(14px, 1.5vw, 15px)",
    fontWeight: "700",
    color: "#1a3a3a",
    cursor: "pointer",
    borderRadius: "12px",
    transition: "background 0.2s",
    whiteSpace: "nowrap",
    textAlign: "center",
  }

  return (
    <nav className={`nav ${isTransparent ? "transparent" : "opaque"}`}>
      <div className="brand">
        <img
          src={location.pathname === "/client/home" ? whiteLogo : coloredLogo}
          alt="Kalinga Logo"
          style={{ width: "40px", marginRight: "10px" }}
        />
        <h2 className={logoTextClass}>KALINGA</h2>
      </div>

      <button
        className={`nav-toggle ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`navLinks ${menuOpen ? "mobileOpen" : ""}`}>
        <NavLink to="/client/home" className={getNavLinkClass} onClick={() => setMenuOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/client/map" className={getNavLinkClass} onClick={() => setMenuOpen(false)}>
          Map
        </NavLink>

        {/* services dropdown */}
        <div ref={dropdownRef} className="servicesDropdown">
          <div
            className={serviceBtnClass}
            onClick={() => setServicesOpen((prev) => !prev)}
          >
            Services
          </div>

          {servicesOpen && (
            <div className="dropdownMenu" style={{ minWidth: "clamp(200px, 50vw, 260px)" }}>
              <div
                style={dropdownItemStyle}
                onClick={() => { navigate("/client/healthcare"); setServicesOpen(false); setMenuOpen(false) }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#AAC8C9"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                Search for Healthcare Services
              </div>
              <div
                style={dropdownItemStyle}
                onClick={() => { navigate("/client/specialists"); setServicesOpen(false); setMenuOpen(false) }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#AAC8C9"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                Search for Specialists
              </div>
            </div>
          )}
        </div>

        <NavLink to="/client/announcement" className={getNavLinkClass} onClick={() => setMenuOpen(false)}>
          Announcement
        </NavLink>
      </div>

      <div className="profileDropdown" ref={profileRef}>
        <button
          type="button"
          onClick={() => setProfileOpen((prev) => !prev)}
          className="profileBtn"
        >
          <img
            src={profile}
            alt="Profile"
            className="profileImg"
          />
        </button>

        {profileOpen && (
          <div className="profileMenu">
            <button
              onClick={() => {
                setProfileOpen(false)
                navigate("/login")
              }}
              className="profileItem"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar