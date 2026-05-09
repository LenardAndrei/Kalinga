import { useState } from "react";

const SAMPLE_MEDICINES = [
  { id: 1, name: "Paracetamol", stock: 9, category: "Pain Relief" },
  { id: 2, name: "Vitamin C", stock: 95, category: "Supplements" },
  { id: 3, name: "Ibuprofen", stock: 80, category: "Pain Relief" },
  { id: 4, name: "Antibiotics", stock: 60, category: "Antibacterial" },
  { id: 5, name: "Antihistamine", stock: 45, category: "Allergy" },
  { id: 6, name: "Amoxicillin", stock: 30, category: "Antibacterial" },
  { id: 7, name: "Metformin", stock: 20, category: "Diabetes" },
];

const TOP_N = 5;

const getStockStatus = (stock) => {
  if (stock <= 30) return "Low Stock";
  return "In Stock";
};

export default function MedicineInventory({
  medicines = SAMPLE_MEDICINES,
  onUpdateStock = () => alert("Connect to your backend here!"),
  isLoading = false,
}) {
  const totalItems = medicines.length;

  const topMedicines = [...medicines]
    .sort((a, b) => b.stock - a.stock)
    .slice(0, TOP_N);

  return (
    <div style={styles.outerWrapper}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .med-update-btn {
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
        .med-update-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.18);
        }
        .med-update-btn:active {
          transform: translateY(0);
        }

        .med-list-item {
          opacity: 0;
          transform: translateX(-8px);
          animation: fadeSlide 0.3s ease forwards;
        }
        @keyframes fadeSlide {
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <div style={styles.card}>
        <h1 style={styles.title}>Medicine Inventory</h1>

        <div style={styles.countPill}>
          <span style={styles.countNumber}>
            {isLoading ? "—" : totalItems}
          </span>
          <span style={styles.countLabel}>Items Available</span>
        </div>

        <div style={styles.listContainer}>
          {isLoading ? (
            <p style={{ ...styles.listItem, color: "#aaa" }}>Loading…</p>
          ) : (
            topMedicines.map((med, i) => {
              const status = getStockStatus(med.stock);

              return (
                <div
                  key={med.id}
                  className="med-list-item"
                  style={{
                    ...styles.listRow,
                    animationDelay: `${i * 60}ms`,
                  }}
                >
                  <span style={styles.bullet}>•</span>
                  <span style={styles.listItem}>{med.name}</span>

                  <span
                    style={{
                      ...styles.stockBadge,
                      background:
                        status === "Low Stock"
                          ? "rgba(255, 99, 71, 0.15)"
                          : "rgba(46, 204, 113, 0.15)",
                      color:
                        status === "Low Stock"
                          ? "#9c271e"
                          : "#215838",
                    }}
                  >
                    {status}
                  </span>
                </div>
              );
            })
          )}
        </div>

        <button className="med-update-btn" onClick={onUpdateStock}>
          Update Stock
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
    background: "linear-gradient(to bottom, #032932, #5fa89a)",
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
    height:45,
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

  stockBadge: {
    fontSize: 13,
    fontWeight: 600,
    borderRadius: 6,
    padding: "2px 8px",
    flexShrink: 0,
  },
};