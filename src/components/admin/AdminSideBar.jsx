import { NavLink, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import logo from "../../assets/colored-logo.svg"
import "./AdminSideBar.css"

const BREAKPOINT = 768;

const navItems = [
  {
    to: "/admin/dashboard",
    label: "Dashboard",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    to: "/admin/applications",
    label: "Applications",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    to: "/admin/doctors",
    label: "Doctors",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    to: "/admin/healthcare",
    label: "Healthcare",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    to: "/admin/patients",
    label: "Patients",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
]

function AdminSidebar({ isOpen, onClose }) {
  const navigate = useNavigate()
  const location = useLocation()
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

  // Sync with external state for desktop
  useEffect(() => {
    if (!isMobile) {
      setDrawerOpen(isOpen);
    }
  }, [isOpen, isMobile]);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
    if (onClose) onClose();
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

  const handleLogout = () => {
    navigate("/login")
  }

  const handleNav = () => {
    setDrawerOpen(false);
    if (onClose) onClose();
  };

  // Get active page label
  const activeItem = navItems.find(item => location.pathname === item.to);
  const activeLabel = activeItem ? activeItem.label : "Dashboard";

  // ── Shared nav content (used in both sidebar and drawer) ─────────────
  const NavContent = ({ compact = false }) => (
    <>
      {/* brand */}
      <div className="sidebar-brand">
        <img src={logo} alt="Kalinga" className="sidebar-logo" />
        <span className="sidebar-brand-name">KALINGA</span>
        {!compact && (
          <button className="sidebar-close-btn" type="button" onClick={() => { setDrawerOpen(false); if (onClose) onClose(); }} aria-label="Close menu">
            ×
          </button>
        )}
      </div>

      {/* nav links */}
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
            onClick={handleNav}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* admin + logout */}
      <div className="sidebar-footer">
        <div className="sidebar-admin-row">
          <div className="sidebar-avatar">A</div>
          <span className="sidebar-admin-label">Admin</span>
        </div>
        <button className="sidebar-logout-btn" onClick={handleLogout}>
          Log out
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </button>
      </div>
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
          <img src={logo} alt="Kalinga" style={{width: "32px", height: "40px"}} />
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
              background: "linear-gradient(to top, #032932, #82ACAB)",
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
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <NavContent compact={false} />
    </aside>
  )
}

export default AdminSidebar