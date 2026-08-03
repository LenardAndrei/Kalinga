import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MOCK_MODULES, MOCK_OTHER_SERVICES } from "../../pages/HealthcareProvider/ServicesManagement";

// API CONFIG
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://your-api.example.com";

async function fetchServices(facilityId) {
  const response = await fetch(`${API_BASE_URL}/api/facilities/${facilityId}/services`);
  if (!response.ok) throw new Error(`Failed to fetch services: ${response.status}`);
  return response.json();
}

function deriveServices(modules, otherServices) {
  const moduleNames = modules.map((m) => ({
    id: `mod-${m.type}`,
    name: m.type.charAt(0).toUpperCase() + m.type.slice(1),
    isModule: true,
  }));
  const otherNames = otherServices.map((s) => ({
    id: `svc-${s.id}`,
    name: s.name,
    isModule: false,
  }));
  return [...moduleNames, ...otherNames];
}

const MOCK_DERIVED = deriveServices(MOCK_MODULES, MOCK_OTHER_SERVICES);

// Sub-components
function ServicePill({ name, isModule }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 7,
      backgroundColor: isModule ? "#032932" : "#f0f5f4",
      border: `1px solid ${isModule ? "transparent" : "#d4e6e1"}`,
      borderRadius: 10,
      padding: "7px 12px",
      fontFamily: "'Poppins', sans-serif",
      fontSize: 13,
      fontWeight: 600,
      color: isModule ? "#fff" : "#032932",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      flexShrink: 0,
    }}>
      {isModule && (
        <span style={{
          width: 6, height: 6, borderRadius: "50%",
          background: "#5fc6a0", flexShrink: 0, display: "inline-block",
        }} />
      )}
      {name}
    </div>
  );
}

// Horizontal stacked bar showing module vs other split
function CompositionBar({ moduleCount, otherCount, total }) {
  const modulePct = total > 0 ? Math.round((moduleCount / total) * 100) : 0;
  const otherPct  = 100 - modulePct;
  return (
    <div>
      <div style={{
        display: "flex",
        height: 10,
        borderRadius: 999,
        overflow: "hidden",
        background: "#e8f2ef",
      }}>
        <div style={{
          width: `${modulePct}%`,
          background: "linear-gradient(to right, #032932, #2a6b60)",
          transition: "width 0.6s ease",
        }} />
        <div style={{
          width: `${otherPct}%`,
          background: "linear-gradient(to right, #a8d8cc, #d4e6e1)",
          transition: "width 0.6s ease",
        }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
        <span style={styles.barLabel}>
          <span style={{ ...styles.barDot, background: "#032932" }} />
          Modules ({modulePct}%)
        </span>
        <span style={styles.barLabel}>
          Other ({otherPct}%)
          <span style={{ ...styles.barDot, background: "#a8d8cc", marginLeft: 5, marginRight: 0 }} />
        </span>
      </div>
    </div>
  );
}


export default function ServicesOfferedCard({
  facilityId = "default",
  useMock = true,
}) {
  const navigate = useNavigate();

  const [services, setServices] = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        let result;
        if (useMock) {
          result = MOCK_DERIVED;
        } else {
          const raw = await fetchServices(facilityId);
          result = Array.isArray(raw) ? raw : deriveServices(raw.modules, raw.otherServices);
        }
        if (!cancelled) setServices(result);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [facilityId, useMock]);

  const total    = services?.length ?? 0;
  const modules  = services?.filter((s) => s.isModule)  ?? [];
  const others   = services?.filter((s) => !s.isModule) ?? [];

  // Pills — up to 6
  const pillPreview  = services?.slice(0, 6) ?? [];
  const pillOverflow = total - pillPreview.length;

  return (
    <div style={styles.card}>
      <style>{`
        @keyframes svcRowIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .svc-pill-anim { animation: svcRowIn 0.3s ease both; }
        .svc-row-anim  { animation: svcRowIn 0.3s ease both; }
        .svc-manage-btn:hover {
          background: #3d8a7a !important;
          transform: translateY(-1px) !important;
        }
        .svc-manage-btn:active { transform: translateY(0) !important; }
      `}</style>

      {/* ── Header ── */}
      <div style={styles.header}>
        <h2 style={styles.title}>Services Offered</h2>
        {!loading && !error && (
          <span style={styles.countBadge}>{total}</span>
        )}
      </div>

      {/* ── Stat row ── */}
      {!loading && !error && services && (
        <div style={styles.statsRow}>
          <div style={styles.statBox}>
            <span style={styles.statLabel}>Total</span>
            <span style={styles.statValue}>{total}</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statBox}>
            <span style={styles.statLabel}>Modules</span>
            <span style={styles.statValue}>{modules.length}</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statBox}>
            <span style={styles.statLabel}>Other Services</span>
            <span style={styles.statValue}>{others.length}</span>
          </div>
        </div>
      )}

      {/* ── Loading / error states ── */}
      {loading && (
        <div style={styles.stateBox}>
          <span style={styles.stateText}>Loading services…</span>
        </div>
      )}
      {error && (
        <div style={{ ...styles.stateBox, background: "#fdecea" }}>
          <span style={{ ...styles.stateText, color: "#c0392b" }}>⚠ {error}</span>
        </div>
      )}

      {!loading && !error && services && (
        <>
          {/* ── Composition bar ── */}
          <div style={styles.section}>
            <p style={styles.sectionLabel}>Composition</p>
            <CompositionBar
              moduleCount={modules.length}
              otherCount={others.length}
              total={total}
            />
          </div>

          <div style={styles.divider} />

          {/* ── Pills ── */}
          <div style={styles.section}>
            <p style={styles.sectionLabel}>All Services</p>
            <div style={styles.pillsWrap}>
              {pillPreview.map((svc, i) => (
                <div
                  key={svc.id}
                  className="svc-pill-anim"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <ServicePill name={svc.name} isModule={svc.isModule} />
                </div>
              ))}
              {pillOverflow > 0 && (
                <div style={styles.overflowPill}>+{pillOverflow} more</div>
              )}
            </div>
          </div>


        </>
      )}

      {/* ── Legend ── */}
      {!loading && !error && (
        <div style={styles.legend}>
          <span style={styles.legendDot} />
          <span style={styles.legendText}>Module</span>
          <div style={styles.legendSwatch} />
          <span style={styles.legendText}>Other service</span>
        </div>
      )}

      {/* ── CTA ── */}
      <div style={styles.buttonWrapper}>
        <button
          className="svc-manage-btn"
          style={styles.manageButton}
          onClick={() => navigate("/healthcare-provider/services")}
        >
          Manage Services
        </button>
      </div>
    </div>
  );
}

