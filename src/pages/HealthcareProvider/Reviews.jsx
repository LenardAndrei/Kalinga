import { useState } from "react";

// ── Mock Data (replace with API fetch) ─────────────────────────────────────
const mockReviews = [
  {
    id: 1,
    name: "Maria Santos",
    username: "@mariasantos",
    rating: 4,
    date: "Yesterday, 10:00 AM",
    service: "Consultation",
    body: `"The doctor was very kind and explained everything clearly. The process was smooth and fast. Highly recommended!"`,
    reply: `"Thank you, Maria! We're glad to hear that you had a smooth and positive experience. We'll continue to provide quality care for all our patients."`,
  },
  {
    id: 2,
    name: "John Doe",
    username: "@johndoe",
    rating: 2,
    date: "Today, 1:15 PM",
    service: "Dental",
    body: `"The dentist was good, but I had to wait almost an hour before my appointment."`,
    reply: "",
  },
  {
    id: 3,
    name: "Emily Clark",
    username: "@emilyclark",
    rating: 4,
    date: "Today, 2:30 PM",
    service: "Cosmetic Treatment",
    body: `"The treatment I received was excellent! The team made me feel comfortable and supported throughout the process. Highly satisfied with the results!"`,
    reply: "",
  },
];

// Summary stats — replace with API data
const ratingBreakdown = { 5: 60, 4: 20, 3: 10, 2: 10, 1: 0 };
const totalReviews = 32;
const averageRating = 4.5;

// Donut segment colors
const DONUT_COLORS = {
  5: "#4a9fd5",
  4: "#e8734a",
  3: "#c9e06e",
  2: "#6dc47c",
  1: "#d1ddd9",
};

// ── Helpers ────────────────────────────────────────────────────────────────
const AvatarIcon = ({ size = 44 }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    background: "#d1ddd9", display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  }}>
    <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" fill="#8fa8a0" />
      <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" fill="#8fa8a0" />
    </svg>
  </div>
);

const StarRow = ({ rating, max = 5, size = 18 }) =>
  Array.from({ length: max }, (_, i) => (
    <svg key={i} width={size} height={size} viewBox="0 0 24 24"
      fill={i < rating ? "#f5c518" : "#dde3e1"}>
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  ));

