// ServicesManagement.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ServiceModuleCard from "../../components/HealthcareProvider/ServiceModuleCard";
import OtherServiceRow from "../../components/HealthcareProvider/OtherServiceRow";

//Asset imports
import ConsultationImg from "../../assets/Consultation.png";
import DentistImg      from "../../assets/Dentist.png";
import LaboratoryImg   from "../../assets/Laboratory.png";
import MaternityImg    from "../../assets/Maternity.png";
import PharmacyImg     from "../../assets/Pharmacy.png";

// ── Image map (used to resolve module type → asset) ───────────────────────
const MODULE_IMAGES = {
  consultation: ConsultationImg,
  dentist:      DentistImg,
  laboratory:   LaboratoryImg,
  maternity:    MaternityImg,
  pharmacy:     PharmacyImg,
};
 
// ── Module route map ──────────────────────────────────────────────────────
const MODULE_ROUTES = {
  consultation: "/healthcare-provider/services/consultation",
  dentist:      "/healthcare-provider/services/dentist",
  laboratory:   "/healthcare-provider/services/laboratory",
  maternity:    "/healthcare-provider/services/maternity",
  pharmacy:     "/healthcare-provider/services/pharmacy",
};
 
// ── Mock data (replace with API fetch) ───────────────────────────────────
// GET /facilities/:id/modules
const MOCK_MODULES = [
  { type: "laboratory",   count: 12, countLabel: "Tests Available",    description: "Manage tests, fees, turnaround time." },
  { type: "pharmacy",     count: 15, countLabel: "Medicines Available", description: "Manage medicine availability."         },
  { type: "consultation", count: 3,  countLabel: "Doctors Available",   description: "Set doctor consultations."            },
];
 
// GET /facilities/:id/services
const MOCK_OTHER_SERVICES = [
  { id: 1, name: "Basic First Aid"   },
  { id: 2, name: "BP Checkup"        },
  { id: 3, name: "Family Planning"   },
  { id: 4, name: "Blood Sugar Test"  },
  { id: 5, name: "Temperature Check" },
];
 
// ── All possible modules (shown in Enable modal) ──────────────────────────
const ALL_MODULES = [
  { type: "laboratory",   label: "Laboratory"   },
  { type: "pharmacy",     label: "Pharmacy"     },
  { type: "consultation", label: "Consultation" },
  { type: "dentist",      label: "Dentist"      },
  { type: "maternity",    label: "Maternity"    },
];
 
// ── Modals ────────────────────────────────────────────────────────────────
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
 
function ModalCard({ children }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 20, padding: "28px 28px 24px",
      boxShadow: "0 16px 48px rgba(3,41,50,0.25)",
      width: "100%", maxWidth: 440,
      animation: "fadeSlideIn 0.25s ease",
    }}>
      {children}
    </div>
  );
}
 
