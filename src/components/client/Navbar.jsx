import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import coloredLogo from "../../assets/colored-logo.svg";
import whiteLogo from "../../assets/white-logo.svg";
import profile from "../../assets/profile.svg";
import "./Navbar.css";

const BREAKPOINT = 768;

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const isTransparent = location.pathname === "/client/home" || location.pathname.includes("/client/healthcare/")
  const [servicesOpen, setServicesOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < BREAKPOINT);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dropdownRef = useRef(null)
  const profileRef = useRef(null)
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

  // close both dropdowns on route change
  useEffect(() => {
    setServicesOpen(false)
    setProfileOpen(false)
    setDrawerOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    setProfileOpen(false)
    navigate("/")   // change to your logout/login route
  }

  const handleProfile = () => {
    setProfileOpen(false)
    navigate("/client/profile")
  }

  const handleNav = () => {
    setDrawerOpen(false);
  };

  const getNavLinkClass = ({ isActive }) => (isActive ? "navLink active" : "navLink")
  const serviceBtnClass = isServicesActive || servicesOpen ? "servicesBtn active" : "servicesBtn"
  const logoTextClass = isTransparent ? "logoText" : "logoText opaque"

  // Get active page label
  const getActivePageLabel = () => {
    if (location.pathname === "/client/home") return "Home";
    if (location.pathname === "/client/map") return "Map";
    if (location.pathname === "/client/healthcare" || location.pathname.includes("/client/healthcare/")) return "Healthcare";
    if (location.pathname === "/client/specialists" || location.pathname.includes("/client/specialists/")) return "Specialists";
    if (location.pathname === "/client/announcement") return "Announcement";
    return "Home";
  };

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

  // ── Shared nav content (used in both nav and drawer) ─────────────
  const NavContent = ({ mobile = false }) => (
    <>
      <NavLink to="/client/home" className={getNavLinkClass} onClick={handleNav}>
        Home
      </NavLink>
      <NavLink to="/client/map" className={getNavLinkClass} onClick={handleNav}>
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
              onClick={() => { navigate("/client/healthcare"); setServicesOpen(false); handleNav(); }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#AAC8C9"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              Search for Healthcare Services
            </div>
            <div
              style={dropdownItemStyle}
              onClick={() => { navigate("/client/specialists"); setServicesOpen(false); handleNav(); }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#AAC8C9"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              Search for Specialists
            </div>
          </div>
        )}
      </div>

      <NavLink to="/client/announcement" className={getNavLinkClass} onClick={handleNav}>
        Announcement
      </NavLink>
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
            background: ${isTransparent ? "white" : "#032932"};
            border-radius: 2px;
            transition: transform 0.25s ease, opacity 0.25s ease;
            transform-origin: center;
          }
        `}</style>

        {/* Top bar */}
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
          height: 60,
          background: "transparent",
          borderBottom: "none",
          display: "flex", alignItems: "center",
          padding: "0 16px",
          boxShadow: "none",
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
            onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.1)"}
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
          <img
            src={isTransparent ? whiteLogo : coloredLogo}
            alt="Kalinga Logo"
            style={{ width: "32px", height: "40px" }}
          />
          <h2 style={{
            fontSize: "20px", fontWeight: 800,
            color: isTransparent ? "#D2E4E8" : "#0B4B54",
            fontFamily: "poppins, sans-serif",
            margin: 0,
          }}>
            KALINGA
          </h2>

          {/* Active page label */}
          <span style={{
            marginLeft: "auto",
            color: isTransparent ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.6)",
            fontSize: 13, fontWeight: 600,
            fontFamily: "'Poppins', sans-serif",
          }}>
            {getActivePageLabel()}
          </span>

          {/* Profile */}
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
        </div>

        {/* Spacer so content doesn't hide under topbar - only on non-transparent pages */}
        {!isTransparent && <div style={{ height: 60, flexShrink: 0 }} />}

        {/* Overlay */}
        {drawerOpen && (
          <div
            onClick={() => setDrawerOpen(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 910,
              background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)",
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
              background: "#82ACAB",
              borderRadius: "0 24px 24px 0",
              padding: "80px 16px 24px",
              boxSizing: "border-box",
              boxShadow: "4px 0 24px rgba(0,0,0,0.25)",
              fontFamily: "'Poppins', sans-serif",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              animation: "drawerSlideIn 0.25s ease",
            }}
          >
            {/* Drawer header with logo and name */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "-50px",
              marginBottom: "2px",
              paddingBottom: "16px",
            }}>
              <img
                src={coloredLogo}
                alt="Kalinga Logo"
                style={{ width: "38px", height: "50px" }}
              />
              <h3 style={{
                fontSize: "24px",
                fontWeight: 800,
                color: "#1a3a3a",
                fontFamily: "'Poppins', sans-serif",
                margin: 0,
              }}>
                KALINGA
              </h3>
            </div>

            <nav style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              alignItems: "stretch",
            }}>
              <NavContent mobile={true} />
            </nav>
          </aside>
        )}
      </>
    );
  }

  // DESKTOP
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

      <div className="navLinks">
        <NavContent mobile={false} />
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