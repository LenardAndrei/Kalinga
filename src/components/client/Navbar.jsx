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

  const styles = {
    nav: {
      padding: "15px clamp(15px, 5vw, 30px)",
      background: isTransparent ? "transparent" : "#fff",
      position: isTransparent ? "absolute" : "relative",
      top: 0, left: 0, right: 0,
      zIndex: 10,
      display: "flex",
      alignItems: "center",
      fontFamily: "sans-serif",
      borderBottom: isTransparent ? "none" : "1px solid #eee",
    },
    brand: {
      display: "flex",
      alignItems: "center",
      marginRight: "auto",
    },
    logoText: {
      fontSize: "clamp(1.5rem, 4vw, 2.0rem)",
      fontWeight: "800",
      color: location.pathname === "/client/home" ? "#D2E4E8" : "#0B4B54",
    },
    navLinks: {
      background: "#82ACAB",
      borderRadius: "50px",
      display: "flex",
      gap: "7px",
      alignItems: "center",
    },
  }

  const getLinkStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: "#1a3a3a",
    fontWeight: "900",
    padding: "8px clamp(20px, 3vw, 34px)",
    borderRadius: "50px",
    backgroundColor: isActive ? "#2A787C" : "transparent",
    transition: "background 0.3s",
    fontSize: "clamp(16px, 2vw, 20px)",
    cursor: "pointer",
  })

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
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <img
          src={location.pathname === "/client/home" ? whiteLogo : coloredLogo}  
          alt="Kalinga Logo"
          style={{ width: "40px", marginRight: "10px" }}
        />
        <h2 style={styles.logoText}>KALINGA</h2>
      </div>

      <div style={styles.navLinks}>
        <NavLink to="/client/home" style={getLinkStyle}>Home</NavLink>
        <NavLink to="/client/map" style={getLinkStyle}>Map</NavLink>

        {/* services dropdown */}
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <div
            style={{
              ...getLinkStyle({ isActive: isServicesActive || servicesOpen }),
              userSelect: "none",
            }}
            onClick={() => setServicesOpen((prev) => !prev)}
          >
            Services
          </div>

          {servicesOpen && (
            <div style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#fff",
              borderRadius: "16px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              zIndex: 100,
              minWidth: "clamp(200px, 50vw, 260px)",
            }}>
              <div
                style={dropdownItemStyle}
                onClick={() => { navigate("/client/healthcare"); setServicesOpen(false) }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#AAC8C9"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                Search for Healthcare Services
              </div>
              <div
                style={dropdownItemStyle}
                onClick={() => { navigate("/client/specialists"); setServicesOpen(false) }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#AAC8C9"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                Search for Specialists
              </div>
            </div>
          )}
        </div>

        <NavLink to="/client/announcement" style={getLinkStyle}>Announcement</NavLink>
      </div>

      <div style={{ marginLeft: "20px" }} />

      {/* ── profile button + dropdown ── */}
      <div ref={profileRef} style={{ position: "relative" }}>

        {/* profile circle button */}
        <div
          onClick={() => setProfileOpen((prev) => !prev)}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={profile}
            alt="Profile"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
        </div>

        {/* profile dropdown */}
        {profileOpen && (
          <div style={{
            position: "absolute",
            top: "calc(100% + 10px)",
            right: 0,
            background: "#fff",
            borderRadius: "20px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.14)",
            padding: "10px",
            zIndex: 100,
            minWidth: "160px",
            display: "flex",
            justifyContent: "center",
          }}>
            <button
              onClick={() => {
                setProfileOpen(false)
                navigate("/login")   
              }}
              style={{
                width: "100%",
                background: "#fff",
                color: "#000",
                border: "none",
                borderRadius: "50px",
                padding: "12px 28px",
                fontSize: "15px",
                fontWeight: "700",
                fontFamily: "'Poppins', sans-serif",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#f0f0f0"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}
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