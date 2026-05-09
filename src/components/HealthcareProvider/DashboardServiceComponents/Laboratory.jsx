import { useState } from "react";

const SAMPLE_SERVICES = [
  { id: 1, name: "Complete Blood Count" },
  { id: 2, name: "Urinalysis" },
  { id: 3, name: "Blood Glucose Test" },
  { id: 4, name: "Lipid Profile" },
  { id: 5, name: "COVID-19 RT-PCR" },
  { id: 6, name: "Dengue Test" },
  { id: 7, name: "X-Ray" },
];

const TOP_N = 5;

export default function LaboratoryServices({
  services = SAMPLE_SERVICES,
  onManageServices = () => alert("Connect to your backend here!"),
  isLoading = false,
}) {
  const totalServices = services.length;

  const topServices = services.slice(0, TOP_N);

  return (
    <div style={styles.outerWrapper}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .lab-action-btn {
          background: #fff;
          border: none;
          border-radius: 100px;
          padding: 14px 48px;
          font-family: 'Poppins', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #0d2f2f;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
        }
        .lab-action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.18);
        }
        .lab-action-btn:active {
          transform: translateY(0);
        }

        .lab-list-item {
          opacity: 0;
          transform: translateX(-8px);
          animation: fadeSlide 0.3s ease forwards;
        }
        @keyframes fadeSlide {
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <div style={styles.card}>
        <h1 style={styles.title}>Laboratory Services</h1>

        <div style={styles.countPill}>
          <span style={styles.countNumber}>
            {isLoading ? "—" : totalServices}
          </span>
          <span style={styles.countLabel}>Services Available</span>
        </div>

        <div style={styles.listContainer}>
          {isLoading ? (
            <p style={{ ...styles.listItem, color: "#aaa" }}>Loading…</p>
          ) : (
            topServices.map((service, i) => {
              return (
                <div
                  key={service.id}
                  className="lab-list-item"
                  style={{
                    ...styles.listRow,
                    animationDelay: `${i * 60}ms`,
                  }}
                >
                  <span style={styles.bullet}>•</span>
                  <span style={styles.listItem}>{service.name}</span>

                  <span style={styles.typeBadge}>
                    {service.type}
                  </span>
                </div>
              );
            })
          )}
        </div>

        <button className="lab-action-btn" onClick={onManageServices}>
          Manage Services
        </button>
      </div>
    </div>
  );
}

const styles = {
  outerWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "#e8eded",
    fontFamily: "'Poppins', sans-serif",
  },

  card: {
    width: 343,
    height: 341,
    borderRadius: 28,
    background: "linear-gradient(to bottom, #5fa89a, #032932)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "22px 18px 20px",
    boxShadow: "0 12px 40px rgba(0,0,0,0.30)",
  },

  title: {
    fontSize: 24,
    fontWeight: 800,
    color: "#ffffff",
    textAlign: "center",
    lineHeight: 1.2,
  },

  countPill: {
    height: 45,
    width: 286,
    background: "#fff",
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 24px",
    justifyContent: "center",
  },

  countNumber: {
    fontSize: 36,
    fontWeight: 800,
    color: "#032932",
    lineHeight: 1,
  },

  countLabel: {
    fontSize: 16,
    fontWeight: 900,
    color: "#032932",
  },

  listContainer: {
    width: 306,
    height: 138,
    background: "rgba(220,228,228,0.88)",
    borderRadius: 16,
    padding: "8px 16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 0,
    overflow: "hidden",
  },

  listRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },

  bullet: {
    fontSize: 16,
    fontWeight: 900,
    color: "#032932",
    flexShrink: 0,
  },

  listItem: {
    fontSize: 16,
    fontWeight: 700,
    color: "#032932",
    flex: 1,
    lineHeight: 1.1,
  },

  typeBadge: {
    fontSize: 13,
    fontWeight: 600,
    borderRadius: 6,
    padding: "2px 8px",
    background: "rgba(52, 152, 219, 0.15)",
    color: "#1f4e79",
    flexShrink: 0,
  },
};