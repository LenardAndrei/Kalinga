import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Mock data 
const MOCK_MEDICINES = [
  { id: 1,  name: "Amoxicillin 500mg",       category: "Antibiotic",     status: "in_stock",   price: 12  },
  { id: 2,  name: "Paracetamol 500mg",        category: "Analgesic",      status: "in_stock",   price: 5   },
  { id: 3,  name: "Ibuprofen 400mg",          category: "Analgesic",      status: "low_stock",  price: 8   },
  { id: 4,  name: "Cetirizine 10mg",          category: "Antihistamine",  status: "in_stock",   price: 10  },
  { id: 5,  name: "Metformin 500mg",          category: "Antidiabetic",   status: "low_stock",  price: 15  },
  { id: 6,  name: "Amlodipine 5mg",           category: "Antihypertensive",status:"in_stock",   price: 18  },
  { id: 7,  name: "Omeprazole 20mg",          category: "Antacid",        status: "in_stock",   price: 14  },
  { id: 8,  name: "Azithromycin 500mg",       category: "Antibiotic",     status: "out_of_stock",price: 45 },
  { id: 9,  name: "Losartan 50mg",            category: "Antihypertensive",status:"in_stock",   price: 22  },
  { id: 10, name: "Salbutamol Inhaler",       category: "Bronchodilator", status: "low_stock",  price: 180 },
  { id: 11, name: "Vitamin C 500mg",          category: "Supplement",     status: "in_stock",   price: 7   },
  { id: 12, name: "Ferrous Sulfate 325mg",    category: "Supplement",     status: "in_stock",   price: 6   },
  { id: 13, name: "Clindamycin 300mg",        category: "Antibiotic",     status: "out_of_stock",price: 35 },
  { id: 14, name: "Dexamethasone 4mg",        category: "Corticosteroid", status: "in_stock",   price: 20  },
  { id: 15, name: "Oral Rehydration Salts",   category: "Supplement",     status: "in_stock",   price: 10  },
];

const CATEGORIES = [
  "Analgesic", "Antibiotic", "Antihistamine", "Antidiabetic",
  "Antihypertensive", "Antacid", "Bronchodilator", "Corticosteroid",
  "Supplement", "Antiviral", "Antifungal", "Other",
];

const STATUS_OPTIONS = [
  { value: "in_stock",    label: "In Stock",      color: "#1a7a4a", bg: "#e6f7ef" },
  { value: "low_stock",   label: "Low Stock",     color: "#b45309", bg: "#fef3c7" },
  { value: "out_of_stock",label: "Out of Stock",  color: "#c0392b", bg: "#fdecea" },
];

const statusMeta = (val) => STATUS_OPTIONS.find((s) => s.value === val) ?? STATUS_OPTIONS[0];

// Shared primitives
function Overlay({ onClose, children }) {
  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, zIndex:1000,
      background:"rgba(3,41,50,0.45)", backdropFilter:"blur(3px)",
      display:"flex", alignItems:"center", justifyContent:"center", padding:20,
    }}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

function ModalCard({ children }) {
  return (
    <div style={{
      background:"#fff", borderRadius:20, padding:"28px 28px 24px",
      boxShadow:"0 16px 48px rgba(3,41,50,0.25)",
      width:"100%", maxWidth:480,
      animation:"fadeSlideIn 0.25s ease",
    }}>
      {children}
    </div>
  );
}

// Status Badge
function StatusBadge({ value }) {
  const meta = statusMeta(value);
  return (
    <span style={{
      fontFamily:"Poppins", fontSize:12, fontWeight:700,
      color: meta.color, background: meta.bg,
      borderRadius:50, padding:"4px 12px",
      display:"inline-block", whiteSpace:"nowrap",
    }}>
      {meta.label}
    </span>
  );
}