// Enable Service Module modal — card-grid layout
function EnableModuleModal({ enabledTypes, onEnable, onClose }) {
  const [selected, setSelected] = useState(null);
  const available = ALL_MODULES.filter((m) => !enabledTypes.includes(m.type));
 
  const MODULE_DESC = {
    laboratory:   "Manage tests, fees, turnaround time.",
    pharmacy:     "Manage medicine availability.",
    consultation: "Set doctor consultations.",
    dentist:      "Procedures and pricing.",
    maternity:    "Maternal and childcare services.",
  };
 
  return (
    <Overlay onClose={onClose}>
      {/* Wider container for the card grid */}
      <div style={{
        background: "#fff",
        borderRadius: 24,
        padding: "32px 32px 26px",
        boxShadow: "0 20px 60px rgba(3,41,50,0.28)",
        width: "100%",
        maxWidth: 780,
        animation: "fadeSlideIn 0.25s ease",
        position: "relative",
      }}>
        {/* Close X */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 18, right: 20,
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "Poppins", fontWeight: 700, fontSize: 20,
            color: "#5a7a74", lineHeight: 1, padding: "4px 8px",
            borderRadius: 8, transition: "background 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => { e.target.style.background = "#f0f9f6"; e.target.style.color = "#032932"; }}
          onMouseLeave={(e) => { e.target.style.background = "none"; e.target.style.color = "#5a7a74"; }}
        >✕</button>
 
        {/* Header */}
        <h2 style={{
          fontFamily: "Poppins", fontWeight: 900,
          fontSize: "clamp(22px, 4vw, 32px)",
          background: "linear-gradient(to right, #032932, #5fc6a0)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          display: "inline-block", margin: "0 0 4px", lineHeight: 1.2,
        }}>
          Enable Service Module
        </h2>
        <p style={{ fontFamily: "Poppins", fontSize: 14, color: "#7a9e97", margin: "0 0 24px", fontWeight: 500 }}>
          Select a service to enable:
        </p>
 
        {available.length === 0 ? (
          <p style={{ fontFamily: "Poppins", fontSize: 14, color: "#5a7a74", textAlign: "center", padding: "24px 0" }}>
            All modules are already enabled.
          </p>
        ) : (
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            marginBottom: 24,
            justifyContent: "center",
          }}>
            {available.map((m) => {
              const isSelected = selected === m.type;
              return (
                <button
                  key={m.type}
                  onClick={() => setSelected(m.type)}
                  style={{
                    width: 130,
                    minHeight: 170,
                    background: isSelected
                      ? "linear-gradient(160deg, #2a6b60 0%, #032932 100%)"
                      : "#f0f9f6",
                    border: `2px solid ${isSelected ? "transparent" : "#ddeee9"}`,
                    borderRadius: 18,
                    padding: "14px 10px 12px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 0,
                    transition: "all 0.2s",
                    boxShadow: isSelected
                      ? "0 8px 24px rgba(3,41,50,0.22)"
                      : "0 2px 8px rgba(0,0,0,0.05)",
                    transform: isSelected ? "translateY(-3px)" : "none",
                  }}
                  onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = "#e4f6f0"; }}
                  onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = "#f0f9f6"; }}
                >
                  {/* Image fills the top portion */}
                  <div style={{
                    width: "100%", height: 100,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 10,
                  }}>
                    <img
                      src={MODULE_IMAGES[m.type]}
                      alt={m.label}
                      style={{
                        width: 88, height: 88,
                        objectFit: "contain",
                        filter: isSelected
                          ? "drop-shadow(0 4px 10px rgba(0,0,0,0.3))"
                          : "drop-shadow(0 2px 6px rgba(0,0,0,0.12))",
                        transition: "filter 0.2s",
                      }}
                    />
                  </div>
 
                  {/* Label */}
                  <span style={{
                    fontFamily: "Poppins", fontWeight: 700,
                    fontSize: 13, lineHeight: 1.25,
                    color: isSelected ? "#fff" : "#032932",
                    textAlign: "center", marginBottom: 5,
                    transition: "color 0.2s",
                  }}>
                    {m.label}
                  </span>
 
                  {/* Description */}
                  <span style={{
                    fontFamily: "Poppins", fontWeight: 400,
                    fontSize: 11, lineHeight: 1.4,
                    color: isSelected ? "rgba(255,255,255,0.72)" : "#8fa8a0",
                    textAlign: "center",
                    transition: "color 0.2s",
                  }}>
                    {MODULE_DESC[m.type]}
                  </span>
                </button>
              );
            })}
          </div>
        )}
 
        {/* Footer buttons */}
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
          <button
            disabled={!selected}
            onClick={() => { if (selected) { onEnable(selected); onClose(); } }}
            style={{
              fontFamily: "Poppins", fontWeight: 700, fontSize: 14,
              background: selected ? "linear-gradient(to right,#032932,#5fc6a0)" : "#ddeee9",
              border: "none", borderRadius: 12, padding: "10px 26px",
              cursor: selected ? "pointer" : "not-allowed", color: "#fff",
              transition: "all 0.2s", position: "relative", overflow: "hidden",
              boxShadow: selected ? "0 4px 14px rgba(3,41,50,0.2)" : "none",
            }}
          >
            Enable
          </button>
        </div>
      </div>
    </Overlay>
  );
}
 
