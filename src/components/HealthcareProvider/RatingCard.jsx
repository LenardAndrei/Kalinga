import { useNavigate } from "react-router-dom";
import {
  mockReviews,
  ratingBreakdown,
  totalReviews,
  averageRating,
} from "../../pages/HealthcareProvider/Reviews";

function StarRow({ rating, max = 5, size = 14 }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i < rating ? "#f5c518" : "#dde3e1"}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </span>
  );
}

function AvatarCircle({ name = "" }) {
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const palettes = [
    ["#032932", "#e0f0ed"],
    ["#1a4a40", "#d4ebe5"],
    ["#2a6b60", "#cce8e0"],
    ["#5fa89a", "#eaf7f2"],
  ];
  const [fg, bg] = palettes[name.charCodeAt(0) % palettes.length];
  return (
    <div style={{
      width: 36, height: 36, borderRadius: "50%",
      background: bg, color: fg,
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 700, fontSize: 12,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

export default function RatingCard({
  reviews     = mockReviews,
  breakdown   = ratingBreakdown,
  total       = totalReviews,
  average     = averageRating,
  isLoading   = false,
}) {
  const navigate = useNavigate();

  // Show top 2 most recent reviews
  const preview = reviews.slice(0, 2);
  const overflow = reviews.length - preview.length;

  return (
    <div style={styles.card}>
      <style>{`
        .rat-manage-btn:hover { background: #3d8a7a !important; transform: translateY(-1px) !important; }
        .rat-manage-btn:active { transform: translateY(0) !important; }
        @keyframes ratRowIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .rat-row-anim { animation: ratRowIn 0.3s ease both; }
      `}</style>

      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>Ratings & Reviews</h2>
        {!isLoading && (
          <span style={styles.countBadge}>{total}</span>
        )}
      </div>

      {/* Score + breakdown row */}
      {!isLoading && (
        <div style={styles.summaryRow}>

          {/* Left: big score */}
          <div style={styles.scoreBox}>
            <div style={styles.scoreMain}>
              <span style={styles.scoreNumber}>{average.toFixed(1)}</span>
              <span style={styles.scoreDenom}>/5</span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#f5c518" style={{ flexShrink: 0 }}>
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            </div>
            <StarRow rating={Math.round(average)} size={16} />
            <span style={styles.totalLabel}>{total} reviews</span>
          </div>

          {/* Divider */}
          <div style={styles.summaryDivider} />

          {/* Right: bar breakdown */}
          <div style={styles.breakdownBox}>
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} style={styles.barRow}>
                <span style={styles.barStar}>{star}</span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="#f5c518" style={{ flexShrink: 0 }}>
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
                <div style={styles.barTrack}>
                  <div style={{ ...styles.barFill, width: `${breakdown[star] ?? 0}%` }} />
                </div>
                <span style={styles.barPct}>{breakdown[star] ?? 0}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div style={styles.stateBox}>
          <span style={styles.stateText}>Loading…</span>
        </div>
      )}

      {/* Recent reviews */}
      {!isLoading && (
        <div style={styles.reviewsWrap}>
          {preview.map((rv, i) => (
            <div
              key={rv.id}
              className="rat-row-anim"
              style={{ ...styles.reviewRow, animationDelay: `${i * 60}ms` }}
            >
              {/* Left: avatar + name */}
              <div style={styles.reviewLeft}>
                <AvatarCircle name={rv.name} />
                <div style={{ minWidth: 0 }}>
                  <p style={styles.reviewName}>{rv.name}</p>
                  <p style={styles.reviewService}>{rv.service}</p>
                </div>
              </div>

              {/* Right: stars + snippet */}
              <div style={styles.reviewRight}>
                <StarRow rating={rv.rating} size={12} />
                <p style={styles.reviewSnippet}>
                  {rv.body.length > 60 ? rv.body.slice(0, 60).trimEnd() + "…" : rv.body}
                </p>
              </div>
            </div>
          ))}

          {overflow > 0 && (
            <p style={styles.moreLabel}>
              +{overflow} more review{overflow !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      )}

      {/* CTA */}
      <div style={styles.buttonWrapper}>
        <button
          className="rat-manage-btn"
          style={styles.manageButton}
          onClick={() => navigate("/healthcare-provider/reviews")}
        >
          View All Reviews
        </button>
      </div>
    </div>
  );
}

const TEAL      = "#5fa89a";
const TEAL_DARK = "#032932";
const TEXT_DARK = "#032932";

const styles = {
  card: {
    width: "100%",
    maxWidth: 515,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: "20px 24px",
    boxSizing: "border-box",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    fontFamily: "'Poppins', sans-serif",
  },
 
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    flexWrap: "wrap",
  },
 
  title: {
    margin: 0,
    fontSize: "clamp(18px, 4vw, 22px)",
    fontWeight: 900,
    color: TEXT_DARK,
    textAlign: "center",
  },
 
  countBadge: {
    background: TEAL,
    color: "#fff",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 800,
    fontSize: 13,
    borderRadius: 999,
    padding: "2px 10px",
    lineHeight: 1.6,
    flexShrink: 0,
  },
 
  summaryRow: {
    display: "flex",
    alignItems: "center",
    background: "#f0f5f4",
    borderRadius: 14,
    border: "1px solid #d4e6e1",
    padding: "14px 16px",
    gap: 16,
  },
 
  scoreBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    flexShrink: 0,
    minWidth: 80,
  },
 
  scoreMain: {
    display: "flex",
    alignItems: "baseline",
    gap: 3,
  },
 
  scoreNumber: {
    fontSize: "clamp(24px, 6vw, 32px)",
    fontWeight: 900,
    color: TEXT_DARK,
    lineHeight: 1,
  },
 
  scoreDenom: {
    fontSize: 16,
    fontWeight: 700,
    color: "#7a9e97",
    lineHeight: 1,
  },
 
  totalLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: "#a8c5bc",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginTop: 2,
  },
 
  summaryDivider: {
    width: "1px",
    alignSelf: "stretch",
    background: "#d4e6e1",
    flexShrink: 0,
  },
 
  breakdownBox: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 5,
    minWidth: 0,
  },
 
  barRow: {
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
 
  barStar: {
    fontSize: 11,
    fontWeight: 700,
    color: "#5a7a74",
    width: 8,
    textAlign: "right",
    flexShrink: 0,
  },
 
  barTrack: {
    flex: 1,
    height: 6,
    background: "#d4e6e1",
    borderRadius: 999,
    overflow: "hidden",
    minWidth: 0,
  },
 
  barFill: {
    height: "100%",
    background: `linear-gradient(to right, ${TEAL_DARK}, ${TEAL})`,
    borderRadius: 999,
    transition: "width 0.6s ease",
  },
 
  barPct: {
    fontSize: 11,
    fontWeight: 600,
    color: "#7a9e97",
    width: 28,
    textAlign: "right",
    flexShrink: 0,
  },
 
  stateBox: {
    minHeight: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    background: "#f0f5f4",
  },
 
  stateText: {
    fontSize: 13,
    color: TEXT_DARK,
    opacity: 0.5,
    fontWeight: 500,
  },
 
  reviewsWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
 
  reviewRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    background: "#f0f5f4",
    borderRadius: 12,
    padding: "10px 14px",
    overflow: "hidden",
  },
 
  reviewLeft: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
    width: 130,
    minWidth: 0,
  },
 
  reviewName: {
    fontSize: 13,
    fontWeight: 700,
    color: TEXT_DARK,
    lineHeight: 1.3,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    margin: 0,
  },
 
  reviewService: {
    fontSize: 11,
    fontWeight: 500,
    color: "#7a9e97",
    lineHeight: 1.3,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    margin: 0,
  },
 
  reviewRight: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 3,
    minWidth: 0,
  },
 
  reviewSnippet: {
    fontSize: 12,
    fontWeight: 400,
    color: "#3d5c56",
    lineHeight: 1.55,
    margin: 0,
    fontStyle: "italic",
  },
 
  moreLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: "#a8c5bc",
    textAlign: "center",
    margin: 0,
    letterSpacing: "0.03em",
  },
 
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: 2,
  },
 
  manageButton: {
    backgroundColor: TEAL,
    border: "none",
    borderRadius: 50,
    padding: "10px 60px",
    fontSize: 16,
    fontWeight: 700,
    color: "#fff",
    cursor: "pointer",
    fontFamily: "'Poppins', sans-serif",
    transition: "background-color 0.15s ease, transform 0.15s ease",
    width: "100%",
    maxWidth: 300,
  },
};
 