import { useState } from "react";

const mockAnnouncements = [
  {
    id: 1,
    facility: "San Isidro Health Center",
    location: "Brgy. San Isidro, Mauban, Quezon",
    date: "Yesterday, 10:00 AM",
    title: "COMMUNITY HEALTHCARE ANNOUNCEMENT",
    body: `Good day!\nWe are pleased to inform everyone that our community healthcare services are available to support your well-being. Free health consultations, basic check-ups, and medical assistance will be provided to ensure that everyone has access to proper care.`,
    views: 356,
    reactions: 50,
    liked: false,
  },
  {
    id: 2,
    facility: "San Isidro Health Center",
    location: "Brgy. San Isidro, Mauban, Quezon",
    date: "April 1, 2026",
    title: "VACCINATION DRIVE ANNOUNCEMENT",
    body: `Exciting news!\nWe are launching a series of vaccination drives to ensure our community remains safe and healthy. Come get your vaccines at the designated locations and times. Protect yourself and your loved ones!`,
    views: 214,
    reactions: 38,
    liked: false,
  },
];

const AvatarIcon = () => (
  <div style={{
    width: 44, height: 44, borderRadius: "50%",
    background: "#d1ddd9", display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" fill="#8fa8a0" />
      <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" fill="#8fa8a0" />
    </svg>
  </div>
);

const HeartIcon = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24"
    fill={filled ? "#e05a7a" : "none"}
    stroke={filled ? "#e05a7a" : "#8fa8a0"}
    strokeWidth="2"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export default function Announcements() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [expandedIds, setExpandedIds] = useState([]);
  const [posting, setPosting] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  const handlePost = async () => {
    if (!title.trim() || !body.trim()) return;
    setPosting(true);
    // TODO: await api.post("/announcements", { title, body });
    await new Promise((r) => setTimeout(r, 800));
    setAnnouncements((prev) => [
      {
        id: Date.now(),
        facility: "San Isidro Health Center",
        location: "Brgy. San Isidro, Mauban, Quezon",
        date: "Just now",
        title: title.toUpperCase(),
        body,
        views: 0,
        reactions: 0,
        liked: false,
      },
      ...prev,
    ]);
    setTitle("");
    setBody("");
    setPosting(false);
    setPostSuccess(true);
    setTimeout(() => setPostSuccess(false), 2500);
  };

  const toggleExpand = (id) =>
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const toggleLike = (id) => {
    // TODO: await api.post(`/announcements/${id}/react`);
    setAnnouncements((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, liked: !a.liked, reactions: a.liked ? a.reactions - 1 : a.reactions + 1 }
          : a
      )
    );
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", width: "100%", boxSizing: "border-box" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .ann-input {
          transition: border-color 0.2s, box-shadow 0.2s;
          font-family: 'Poppins', sans-serif;
          width: 100%;
        }
        .ann-input:focus {
          border-color: #5fc6a0 !important;
          box-shadow: 0 0 0 3px rgba(95,198,160,0.18) !important;
          outline: none;
        }

        .post-btn {
          background: linear-gradient(to right, #032932, #5fc6a0);
          color: #fff;
          border: none;
          border-radius: 24px;
          padding: 11px 22px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
          position: relative;
          overflow: hidden;
          transition: transform 0.15s, box-shadow 0.15s, opacity 0.2s;
        }
        .post-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, #5fc6a0, #032932);
          opacity: 0;
          transition: opacity 0.35s;
        }
        .post-btn > * { position: relative; z-index: 1; }
        .post-btn:hover:not(:disabled)::after { opacity: 1; }
        .post-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(3,41,50,0.28);
        }
        .post-btn:active:not(:disabled) { transform: translateY(0); box-shadow: none; }
        .post-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .icon-btn {
          background: none; border: none; cursor: pointer;
          padding: 8px; border-radius: 8px; color: #7a9e97;
          transition: background 0.15s, color 0.15s;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .icon-btn:hover { background: #e4f6f0; color: #032932; }

        .view-link {
          color: #7a9e97; font-size: 13px; font-weight: 500; cursor: pointer;
          background: none; border: none; padding: 0;
          font-family: 'Poppins', sans-serif;
          transition: color 0.15s;
          display: block; margin-bottom: 12px;
        }
        .view-link:hover { color: #032932; text-decoration: underline; }

        .react-btn {
          background: none; border: none; cursor: pointer;
          padding: 4px 8px; border-radius: 8px;
          display: flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 500;
          transition: background 0.15s, color 0.15s;
          font-family: 'Poppins', sans-serif;
        }
        .react-btn:hover { background: #fde8ef; }

        .ann-card { transition: box-shadow 0.2s; }
        .ann-card:hover { box-shadow: 0 6px 28px rgba(3,41,50,0.10); }

        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .new-card { animation: fadeSlideIn 0.35s ease; }

        .success-banner {
          background: #e4f6f0; border: 1px solid #9de0c7; color: #0a5940;
          border-radius: 10px; padding: 10px 16px; font-size: 13px; font-weight: 500;
          margin-bottom: 14px; animation: fadeSlideIn 0.3s ease;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .field-row {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 14px;
        }
        .field-label {
          font-weight: 600;
          color: #032932;
          font-size: 14px;
          flex-shrink: 0;
          width: 44px;
          padding-top: 10px;
        }
        .toolbar-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }

        @media (max-width: 520px) {
          .field-row { flex-direction: column; gap: 5px; }
          .field-label { width: auto; padding-top: 0; }
          .create-card { padding: 16px !important; }
          .ann-card-inner { padding: 16px !important; }
          .toolbar-row { justify-content: flex-end; }
        }
      `}</style>

      {/* Page Title */}
      <h1 style={{
        fontFamily: "Poppins, sans-serif",
        fontWeight: 900,
        fontSize: "clamp(26px, 5vw, 48px)",
        marginBottom: 20,
        marginTop: 0,
        background: "linear-gradient(to right, #032932, #5fc6a0)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline-block",
        lineHeight: 1.15,
      }}>
        Announcements
      </h1>

      {/* Create Card */}
      <div
        className="create-card"
        style={{
          background: "#fff",
          borderRadius: 18,
          padding: "24px 28px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          marginBottom: 28,
          width: "100%",
        }}
      >
        <h2 style={{
          fontSize: "clamp(15px, 3vw, 20px)",
          fontWeight: 700,
          color: "#032932",
          margin: "0 0 18px 0",
        }}>
          Create Announcement
        </h2>

        {postSuccess && <div className="success-banner">✓ Announcement posted successfully!</div>}

        {/* Title */}
        <div className="field-row">
          <label className="field-label" style={{ paddingTop: 10 }}>Title</label>
          <input
            className="ann-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title"
            style={{
              flex: 1,
              border: "1.5px solid #ddeee9",
              borderRadius: 12,
              padding: "10px 14px",
              fontSize: 14,
              color: "#032932",
              background: "#f6fbf9",
            }}
          />
        </div>

        {/* Body */}
        <div className="field-row" style={{ marginBottom: 18 }}>
          <label className="field-label">Body</label>
          <textarea
            className="ann-input"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter announcement"
            rows={5}
            style={{
              flex: 1,
              border: "1.5px solid #ddeee9",
              borderRadius: 12,
              padding: "10px 14px",
              fontSize: 14,
              color: "#032932",
              background: "#f6fbf9",
              resize: "vertical",
              lineHeight: 1.65,
            }}
          />
        </div>

        {/* Toolbar */}
        <div className="toolbar-row">
          <div style={{ display: "flex", gap: 2 }}>
            {[
              <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>,
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />,
              <><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></>,
              <><circle cx="12" cy="12" r="10" /><path d="M8 13s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" strokeLinecap="round" strokeWidth="3" /><line x1="15" y1="9" x2="15.01" y2="9" strokeLinecap="round" strokeWidth="3" /></>,
            ].map((paths, i) => (
              <button key={i} className="icon-btn">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {paths}
                </svg>
              </button>
            ))}
          </div>

          <button
            className="post-btn"
            onClick={handlePost}
            disabled={posting || !title.trim() || !body.trim()}
          >
            {posting ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  style={{ animation: "spin 0.8s linear infinite" }}>
                  <circle cx="12" cy="12" r="10" strokeDasharray="31.4" strokeDashoffset="10" />
                </svg>
                Posting…
              </>
            ) : "Post Announcement"}
          </button>
        </div>
      </div>

      {/* Previous Announcements */}
      <h2 style={{
        fontSize: "clamp(15px, 3vw, 20px)",
        fontWeight: 700,
        color: "#032932",
        margin: "0 0 14px 0",
      }}>
        Previous Announcements
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingBottom: 28 }}>
        {announcements.map((ann, idx) => (
          <div
            key={ann.id}
            className={`ann-card${idx === 0 && ann.date === "Just now" ? " new-card" : ""}`}
            style={{
              background: "#fff",
              borderRadius: 18,
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              width: "100%",
              overflow: "hidden",
            }}
          >
            <div
              className="ann-card-inner"
              style={{ padding: "20px 24px" }}
            >
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <AvatarIcon />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, color: "#032932", fontSize: 14 }}>{ann.facility}</span>
                    <span style={{ color: "#9ab5af", fontSize: 12 }}>{ann.date}</span>
                  </div>
                  <div style={{ color: "#8fa8a0", fontSize: 12 }}>{ann.location}</div>
                </div>
              </div>

              {/* Title */}
              <h3 style={{
                fontWeight: 800, color: "#032932",
                fontSize: "clamp(13px, 2vw, 15px)",
                margin: "0 0 8px 0",
              }}>
                {ann.title}
              </h3>

              {/* Body */}
              <div style={{
                color: "#3d5c56",
                fontSize: "clamp(13px, 2vw, 14px)",
                lineHeight: 1.7,
                marginBottom: 10,
                whiteSpace: "pre-line",
              }}>
                {expandedIds.includes(ann.id)
                  ? ann.body
                  : ann.body.length > 200
                  ? ann.body.slice(0, 200) + "…"
                  : ann.body}
              </div>

              {ann.body.length > 200 && (
                <button className="view-link" onClick={() => toggleExpand(ann.id)}>
                  {expandedIds.includes(ann.id) ? "Show less" : "View entire post"}
                </button>
              )}

              {/* Divider */}
              <div style={{ borderTop: "1px solid #edf2f1", margin: "8px 0 10px" }} />

              {/* Footer */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <span style={{ color: "#9ab5af", fontSize: 13, fontWeight: 500 }}>
                  {ann.views.toLocaleString()} views
                </span>
                <button className="react-btn" onClick={() => toggleLike(ann.id)}>
                  <HeartIcon filled={ann.liked} />
                  <span style={{ color: ann.liked ? "#e05a7a" : "#8fa8a0" }}>
                    {ann.reactions} reaction{ann.reactions !== 1 ? "s" : ""}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}