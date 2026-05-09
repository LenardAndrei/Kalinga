 import { useState, useEffect } from "react";

// API CONFIG 
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://your-api.example.com";

async function fetchServices(facilityId) {
  const response = await fetch(`${API_BASE_URL}/api/facilities/${facilityId}/services`);
  if (!response.ok) throw new Error(`Failed to fetch services: ${response.status}`);
  return response.json();
  // Expected response shape:
  // {
  //   total: number,
  //   services: [
  //     { id: string, name: string },
  //     ...
  //   ]
  // }
}

// MOCK DATA
const MOCK_DATA = {
  total: 8,
  services: [
    { id: "1", name: "Consultation" },
    { id: "2", name: "Vaccination" },
    { id: "3", name: "Laboratory Tests" },
    { id: "4", name: "Free Medicine" },
    { id: "5", name: "Pharmacy" },
    { id: "6", name: "Radiology" },
    { id: "7", name: "Dental Services" },
    { id: "8", name: "Family Planning" },

  ],
};

// MAIN COMPONENT

export default function ServicesOfferedCard({
  facilityId = "default",
  onManageServices,
  useMock = true,
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [btnHovered, setBtnHovered] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const result = useMock ? MOCK_DATA : await fetchServices(facilityId);
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [facilityId, useMock]);

  const handleManage = () => {
    if (onManageServices) onManageServices();
    else console.log("Navigate to manage services");
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Services Offered</h2>

      {/* Summary badge */}
      <div style={styles.summaryBadge}>
        <div style={styles.countBubble}>
          <span style={styles.countText}>{loading ? "—" : (data?.total ?? 0)}</span>
        </div>
        <span style={styles.summaryLabel}>Active Services Offered</span>
      </div>

      {/* Services list box */}
      <div style={styles.listBox}>
        {loading && <span style={styles.stateText}>Loading services…</span>}

        {error && (
            <span style={{ ...styles.stateText, color: "#c0392b" }}>
            ⚠ {error}
            </span>
        )}

        {!loading && !error && data && (
            <>
            <ul style={styles.list}>
                {data.services.slice(0, 5).map((service) => (
                <li key={service.id} style={styles.pill}>
                    {service.name}
                </li>
                ))}
            </ul>

            {data.services.length > 5 && (
                <span style={styles.moreText}>
                + {data.services.length - 5} more
                </span>
            )}
            </>
        )}
        </div>

      {/* Manage Services button */}
      <div style={styles.buttonWrapper}>
        <button
          style={{
            ...styles.manageButton,
            ...(btnHovered ? styles.manageButtonHover : {}),
          }}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          onClick={handleManage}
        >
          Manage Services
        </button>
      </div>
    </div>
  );
}

// STYLES 

const TEAL = "#5fa89a";
const TEAL_DARK = "#3d8a7a";
const TEXT_DARK = "#0d3d3d";
const ROW_BG = "#e0e0e0";

const styles = {
  card: {
    width: 515,
    height: 321,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    border: "0.5px solid rgba(0,0,0,0.12)",
    padding: "20px 24px",
    boxSizing: "border-box",
    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    fontFamily: "'Poppins', 'DM Sans', 'Helvetica Neue', sans-serif",
  },
  title: {
    margin: 0,
    textAlign: "center",
    fontSize: 24,
    fontWeight: 900,
    color: TEXT_DARK,
  },

  // Summary badge
  summaryBadge: {
    backgroundColor: TEAL,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    height: 46,
  },
  countBubble: {
    backgroundColor: TEAL_DARK,
    borderRadius: 50,
    minWidth: 70,
    height: 46,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  countText: {
    fontSize: 36,
    fontWeight: 900,
    color: "#fff",
    lineHeight: 1,
  },
  summaryLabel: {
    fontSize: 20,
    fontWeight: 900,
    color: TEXT_DARK,
    paddingLeft: 16,
  },

  // Services list box
  listBox: {
    backgroundColor: ROW_BG,
    borderRadius: 16,
    padding: "14px 20px",
    minHeight: 120,
  },
    list: {
    margin: 0,
    padding: 0,
    listStyle: "none",
    display: "flex",
    flexWrap: "wrap",  
    gap: "8px",
},
    pill: {
    fontSize: 14,
    fontWeight: 600,
    color: TEXT_DARK,
    backgroundColor: "#ffffff",
    padding: "6px 12px",
    borderRadius: 20, 
    border: "1px solid rgba(0,0,0,0.1)",
    whiteSpace: "nowrap",
},
    moreText: {
    fontSize: 13,
    color: TEXT_DARK,
    opacity: 0.6,
    marginTop: 6,
    display: "block",
    },

  // Button
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  manageButton: {
    backgroundColor: TEAL,
    border: "none",
    borderRadius: 50,
    padding: "10px 60px",
    fontSize: 20,
    fontWeight: 700,
    color: "#fff",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "background-color 0.15s ease, transform 0.1s ease",
  },
  manageButtonHover: {
    backgroundColor: TEAL_DARK,
    transform: "scale(0.98)",
  },
};