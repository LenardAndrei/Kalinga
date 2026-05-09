// ServiceModuleCard.jsx
// Props:
//   image       – imported image asset (e.g. import Lab from "../assets/Laboratory.png")
//   title       – "Laboratory"
//   count       – 12
//   countLabel  – "Tests Available"
//   description – "Manage tests, fees, turnaround time."
//   onManage    – () => void   (navigate to sub-page)

export default function ServiceModuleCard({ image, title, count, countLabel, description, onManage }) {
  return (
    <>
      <style>{`
        .smc-card {
          background: linear-gradient(170deg, #2a6b60 0%, #032932 100%);
          border-radius: 20px;
          padding: 16px 16px 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 6px;
          flex: 1 1 220px;
          min-width: 200px;
          max-width: 320px;
          box-shadow: 0 4px 18px rgba(3,41,50,0.18);
          transition: transform 0.2s, box-shadow 0.2s;
          position: relative;
          overflow: hidden;
        }
        .smc-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(170deg, #3a8c7e 0%, #032932 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .smc-card:hover { transform: translateY(-4px); box-shadow: 0 10px 32px rgba(3,41,50,0.28); }
        .smc-card:hover::before { opacity: 1; }
        .smc-card > * { position: relative; z-index: 1; }

        .smc-img-wrap {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: 6px;
        }
        .smc-img-wrap img {
          width: 350px;
          height: 250px;
          object-fit: contain;
          filter: drop-shadow(0 4px 12px rgba(0,0,0,0.25));
        }

        .smc-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 800;
          font-size: clamp(30px, 3vw, 26px);
          color: #fff;
          margin: 0;
          line-height: 0.75;
        }
        .smc-subtitle {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 16px;
          color: rgba(255,255,255,0.8);
          font-style: italic;
          margin: 0;
        }
        .smc-desc {
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.65);
          margin: 4px 0 10px;
          line-height: 1.5;
        }

        .smc-btn {
          background: #fff;
          border: none;
          border-radius: 12px;
          padding: 10px 18px;
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 14px;
          color: #032932;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          justify-content: space-between;
          transition: background 0.2s, color 0.2s, transform 0.15s;
        }
        .smc-btn:hover {
          background: #5fc6a0;
          color: #fff;
          transform: scale(1.02);
        }
        .smc-btn svg { transition: transform 0.2s; }
        .smc-btn:hover svg { transform: translateX(4px); }
      `}</style>

      <div className="smc-card">
        <div className="smc-img-wrap">
          <img src={image} alt={title} />
        </div>
        <h3 className="smc-title">{title}</h3>
        <p className="smc-subtitle">{count} {countLabel}</p>
        <p className="smc-desc">{description}</p>
        <button className="smc-btn" onClick={onManage}>
          <span>Manage</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </>
  );
}