// Add / Edit other service modal
function ServiceFormModal({ initial = "", onSave, onClose, title }) {
  const [name, setName] = useState(initial);
  return (
    <Overlay onClose={onClose}>
      <ModalCard>
        <h2 style={{ fontFamily: "Poppins", fontWeight: 800, fontSize: 20, color: "#032932", margin: "0 0 18px" }}>
          {title}
        </h2>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && name.trim() && onSave(name.trim())}
          placeholder="Service name"
          style={{
            fontFamily: "Poppins", fontSize: 14, width: "100%",
            border: "1.5px solid #ddeee9", borderRadius: 12,
            padding: "11px 14px", color: "#032932", background: "#f6fbf9",
            outline: "none", boxSizing: "border-box", marginBottom: 18,
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
          onFocus={(e) => { e.target.style.borderColor = "#5fc6a0"; e.target.style.boxShadow = "0 0 0 3px rgba(95,198,160,0.18)"; }}
          onBlur={(e)  => { e.target.style.borderColor = "#ddeee9"; e.target.style.boxShadow = "none"; }}
        />
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{
            fontFamily: "Poppins", fontWeight: 600, fontSize: 14,
            background: "#f0f9f6", border: "none", borderRadius: 12,
            padding: "10px 20px", cursor: "pointer", color: "#5a7a74",
          }}>Cancel</button>
          <button
            disabled={!name.trim()}
            onClick={() => name.trim() && onSave(name.trim())}
            style={{
              fontFamily: "Poppins", fontWeight: 700, fontSize: 14,
              background: name.trim() ? "linear-gradient(to right,#032932,#5fc6a0)" : "#ddeee9",
              border: "none", borderRadius: 12, padding: "10px 22px",
              cursor: name.trim() ? "pointer" : "not-allowed", color: "#fff",
            }}
          >Save</button>
        </div>
      </ModalCard>
    </Overlay>
  );
}
 
// Confirm delete modal
function DeleteModal({ serviceName, onConfirm, onClose }) {
  return (
    <Overlay onClose={onClose}>
      <ModalCard>
        <h2 style={{ fontFamily: "Poppins", fontWeight: 800, fontSize: 20, color: "#032932", margin: "0 0 8px" }}>
          Remove Service
        </h2>
        <p style={{ fontFamily: "Poppins", fontSize: 14, color: "#5a7a74", margin: "0 0 22px", lineHeight: 1.6 }}>
          Are you sure you want to remove <strong style={{ color: "#032932" }}>{serviceName}</strong>? This action cannot be undone.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{
            fontFamily: "Poppins", fontWeight: 600, fontSize: 14,
            background: "#f0f9f6", border: "none", borderRadius: 12,
            padding: "10px 20px", cursor: "pointer", color: "#5a7a74",
          }}>Cancel</button>
          <button onClick={onConfirm} style={{
            fontFamily: "Poppins", fontWeight: 700, fontSize: 14,
            background: "linear-gradient(to right,#c0392b,#e05555)",
            border: "none", borderRadius: 12, padding: "10px 22px",
            cursor: "pointer", color: "#fff",
          }}>Remove</button>
        </div>
      </ModalCard>
    </Overlay>
  );
}
 