const DonutChart = ({ breakdown }) => {
  const cx = 60, cy = 60, r = 50, innerR = 32;
  let offset = -90; // start from top

  const segments = [5, 4, 3, 2, 1]
    .filter((s) => breakdown[s] > 0)
    .map((star) => {
      const pct = breakdown[star] / 100;
      const sweep = pct * 360;
      const gapDeg = 2;
      const effectiveSweep = sweep - gapDeg;
      const startRad = (offset * Math.PI) / 180;
      const endRad = ((offset + effectiveSweep) * Math.PI) / 180;

      const x1 = cx + r * Math.cos(startRad);
      const y1 = cy + r * Math.sin(startRad);
      const x2 = cx + r * Math.cos(endRad);
      const y2 = cy + r * Math.sin(endRad);
      const xi1 = cx + innerR * Math.cos(endRad);
      const yi1 = cy + innerR * Math.sin(endRad);
      const xi2 = cx + innerR * Math.cos(startRad);
      const yi2 = cy + innerR * Math.sin(startRad);
      const largeArc = effectiveSweep > 180 ? 1 : 0;

      const d = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} L ${xi1} ${yi1} A ${innerR} ${innerR} 0 ${largeArc} 0 ${xi2} ${yi2} Z`;
      offset += sweep;
      return <path key={star} d={d} fill={DONUT_COLORS[star]} />;
    });

  return (
    <svg width="120" height="120" viewBox="0 0 120 120" style={{ flexShrink: 0 }}>
      {segments}
    </svg>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────
export default function Reviews() {
  const [reviews, setReviews] = useState(mockReviews);
  const [replyDrafts, setReplyDrafts] = useState({});
  const [sendingId, setSendingId] = useState(null);

  // TODO: Replace with useEffect API fetch
  // useEffect(() => {
  //   api.get("/reviews").then(data => setReviews(data));
  // }, []);

  const handleReplyChange = (id, val) =>
    setReplyDrafts((prev) => ({ ...prev, [id]: val }));

  const handleReply = async (id) => {
    const text = (replyDrafts[id] || "").trim();
    if (!text) return;
    setSendingId(id);
    // TODO: await api.post(`/reviews/${id}/reply`, { text });
    await new Promise((r) => setTimeout(r, 700)); // remove when using real API
    setReviews((prev) =>
      prev.map((rv) => (rv.id === id ? { ...rv, reply: `"${text}"` } : rv))
    );
    setReplyDrafts((prev) => ({ ...prev, [id]: "" }));
    setSendingId(null);
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", width: "100%", boxSizing: "border-box" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .reply-input {
          font-family: 'Poppins', sans-serif;
          transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%;
        }
        .reply-input:focus {
          border-color: #5fc6a0 !important;
          box-shadow: 0 0 0 3px rgba(95,198,160,0.18) !important;
          outline: none;
        }

        .reply-btn {
          background: linear-gradient(to right, #032932, #5fc6a0);
          color: #fff;
          border: none;
          border-radius: 20px;
          padding: 10px 22px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
          white-space: nowrap;
          position: relative;
          overflow: hidden;
          transition: transform 0.15s, box-shadow 0.15s, opacity 0.2s;
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .reply-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, #5fc6a0, #032932);
          opacity: 0;
          transition: opacity 0.35s;
        }
        .reply-btn > * { position: relative; z-index: 1; }
        .reply-btn:hover:not(:disabled)::after { opacity: 1; }
        .reply-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(3,41,50,0.28);
        }
        .reply-btn:active:not(:disabled) { transform: translateY(0); box-shadow: none; }
        .reply-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .review-card { transition: box-shadow 0.2s; }
        .review-card:hover { box-shadow: 0 6px 28px rgba(3,41,50,0.10); }

        .summary-card { transition: box-shadow 0.2s; }
        .summary-card:hover { box-shadow: 0 6px 28px rgba(3,41,50,0.10); }

        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .bar-track {
          flex: 1;
          height: 7px;
          background: #e4f0ed;
          border-radius: 99px;
          overflow: hidden;
        }
        .bar-fill {
          height: 100%;
          background: linear-gradient(to right, #3a8c7e, #5fc6a0);
          border-radius: 99px;
          transition: width 0.6s ease;
        }

        @media (max-width: 640px) {
          .summary-row { flex-direction: column !important; gap: 14px !important; }
          .review-header { flex-direction: column !important; gap: 10px !important; }
          .review-meta { padding-left: 0 !important; }
        }
        @media (max-width: 420px) {
          .reply-row { flex-direction: column !important; }
          .reply-btn { width: 100%; justify-content: center; border-radius: 12px !important; }
        }
      `}</style>

      {/* ── Page Title ── */}
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
        Reviews
      </h1>

      {/* ── Summary Row: two separate cards ── */}
      <div
        className="summary-row"
        style={{ display: "flex", gap: 16, marginBottom: 28, alignItems: "stretch" }}
      >
        {/* Card 1 — Rating score */}
        <div
          className="summary-card"
          style={{
            background: "linear-gradient(135deg, #2a5a51 0%, #032932 100%)",
            borderRadius: 18,
            padding: "28px 32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            minWidth: 200,
            flex: "0 0 auto",
          }}
        >
          <div style={{ color: "rgba(255,255,255,0.85)", fontWeight: 700, fontSize: 16, letterSpacing: 0.3 }}>
            Rating
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{
              color: "#fff", fontWeight: 900,
              fontSize: "clamp(34px, 6vw, 50px)", lineHeight: 1,
            }}>
              {averageRating} / 5
            </span>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="#f5c518">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
          </div>
          <div style={{ color: "rgba(255,255,255,0.65)", fontWeight: 600, fontSize: 14, fontStyle: "italic" }}>
            {totalReviews} Reviews
          </div>
        </div>

        {/* Card 2 — Breakdown */}
        <div
          className="summary-card"
          style={{
            background: "#fff",
            borderRadius: 18,
            padding: "22px 28px",
            flex: 1,
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 17, color: "#032932", marginBottom: 16 }}>
            Rating Breakdown
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            {/* Donut */}
            <DonutChart breakdown={ratingBreakdown} />

            {/* Bar breakdown */}
            <div style={{ flex: 1, minWidth: 140, display: "flex", flexDirection: "column", gap: 8 }}>
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#5a7a74", width: 10, textAlign: "right" }}>
                    {star}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#f5c518">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${ratingBreakdown[star]}%` }} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#5a7a74", width: 32, textAlign: "right" }}>
                    {ratingBreakdown[star]}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Review Cards ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingBottom: 28 }}>
        {reviews.map((rv) => (
          <div
            key={rv.id}
            className="review-card"
            style={{
              background: "#fff",
              borderRadius: 18,
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              overflow: "hidden",
              width: "100%",
            }}
          >
            <div style={{ padding: "22px 26px" }}>

              {/* Header row */}
              <div
                className="review-header"
                style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 14 }}
              >
                {/* Identity */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 160, flexShrink: 0 }}>
                  <AvatarIcon size={44} />
                  <div>
                    <div style={{ fontWeight: 700, color: "#032932", fontSize: 15 }}>{rv.name}</div>
                    <div style={{ color: "#9ab5af", fontSize: 12 }}>{rv.username}</div>
                  </div>
                </div>

                {/* Stars + meta */}
                <div className="review-meta" style={{ flex: 1, paddingLeft: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 3 }}>
                    <div style={{ display: "flex", gap: 2 }}>
                      <StarRow rating={rv.rating} size={18} />
                    </div>
                    <span style={{ color: "#9ab5af", fontSize: 12 }}>{rv.date}</span>
                  </div>
                  <div style={{ color: "#9ab5af", fontSize: 12 }}>Service Used: {rv.service}</div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ borderTop: "1px solid #edf2f1", marginBottom: 14 }} />

              {/* Review body */}
              <p style={{
                color: "#2c4a45",
                fontSize: "clamp(13px, 2vw, 15px)",
                lineHeight: 1.7,
                margin: "0 0 16px 0",
                fontWeight: 500,
              }}>
                {rv.body}
              </p>

              {/* Existing reply */}
              {rv.reply && (
                <div style={{
                  display: "flex", alignItems: "flex-start", gap: 10,
                  background: "#f0f9f6", borderRadius: 12, padding: "12px 14px",
                  marginBottom: 14, border: "1px solid #ddeee9",
                  animation: "fadeSlideIn 0.3s ease",
                }}>
                  <AvatarIcon size={32} />
                  <p style={{ margin: 0, color: "#5a7a74", fontSize: 13, lineHeight: 1.6 }}>
                    <span style={{ fontWeight: 600, color: "#032932" }}>Reply: </span>
                    {rv.reply}
                  </p>
                </div>
              )}

              {/* Reply input */}
              <div
                className="reply-row"
                style={{
                  display: "flex", alignItems: "center",
                  background: "#f6fbf9", borderRadius: 24,
                  border: "1.5px solid #ddeee9", gap: 0,
                  overflow: "hidden",
                }}
              >
                <input
                  className="reply-input"
                  value={replyDrafts[rv.id] || ""}
                  onChange={(e) => handleReplyChange(rv.id, e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleReply(rv.id)}
                  placeholder="Write your reply"
                  style={{
                    flex: 1, border: "none", background: "transparent",
                    padding: "11px 18px", fontSize: 13, color: "#032932",
                  }}
                />
                <button
                  className="reply-btn"
                  onClick={() => handleReply(rv.id)}
                  disabled={sendingId === rv.id || !(replyDrafts[rv.id] || "").trim()}
                  style={{ margin: "4px 4px 4px 0" }}
                >
                  {sendingId === rv.id ? (
                    <>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5"
                        style={{ animation: "spin 0.8s linear infinite" }}>
                        <circle cx="12" cy="12" r="10" strokeDasharray="31.4" strokeDashoffset="10" />
                      </svg>
                      <span>Sending…</span>
                    </>
                  ) : <span>Reply</span>}
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}