const TEAL      = "#5fa89a";
const TEXT_DARK = "#032932";

const styles = {
  card: {
    width: "100%",
    maxWidth: 515,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: "20px 24px",
    boxSizing: "border-box",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    fontFamily: "'Poppins', sans-serif",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  title: {
    margin: 0,
    fontSize: "clamp(18px, 4vw, 22px)",
    fontWeight: 900,
    color: TEXT_DARK,
    textAlign: "center",
  },

  countBadge: {
    background: TEAL,
    color: "#fff",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 800,
    fontSize: 13,
    borderRadius: 999,
    padding: "2px 10px",
    lineHeight: 1.6,
    flexShrink: 0,
  },

  statsRow: {
    display: "flex",
    alignItems: "center",
    background: "#f0f5f4",
    borderRadius: 12,
    border: "1px solid #d4e6e1",
    padding: "10px 8px",
  },

  statBox: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  },

  statDivider: {
    width: "1px",
    height: 28,
    background: "#d4e6e1",
    flexShrink: 0,
  },

  statLabel: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 10,
    fontWeight: 600,
    color: "#7a9e97",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
  },

  statValue: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 20,
    fontWeight: 800,
    color: TEXT_DARK,
    lineHeight: 1,
  },

  section: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },

  sectionLabel: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 10,
    fontWeight: 700,
    color: "#a8c5bc",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    margin: 0,
  },

  divider: {
    height: "1px",
    background: "#e8f2ef",
    borderRadius: 1,
  },

  barLabel: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 11,
    fontWeight: 500,
    color: "#a8c5bc",
    display: "flex",
    alignItems: "center",
    gap: 4,
  },

  barDot: {
    display: "inline-block",
    width: 8,
    height: 8,
    borderRadius: "50%",
    marginRight: 4,
    flexShrink: 0,
  },

  pillsWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: 7,
  },

  overflowPill: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f0f5f4",
    border: "1px solid #d4e6e1",
    borderRadius: 10,
    padding: "7px 12px",
    fontFamily: "'Poppins', sans-serif",
    fontSize: 12,
    fontWeight: 600,
    color: "#7a9e97",
    whiteSpace: "nowrap",
  },

  legend: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    paddingTop: 2,
    flexWrap: "wrap",
  },

  legendDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#5fc6a0",
    flexShrink: 0,
    display: "inline-block",
  },

  legendSwatch: {
    width: 14,
    height: 14,
    borderRadius: 4,
    background: "#f0f5f4",
    border: "1px solid #d4e6e1",
    flexShrink: 0,
    marginLeft: 8,
  },

  legendText: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 11,
    fontWeight: 500,
    color: "#a8c5bc",
  },

  stateBox: {
    minHeight: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#f0f5f4",
  },

  stateText: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 13,
    color: TEXT_DARK,
    opacity: 0.6,
  },

  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: "auto",
    paddingTop: 4,
  },

  manageButton: {
    backgroundColor: TEAL,
    border: "none",
    borderRadius: 50,
    padding: "10px 60px",
    fontSize: 16,
    fontWeight: 700,
    color: "#fff",
    cursor: "pointer",
    fontFamily: "'Poppins', sans-serif",
    transition: "background-color 0.15s ease, transform 0.15s ease",
    width: "100%",
    maxWidth: 300,
  },
};