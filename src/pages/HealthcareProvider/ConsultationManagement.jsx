import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Mock data 
export const MOCK_CONSULTATIONS = [
  { id: 1,  type: "General Check-up",        price: 300,  doctor: "Dr. Maria Santos"    },
  { id: 2,  type: "Prenatal Care",            price: 500,  doctor: "Dr. Ana Reyes"       },
  { id: 3,  type: "Pediatric Consultation",   price: 400,  doctor: "Dr. Jose Dela Cruz"  },
  { id: 4,  type: "Internal Medicine",        price: 600,  doctor: "Dr. Ramon Villanueva"},
  { id: 5,  type: "Dermatology",              price: 700,  doctor: "Dr. Maria Santos"    },
  { id: 6,  type: "Orthopedic Consultation",  price: 800,  doctor: "Dr. Carlo Mendoza"   },
  { id: 7,  type: "ENT Consultation",         price: 650,  doctor: "Dr. Jose Dela Cruz"  },
  { id: 8,  type: "Cardiology",               price: 900,  doctor: "Dr. Ramon Villanueva"},
  { id: 9,  type: "Ophthalmology",            price: 550,  doctor: "Dr. Ana Reyes"       },
  { id: 10, type: "Neurology",                price: 1000, doctor: "Dr. Carlo Mendoza"   },
];

export const MOCK_DOCTORS = [
  "Dr. Maria Santos",
  "Dr. Ana Reyes",
  "Dr. Jose Dela Cruz",
  "Dr. Ramon Villanueva",
  "Dr. Carlo Mendoza",
];

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

