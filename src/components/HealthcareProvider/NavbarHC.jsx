import { useState, useEffect, useRef } from "react";
import Logo from "../../assets/LOGO.svg";
import { useLocation } from "react-router-dom";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    id: "facility",
    label: "Facility Profile",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 3h2v1h-2V7zm0 2h2v1h-2V9zm-4-2h2v1h-2V7zm0 2h2v1h-2V9zM7 7h2v1H7V7zm0 2h2v1H7V9zm13 11H4v-1h16v1zm0-2H4v-6h16v6zm0-7h-2V9h2v2zm0-3h-2V7h2v2z" />
        <circle cx="12" cy="16" r="2" />
        <path d="M6 14h4v4H6z" opacity="0.3" />
      </svg>
    ),
  },
  {
    id: "services",
    label: "Services Management",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" opacity="0.3"/>
        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
      </svg>
    ),
  },
  {
    id: "appointments",
    label: "Appointments",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" opacity="0.5"/>
        <circle cx="17" cy="17" r="5" />
        <path d="M16 14h2v3.59L19.5 19l-1.41 1.41L16 17.83V14z" fill="rgba(0,80,70,0.8)"/>
      </svg>
    ),
  },
  {
    id: "events",
    label: "Events Calendar",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
      </svg>
    ),
  },
  {
    id: "announcements",
    label: "Announcements",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"/>
      </svg>
    ),
  },
  {
    id: "reviews",
    label: "Reviews",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"/>
        <path d="M7 13h10v1H7zm0 2h7v1H7z" opacity="0.6"/>
      </svg>
    ),
  },
];

const BREAKPOINT = 768;

export default function KalingaSidebar({ facilityName = "Brgy. San Isidro Health Center", onNavigate, onLogout }) {
  const location = useLocation();
  const pathSegment = location.pathname.split("/")[2];
  const routeToId = {
    "dashboard":        "dashboard",
    "facility-profile": "facility",
    "services":         "services",
    "appointments":     "appointments",
    "events":           "events",
    "announcements":    "announcements",
    "reviews":          "reviews",
  };
  const active = routeToId[pathSegment] || "dashboard";

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

  const handleNav = (id) => {
    onNavigate?.(id);
    setDrawerOpen(false);
  };

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
        <img src={Logo} alt="Kalinga Logo" width="40" height="40" />
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
      <nav style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              title={compact ? item.label : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: compact ? 0 : "14px",
                justifyContent: compact ? "center" : "flex-start",
                padding: compact ? "13px 0" : "13px 16px",
                borderRadius: "14px",
                border: "none",
                background: isActive ? "rgba(255,255,255,0.35)" : "transparent",
                backdropFilter: isActive ? "blur(6px)" : "none",
                color: "rgba(255,255,255,0.9)",
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
                transition: "all 0.18s ease",
                outline: "none",
                fontFamily: "'Poppins', sans-serif",
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ display: "flex", alignItems: "center", flexShrink: 0, opacity: 0.95 }}>
                {item.icon}
              </span>
              {!compact && (
                <span style={{ fontSize: "15px", fontWeight: 900, lineHeight: "1.2" }}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ marginTop: "auto", paddingTop: "20px" }}>
        <div style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, rgb(95,198,160) 100%)",
          borderRadius: "16px",
          padding: compact ? "12px 8px" : "14px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: compact ? "center" : "stretch",
        }}>
          {!compact && (
            <span style={{
              color: "#032932", fontSize: "14px", fontWeight: 900,
              fontFamily: "'Poppins', sans-serif", lineHeight: "1.3",
            }}>
              {facilityName}
            </span>
          )}
          <button
            onClick={onLogout}
            title={compact ? "Log out" : undefined}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "#fff", border: "none", borderRadius: "10px",
              color: "#032932", fontSize: "13px", fontWeight: 900,
              fontFamily: "'Poppins', sans-serif",
              padding: compact ? "8px" : "7px 14px",
              cursor: "pointer", transition: "background 0.15s ease",
              gap: "4px", width: compact ? "36px" : "auto",
              height: compact ? "36px" : "auto",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#eaf7f2"}
            onMouseLeave={e => e.currentTarget.style.background = "#fff"}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
            </svg>
            {!compact && "Log out"}
          </button>
        </div>
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
          background: "linear-gradient(90deg, #5fc6a0 0%, #032932 100%)",
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
          <img src={Logo} alt="Kalinga Logo" width="32" height="32" />
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
            {navItems.find(n => n.id === active)?.label}
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
              background: "linear-gradient(180deg, #5fc6a0 0%, #032932 100%)",
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

  return (
    <aside style={{
      display: "flex",
      flexDirection: "column",
      width: "300px",
      minHeight: "100vh",
      background: "linear-gradient(180deg, #5fc6a0 0%, #032932 100%)",
      borderRadius: "0 24px 24px 0",
      padding: "28px 16px 24px",
      boxSizing: "border-box",
      boxShadow: "4px 0 24px rgba(0,0,0,0.18)",
      fontFamily: "'Poppins', sans-serif",
      position: "relative",
      overflowY: "auto",
      flexShrink: 0,
    }}>
      <NavContent compact={false} />
    </aside>
  );
}