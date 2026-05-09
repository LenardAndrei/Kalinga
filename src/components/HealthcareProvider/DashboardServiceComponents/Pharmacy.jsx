import { useNavigate } from "react-router-dom";
import { MOCK_MEDICINES, STATUS_OPTIONS } from "../../../pages/HealthcareProvider/PharmacyManagement";

export default function MedicineInventory({
  medicines = MOCK_MEDICINES,
  isLoading = false,
}) {
  const navigate = useNavigate();

  const total = medicines.length;

  const counts = {
    in_stock:     medicines.filter((m) => m.status === "in_stock").length,
    low_stock:    medicines.filter((m) => m.status === "low_stock").length,
    out_of_stock: medicines.filter((m) => m.status === "out_of_stock").length,
  };

  const LEVELS = [
    { key: "in_stock",     dot: "#22c97a", delay: "0ms"   },
    { key: "low_stock",    dot: "#f5a623", delay: "70ms"  },
    { key: "out_of_stock", dot: "#e8453c", delay: "140ms" },
  ];

  return (
    <div style={styles.outerWrapper}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .med-card { font-family: 'Poppins', sans-serif; }

        .med-update-btn {
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
        .med-update-btn:hover {
          background: rgba(255,255,255,0.25);
          border-color: rgba(255,255,255,0.6);
          transform: translateY(-1px);
        }
        .med-update-btn:active { transform: translateY(0); }

        .med-level-row {
          opacity: 0;
          transform: translateY(5px);
          animation: levelIn 0.3s ease forwards;
        }
        @keyframes levelIn { to { opacity: 1; transform: translateY(0); } }

        .med-level-row:hover { background: rgba(255,255,255,0.12) !important; }
      `}</style>

      <div className="med-card" style={styles.card}>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.iconWrap}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
          </div>
          <div>
            <p style={styles.headerSub}>Inventory Overview</p>
            <h2 style={styles.headerTitle}>Medicine Stock</h2>
          </div>
        </div>

        {/* Divider */}
        <div style={styles.divider} />

        {/* Total pill */}
        <div style={styles.totalRow}>
          <span style={styles.totalLabel}>Total medicines</span>
          <span style={styles.totalCount}>{isLoading ? "—" : total}</span>
        </div>

        {/* Stock level rows */}
        <div style={styles.levelsWrap}>
          {isLoading ? (
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, textAlign: "center", padding: "12px 0" }}>
              Loading…
            </p>
          ) : (
            LEVELS.map((lvl) => {
              const meta = STATUS_OPTIONS.find((s) => s.value === lvl.key);
              const pct  = total > 0 ? Math.round((counts[lvl.key] / total) * 100) : 0;
              return (
                <div
                  key={lvl.key}
                  className="med-level-row"
                  style={{ ...styles.levelRow, animationDelay: lvl.delay }}
                >
                  {/* Left: dot + label */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ ...styles.dot, background: lvl.dot }} />
                    <span style={styles.levelLabel}>{meta.label}</span>
                  </div>

                  {/* Right: count + percentage bar */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {/* Mini bar */}
                    <div style={styles.barTrack}>
                      <div style={{
                        ...styles.barFill,
                        width: `${pct}%`,
                        background: lvl.dot,
                      }} />
                    </div>
                    <span style={styles.levelCount}>{counts[lvl.key]}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* CTA */}
        <button
          className="med-update-btn"
          onClick={() => navigate("/healthcare-provider/services/pharmacy")}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          Manage Stock
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
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  headerSub: {
    fontSize: 11,
    fontWeight: 600,
    color: "rgba(255,255,255,0.5)",
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
    background: "rgba(255,255,255,0.12)",
    borderRadius: 1,
  },

  totalRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: "10px 16px",
    border: "1px solid rgba(255,255,255,0.15)",
  },

  totalLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: "rgba(255,255,255,0.7)",
  },

  totalCount: {
    fontSize: 26,
    fontWeight: 900,
    color: "#fff",
    lineHeight: 1,
  },

  levelsWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },

  levelRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    padding: "9px 12px",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.1)",
    cursor: "default",
    transition: "background 0.15s",
  },

  dot: {
    width: 9,
    height: 9,
    borderRadius: "50%",
    flexShrink: 0,
    display: "inline-block",
  },

  levelLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: "rgba(255,255,255,0.85)",
  },

  barTrack: {
    width: 60,
    height: 5,
    borderRadius: 999,
    background: "rgba(255,255,255,0.12)",
    overflow: "hidden",
  },

  barFill: {
    height: "100%",
    borderRadius: 999,
    transition: "width 0.6s ease",
  },

  levelCount: {
    fontSize: 15,
    fontWeight: 800,
    color: "#fff",
    minWidth: 20,
    textAlign: "right",
  },
};