// Add / Edit Consultation Modal 
function ConsultationFormModal({ initial, onSave, onClose, title, doctors }) {
  const [type,    setType]    = useState(initial?.type   ?? "");
  const [price,   setPrice]   = useState(initial?.price  ?? "");
  const [doctor,  setDoctor]  = useState(initial?.doctor ?? doctors[0] ?? "");
  const [focused, setFocused] = useState(null);

  const [customDoctor, setCustomDoctor] = useState(
    initial?.doctor && !doctors.includes(initial.doctor) ? initial.doctor : ""
  );
  const [useCustom, setUseCustom] = useState(
    initial?.doctor ? !doctors.includes(initial.doctor) : false
  );

  const effectiveDoctor = useCustom ? customDoctor : doctor;
  const canSave = type.trim() && price !== "" && Number(price) >= 0 && effectiveDoctor.trim();

  const fieldStyle = (id) => ({
    fontFamily:"Poppins", fontSize:14, width:"100%",
    border:`1.5px solid ${focused===id ? "#5fc6a0" : "#ddeee9"}`,
    borderRadius:12, padding:"11px 14px", color:"#032932",
    background:"#f6fbf9", outline:"none", boxSizing:"border-box",
    boxShadow: focused===id ? "0 0 0 3px rgba(95,198,160,0.18)" : "none",
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

        {/* Consultation Type */}
        <div style={{ marginBottom:14 }}>
          <Label>Consultation Type</Label>
          <input autoFocus value={type} onChange={e=>setType(e.target.value)}
            placeholder="e.g. General Check-up"
            style={fieldStyle("type")}
            onFocus={()=>setFocused("type")} onBlur={()=>setFocused(null)} />
        </div>

        {/* Price */}
        <div style={{ marginBottom:14 }}>
          <Label>Price (₱)</Label>
          <input type="number" min="0" value={price} onChange={e=>setPrice(e.target.value)}
            placeholder="e.g. 300"
            style={fieldStyle("price")}
            onFocus={()=>setFocused("price")} onBlur={()=>setFocused(null)} />
        </div>

        {/* Doctor Assigned */}
        <div style={{ marginBottom:22 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:5 }}>
            <Label>Doctor Assigned</Label>
            <button onClick={()=>{ setUseCustom(v=>!v); setCustomDoctor(""); }}
              style={{
                fontFamily:"Poppins", fontSize:11, fontWeight:600,
                color:"#5fc6a0", background:"none", border:"none",
                cursor:"pointer", padding:0, textDecoration:"underline",
              }}>
              {useCustom ? "Pick from list" : "Type manually"}
            </button>
          </div>

          {useCustom ? (
            <input value={customDoctor} onChange={e=>setCustomDoctor(e.target.value)}
              placeholder="e.g. Dr. Juan dela Cruz"
              style={fieldStyle("custom")}
              onFocus={()=>setFocused("custom")} onBlur={()=>setFocused(null)} />
          ) : (
            <select value={doctor} onChange={e=>setDoctor(e.target.value)}
              style={{
                ...fieldStyle("doctor"),
                appearance:"none", cursor:"pointer",
                backgroundImage:chevron, backgroundRepeat:"no-repeat",
                backgroundPosition:"right 14px center", paddingRight:36,
              }}
              onFocus={()=>setFocused("doctor")} onBlur={()=>setFocused(null)}>
              {doctors.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          )}
        </div>

        {/* Buttons */}
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
            onClick={()=>canSave&&onSave({ type:type.trim(), price:Number(price), doctor:effectiveDoctor.trim() })}
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
function DeleteModal({ consultationType, onConfirm, onClose }) {
  return (
    <Overlay onClose={onClose}>
      <ModalCard>
        <h2 style={{ fontFamily:"Poppins", fontWeight:800, fontSize:20, color:"#032932", margin:"0 0 8px" }}>
          Remove Consultation
        </h2>
        <p style={{ fontFamily:"Poppins", fontSize:14, color:"#5a7a74", margin:"0 0 22px", lineHeight:1.6 }}>
          Are you sure you want to remove{" "}
          <strong style={{ color:"#032932" }}>{consultationType}</strong>? This action cannot be undone.
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

// Doctor Avatar initials 
function DoctorChip({ name }) {
  const initials = name
    .replace("Dr. ", "")
    .split(" ")
    .map(w => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Deterministic color from name
  const colors = [
    ["#1a7a4a","#e6f7ef"], ["#0d4a7a","#e6f0fb"], ["#6b2a7a","#f3e6fb"],
    ["#7a4a0d","#fbf3e6"], ["#2a4a7a","#e6eefb"],
  ];
  const idx = name.charCodeAt(4) % colors.length;
  const [fg, bg] = colors[idx];

  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:8 }}>
      <div style={{
        width:30, height:30, borderRadius:"50%",
        background:bg, color:fg,
        fontFamily:"Poppins", fontWeight:700, fontSize:11,
        display:"flex", alignItems:"center", justifyContent:"center",
        flexShrink:0,
      }}>
        {initials}
      </div>
      <span style={{ fontFamily:"Poppins", fontSize:14, color:"#032932", fontWeight:500 }}>
        {name}
      </span>
    </div>
  );
}

// Main Page 
export default function ConsultationManagement() {
  const navigate = useNavigate();

  const [consultations, setConsultations] = useState(MOCK_CONSULTATIONS);
  const [doctors,       setDoctors]       = useState(MOCK_DOCTORS);
  const [search,        setSearch]        = useState("");
  const [filterDoctor,  setFilterDoctor]  = useState("all");
  const [sortKey,       setSortKey]       = useState(null);
  const [sortDir,       setSortDir]       = useState("asc");
  const [showAdd,       setShowAdd]       = useState(false);
  const [editItem,      setEditItem]      = useState(null);
  const [deleteItem,    setDeleteItem]    = useState(null);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d==="asc"?"desc":"asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const allDoctors = useMemo(() => {
    const set = new Set([...doctors, ...consultations.map(c => c.doctor)]);
    return Array.from(set).sort();
  }, [consultations, doctors]);

  const displayed = useMemo(() => {
    let rows = consultations.filter(c =>
      c.type.toLowerCase().includes(search.toLowerCase()) ||
      c.doctor.toLowerCase().includes(search.toLowerCase())
    );
    if (filterDoctor !== "all") rows = rows.filter(c => c.doctor === filterDoctor);
    if (sortKey) {
      rows = [...rows].sort((a, b) => {
        let av = sortKey === "price" ? Number(a[sortKey]) : String(a[sortKey]).toLowerCase();
        let bv = sortKey === "price" ? Number(b[sortKey]) : String(b[sortKey]).toLowerCase();
        return sortDir==="asc" ? (av<bv?-1:av>bv?1:0) : (av>bv?-1:av<bv?1:0);
      });
    }
    return rows;
  }, [consultations, search, filterDoctor, sortKey, sortDir]);

  const dirFor = (k) => sortKey===k ? sortDir : null;

  // Summary counts per doctor
  const perDoctor = useMemo(() => {
    const map = {};
    consultations.forEach(c => { map[c.doctor] = (map[c.doctor]||0) + 1; });
    return map;
  }, [consultations]);

  const handleAddSave = (data) => {
    if (!doctors.includes(data.doctor)) setDoctors(p => [...p, data.doctor]);
    setConsultations(p => [...p, { id:Date.now(), ...data }]);
    setShowAdd(false);
  };

  const handleEditSave = (data) => {
    if (!doctors.includes(data.doctor)) setDoctors(p => [...p, data.doctor]);
    setConsultations(p => p.map(c => c.id===editItem.id ? { ...c, ...data } : c));
    setEditItem(null);
  };

  return (
    <div style={{ fontFamily:"'Poppins',sans-serif", width:"100%", boxSizing:"border-box" }}>
      <style>{`
        *,*::before,*::after{box-sizing:border-box}
        @keyframes fadeSlideIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes rowIn{from{opacity:0;transform:translateX(-6px)}to{opacity:1;transform:translateX(0)}}

        .co-back{background:none;border:none;cursor:pointer;display:flex;align-items:center;gap:6px;
          font-family:'Poppins',sans-serif;font-weight:600;font-size:14px;color:#5a7a74;
          padding:4px 0;margin-bottom:12px;transition:color 0.2s,transform 0.15s}
        .co-back:hover{color:#032932;transform:translateX(-3px)}

        .co-pill{font-family:'Poppins',sans-serif;font-weight:700;font-size:14px;border:none;
          border-radius:50px;padding:11px 24px;cursor:pointer;display:inline-flex;
          align-items:center;gap:8px;position:relative;overflow:hidden;
          transition:transform 0.15s,box-shadow 0.15s}
        .co-pill.dark{background:linear-gradient(to right,#032932,#2a6b60);color:#fff}
        .co-pill.dark::after{content:'';position:absolute;inset:0;
          background:linear-gradient(to right,#2a6b60,#5fc6a0);opacity:0;transition:opacity 0.3s}
        .co-pill.dark>*{position:relative;z-index:1}
        .co-pill.dark:hover::after{opacity:1}
        .co-pill:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(3,41,50,0.25)}
        .co-pill:active{transform:none;box-shadow:none}

        .co-search{font-family:'Poppins',sans-serif;font-size:14px;
          border:1.5px solid #ddeee9;border-radius:50px;padding:10px 16px 10px 42px;
          color:#032932;background:#f6fbf9;outline:none;width:100%;max-width:360px;
          transition:border-color 0.2s,box-shadow 0.2s}
        .co-search:focus{border-color:#5fc6a0;box-shadow:0 0 0 3px rgba(95,198,160,0.18)}
        .co-search::placeholder{color:#a8c5bc}

        .co-filter-btn{font-family:'Poppins',sans-serif;font-weight:600;font-size:12px;
          border-radius:50px;padding:7px 14px;cursor:pointer;border:1.5px solid #ddeee9;
          background:#f6fbf9;color:#5a7a74;transition:all 0.18s;white-space:nowrap;
          display:inline-flex;align-items:center;gap:6px}
        .co-filter-btn.active{background:linear-gradient(to right,#032932,#2a6b60);
          color:#fff;border-color:transparent}
        .co-filter-btn:not(.active):hover{background:#eaf7f2;border-color:#5fc6a0}

        .co-table{width:100%;border-collapse:collapse;font-family:'Poppins',sans-serif}

        .co-th{background:linear-gradient(to bottom,#032932,#2a6b60);color:#fff;
          font-weight:700;font-size:14px;padding:14px 18px;text-align:center;
          white-space:nowrap;user-select:none;cursor:pointer;transition:filter 0.2s;
          border-right:1px solid rgba(255,255,255,0.18)}
        .co-th:first-child{border-radius:14px 0 0 14px;text-align:left}
        .co-th:last-child{border-radius:0 14px 14px 0;cursor:default;border-right:none}
        .co-th:not(:last-child):hover{filter:brightness(1.22)}

        .co-tr{animation:rowIn 0.2s ease both;transition:background 0.15s}
        .co-tr:nth-child(even) .co-td{background:#f6fbf9}
        .co-tr:nth-child(odd)  .co-td{background:#fff}
        .co-tr:hover .co-td{background:#eaf7f2!important}

        .co-td{padding:13px 18px;font-size:14px;color:#032932;
          border-bottom:1px solid #e8f3ef;text-align:center;transition:background 0.15s}
        .co-td:first-child{text-align:left;font-weight:500}

        .co-icon-btn{background:none;border:none;cursor:pointer;padding:6px;border-radius:8px;
          display:inline-flex;align-items:center;justify-content:center;
          transition:background 0.15s,transform 0.15s}
        .co-icon-btn.edit{color:#5a7a74}
        .co-icon-btn.edit:hover{background:#eaf7f2;color:#032932;transform:scale(1.1)}
        .co-icon-btn.del{color:#c0392b}
        .co-icon-btn.del:hover{background:#fdf0ef;transform:scale(1.1)}

        .co-doctor-card{background:#fff;border-radius:14px;padding:14px 18px;
          display:flex;align-items:center;gap:12px;flex:1 1 200px;
          box-shadow:0 2px 10px rgba(3,41,50,0.07);border:1.5px solid #e8f3ef;
          transition:box-shadow 0.2s,transform 0.2s}
        .co-doctor-card:hover{box-shadow:0 6px 18px rgba(3,41,50,0.12);transform:translateY(-2px)}

        @media(max-width:640px){
          .co-th,.co-td{padding:10px 10px;font-size:13px}
          .co-search{max-width:100%}
        }
      `}</style>

      {/* Back */}
      <button className="co-back" onClick={()=>navigate("/healthcare-provider/services")}>
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
        Consultation Management
      </h1>

      {/* Doctor summary cards */}
      <div style={{ display:"flex", gap:12, marginBottom:24, flexWrap:"wrap" }}>
        {allDoctors.map(doc => {
          const initials = doc.replace("Dr. ","").split(" ").map(w=>w[0]).slice(0,2).join("").toUpperCase();
          const colors = [["#1a7a4a","#e6f7ef"],["#0d4a7a","#e6f0fb"],["#6b2a7a","#f3e6fb"],["#7a4a0d","#fbf3e6"],["#2a4a7a","#e6eefb"]];
          const [fg,bg] = colors[doc.charCodeAt(4) % colors.length];
          return (
            <div key={doc} className="co-doctor-card">
              <div style={{
                width:42, height:42, borderRadius:"50%", flexShrink:0,
                background:bg, color:fg,
                fontFamily:"Poppins", fontWeight:800, fontSize:14,
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>{initials}</div>
              <div>
                <div style={{ fontFamily:"Poppins", fontWeight:700, fontSize:13, color:"#032932" }}>{doc}</div>
                <div style={{ fontFamily:"Poppins", fontSize:12, color:"#7a9e97", fontWeight:500 }}>
                  {perDoctor[doc] ?? 0} consultation{(perDoctor[doc]??0)!==1?"s":""}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Toolbar */}
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12, flexWrap:"wrap" }}>
        <div style={{ position:"relative", flex:"1 1 200px", maxWidth:360 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a8c5bc" strokeWidth="2.2" strokeLinecap="round"
            style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input className="co-search" placeholder="Search type or doctor"
            value={search} onChange={e=>setSearch(e.target.value)} />
        </div>

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

        <button className="co-pill dark" onClick={()=>setShowAdd(true)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          <span>Add Consultation</span>
        </button>
      </div>

      {/* Doctor filter pills */}
      <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
        <button className={`co-filter-btn ${filterDoctor==="all"?"active":""}`}
          onClick={()=>setFilterDoctor("all")}>
          All Doctors
        </button>
        {allDoctors.map(doc => (
          <button key={doc}
            className={`co-filter-btn ${filterDoctor===doc?"active":""}`}
            onClick={()=>setFilterDoctor(doc)}>
            {doc.replace("Dr. ","")}
            <span style={{ opacity:0.7 }}>({perDoctor[doc]??0})</span>
          </button>
        ))}
      </div>

      {/* Count */}
      <p style={{ fontFamily:"Poppins", fontSize:13, color:"#7a9e97", fontWeight:500, margin:"0 0 12px" }}>
        {displayed.length} consultation type{displayed.length!==1?"s":""} available
        {search && ` · filtered by "${search}"`}
      </p>

      {/* Table */}
      <div style={{ overflowX:"auto", borderRadius:16, boxShadow:"0 2px 16px rgba(3,41,50,0.08)" }}>
        <table className="co-table">
          <thead>
            <tr>
              <th className="co-th" style={{ width:"38%" }} onClick={()=>handleSort("type")}>
                Consultation Type <SortIcon direction={dirFor("type")} />
              </th>
              <th className="co-th" onClick={()=>handleSort("price")}>
                Price <SortIcon direction={dirFor("price")} />
              </th>
              <th className="co-th" onClick={()=>handleSort("doctor")}>
                Doctor Assigned <SortIcon direction={dirFor("doctor")} />
              </th>
              <th className="co-th" style={{ width:100 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayed.length === 0 ? (
              <tr><td colSpan={4} style={{
                fontFamily:"Poppins", fontSize:14, color:"#a8c5bc",
                textAlign:"center", padding:"40px 0",
              }}>
                {search ? `No consultations found for "${search}"` : "No consultations added yet."}
              </td></tr>
            ) : displayed.map((c, i) => (
              <tr key={c.id} className="co-tr" style={{ animationDelay:`${i*0.025}s` }}>
                <td className="co-td">{c.type}</td>
                <td className="co-td">₱{c.price.toLocaleString()}</td>
                <td className="co-td"><DoctorChip name={c.doctor} /></td>
                <td className="co-td">
                  <div style={{ display:"flex", gap:4, justifyContent:"center" }}>
                    <button className="co-icon-btn edit" title="Edit" onClick={()=>setEditItem(c)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    <button className="co-icon-btn del" title="Remove" onClick={()=>setDeleteItem(c)}>
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
        <ConsultationFormModal title="Add Consultation" doctors={allDoctors}
          onSave={handleAddSave} onClose={()=>setShowAdd(false)} />
      )}
      {editItem && (
        <ConsultationFormModal title="Edit Consultation" initial={editItem} doctors={allDoctors}
          onSave={handleEditSave} onClose={()=>setEditItem(null)} />
      )}
      {deleteItem && (
        <DeleteModal consultationType={deleteItem.type}
          onConfirm={()=>{ setConsultations(p=>p.filter(c=>c.id!==deleteItem.id)); setDeleteItem(null); }}
          onClose={()=>setDeleteItem(null)} />
      )}
    </div>
  );
}