// ── Main Page ─────────────────────────────────────────────────────────────
export default function ServicesManagement() {
  const navigate = useNavigate();
 
  // TODO: replace with useEffect + API fetch
  // useEffect(() => {
  //   api.get("/facilities/:id/modules").then(setModules);
  //   api.get("/facilities/:id/services").then(setOtherServices);
  // }, []);
 
  const [modules, setModules]             = useState(MOCK_MODULES);
  const [otherServices, setOtherServices] = useState(MOCK_OTHER_SERVICES);
 
  // Modal state
  const [showEnableModal, setShowEnableModal] = useState(false);
  const [showAddModal, setShowAddModal]       = useState(false);
  const [editService, setEditService]         = useState(null);  
  const [deleteService, setDeleteService]     = useState(null);   
 
  // ── Module handlers ──────────────────────────────────────────────────
  const handleEnableModule = async (type) => {
    // TODO: await api.post("/facilities/:id/modules", { type });
    const defaults = {
      laboratory:   { count: 0, countLabel: "Tests Available",    description: "Manage tests, fees, turnaround time." },
      pharmacy:     { count: 0, countLabel: "Medicines Available", description: "Manage medicine availability."        },
      consultation: { count: 0, countLabel: "Doctors Available",   description: "Set doctor consultations."           },
      dentist:      { count: 0, countLabel: "Dentists Available",  description: "Manage dental services."             },
      maternity:    { count: 0, countLabel: "Services Available",  description: "Manage maternity care."              },
    };
    setModules((prev) => [...prev, { type, ...defaults[type] }]);
  };
 
  // ── Other service handlers ───────────────────────────────────────────
  const handleAddService = async (name) => {
    const newService = { id: Date.now(), name };
    setOtherServices((prev) => [...prev, newService]);
    setShowAddModal(false);
  };
 
  const handleEditSave = async (name) => {
    setOtherServices((prev) =>
      prev.map((s) => (s.id === editService.id ? { ...s, name } : s))
    );
    setEditService(null);
  };
 
  const handleDeleteConfirm = async () => {
    setOtherServices((prev) => prev.filter((s) => s.id !== deleteService.id));
    setDeleteService(null);
  };
 
  // ── Layout helpers ───────────────────────────────────────────────────
  // Split other services into 2 columns
  const leftCol  = otherServices.filter((_, i) => i % 2 === 0);
  const rightCol = otherServices.filter((_, i) => i % 2 !== 0);
 
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", width: "100%", boxSizing: "border-box" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
 
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
 
        .pill-btn {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 14px;
          border: none;
          border-radius: 50px;
          padding: 12px 26px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          position: relative;
          overflow: hidden;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .pill-btn.dark {
          background: linear-gradient(to right, #032932, #2a6b60);
          color: #fff;
        }
        .pill-btn.dark::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, #2a6b60, #5fc6a0);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .pill-btn.dark > * { position: relative; z-index: 1; }
        .pill-btn.dark:hover::after { opacity: 1; }
        .pill-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(3,41,50,0.25); }
        .pill-btn:active { transform: translateY(0); box-shadow: none; }
 
        .modules-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
        }
 
        .services-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
 
        @media (max-width: 640px) {
          .services-grid { grid-template-columns: 1fr; }
          .modules-grid  { justify-content: center; }
        }
      `}</style>
 
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
        Services Management
      </h1>
 
      {/* ── Module Cards ── */}
      <div className="modules-grid" style={{ marginBottom: 20 }}>
        {modules.map((mod) => (
          <ServiceModuleCard
            key={mod.type}
            image={MODULE_IMAGES[mod.type]}
            title={mod.type.charAt(0).toUpperCase() + mod.type.slice(1)}
            count={mod.count}
            countLabel={mod.countLabel}
            description={mod.description}
            onManage={() => navigate(MODULE_ROUTES[mod.type])}
          />
        ))}
      </div>
 
      {/* Enable Module Button */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
        <button className="pill-btn dark" onClick={() => setShowEnableModal(true)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Enable Service Module</span>
        </button>
      </div>
 
      {/* ── Other Services ── */}
      <h2 style={{
        fontFamily: "Poppins, sans-serif",
        fontWeight: 900,
        fontSize: "clamp(20px, 4vw, 32px)",
        margin: "0 0 16px 0",
        background: "linear-gradient(to right, #032932, #5fc6a0)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline-block",
        lineHeight: 1.2,
      }}>
        Other Services Offered
      </h2>
 
      <div className="services-grid" style={{ marginBottom: 20 }}>
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {leftCol.map((s) => (
            <OtherServiceRow
              key={s.id}
              service={s}
              onEdit={(id) => setEditService(otherServices.find((x) => x.id === id))}
              onDelete={(id) => setDeleteService(otherServices.find((x) => x.id === id))}
            />
          ))}
        </div>
        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {rightCol.map((s) => (
            <OtherServiceRow
              key={s.id}
              service={s}
              onEdit={(id) => setEditService(otherServices.find((x) => x.id === id))}
              onDelete={(id) => setDeleteService(otherServices.find((x) => x.id === id))}
            />
          ))}
        </div>
      </div>
 
      {/* Add Service Button */}
      <div style={{ display: "flex", justifyContent: "center", paddingBottom: 32 }}>
        <button className="pill-btn dark" onClick={() => setShowAddModal(true)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Add Service</span>
        </button>
      </div>
 
      {/* ── Modals ── */}
      {showEnableModal && (
        <EnableModuleModal
          enabledTypes={modules.map((m) => m.type)}
          onEnable={handleEnableModule}
          onClose={() => setShowEnableModal(false)}
        />
      )}
      {showAddModal && (
        <ServiceFormModal
          title="Add Service"
          onSave={handleAddService}
          onClose={() => setShowAddModal(false)}
        />
      )}
      {editService && (
        <ServiceFormModal
          title="Edit Service"
          initial={editService.name}
          onSave={handleEditSave}
          onClose={() => setEditService(null)}
        />
      )}
      {deleteService && (
        <DeleteModal
          serviceName={deleteService.name}
          onConfirm={handleDeleteConfirm}
          onClose={() => setDeleteService(null)}
        />
      )}
    </div>
  );
}