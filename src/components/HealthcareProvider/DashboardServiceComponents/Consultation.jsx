import { useNavigate } from "react-router-dom";
import { MOCK_CONSULTATIONS } from "../../../pages/HealthcareProvider/ConsultationManagement";

function DoctorInitials({ name }) {
  const initials = name
    .replace("Dr. ", "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const palettes = [
    ["#22c97a", "rgba(34,201,122,0.18)"],
    ["#5fc6a0", "rgba(95,198,160,0.18)"],
    ["#4a9eda", "rgba(74,158,218,0.18)"],
    ["#a07af5", "rgba(160,122,245,0.18)"],
    ["#f5a623", "rgba(245,166,35,0.18)"],
  ];
  const [fg, bg] = palettes[name.charCodeAt(4) % palettes.length];

  return (
    <div style={{
      width: 30, height: 30, borderRadius: "50%",
      background: bg, border: `1.5px solid ${fg}`,
      color: fg, fontFamily: "'Poppins', sans-serif",
      fontWeight: 800, fontSize: 11,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

export default function ConsultationWidget({
  consultations = MOCK_CONSULTATIONS, 
  isLoading = false,
}) {
  const navigate = useNavigate();

  const total    = consultations.length;
  const avgPrice = total > 0
    ? Math.round(consultations.reduce((s, c) => s + c.price, 0) / total)
    : 0;

  // Preview: 3 cheapest consultation types
  const previewTypes = [...consultations]
    .sort((a, b) => a.price - b.price)
    .slice(0, 3);

  return (
    <div style={styles.outerWrapper}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .co-manage-btn {
          width: 100%;
          background: rgba(255,255,255,0.15);
          border: 1.5px solid rgba(255,255,255,0.35);
          border-radius: 14px;
          padding: 12px 0;
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          cursor: pointer;
          letter-spacing: 0.3px;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .co-manage-btn:hover {
          background: rgba(255,255,255,0.25);
          border-color: rgba(255,255,255,0.6);
          transform: translateY(-1px);
        }
        .co-manage-btn:active { transform: translateY(0); }

        .co-row {
          opacity: 0;
          transform: translateY(5px);
          animation: coRowIn 0.3s ease forwards;
        }
        @keyframes coRowIn { to { opacity: 1; transform: translateY(0); } }
        .co-row:hover { background: rgba(255,255,255,0.12) !important; }

      `}</style>

      <div style={styles.card}>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.iconWrap}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <div>
            <p style={styles.headerSub}>Services Overview</p>
            <h2 style={styles.headerTitle}>Consultations</h2>
          </div>
        </div>

        {/* Divider */}
        <div style={styles.divider} />

        {/* Stats row */}
        <div style={styles.statsRow}>
          <div style={styles.statBox}>
            <span style={styles.statLabel}>Total Types</span>
            <span style={styles.statValue}>{isLoading ? "—" : total}</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statBox}>
            <span style={styles.statLabel}>Avg. Price</span>
            <span style={styles.statValue}>
              {isLoading ? "—" : `₱${avgPrice.toLocaleString()}`}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div style={styles.divider} />

        {/* Consultation types preview */}
        <div>
          <p style={styles.sectionLabel}>Available Consultations</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {isLoading ? (
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textAlign: "center" }}>Loading…</p>
            ) : previewTypes.map((c, i) => (
              <div
                key={c.id}
                className="co-row"
                style={{ ...styles.typeRow, animationDelay: `${i * 60}ms` }}
              >
                <div style={styles.typeDot} />
                <span style={styles.typeName}>{c.type}</span>
                <span style={styles.typePrice}>₱{c.price.toLocaleString()}</span>
              </div>
            ))}
          </div>

          {!isLoading && total > previewTypes.length && (
            <p style={styles.moreLabel}>
              +{total - previewTypes.length} more type{total - previewTypes.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/* CTA */}
        <button
          className="co-manage-btn"
          onClick={() => navigate("/healthcare-provider/services/consultation")}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          Manage Consultations
        </button>

      </div>
    </div>
  );
}

const styles = {
 
  card: {
    width: 340,
    minHeight: 450,
    borderRadius: 24,
    background: "linear-gradient(160deg, #032932 0%, #0d5c4e 55%, #5fa89a 100%)",
    padding: "22px 20px 20px",
    boxShadow: "0 16px 48px rgba(3,41,50,0.38)",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    justifyContent: "space-between",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.18)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  headerSub: {
    fontSize: 11,
    fontWeight: 600,
    color: "rgba(255,255,255,0.45)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: 2,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: 800,
    color: "#fff",
    lineHeight: 1.1,
  },

  divider: {
    height: "1px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: 1,
  },

  statsRow: {
    display: "flex",
    alignItems: "center",
    background: "rgba(255,255,255,0.08)",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.12)",
    padding: "12px 8px",
  },

  statBox: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
  },

  statDivider: {
    width: "1px",
    height: 32,
    background: "rgba(255,255,255,0.15)",
    flexShrink: 0,
  },

  statLabel: {
    fontSize: 10,
    fontWeight: 600,
    color: "rgba(255,255,255,0.45)",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
  },

  statValue: {
    fontSize: 16,
    fontWeight: 800,
    color: "#fff",
    lineHeight: 1,
  },

  sectionLabel: {
    fontSize: 10,
    fontWeight: 700,
    color: "rgba(255,255,255,0.4)",
    textTransform: "uppercase",
    letterSpacing: "0.09em",
    marginBottom: 6,
  },

  typeRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
    padding: "7px 12px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.09)",
    cursor: "default",
    transition: "background 0.15s",
  },

  typeDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#5fc6a0",
    flexShrink: 0,
  },

  typeName: {
    flex: 1,
    fontSize: 13,
    fontWeight: 600,
    color: "rgba(255,255,255,0.88)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  typePrice: {
    fontSize: 13,
    fontWeight: 700,
    color: "#fff",
    whiteSpace: "nowrap",
  },

  moreLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: "rgba(255,255,255,0.35)",
    textAlign: "center",
    paddingTop: 4,
    letterSpacing: "0.03em",
  },
};