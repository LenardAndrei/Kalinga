import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Mock data 
const MOCK_SERVICES = [
  { id: 1,  type: "Dental Check-up",         duration: "30 minutes", price: 300  },
  { id: 2,  type: "Teeth Cleaning",           duration: "1 hour",     price: 800  },
  { id: 3,  type: "Tooth Extraction",         duration: "45 minutes", price: 500  },
  { id: 4,  type: "Dental Filling",           duration: "1 hour",     price: 1200 },
  { id: 5,  type: "Root Canal Treatment",     duration: "2 hours",    price: 5000 },
  { id: 6,  type: "Dental Crown",             duration: "1.5 hours",  price: 8000 },
  { id: 7,  type: "Teeth Whitening",          duration: "1 hour",     price: 3500 },
  { id: 8,  type: "Orthodontic Consultation", duration: "45 minutes", price: 500  },
  { id: 9,  type: "Dental X-Ray",            duration: "15 minutes", price: 400  },
  { id: 10, type: "Denture Fitting",          duration: "1.5 hours",  price: 6000 },
  { id: 11, type: "Gum Treatment",            duration: "1 hour",     price: 2000 },
  { id: 12, type: "Fluoride Treatment",       duration: "30 minutes", price: 600  },
];

const DURATION_OPTIONS = [
  "15 minutes",
  "30 minutes",
  "45 minutes",
  "1 hour",
  "1.5 hours",
  "2 hours",
  "2.5 hours",
  "3 hours",
];

// Utility: duration → minutes for sorting
function durationToMinutes(str = "") {
  const s = str.toLowerCase();
  if (s.includes("hour")) {
    const h = parseFloat(s);
    return h * 60;
  }
  if (s.includes("minute")) return parseInt(s);
  return 0;
}

// Duration badge
function DurationBadge({ value }) {
  return (
    <span style={{
      fontFamily: "Poppins", fontSize: 12, fontWeight: 700,
      color: "#2a6b60", background: "#eaf7f2",
      borderRadius: 50, padding: "4px 12px",
      display: "inline-flex", alignItems: "center", gap: 5,
      whiteSpace: "nowrap",
    }}>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
      {value}
    </span>
  );
}

// Shared primitives 
function Overlay({ onClose, children }) {
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(3,41,50,0.45)", backdropFilter: "blur(3px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

function ModalCard({ children }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 20, padding: "28px 28px 24px",
      boxShadow: "0 16px 48px rgba(3,41,50,0.25)",
      width: "100%", maxWidth: 480,
      animation: "fadeSlideIn 0.25s ease",
    }}>
      {children}
    </div>
  );
}

