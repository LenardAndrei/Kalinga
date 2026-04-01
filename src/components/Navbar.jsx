import { NavLink } from "react-router-dom";
import logo from "../assets/LOGO.svg";
import profile from "../assets/profile.svg";

function Navbar() {
  const styles = {
    nav: {
      padding: "15px 20px",
      background: "transparent",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      display: "flex",
      alignItems: "center",
      fontFamily: "sans-serif"
    },
    brand: {
      display: "flex",
      alignItems: "center",
      marginRight: "auto",
    },
    logoText: {
      fontSize: "2.0rem",
      color: "#D2E4E8",
      margin: 0
    },
    navLinks: {
      background: "#82ACAB",
      padding: "10px",
      borderRadius: "20px",
      display: "flex",
      gap: "10px" 
    },
    linkBase: {
      textDecoration: "none",
      color: "#fff",
      fontWeight: "500",
      padding: "fit-content",
      borderRadius: "20px",
      transition: "background 0.3s"
    }
  };

  // Helper function to handle active styling
  const getLinkStyle = ({ isActive }) => ({
    ...styles.linkBase,
    textDecoration: "none",
    color: "#fff",
    fontWeight: "500",
    padding: "7px 14px",       // ← Add this! Without it links have no hit area
    borderRadius: "20px",
    backgroundColor: isActive ? "#2A787C" : "transparent",
    transition: "background 0.3s"
  });

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <img src={logo} alt="Kalinga Logo" style={{ width: "40px", marginRight: "10px" }} />  
        <h2 style={styles.logoText}>KALINGA</h2>
      </div>

      <div style={styles.navLinks}> 
        <NavLink to="/client/home" style={getLinkStyle}>
            Home
        </NavLink>
        <NavLink to="/client/map" style={getLinkStyle}>
            Map
        </NavLink>
        <NavLink to="/client/services" style={getLinkStyle}>
            Services
        </NavLink>
        <NavLink to="/client/announcement" style={getLinkStyle}>
            Announcement
        </NavLink>
      </div>
      <img src={profile} alt="Profile Button" style={{ width: "40px", marginRight: "10px" }} />
    </nav>
  );
}

export default Navbar;