// Add / Edit Medicine Modal
function MedicineFormModal({ initial, onSave, onClose, title }) {
  const [name,     setName]     = useState(initial?.name     ?? "");
  const [category, setCategory] = useState(initial?.category ?? CATEGORIES[0]);
  const [status,   setStatus]   = useState(initial?.status   ?? "in_stock");
  const [price,    setPrice]    = useState(initial?.price     ?? "");
  const [focused,  setFocused]  = useState(null);

  const canSave = name.trim() && price !== "" && Number(price) >= 0;

  const fieldStyle = (id) => ({
    fontFamily:"Poppins", fontSize:14, width:"100%",
    border:`1.5px solid ${focused === id ? "#5fc6a0" : "#ddeee9"}`,
    borderRadius:12, padding:"11px 14px", color:"#032932",
    background:"#f6fbf9", outline:"none", boxSizing:"border-box",
    boxShadow: focused === id ? "0 0 0 3px rgba(95,198,160,0.18)" : "none",
    transition:"border-color 0.2s, box-shadow 0.2s",
  });

  const chevron = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%235a7a74' stroke-width='1.8' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`;

  const Label = ({ children }) => (
    <label style={{ fontFamily:"Poppins", fontSize:12, fontWeight:600, color:"#5a7a74", display:"block", marginBottom:5 }}>
      {children}
    </label>
  );

  return (
    <Overlay onClose={onClose}>
      <ModalCard>
        <h2 style={{ fontFamily:"Poppins", fontWeight:800, fontSize:20, color:"#032932", margin:"0 0 20px" }}>
          {title}
        </h2>

        <div style={{ marginBottom:14 }}>
          <Label>Medicine Name</Label>
          <input autoFocus value={name} onChange={e=>setName(e.target.value)}
            placeholder="e.g. Amoxicillin 500mg" style={fieldStyle("name")}
            onFocus={()=>setFocused("name")} onBlur={()=>setFocused(null)} />
        </div>

        <div style={{ marginBottom:14 }}>
          <Label>Category</Label>
          <select value={category} onChange={e=>setCategory(e.target.value)}
            style={{ ...fieldStyle("cat"), appearance:"none", cursor:"pointer",
              backgroundImage:chevron, backgroundRepeat:"no-repeat",
              backgroundPosition:"right 14px center", paddingRight:36 }}
            onFocus={()=>setFocused("cat")} onBlur={()=>setFocused(null)}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div style={{ marginBottom:14 }}>
          <Label>Status</Label>
          <div style={{ display:"flex", gap:8 }}>
            {STATUS_OPTIONS.map((s) => {
              const active = status === s.value;
              return (
                <button key={s.value} onClick={()=>setStatus(s.value)} style={{
                  flex:1, fontFamily:"Poppins", fontSize:12, fontWeight:700,
                  border:`2px solid ${active ? s.color : "#ddeee9"}`,
                  borderRadius:10, padding:"9px 6px", cursor:"pointer",
                  background: active ? s.bg : "#f6fbf9",
                  color: active ? s.color : "#8fa8a0",
                  transition:"all 0.18s",
                }}>
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ marginBottom:22 }}>
          <Label>Price (₱)</Label>
          <input type="number" min="0" value={price} onChange={e=>setPrice(e.target.value)}
            placeholder="e.g. 25" style={fieldStyle("price")}
            onFocus={()=>setFocused("price")} onBlur={()=>setFocused(null)} />
        </div>

        <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
          <button onClick={onClose} style={{
            fontFamily:"Poppins", fontWeight:600, fontSize:14,
            background:"#f0f9f6", border:"none", borderRadius:12,
            padding:"10px 20px", cursor:"pointer", color:"#5a7a74", transition:"background 0.2s",
          }}
          onMouseEnter={e=>e.target.style.background="#ddeee9"}
          onMouseLeave={e=>e.target.style.background="#f0f9f6"}>
            Cancel
          </button>
          <button disabled={!canSave}
            onClick={()=>canSave&&onSave({ name:name.trim(), category, status, price:Number(price) })}
            style={{
              fontFamily:"Poppins", fontWeight:700, fontSize:14,
              background:canSave?"linear-gradient(to right,#032932,#5fc6a0)":"#ddeee9",
              border:"none", borderRadius:12, padding:"10px 22px",
              cursor:canSave?"pointer":"not-allowed", color:"#fff",
              transition:"all 0.2s", boxShadow:canSave?"0 4px 14px rgba(3,41,50,0.2)":"none",
            }}>
            Save
          </button>
        </div>
      </ModalCard>
    </Overlay>
  );
}

// Confirm Delete Modal 
function DeleteModal({ medicineName, onConfirm, onClose }) {
  return (
    <Overlay onClose={onClose}>
      <ModalCard>
        <h2 style={{ fontFamily:"Poppins", fontWeight:800, fontSize:20, color:"#032932", margin:"0 0 8px" }}>
          Remove Medicine
        </h2>
        <p style={{ fontFamily:"Poppins", fontSize:14, color:"#5a7a74", margin:"0 0 22px", lineHeight:1.6 }}>
          Are you sure you want to remove{" "}
          <strong style={{ color:"#032932" }}>{medicineName}</strong>? This action cannot be undone.
        </p>
        <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
          <button onClick={onClose} style={{
            fontFamily:"Poppins", fontWeight:600, fontSize:14,
            background:"#f0f9f6", border:"none", borderRadius:12,
            padding:"10px 20px", cursor:"pointer", color:"#5a7a74", transition:"background 0.2s",
          }}
          onMouseEnter={e=>e.target.style.background="#ddeee9"}
          onMouseLeave={e=>e.target.style.background="#f0f9f6"}>
            Cancel
          </button>
          <button onClick={onConfirm} style={{
            fontFamily:"Poppins", fontWeight:700, fontSize:14,
            background:"linear-gradient(to right,#c0392b,#e05555)",
            border:"none", borderRadius:12, padding:"10px 22px",
            cursor:"pointer", color:"#fff", boxShadow:"0 4px 14px rgba(192,57,43,0.3)",
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
      style={{ marginLeft:4, opacity:direction?1:0.35, verticalAlign:"middle" }}>
      {direction==="asc"  && <polyline points="18 15 12 9 6 15"/>}
      {direction==="desc" && <polyline points="6 9 12 15 18 9"/>}
      {!direction && (<><polyline points="18 15 12 9 6 15" opacity="0.5"/><polyline points="6 17 12 23 18 17" opacity="0.5"/></>)}
    </svg>
  );
}

// Status sort order 
const STATUS_ORDER = { in_stock: 0, low_stock: 1, out_of_stock: 2 };

// Main Page 
export default function PharmacyManagement() {
  const navigate = useNavigate();

  const [medicines,   setMedicines]   = useState(MOCK_MEDICINES);
  const [search,      setSearch]      = useState("");
  const [filterStatus,setFilterStatus]= useState("all");
  const [sortKey,     setSortKey]     = useState(null);
  const [sortDir,     setSortDir]     = useState("asc");
  const [showAdd,     setShowAdd]     = useState(false);
  const [editItem,    setEditItem]    = useState(null);
  const [deleteItem,  setDeleteItem]  = useState(null);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d==="asc"?"desc":"asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const displayed = useMemo(() => {
    let rows = medicines.filter(m =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.category.toLowerCase().includes(search.toLowerCase())
    );
    if (filterStatus !== "all") rows = rows.filter(m => m.status === filterStatus);
    if (sortKey) {
      rows = [...rows].sort((a, b) => {
        let av = a[sortKey], bv = b[sortKey];
        if (sortKey === "price")  { av = Number(av); bv = Number(bv); }
        else if (sortKey === "status") { av = STATUS_ORDER[av]; bv = STATUS_ORDER[bv]; }
        else { av = String(av).toLowerCase(); bv = String(bv).toLowerCase(); }
        return sortDir==="asc" ? (av<bv?-1:av>bv?1:0) : (av>bv?-1:av<bv?1:0);
      });
    }
    return rows;
  }, [medicines, search, filterStatus, sortKey, sortDir]);

  const dirFor = (k) => sortKey===k ? sortDir : null;

  // Stock summary counts
  const counts = useMemo(() => ({
    in_stock:     medicines.filter(m=>m.status==="in_stock").length,
    low_stock:    medicines.filter(m=>m.status==="low_stock").length,
    out_of_stock: medicines.filter(m=>m.status==="out_of_stock").length,
  }), [medicines]);

  return (
    <div style={{ fontFamily:"'Poppins',sans-serif", width:"100%", boxSizing:"border-box" }}>
      <style>{`
        *,*::before,*::after{box-sizing:border-box}
        @keyframes fadeSlideIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes rowIn{from{opacity:0;transform:translateX(-6px)}to{opacity:1;transform:translateX(0)}}

        .ph-back{background:none;border:none;cursor:pointer;display:flex;align-items:center;gap:6px;
          font-family:'Poppins',sans-serif;font-weight:600;font-size:14px;color:#5a7a74;
          padding:4px 0;margin-bottom:12px;transition:color 0.2s,transform 0.15s}
        .ph-back:hover{color:#032932;transform:translateX(-3px)}

        .ph-pill{font-family:'Poppins',sans-serif;font-weight:700;font-size:14px;border:none;
          border-radius:50px;padding:11px 24px;cursor:pointer;display:inline-flex;
          align-items:center;gap:8px;position:relative;overflow:hidden;
          transition:transform 0.15s,box-shadow 0.15s}
        .ph-pill.dark{background:linear-gradient(to right,#032932,#2a6b60);color:#fff}
        .ph-pill.dark::after{content:'';position:absolute;inset:0;
          background:linear-gradient(to right,#2a6b60,#5fc6a0);opacity:0;transition:opacity 0.3s}
        .ph-pill.dark>*{position:relative;z-index:1}
        .ph-pill.dark:hover::after{opacity:1}
        .ph-pill:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(3,41,50,0.25)}
        .ph-pill:active{transform:none;box-shadow:none}

        .ph-search{font-family:'Poppins',sans-serif;font-size:14px;
          border:1.5px solid #ddeee9;border-radius:50px;padding:10px 16px 10px 42px;
          color:#032932;background:#f6fbf9;outline:none;width:100%;max-width:360px;
          transition:border-color 0.2s,box-shadow 0.2s}
        .ph-search:focus{border-color:#5fc6a0;box-shadow:0 0 0 3px rgba(95,198,160,0.18)}
        .ph-search::placeholder{color:#a8c5bc}

        .ph-filter-btn{font-family:'Poppins',sans-serif;font-weight:600;font-size:12px;
          border-radius:50px;padding:7px 16px;cursor:pointer;border:1.5px solid #ddeee9;
          background:#f6fbf9;color:#5a7a74;transition:all 0.18s;white-space:nowrap}
        .ph-filter-btn.active-all{background:linear-gradient(to right,#032932,#2a6b60);
          color:#fff;border-color:transparent}
        .ph-filter-btn.active-in_stock{background:#e6f7ef;color:#1a7a4a;border-color:#1a7a4a}
        .ph-filter-btn.active-low_stock{background:#fef3c7;color:#b45309;border-color:#b45309}
        .ph-filter-btn.active-out_of_stock{background:#fdecea;color:#c0392b;border-color:#c0392b}
        .ph-filter-btn:not([class*="active"]):hover{background:#eaf7f2;border-color:#5fc6a0}

        .ph-table{width:100%;border-collapse:collapse;font-family:'Poppins',sans-serif}

        .ph-th{background:linear-gradient(to bottom,#032932,#2a6b60);color:#fff;
          font-weight:700;font-size:14px;padding:14px 18px;text-align:center;
          white-space:nowrap;user-select:none;cursor:pointer;transition:filter 0.2s;
          border-right:1px solid rgba(255,255,255,0.18)}
        .ph-th:first-child{border-radius:14px 0 0 14px;text-align:left}
        .ph-th:last-child{border-radius:0 14px 14px 0;cursor:default;border-right:none}
        .ph-th:not(:last-child):hover{filter:brightness(1.22)}

        .ph-tr{animation:rowIn 0.2s ease both;transition:background 0.15s}
        .ph-tr:nth-child(even) .ph-td{background:#f6fbf9}
        .ph-tr:nth-child(odd)  .ph-td{background:#fff}
        .ph-tr:hover .ph-td{background:#eaf7f2!important}

        .ph-td{padding:13px 18px;font-size:14px;color:#032932;
          border-bottom:1px solid #e8f3ef;text-align:center;transition:background 0.15s}
        .ph-td:first-child{text-align:left;font-weight:500}

        .ph-icon-btn{background:none;border:none;cursor:pointer;padding:6px;border-radius:8px;
          display:inline-flex;align-items:center;justify-content:center;
          transition:background 0.15s,transform 0.15s}
        .ph-icon-btn.edit{color:#5a7a74}
        .ph-icon-btn.edit:hover{background:#eaf7f2;color:#032932;transform:scale(1.1)}
        .ph-icon-btn.del{color:#c0392b}
        .ph-icon-btn.del:hover{background:#fdf0ef;transform:scale(1.1)}

        .ph-stat-card{background:#fff;border-radius:14px;padding:14px 20px;
          display:flex;flex-direction:column;gap:2px;flex:1 1 120px;
          box-shadow:0 2px 10px rgba(3,41,50,0.07);border:1.5px solid #e8f3ef;
          transition:box-shadow 0.2s,transform 0.2s}
        .ph-stat-card:hover{box-shadow:0 6px 18px rgba(3,41,50,0.12);transform:translateY(-2px)}

        @media(max-width:640px){
          .ph-th,.ph-td{padding:10px 10px;font-size:13px}
          .ph-search{max-width:100%}
        }
      `}</style>

      {/* Back */}
      <button className="ph-back" onClick={()=>navigate("/healthcare-provider/services")}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
        </svg>
        Back to Services
      </button>

      {/* Title */}
      <h1 style={{
        fontFamily:"Poppins,sans-serif", fontWeight:900,
        fontSize:"clamp(26px,5vw,48px)", marginBottom:24, marginTop:0,
        background:"linear-gradient(to right,#032932,#5fc6a0)",
        WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
        display:"inline-block", lineHeight:1.15,
      }}>
        Pharmacy Management
      </h1>

      {/* Stock summary cards */}
      <div style={{ display:"flex", gap:12, marginBottom:24, flexWrap:"wrap" }}>
        {[
          { label:"In Stock",     key:"in_stock",     color:"#1a7a4a", bg:"#e6f7ef", dot:"#1a7a4a" },
          { label:"Low Stock",    key:"low_stock",    color:"#b45309", bg:"#fef3c7", dot:"#b45309" },
          { label:"Out of Stock", key:"out_of_stock", color:"#c0392b", bg:"#fdecea", dot:"#c0392b" },
        ].map(s => (
          <div key={s.key} className="ph-stat-card">
            <span style={{ fontFamily:"Poppins", fontSize:11, fontWeight:600, color:"#7a9e97", textTransform:"uppercase", letterSpacing:"0.05em" }}>
              {s.label}
            </span>
            <span style={{ fontFamily:"Poppins", fontSize:28, fontWeight:900, color:s.color, lineHeight:1.1 }}>
              {counts[s.key]}
            </span>
            <span style={{ fontFamily:"Poppins", fontSize:11, color:"#a8c5bc", fontWeight:500 }}>medicines</span>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12, flexWrap:"wrap" }}>
        {/* Search */}
        <div style={{ position:"relative", flex:"1 1 200px", maxWidth:360 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a8c5bc" strokeWidth="2.2" strokeLinecap="round"
            style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input className="ph-search" placeholder="Search medicines or category"
            value={search} onChange={e=>setSearch(e.target.value)} />
        </div>

        {/* Active sort badge */}
        {sortKey && (
          <div style={{
            fontFamily:"Poppins", fontSize:12, fontWeight:600, color:"#5a7a74",
            background:"#eaf7f2", borderRadius:50, padding:"6px 14px",
            display:"flex", alignItems:"center", gap:6,
          }}>
            {sortKey.charAt(0).toUpperCase()+sortKey.slice(1)} {sortDir==="asc"?"↑":"↓"}
            <button onClick={()=>{setSortKey(null);setSortDir("asc");}}
              style={{ background:"none", border:"none", cursor:"pointer", color:"#5a7a74", padding:0, lineHeight:1, fontSize:15, fontWeight:700 }}>✕</button>
          </div>
        )}

        <div style={{ flex:1 }} />

        <button className="ph-pill dark" onClick={()=>setShowAdd(true)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          <span>Add Medicine</span>
        </button>
      </div>

      {/* Status filter pills */}
      <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
        {[
          { key:"all",          label:"All" },
          { key:"in_stock",     label:"In Stock" },
          { key:"low_stock",    label:"Low Stock" },
          { key:"out_of_stock", label:"Out of Stock" },
        ].map(f => (
          <button key={f.key}
            className={`ph-filter-btn ${filterStatus===f.key ? `active-${f.key}` : ""}`}
            onClick={()=>setFilterStatus(f.key)}>
            {f.label}
            {f.key !== "all" && (
              <span style={{ marginLeft:6, opacity:0.7 }}>({counts[f.key] ?? medicines.length})</span>
            )}
          </button>
        ))}
      </div>

      {/* Count */}
      <p style={{ fontFamily:"Poppins", fontSize:13, color:"#7a9e97", fontWeight:500, margin:"0 0 12px" }}>
        {displayed.length} medicine{displayed.length!==1?"s":""} available
        {search && ` · filtered by "${search}"`}
      </p>

      {/* Table */}
      <div style={{ overflowX:"auto", borderRadius:16, boxShadow:"0 2px 16px rgba(3,41,50,0.08)" }}>
        <table className="ph-table">
          <thead>
            <tr>
              <th className="ph-th" style={{ width:"32%" }} onClick={()=>handleSort("name")}>
                Name <SortIcon direction={dirFor("name")} />
              </th>
              <th className="ph-th" onClick={()=>handleSort("category")}>
                Category <SortIcon direction={dirFor("category")} />
              </th>
              <th className="ph-th" onClick={()=>handleSort("status")}>
                Status <SortIcon direction={dirFor("status")} />
              </th>
              <th className="ph-th" onClick={()=>handleSort("price")}>
                Price <SortIcon direction={dirFor("price")} />
              </th>
              <th className="ph-th" style={{ width:100 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayed.length === 0 ? (
              <tr><td colSpan={5} style={{
                fontFamily:"Poppins", fontSize:14, color:"#a8c5bc",
                textAlign:"center", padding:"40px 0",
              }}>
                {search ? `No medicines found for "${search}"` : "No medicines added yet."}
              </td></tr>
            ) : displayed.map((m, i) => (
              <tr key={m.id} className="ph-tr" style={{ animationDelay:`${i*0.025}s` }}>
                <td className="ph-td">{m.name}</td>
                <td className="ph-td">
                  <span style={{
                    fontFamily:"Poppins", fontSize:12, fontWeight:600,
                    color:"#2a6b60", background:"#eaf7f2",
                    borderRadius:50, padding:"3px 10px",
                  }}>
                    {m.category}
                  </span>
                </td>
                <td className="ph-td"><StatusBadge value={m.status} /></td>
                <td className="ph-td">₱{m.price.toLocaleString()}</td>
                <td className="ph-td">
                  <div style={{ display:"flex", gap:4, justifyContent:"center" }}>
                    <button className="ph-icon-btn edit" title="Edit" onClick={()=>setEditItem(m)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    <button className="ph-icon-btn del" title="Remove" onClick={()=>setDeleteItem(m)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                        <path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
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
        <MedicineFormModal title="Add Medicine"
          onSave={d=>{ setMedicines(p=>[...p,{id:Date.now(),...d}]); setShowAdd(false); }}
          onClose={()=>setShowAdd(false)} />
      )}
      {editItem && (
        <MedicineFormModal title="Edit Medicine" initial={editItem}
          onSave={d=>{ setMedicines(p=>p.map(m=>m.id===editItem.id?{...m,...d}:m)); setEditItem(null); }}
          onClose={()=>setEditItem(null)} />
      )}
      {deleteItem && (
        <DeleteModal medicineName={deleteItem.name}
          onConfirm={()=>{ setMedicines(p=>p.filter(m=>m.id!==deleteItem.id)); setDeleteItem(null); }}
          onClose={()=>setDeleteItem(null)} />
      )}
    </div>
  );
}