import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Mock data 
const MOCK_TESTS = [
  { id: 1,  name: "Blood Test",           price: 500,  resultTime: "1 hour"   },
  { id: 2,  name: "Urinalysis",           price: 400,  resultTime: "1 hour"   },
  { id: 3,  name: "X-Ray",               price: 1200, resultTime: "2 hours"  },
  { id: 4,  name: "MRI Scan",            price: 5000, resultTime: "24 hours" },
  { id: 5,  name: "CT Scan",             price: 3000, resultTime: "12 hours" },
  { id: 6,  name: "Lipid Profile",       price: 800,  resultTime: "2 hours"  },
  { id: 7,  name: "Thyroid Function Test", price: 600, resultTime: "2 hours" },
  { id: 8,  name: "Diabetes Test",       price: 700,  resultTime: "2 hours"  },
  { id: 9,  name: "Hematology Profile",  price: 850,  resultTime: "2 hours"  },
  { id: 10, name: "Allergy Testing",     price: 1500, resultTime: "24 hours" },
  { id: 11, name: "Vitamin D Test",      price: 900,  resultTime: "2 hours"  },
  { id: 12, name: "Pregnancy Test",      price: 300,  resultTime: "1 hour"   },
  { id: 13, name: "COVID-19 PCR Test",   price: 2500, resultTime: "24 hours" },
  { id: 14, name: "Liver Function Test", price: 700,  resultTime: "2 hours"  },
  { id: 15, name: "Kidney Function Test",price: 800,  resultTime: "2 hours"  },
];

const RESULT_TIME_OPTIONS = [
  "30 minutes",
  "1 hour",
  "2 hours",
  "4 hours",
  "6 hours",
  "12 hours",
  "24 hours",
  "48 hours",
  "3 days",
  "5 days",
  "1 week",
];

// Shared Overlay 
function Overlay({ onClose, children }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(3,41,50,0.45)", backdropFilter: "blur(3px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

function ModalCard({ children, maxWidth = 480 }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 20, padding: "28px 28px 24px",
      boxShadow: "0 16px 48px rgba(3,41,50,0.25)",
      width: "100%", maxWidth,
      animation: "fadeSlideIn 0.25s ease",
    }}>
      {children}
    </div>
  );
}

