import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";   
import logo from "../../assets/logo.svg";
import coloredLogo from "../../assets/colored-logo.svg";
import profile from "../../assets/profile.svg";

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === "/client/home"
  const [servicesOpen, setServicesOpen] = useState(false)
  const dropdownRef = useRef(null)    // ← ref to detect outside clicks

const isServicesActive =
  location.pathname.startsWith("/client/services") ||
  location.pathname === "/client/healthcare" ||
  location.pathname === "/client/specialists"

  // close dropdown when clicking anywhere outside of it
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // close dropdown on route change
  useEffect(() => {
    setServicesOpen(false)
  }, [location.pathname])

  const styles = {
    nav: {
      padding: "15px 30px",
      background: isHome ? "transparent" : "#fff",
      position: isHome ? "absolute" : "relative",
      top: 0, left: 0, right: 0,
      zIndex: 10,
      display: "flex",
      alignItems: "center",
      fontFamily: "sans-serif",
      borderBottom: isHome ? "none" : "1px solid #eee",
    },
    brand: {
      display: "flex",
      alignItems: "center",
      marginRight: "auto",
    },
    logoText: {
      fontSize: "2.0rem",
      fontWeight: "800",
      color: isHome ? "#D2E4E8" : "#0B4B54",
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
    padding: "8px 34px",
    borderRadius: "50px",
    backgroundColor: isActive ? "#2A787C" : "transparent",
    transition: "background 0.3s",
    fontSize: "20px",
    cursor: "pointer",
  })

  const dropdownItemStyle = {
    padding: "14px 24px",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "15px",
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
          src={isHome ? logo : coloredLogo}
          alt="Kalinga Logo"
          style={{ width: "40px", marginRight: "10px" }}
        />
        <h2 style={styles.logoText}>KALINGA</h2>
      </div>

      <div style={styles.navLinks}>
        <NavLink to="/client/home" style={getLinkStyle}>Home</NavLink>
        <NavLink to="/client/map" style={getLinkStyle}>Map</NavLink>

        {/* ── Services with click dropdown ── */}
        <div
          ref={dropdownRef}       // ← attach ref here to detect outside clicks
          style={{ position: "relative" }}
        >
          <div
            style={{
              ...getLinkStyle({ isActive: isServicesActive }),
              userSelect: "none",
            }}
            onClick={() => setServicesOpen((prev) => !prev)}
          >
            Services
          </div>

          {servicesOpen && (
            <div
              style={{
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
                minWidth: "260px",
              }}
            >
              <div
                style={dropdownItemStyle}
                onClick={() => {
                  navigate("/client/healthcare")
                  setServicesOpen(false)
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#AAC8C9"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                Search for Healthcare Services
              </div>

              <div
                style={dropdownItemStyle}
                onClick={() => {
                  navigate("/client/specialists")
                  setServicesOpen(false)
                }}
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
      <img src={profile} alt="Profile Button" style={{ width: "50px", marginRight: "10px" }} />
    </nav>
  )
}

export default Navbar