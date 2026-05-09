// OtherServiceRow.jsx
// Props:
//   service  – { id, name }
//   onEdit   – (id) => void
//   onDelete – (id) => void

export default function OtherServiceRow({ service, onEdit, onDelete }) {
  return (
    <>
      <style>{`
        .osr-row {
          background: #3a8c7e;
          border-radius: 12px;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          transition: background 0.2s, box-shadow 0.2s;
        }
        .osr-row:hover { background: #2a6b60; box-shadow: 0 4px 14px rgba(3,41,50,0.15); }

        .osr-name {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: clamp(13px, 2vw, 15px);
          color: #fff;
          flex: 1;
        }

        .osr-actions { display: flex; gap: 8px; align-items: center; }

        .osr-icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s, transform 0.15s;
        }
        .osr-icon-btn:hover { transform: scale(1.15); }
        .osr-icon-btn.edit:hover  { background: rgba(255,255,255,0.2); }
        .osr-icon-btn.delete:hover { background: rgba(220,60,60,0.25); }
      `}</style>

      <div className="osr-row">
        <span className="osr-name">{service.name}</span>
        <div className="osr-actions">
          <button className="osr-icon-btn edit" onClick={() => onEdit(service.id)} title="Edit">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
              stroke="rgba(255,255,255,0.85)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button className="osr-icon-btn delete" onClick={() => onDelete(service.id)} title="Delete">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
              stroke="#e05555" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}