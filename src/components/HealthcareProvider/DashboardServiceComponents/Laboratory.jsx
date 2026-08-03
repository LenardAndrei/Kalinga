import { useNavigate } from "react-router-dom";
import { MOCK_TESTS } from "../../../pages/HealthcareProvider/LaboratoryManagement";

export default function LaboratoryServices({
  tests = MOCK_TESTS,   // replace default with API data later — shape: { id, name, price, resultTime }
  isLoading = false,
}) {
  const navigate = useNavigate();

  const total     = tests.length;
  const minPrice  = total > 0 ? Math.min(...tests.map((t) => t.price)) : 0;
  const maxPrice  = total > 0 ? Math.max(...tests.map((t) => t.price)) : 0;
  const avgPrice  = total > 0 ? Math.round(tests.reduce((s, t) => s + t.price, 0) / total) : 0;

  // 4 cheapest tests as preview — most likely the common ones
  const preview = [...tests].sort((a, b) => a.price - b.price).slice(0, 4);

  return (
    <div style={styles.outerWrapper}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .lab-card { font-family: 'Poppins', sans-serif; }

        .lab-manage-btn {
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
        .lab-manage-btn:hover {
          background: rgba(255,255,255,0.25);
          border-color: rgba(255,255,255,0.6);
          transform: translateY(-1px);
        }
        .lab-manage-btn:active { transform: translateY(0); }

        .lab-preview-row {
          opacity: 0;
          transform: translateY(5px);
          animation: labRowIn 0.3s ease forwards;
        }
        @keyframes labRowIn { to { opacity: 1; transform: translateY(0); } }

        .lab-preview-row:hover { background: rgba(255,255,255,0.12) !important; }
      `}</style>

      <div className="lab-card" style={styles.card}>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.iconWrap}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11m0 0H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4m-5 0h5" />
            </svg>
          </div>
          <div>
            <p style={styles.headerSub}>Services Overview</p>
            <h2 style={styles.headerTitle}>Laboratory Tests</h2>
          </div>
        </div>

        {/* Divider */}
        <div style={styles.divider} />

        {/* Stat row: total + avg price */}
        <div style={styles.statsRow}>
          <div style={styles.statBox}>
            <span style={styles.statLabel}>Total Tests</span>
            <span style={styles.statValue}>{isLoading ? "—" : total}</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statBox}>
            <span style={styles.statLabel}>Avg. Price</span>
            <span style={styles.statValue}>
              {isLoading ? "—" : `₱${avgPrice.toLocaleString()}`}
            </span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statBox}>
            <span style={styles.statLabel}>Price Range</span>
            <span style={{ ...styles.statValue, fontSize: 13 }}>
              {isLoading ? "—" : `₱${minPrice.toLocaleString()}–₱${maxPrice.toLocaleString()}`}
            </span>
          </div>
        </div>

        {/* Preview list */}
        <div style={styles.previewWrap}>
          {isLoading ? (
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textAlign: "center", padding: "12px 0" }}>
              Loading…
            </p>
          ) : (
            preview.map((test, i) => (
              <div
                key={test.id}
                className="lab-preview-row"
                style={{ ...styles.previewRow, animationDelay: `${i * 60}ms` }}
              >
                {/* Beaker dot */}
                <div style={styles.previewDot} />

                {/* Name */}
                <span style={styles.previewName}>{test.name}</span>

                {/* Price + time */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1 }}>
                  <span style={styles.previewPrice}>₱{test.price.toLocaleString()}</span>
                  <span style={styles.previewTime}>{test.resultTime}</span>
                </div>
              </div>
            ))
          )}

          {/* "and N more" if list is longer */}
          {!isLoading && total > preview.length && (
            <p style={styles.moreLabel}>
              +{total - preview.length} more test{total - preview.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/* CTA */}
        <button
          className="lab-manage-btn"
          onClick={() => navigate("/healthcare-provider/services/laboratory")}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Manage Services
        </button>

      </div>
    </div>
  );
}

const styles = {
  
  card: {
    width: 340,
    height: 450,
    borderRadius: 24,
    background: "linear-gradient(160deg, #032932 0%, #0d5c4e 55%, #5fa89a 100%)",
    padding: "22px 20px 20px",
    boxShadow: "0 16px 48px rgba(3,41,50,0.35)",
    display: "flex",
    flexDirection: "column",
    gap: 14,
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

  previewWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },

  previewRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
    padding: "8px 12px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.09)",
    cursor: "default",
    transition: "background 0.15s",
  },

  previewDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#5fc6a0",
    flexShrink: 0,
  },

  previewName: {
    flex: 1,
    fontSize: 13,
    fontWeight: 600,
    color: "rgba(255,255,255,0.88)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  previewPrice: {
    fontSize: 13,
    fontWeight: 700,
    color: "#fff",
    lineHeight: 1,
  },

  previewTime: {
    fontSize: 10,
    fontWeight: 500,
    color: "rgba(255,255,255,0.4)",
    lineHeight: 1,
  },

  moreLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: "rgba(255,255,255,0.35)",
    textAlign: "center",
    paddingTop: 2,
    letterSpacing: "0.03em",
  },
};