// Add / Edit Service Modal 
function ServiceFormModal({ initial, onSave, onClose, title }) {
  const [type,     setType]     = useState(initial?.type     ?? "");
  const [duration, setDuration] = useState(initial?.duration ?? "30 minutes");
  const [price,    setPrice]    = useState(initial?.price    ?? "");
  const [focused,  setFocused]  = useState(null);

  const canSave = type.trim() && price !== "" && Number(price) >= 0;

  const fieldStyle = (id) => ({
    fontFamily: "Poppins", fontSize: 14, width: "100%",
    border: `1.5px solid ${focused === id ? "#5fc6a0" : "#ddeee9"}`,
    borderRadius: 12, padding: "11px 14px", color: "#032932",
    background: "#f6fbf9", outline: "none", boxSizing: "border-box",
    boxShadow: focused === id ? "0 0 0 3px rgba(95,198,160,0.18)" : "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  });

  const chevron = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%235a7a74' stroke-width='1.8' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`;

  const Label = ({ children }) => (
    <label style={{
      fontFamily: "Poppins", fontSize: 12, fontWeight: 600,
      color: "#5a7a74", display: "block", marginBottom: 5,
    }}>
      {children}
    </label>
  );

  return (
    <Overlay onClose={onClose}>
      <ModalCard>
        <h2 style={{ fontFamily: "Poppins", fontWeight: 800, fontSize: 20, color: "#032932", margin: "0 0 20px" }}>
          {title}
        </h2>

        {/* Service Type */}
        <div style={{ marginBottom: 14 }}>
          <Label>Service Type</Label>
          <input autoFocus value={type} onChange={e => setType(e.target.value)}
            placeholder="e.g. Teeth Cleaning"
            style={fieldStyle("type")}
            onFocus={() => setFocused("type")} onBlur={() => setFocused(null)} />
        </div>

        {/* Duration */}
        <div style={{ marginBottom: 14 }}>
          <Label>Duration</Label>
          <select value={duration} onChange={e => setDuration(e.target.value)}
            style={{
              ...fieldStyle("duration"),
              appearance: "none", cursor: "pointer",
              backgroundImage: chevron, backgroundRepeat: "no-repeat",
              backgroundPosition: "right 14px center", paddingRight: 36,
            }}
            onFocus={() => setFocused("duration")} onBlur={() => setFocused(null)}>
            {DURATION_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        {/* Price */}
        <div style={{ marginBottom: 22 }}>
          <Label>Price (₱)</Label>
          <input type="number" min="0" value={price} onChange={e => setPrice(e.target.value)}
            placeholder="e.g. 800"
            style={fieldStyle("price")}
            onFocus={() => setFocused("price")} onBlur={() => setFocused(null)} />
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{
            fontFamily: "Poppins", fontWeight: 600, fontSize: 14,
            background: "#f0f9f6", border: "none", borderRadius: 12,
            padding: "10px 20px", cursor: "pointer", color: "#5a7a74", transition: "background 0.2s",
          }}
          onMouseEnter={e => e.target.style.background = "#ddeee9"}
          onMouseLeave={e => e.target.style.background = "#f0f9f6"}>
            Cancel
          </button>
          <button disabled={!canSave}
            onClick={() => canSave && onSave({ type: type.trim(), duration, price: Number(price) })}
            style={{
              fontFamily: "Poppins", fontWeight: 700, fontSize: 14,
              background: canSave ? "linear-gradient(to right,#032932,#5fc6a0)" : "#ddeee9",
              border: "none", borderRadius: 12, padding: "10px 22px",
              cursor: canSave ? "pointer" : "not-allowed", color: "#fff",
              transition: "all 0.2s", boxShadow: canSave ? "0 4px 14px rgba(3,41,50,0.2)" : "none",
            }}>
            Save
          </button>
        </div>
      </ModalCard>
    </Overlay>
  );
}

// Confirm Delete Modal 
function DeleteModal({ serviceType, onConfirm, onClose }) {
  return (
    <Overlay onClose={onClose}>
      <ModalCard>
        <h2 style={{ fontFamily: "Poppins", fontWeight: 800, fontSize: 20, color: "#032932", margin: "0 0 8px" }}>
          Remove Service
        </h2>
        <p style={{ fontFamily: "Poppins", fontSize: 14, color: "#5a7a74", margin: "0 0 22px", lineHeight: 1.6 }}>
          Are you sure you want to remove{" "}
          <strong style={{ color: "#032932" }}>{serviceType}</strong>? This action cannot be undone.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{
            fontFamily: "Poppins", fontWeight: 600, fontSize: 14,
            background: "#f0f9f6", border: "none", borderRadius: 12,
            padding: "10px 20px", cursor: "pointer", color: "#5a7a74", transition: "background 0.2s",
          }}
          onMouseEnter={e => e.target.style.background = "#ddeee9"}
          onMouseLeave={e => e.target.style.background = "#f0f9f6"}>
            Cancel
          </button>
          <button onClick={onConfirm} style={{
            fontFamily: "Poppins", fontWeight: 700, fontSize: 14,
            background: "linear-gradient(to right,#c0392b,#e05555)",
            border: "none", borderRadius: 12, padding: "10px 22px",
            cursor: "pointer", color: "#fff", boxShadow: "0 4px 14px rgba(192,57,43,0.3)",
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
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
      style={{ marginLeft: 4, opacity: direction ? 1 : 0.35, verticalAlign: "middle" }}>
      {direction === "asc"  && <polyline points="18 15 12 9 6 15" />}
      {direction === "desc" && <polyline points="6 9 12 15 18 9" />}
      {!direction && (<><polyline points="18 15 12 9 6 15" opacity="0.5" /><polyline points="6 17 12 23 18 17" opacity="0.5" /></>)}
    </svg>
  );
}

// Main Page 
export default function DentistManagement() {
  const navigate = useNavigate();

  const [services,    setServices]    = useState(MOCK_SERVICES);
  const [search,      setSearch]      = useState("");
  const [filterDur,   setFilterDur]   = useState("all");
  const [sortKey,     setSortKey]     = useState(null);
  const [sortDir,     setSortDir]     = useState("asc");
  const [showAdd,     setShowAdd]     = useState(false);
  const [editItem,    setEditItem]    = useState(null);
  const [deleteItem,  setDeleteItem]  = useState(null);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  // Duration filter buckets
  const DUR_BUCKETS = [
    { key: "all",    label: "All" },
    { key: "short",  label: "Under 30 min",  test: (m) => m < 30  },
    { key: "medium", label: "30–60 min",      test: (m) => m >= 30 && m <= 60 },
    { key: "long",   label: "Over 1 hour",    test: (m) => m > 60  },
  ];

  const displayed = useMemo(() => {
    let rows = services.filter(s =>
      s.type.toLowerCase().includes(search.toLowerCase())
    );
    if (filterDur !== "all") {
      const bucket = DUR_BUCKETS.find(b => b.key === filterDur);
      if (bucket?.test) rows = rows.filter(s => bucket.test(durationToMinutes(s.duration)));
    }
    if (sortKey) {
      rows = [...rows].sort((a, b) => {
        let av, bv;
        if (sortKey === "price")    { av = Number(a.price);               bv = Number(b.price); }
        else if (sortKey === "duration") { av = durationToMinutes(a.duration); bv = durationToMinutes(b.duration); }
        else { av = String(a[sortKey]).toLowerCase(); bv = String(b[sortKey]).toLowerCase(); }
        return sortDir === "asc" ? (av < bv ? -1 : av > bv ? 1 : 0)
                                 : (av > bv ? -1 : av < bv ? 1 : 0);
      });
    }
    return rows;
  }, [services, search, filterDur, sortKey, sortDir]);

  const dirFor = (k) => sortKey === k ? sortDir : null;

  // Summary stats
  const avgPrice = useMemo(() => {
    if (!services.length) return 0;
    return Math.round(services.reduce((sum, s) => sum + s.price, 0) / services.length);
  }, [services]);

  const longestService = useMemo(() =>
    services.reduce((max, s) =>
      durationToMinutes(s.duration) > durationToMinutes(max.duration) ? s : max,
      services[0] ?? { type: "—", duration: "—" }
    ), [services]);

  return (
    <div style={{ fontFamily: "'Poppins',sans-serif", width: "100%", boxSizing: "border-box" }}>
      <style>{`
        *,*::before,*::after { box-sizing: border-box; }
        @keyframes fadeSlideIn { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes rowIn { from{opacity:0;transform:translateX(-6px)} to{opacity:1;transform:translateX(0)} }

        .dt-back { background:none;border:none;cursor:pointer;display:flex;align-items:center;gap:6px;
          font-family:'Poppins',sans-serif;font-weight:600;font-size:14px;color:#5a7a74;
          padding:4px 0;margin-bottom:12px;transition:color 0.2s,transform 0.15s }
        .dt-back:hover { color:#032932;transform:translateX(-3px) }

        .dt-pill { font-family:'Poppins',sans-serif;font-weight:700;font-size:14px;border:none;
          border-radius:50px;padding:11px 24px;cursor:pointer;display:inline-flex;
          align-items:center;gap:8px;position:relative;overflow:hidden;
          transition:transform 0.15s,box-shadow 0.15s }
        .dt-pill.dark { background:linear-gradient(to right,#032932,#2a6b60);color:#fff }
        .dt-pill.dark::after { content:'';position:absolute;inset:0;
          background:linear-gradient(to right,#2a6b60,#5fc6a0);opacity:0;transition:opacity 0.3s }
        .dt-pill.dark>* { position:relative;z-index:1 }
        .dt-pill.dark:hover::after { opacity:1 }
        .dt-pill:hover { transform:translateY(-2px);box-shadow:0 8px 22px rgba(3,41,50,0.25) }
        .dt-pill:active { transform:none;box-shadow:none }

        .dt-search { font-family:'Poppins',sans-serif;font-size:14px;
          border:1.5px solid #ddeee9;border-radius:50px;padding:10px 16px 10px 42px;
          color:#032932;background:#f6fbf9;outline:none;width:100%;max-width:360px;
          transition:border-color 0.2s,box-shadow 0.2s }
        .dt-search:focus { border-color:#5fc6a0;box-shadow:0 0 0 3px rgba(95,198,160,0.18) }
        .dt-search::placeholder { color:#a8c5bc }

        .dt-filter-btn { font-family:'Poppins',sans-serif;font-weight:600;font-size:12px;
          border-radius:50px;padding:7px 16px;cursor:pointer;border:1.5px solid #ddeee9;
          background:#f6fbf9;color:#5a7a74;transition:all 0.18s;white-space:nowrap }
        .dt-filter-btn.active { background:linear-gradient(to right,#032932,#2a6b60);
          color:#fff;border-color:transparent }
        .dt-filter-btn:not(.active):hover { background:#eaf7f2;border-color:#5fc6a0 }

        .dt-stat-card { background:#fff;border-radius:14px;padding:16px 20px;flex:1 1 140px;
          box-shadow:0 2px 10px rgba(3,41,50,0.07);border:1.5px solid #e8f3ef;
          transition:box-shadow 0.2s,transform 0.2s }
        .dt-stat-card:hover { box-shadow:0 6px 18px rgba(3,41,50,0.12);transform:translateY(-2px) }

        .dt-table { width:100%;border-collapse:collapse;font-family:'Poppins',sans-serif }

        .dt-th { background:linear-gradient(to bottom,#032932,#2a6b60);color:#fff;
          font-weight:700;font-size:14px;padding:14px 18px;text-align:center;
          white-space:nowrap;user-select:none;cursor:pointer;transition:filter 0.2s;
          border-right:1px solid rgba(255,255,255,0.18) }
        .dt-th:first-child { border-radius:14px 0 0 14px;text-align:left }
        .dt-th:last-child  { border-radius:0 14px 14px 0;cursor:default;border-right:none }
        .dt-th:not(:last-child):hover { filter:brightness(1.22) }

        .dt-tr { animation:rowIn 0.2s ease both;transition:background 0.15s }
        .dt-tr:nth-child(even) .dt-td { background:#f6fbf9 }
        .dt-tr:nth-child(odd)  .dt-td { background:#fff }
        .dt-tr:hover .dt-td { background:#eaf7f2!important }

        .dt-td { padding:13px 18px;font-size:14px;color:#032932;
          border-bottom:1px solid #e8f3ef;text-align:center;transition:background 0.15s }
        .dt-td:first-child { text-align:left;font-weight:500 }

        .dt-icon-btn { background:none;border:none;cursor:pointer;padding:6px;border-radius:8px;
          display:inline-flex;align-items:center;justify-content:center;
          transition:background 0.15s,transform 0.15s }
        .dt-icon-btn.edit { color:#5a7a74 }
        .dt-icon-btn.edit:hover { background:#eaf7f2;color:#032932;transform:scale(1.1) }
        .dt-icon-btn.del  { color:#c0392b }
        .dt-icon-btn.del:hover  { background:#fdf0ef;transform:scale(1.1) }

        @media(max-width:640px) {
          .dt-th,.dt-td { padding:10px 10px;font-size:13px }
          .dt-search { max-width:100% }
        }
      `}</style>

      {/* Back */}
      <button className="dt-back" onClick={() => navigate("/healthcare-provider/services")}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Services
      </button>

      {/* Title */}
      <h1 style={{
        fontFamily: "Poppins,sans-serif", fontWeight: 900,
        fontSize: "clamp(26px,5vw,48px)", marginBottom: 24, marginTop: 0,
        background: "linear-gradient(to right,#032932,#5fc6a0)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        display: "inline-block", lineHeight: 1.15,
      }}>
        Dentist Management
      </h1>

      {/* Summary stat cards */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        {/* Total services */}
        <div className="dt-stat-card">
          <div style={{ fontFamily: "Poppins", fontSize: 11, fontWeight: 600, color: "#7a9e97", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>
            Total Services
          </div>
          <div style={{ fontFamily: "Poppins", fontSize: 28, fontWeight: 900, color: "#032932", lineHeight: 1.1 }}>
            {services.length}
          </div>
          <div style={{ fontFamily: "Poppins", fontSize: 11, color: "#a8c5bc", fontWeight: 500 }}>procedures offered</div>
        </div>

        {/* Avg price */}
        <div className="dt-stat-card">
          <div style={{ fontFamily: "Poppins", fontSize: 11, fontWeight: 600, color: "#7a9e97", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>
            Avg. Price
          </div>
          <div style={{ fontFamily: "Poppins", fontSize: 28, fontWeight: 900, color: "#2a6b60", lineHeight: 1.1 }}>
            ₱{avgPrice.toLocaleString()}
          </div>
          <div style={{ fontFamily: "Poppins", fontSize: 11, color: "#a8c5bc", fontWeight: 500 }}>per service</div>
        </div>

        {/* Longest service */}
        <div className="dt-stat-card" style={{ flex: "2 1 220px" }}>
          <div style={{ fontFamily: "Poppins", fontSize: 11, fontWeight: 600, color: "#7a9e97", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>
            Longest Procedure
          </div>
          <div style={{ fontFamily: "Poppins", fontSize: 18, fontWeight: 800, color: "#032932", lineHeight: 1.2 }}>
            {longestService?.type}
          </div>
          <div style={{ fontFamily: "Poppins", fontSize: 11, color: "#a8c5bc", fontWeight: 500 }}>
            {longestService?.duration}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 200px", maxWidth: 360 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a8c5bc" strokeWidth="2.2" strokeLinecap="round"
            style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input className="dt-search" placeholder="Search services"
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {sortKey && (
          <div style={{
            fontFamily: "Poppins", fontSize: 12, fontWeight: 600, color: "#5a7a74",
            background: "#eaf7f2", borderRadius: 50, padding: "6px 14px",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            {sortKey.charAt(0).toUpperCase() + sortKey.slice(1)} {sortDir === "asc" ? "↑" : "↓"}
            <button onClick={() => { setSortKey(null); setSortDir("asc"); }}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#5a7a74", padding: 0, lineHeight: 1, fontSize: 15, fontWeight: 700 }}>✕</button>
          </div>
        )}

        <div style={{ flex: 1 }} />

        <button className="dt-pill dark" onClick={() => setShowAdd(true)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Add Service</span>
        </button>
      </div>

      {/* Duration filter pills */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {DUR_BUCKETS.map(b => (
          <button key={b.key}
            className={`dt-filter-btn ${filterDur === b.key ? "active" : ""}`}
            onClick={() => setFilterDur(b.key)}>
            {b.label}
          </button>
        ))}
      </div>

      {/* Count */}
      <p style={{ fontFamily: "Poppins", fontSize: 13, color: "#7a9e97", fontWeight: 500, margin: "0 0 12px" }}>
        {displayed.length} service{displayed.length !== 1 ? "s" : ""} available
        {search && ` · filtered by "${search}"`}
      </p>

      {/* Table */}
      <div style={{ overflowX: "auto", borderRadius: 16, boxShadow: "0 2px 16px rgba(3,41,50,0.08)" }}>
        <table className="dt-table">
          <thead>
            <tr>
              <th className="dt-th" style={{ width: "40%" }} onClick={() => handleSort("type")}>
                Service Type <SortIcon direction={dirFor("type")} />
              </th>
              <th className="dt-th" onClick={() => handleSort("duration")}>
                Duration <SortIcon direction={dirFor("duration")} />
              </th>
              <th className="dt-th" onClick={() => handleSort("price")}>
                Price <SortIcon direction={dirFor("price")} />
              </th>
              <th className="dt-th" style={{ width: 100 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayed.length === 0 ? (
              <tr><td colSpan={4} style={{
                fontFamily: "Poppins", fontSize: 14, color: "#a8c5bc",
                textAlign: "center", padding: "40px 0",
              }}>
                {search ? `No services found for "${search}"` : "No services added yet."}
              </td></tr>
            ) : displayed.map((s, i) => (
              <tr key={s.id} className="dt-tr" style={{ animationDelay: `${i * 0.025}s` }}>
                <td className="dt-td">{s.type}</td>
                <td className="dt-td"><DurationBadge value={s.duration} /></td>
                <td className="dt-td">₱{s.price.toLocaleString()}</td>
                <td className="dt-td">
                  <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
                    <button className="dt-icon-btn edit" title="Edit" onClick={() => setEditItem(s)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button className="dt-icon-btn del" title="Remove" onClick={() => setDeleteItem(s)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {showAdd && (
        <ServiceFormModal title="Add Service"
          onSave={d => { setServices(p => [...p, { id: Date.now(), ...d }]); setShowAdd(false); }}
          onClose={() => setShowAdd(false)} />
      )}
      {editItem && (
        <ServiceFormModal title="Edit Service" initial={editItem}
          onSave={d => { setServices(p => p.map(s => s.id === editItem.id ? { ...s, ...d } : s)); setEditItem(null); }}
          onClose={() => setEditItem(null)} />
      )}
      {deleteItem && (
        <DeleteModal serviceType={deleteItem.type}
          onConfirm={() => { setServices(p => p.filter(s => s.id !== deleteItem.id)); setDeleteItem(null); }}
          onClose={() => setDeleteItem(null)} />
      )}
    </div>
  );
}