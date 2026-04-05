import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/logo.svg";
import coloredLogo from "../../assets/colored-logo.svg";
import profile from "../../assets/profile.svg";

function Navbar() {
  const location = useLocation()
  const isHome = location.pathname === "/client/home"

  const styles = {
    nav: {
      padding: "15px 30px",
      background: isHome ? "transparent" : "#fff",
      position: isHome ? "absolute" : "relative",
      top: 0,
      left: 0,
      right: 0,
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
      gap: "7px"
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
  })

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <img src={isHome ? logo : coloredLogo} alt="Kalinga Logo" style={{ width: "40px", marginRight: "10px" }} />
        <h2 style={styles.logoText}>KALINGA</h2>
      </div>

      <div style={styles.navLinks}>
        <NavLink to="/client/home" style={getLinkStyle}>Home</NavLink>
        <NavLink to="/client/map" style={getLinkStyle}>Map</NavLink>
        <NavLink to="/client/services" style={getLinkStyle}>Services</NavLink>
        <NavLink to="/client/announcement" style={getLinkStyle}>Announcement</NavLink>
      </div>

      <div style={{ marginLeft: "20px" }} />
      <img src={profile} alt="Profile Button" style={{ width: "50px", marginRight: "10px" }} />
    </nav>
  )
}

export default Navbar