// Add / Edit Test Modal 
function TestFormModal({ initial, onSave, onClose, title }) {
  const [name, setName]             = useState(initial?.name        ?? "");
  const [price, setPrice]           = useState(initial?.price       ?? "");
  const [resultTime, setResultTime] = useState(initial?.resultTime  ?? "1 hour");

  const canSave = name.trim() && price !== "" && Number(price) >= 0;

  const inputStyle = (focused) => ({
    fontFamily: "Poppins", fontSize: 14, width: "100%",
    border: `1.5px solid ${focused ? "#5fc6a0" : "#ddeee9"}`,
    borderRadius: 12, padding: "11px 14px", color: "#032932",
    background: "#f6fbf9", outline: "none",
    boxSizing: "border-box", marginBottom: 14,
    boxShadow: focused ? "0 0 0 3px rgba(95,198,160,0.18)" : "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  });

  const [focused, setFocused] = useState(null);

  return (
    <Overlay onClose={onClose}>
      <ModalCard>
        <h2 style={{ fontFamily: "Poppins", fontWeight: 800, fontSize: 20, color: "#032932", margin: "0 0 18px" }}>
          {title}
        </h2>

        {/* Name */}
        <label style={{ fontFamily: "Poppins", fontSize: 12, fontWeight: 600, color: "#5a7a74", display: "block", marginBottom: 4 }}>
          Service Name
        </label>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Blood Test"
          style={inputStyle(focused === "name")}
          onFocus={() => setFocused("name")}
          onBlur={() => setFocused(null)}
        />

        {/* Price */}
        <label style={{ fontFamily: "Poppins", fontSize: 12, fontWeight: 600, color: "#5a7a74", display: "block", marginBottom: 4 }}>
          Price (₱)
        </label>
        <input
          type="number"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="e.g. 500"
          style={inputStyle(focused === "price")}
          onFocus={() => setFocused("price")}
          onBlur={() => setFocused(null)}
        />

        {/* Result Time */}
        <label style={{ fontFamily: "Poppins", fontSize: 12, fontWeight: 600, color: "#5a7a74", display: "block", marginBottom: 4 }}>
          Result Time
        </label>
        <select
          value={resultTime}
          onChange={(e) => setResultTime(e.target.value)}
          style={{
            ...inputStyle(focused === "rt"),
            appearance: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%235a7a74' stroke-width='1.8' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 14px center",
            paddingRight: 36,
            cursor: "pointer",
          }}
          onFocus={() => setFocused("rt")}
          onBlur={() => setFocused(null)}
        >
          {RESULT_TIME_OPTIONS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
          <button onClick={onClose} style={{
            fontFamily: "Poppins", fontWeight: 600, fontSize: 14,
            background: "#f0f9f6", border: "none", borderRadius: 12,
            padding: "10px 20px", cursor: "pointer", color: "#5a7a74",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => e.target.style.background = "#ddeee9"}
          onMouseLeave={(e) => e.target.style.background = "#f0f9f6"}
          >
            Cancel
          </button>
          <button
            disabled={!canSave}
            onClick={() => canSave && onSave({ name: name.trim(), price: Number(price), resultTime })}
            style={{
              fontFamily: "Poppins", fontWeight: 700, fontSize: 14,
              background: canSave ? "linear-gradient(to right,#032932,#5fc6a0)" : "#ddeee9",
              border: "none", borderRadius: 12, padding: "10px 22px",
              cursor: canSave ? "pointer" : "not-allowed", color: "#fff",
              transition: "all 0.2s",
              boxShadow: canSave ? "0 4px 14px rgba(3,41,50,0.2)" : "none",
            }}
          >
            Save
          </button>
        </div>
      </ModalCard>
    </Overlay>
  );
}

// Confirm Delete Modal 
function DeleteModal({ testName, onConfirm, onClose }) {
  return (
    <Overlay onClose={onClose}>
      <ModalCard>
        <h2 style={{ fontFamily: "Poppins", fontWeight: 800, fontSize: 20, color: "#032932", margin: "0 0 8px" }}>
          Remove Test
        </h2>
        <p style={{ fontFamily: "Poppins", fontSize: 14, color: "#5a7a74", margin: "0 0 22px", lineHeight: 1.6 }}>
          Are you sure you want to remove{" "}
          <strong style={{ color: "#032932" }}>{testName}</strong>? This action cannot be undone.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{
            fontFamily: "Poppins", fontWeight: 600, fontSize: 14,
            background: "#f0f9f6", border: "none", borderRadius: 12,
            padding: "10px 20px", cursor: "pointer", color: "#5a7a74",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => e.target.style.background = "#ddeee9"}
          onMouseLeave={(e) => e.target.style.background = "#f0f9f6"}
          >
            Cancel
          </button>
          <button onClick={onConfirm} style={{
            fontFamily: "Poppins", fontWeight: 700, fontSize: 14,
            background: "linear-gradient(to right,#c0392b,#e05555)",
            border: "none", borderRadius: 12, padding: "10px 22px",
            cursor: "pointer", color: "#fff",
            boxShadow: "0 4px 14px rgba(192,57,43,0.3)",
          }}>
            Remove
          </button>
        </div>
      </ModalCard>
    </Overlay>
  );
}

// Sort Icon 
function SortIcon({ direction }) {
  // direction: null | "asc" | "desc"
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
      style={{ marginLeft: 4, opacity: direction ? 1 : 0.35, verticalAlign: "middle" }}>
      {direction === "asc"  && <polyline points="18 15 12 9 6 15" />}
      {direction === "desc" && <polyline points="6 9 12 15 18 9" />}
      {!direction && (
        <>
          <polyline points="18 15 12 9 6 15" opacity="0.5" />
          <polyline points="6 17 12 23 18 17" opacity="0.5" />
        </>
      )}
    </svg>
  );
}

// Main Page 
export default function LaboratoryManagement() {
  const navigate = useNavigate();

  const [tests, setTests] = useState(MOCK_TESTS);

  // Search & Sort
  const [search, setSearch]       = useState("");
  const [sortKey, setSortKey]     = useState(null);   
  const [sortDir, setSortDir]     = useState("asc");

  // Modals
  const [showAddModal, setShowAddModal]   = useState(false);
  const [editTest, setEditTest]           = useState(null);
  const [deleteTest, setDeleteTest]       = useState(null);

  // Sort toggle 
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  // Filtered + sorted rows 
  const displayedTests = useMemo(() => {
    let filtered = tests.filter((t) =>
      t.name.toLowerCase().includes(search.toLowerCase())
    );
    if (sortKey) {
      filtered = [...filtered].sort((a, b) => {
        let av = a[sortKey], bv = b[sortKey];
        if (sortKey === "price") { av = Number(av); bv = Number(bv); }
        else {
          // For resultTime: sort by numeric minutes equivalent
          if (sortKey === "resultTime") {
            av = parseMinutes(av); bv = parseMinutes(bv);
          } else {
            av = av.toLowerCase(); bv = bv.toLowerCase();
          }
        }
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1  : -1;
        return 0;
      });
    }
    return filtered;
  }, [tests, search, sortKey, sortDir]);

  // Handlers 
  const handleAddSave = (data) => {
    setTests((prev) => [...prev, { id: Date.now(), ...data }]);
    setShowAddModal(false);
  };

  const handleEditSave = (data) => {
    setTests((prev) => prev.map((t) => t.id === editTest.id ? { ...t, ...data } : t));
    setEditTest(null);
  };

  const handleDeleteConfirm = () => {
    setTests((prev) => prev.filter((t) => t.id !== deleteTest.id));
    setDeleteTest(null);
  };

  const sortDirFor = (key) => sortKey === key ? sortDir : null;

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", width: "100%", boxSizing: "border-box" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes rowIn {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .lab-pill-btn {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 14px;
          border: none;
          border-radius: 50px;
          padding: 11px 24px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          position: relative;
          overflow: hidden;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .lab-pill-btn.dark {
          background: linear-gradient(to right, #032932, #2a6b60);
          color: #fff;
        }
        .lab-pill-btn.dark::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(to right, #2a6b60, #5fc6a0);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .lab-pill-btn.dark > * { position: relative; z-index: 1; }
        .lab-pill-btn.dark:hover::after { opacity: 1; }
        .lab-pill-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(3,41,50,0.25); }
        .lab-pill-btn:active { transform: translateY(0); box-shadow: none; }

        .lab-back-btn {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 14px;
          color: #5a7a74;
          padding: 4px 0;
          margin-bottom: 12px;
          transition: color 0.2s, transform 0.15s;
        }
        .lab-back-btn:hover { color: #032932; transform: translateX(-3px); }

        .lab-table {
          width: 100%;
          border-collapse: collapse;
          font-family: 'Poppins', sans-serif;
        }

        .lab-th {
          background: linear-gradient(to bottom, #032932, #2a6b60);
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          padding: 14px 18px;
          text-align: center;
          white-space: nowrap;
          user-select: none;
          cursor: pointer;
          transition: background 0.2s;
          border-right:  1px solid rgba(255, 255, 255, 0.66);
        }
        .lab-th:first-child { border-radius: 14px 0 0 14px; text-align: left; }
        .lab-th:last-child  { border-radius: 0 14px 14px 0; cursor: default; }
        .lab-th:not(:last-child):hover { background: linear-gradient(to bottom, #2a6b60, #3a8c7e); }

        .lab-tr {
          animation: rowIn 0.2s ease both;
          transition: background 0.15s;
        }
        .lab-tr:nth-child(even) td { background: #f6fbf9; }
        .lab-tr:nth-child(odd)  td { background: #fff; }
        .lab-tr:hover td { background: #eaf7f2 !important; }

        .lab-td {
          padding: 13px 18px;
          font-size: 14px;
          color: #032932;
          border-bottom: 1px solid #e8f3ef;
          text-align: center;
          transition: background 0.15s;
        }
        .lab-td:first-child { text-align: left; font-weight: 500; }

        .lab-icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s, transform 0.15s;
        }
        .lab-icon-btn.edit  { color: #5a7a74; }
        .lab-icon-btn.edit:hover  { background: #eaf7f2; color: #032932; transform: scale(1.1); }
        .lab-icon-btn.del   { color: #c0392b; }
        .lab-icon-btn.del:hover   { background: #fdf0ef; transform: scale(1.1); }

        .lab-search {
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          border: 1.5px solid #ddeee9;
          border-radius: 50px;
          padding: 10px 16px 10px 42px;
          color: #032932;
          background: #f6fbf9;
          outline: none;
          width: 100%;
          max-width: 360px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .lab-search:focus {
          border-color: #5fc6a0;
          box-shadow: 0 0 0 3px rgba(95,198,160,0.18);
        }
        .lab-search::placeholder { color: #a8c5bc; }

        .lab-empty {
          text-align: center;
          padding: 40px 0;
          font-family: 'Poppins', sans-serif;
          color: #a8c5bc;
          font-size: 14px;
        }

        @media (max-width: 640px) {
          .lab-th, .lab-td { padding: 10px 10px; font-size: 13px; }
          .lab-search { max-width: 100%; }
        }
      `}</style>

      {/* ── Back Button ── */}
      <button className="lab-back-btn" onClick={() => navigate("/healthcare-provider/services")}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Services
      </button>

      {/* ── Page Title ── */}
      <h1 style={{
        fontFamily: "Poppins, sans-serif",
        fontWeight: 900,
        fontSize: "clamp(26px, 5vw, 48px)",
        marginBottom: 24,
        marginTop: 0,
        background: "linear-gradient(to right, #032932, #5fc6a0)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline-block",
        lineHeight: 1.15,
      }}>
        Laboratory Management
      </h1>

      {/* ── Toolbar: Search + Sort indicator + Add button ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 20,
        flexWrap: "wrap",
      }}>
        {/* Search */}
        <div style={{ position: "relative", flex: "1 1 220px", maxWidth: 360 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="#a8c5bc" strokeWidth="2.2" strokeLinecap="round"
            style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className="lab-search"
            placeholder="Search services"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Sort pill (shows active sort) */}
        {sortKey && (
          <div style={{
            fontFamily: "Poppins", fontSize: 12, fontWeight: 600,
            color: "#5a7a74", background: "#eaf7f2",
            borderRadius: 50, padding: "6px 14px",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="15" y2="12" />
              <line x1="3" y1="18" x2="9" y2="18" />
              <polyline points="17 15 20 18 23 15" />
            </svg>
            {sortKey.charAt(0).toUpperCase() + sortKey.slice(1)}: {sortDir === "asc" ? "↑" : "↓"}
            <button
              onClick={() => { setSortKey(null); setSortDir("asc"); }}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#5a7a74", padding: 0, lineHeight: 1, fontSize: 14, fontWeight: 700 }}
            >✕</button>
          </div>
        )}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Add Test button */}
        <button className="lab-pill-btn dark" onClick={() => setShowAddModal(true)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Add Test</span>
        </button>
      </div>

      {/* ── Count badge ── */}
      <p style={{
        fontFamily: "Poppins", fontSize: 13, color: "#7a9e97",
        fontWeight: 500, margin: "0 0 12px",
      }}>
        {displayedTests.length} test{displayedTests.length !== 1 ? "s" : ""} available
        {search && ` · filtered by "${search}"`}
      </p>

      {/* ── Table ── */}
      <div style={{ overflowX: "auto", borderRadius: 16, boxShadow: "0 2px 16px rgba(3,41,50,0.08)" }}>
        <table className="lab-table">
          <thead>
            <tr>
              <th className="lab-th" onClick={() => handleSort("name")} style={{ width: "40%" }}>
                Service <SortIcon direction={sortDirFor("name")} />
              </th>
              <th className="lab-th" onClick={() => handleSort("price")}>
                Price <SortIcon direction={sortDirFor("price")} />
              </th>
              <th className="lab-th" onClick={() => handleSort("resultTime")}>
                Result Time <SortIcon direction={sortDirFor("resultTime")} />
              </th>
              <th className="lab-th" style={{ width: 100 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedTests.length === 0 ? (
              <tr>
                <td colSpan={4} className="lab-empty">
                  {search ? `No tests found for "${search}"` : "No tests added yet."}
                </td>
              </tr>
            ) : (
              displayedTests.map((t, i) => (
                <tr
                  key={t.id}
                  className="lab-tr"
                  style={{ animationDelay: `${i * 0.03}s` }}
                >
                  <td className="lab-td">{t.name}</td>
                  <td className="lab-td">₱{t.price.toLocaleString()}</td>
                  <td className="lab-td">{t.resultTime}</td>
                  <td className="lab-td">
                    <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
                      {/* Edit */}
                      <button
                        className="lab-icon-btn edit"
                        title="Edit"
                        onClick={() => setEditTest(t)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      {/* Delete */}
                      <button
                        className="lab-icon-btn del"
                        title="Remove"
                        onClick={() => setDeleteTest(t)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14H6L5 6" />
                          <path d="M10 11v6M14 11v6" />
                          <path d="M9 6V4h6v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Modals ── */}
      {showAddModal && (
        <TestFormModal
          title="Add Test"
          onSave={handleAddSave}
          onClose={() => setShowAddModal(false)}
        />
      )}
      {editTest && (
        <TestFormModal
          title="Edit Test"
          initial={editTest}
          onSave={handleEditSave}
          onClose={() => setEditTest(null)}
        />
      )}
      {deleteTest && (
        <DeleteModal
          testName={deleteTest.name}
          onConfirm={handleDeleteConfirm}
          onClose={() => setDeleteTest(null)}
        />
      )}
    </div>
  );
}

function parseMinutes(str) {
  if (!str) return 0;
  const s = str.toLowerCase();
  if (s.includes("week"))   return parseInt(s) * 7 * 24 * 60;
  if (s.includes("day"))    return parseInt(s) * 24 * 60;
  if (s.includes("hour"))   return parseInt(s) * 60;
  if (s.includes("minute")) return parseInt(s);
  return 0;
}