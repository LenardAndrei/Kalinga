import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockAnnouncements } from "../../pages/HealthcareProvider/Announcements";

function formatTimestamp(dateStr) {
  if (!dateStr) return "";
  if (dateStr.includes("T")) {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now - date) / 86400000);
    const timeStr = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    if (diffDays === 0) return `Today, ${timeStr}`;
    if (diffDays === 1) return `Yesterday, ${timeStr}`;
    return `${date.toLocaleDateString()}, ${timeStr}`;
  }
  return dateStr;
}

function getInitials(facilityName = "") {
  return facilityName
    .split(" ")
    .filter((w) => w.length > 2)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "HC";
}

export default function RecentAnnouncement({
  announcements = mockAnnouncements,
  isLoading = false,
}) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState({});

  const latest = announcements[0] ?? null;

  const PREVIEW_CHARS = 180;
  const bodyPreview = latest
    ? latest.body.length > PREVIEW_CHARS
      ? latest.body.slice(0, PREVIEW_CHARS).trimEnd() + "…"
      : latest.body
    : "";
  const isTruncated = latest ? latest.body.length > PREVIEW_CHARS : false;

  const reactions = latest
    ? liked[latest.id]
      ? latest.reactions + 1
      : latest.reactions
    : 0;

  return (
    <div style={styles.card}>
      <style>{`
        .ann-manage-btn:hover { background: #3d8a7a !important; transform: translateY(-1px) !important; }
        .ann-manage-btn:active { transform: translateY(0) !important; }
        .ann-react-btn:hover { background: #fde8ef !important; }
        .ann-view-more:hover { color: #3d8a7a !important; text-decoration: underline; }
      `}</style>

      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>Recent Announcement</h2>
        {!isLoading && announcements.length > 0 && (
          <span style={styles.countBadge}>{announcements.length}</span>
        )}
      </div>

      {/* Loading / empty */}
      {isLoading && (
        <div style={styles.stateBox}>
          <span style={styles.stateText}>Loading…</span>
        </div>
      )}
      {!isLoading && !latest && (
        <div style={styles.stateBox}>
          <span style={styles.stateText}>No announcements yet.</span>
        </div>
      )}

      {/* Announcement card */}
      {!isLoading && latest && (
        <div style={styles.annCard}>

          {/* Author row */}
          <div style={styles.authorRow}>
            {/* Avatar */}
            <div style={styles.avatar}>
              {getInitials(latest.facility)}
            </div>

            {/* Name + location */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={styles.facilityName}>{latest.facility}</p>
              <p style={styles.facilityLocation}>{latest.location}</p>
            </div>

            {/* Timestamp */}
            <span style={styles.timestamp}>{formatTimestamp(latest.date)}</span>
          </div>

          {/* Divider */}
          <div style={styles.innerDivider} />

          {/* Title */}
          <p style={styles.annTitle}>{latest.title}</p>

          {/* Body */}
          <p style={styles.annBody}>{bodyPreview}</p>

          {isTruncated && (
            <button
              className="ann-view-more"
              onClick={() => navigate("/healthcare-provider/announcements")}
              style={styles.viewMore}
            >
              View entire post
            </button>
          )}

          {/* Divider */}
          <div style={{ ...styles.innerDivider, marginTop: 10 }} />

          {/* Footer */}
          <div style={styles.footer}>
            <div style={styles.footerMeta}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="#a8c5bc" strokeWidth="2" strokeLinecap="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <span style={styles.metaText}>{latest.views.toLocaleString()} views</span>
            </div>

            <button
              className="ann-react-btn"
              onClick={() => setLiked((p) => ({ ...p, [latest.id]: !p[latest.id] }))}
              style={styles.reactBtn}
            >
              <svg width="14" height="14" viewBox="0 0 24 24"
                fill={liked[latest.id] ? "#e05a7a" : "none"}
                stroke={liked[latest.id] ? "#e05a7a" : "#a8c5bc"}
                strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span style={{ color: liked[latest.id] ? "#e05a7a" : "#8fa8a0" }}>
                {reactions} reaction{reactions !== 1 ? "s" : ""}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Other announcements count hint */}
      {!isLoading && announcements.length > 1 && (
        <p style={styles.moreLabel}>
          +{announcements.length - 1} more announcement{announcements.length - 1 !== 1 ? "s" : ""}
        </p>
      )}

      {/* CTA */}
      <div style={styles.buttonWrapper}>
        <button
          className="ann-manage-btn"
          style={styles.manageButton}
          onClick={() => navigate("/healthcare-provider/announcements")}
        >
          Manage Announcements
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
    // Removed fixed height — let content dictate height naturally
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
 
  annCard: {
    background: "#f0f5f4",
    borderRadius: 14,
    padding: "14px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
 
  authorRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
 
  avatar: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: TEAL_DARK,
    color: "#fff",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: 13,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
 
  facilityName: {
    fontSize: 14,
    fontWeight: 700,
    color: TEXT_DARK,
    lineHeight: 1.3,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    margin: 0,
  },
 
  facilityLocation: {
    fontSize: 11,
    fontWeight: 400,
    fontStyle: "italic",
    color: "#7a9e97",
    lineHeight: 1.3,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    margin: 0,
  },
 
  timestamp: {
    fontSize: 11,
    fontWeight: 500,
    color: "#a8c5bc",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
 
  innerDivider: {
    height: "1px",
    background: "#d4e6e1",
    borderRadius: 1,
    margin: "2px 0",
  },
 
  annTitle: {
    fontSize: 13,
    fontWeight: 800,
    color: TEXT_DARK,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    lineHeight: 1.3,
    margin: 0,
  },
 
  annBody: {
    fontSize: 13,
    fontWeight: 400,
    color: "#3d5c56",
    lineHeight: 1.7,
    whiteSpace: "pre-line",
    margin: 0,
  },
 
  viewMore: {
    background: "none",
    border: "none",
    padding: 0,
    fontFamily: "'Poppins', sans-serif",
    fontSize: 12,
    fontWeight: 600,
    color: TEAL,
    cursor: "pointer",
    textAlign: "left",
    transition: "color 0.15s",
  },
 
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 8,
  },
 
  footerMeta: {
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
 
  metaText: {
    fontSize: 12,
    fontWeight: 500,
    color: "#a8c5bc",
    fontFamily: "'Poppins', sans-serif",
  },
 
  reactBtn: {
    background: "none",
    border: "none",
    padding: "4px 8px",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    gap: 5,
    cursor: "pointer",
    fontFamily: "'Poppins', sans-serif",
    fontSize: 12,
    fontWeight: 500,
    transition: "background 0.15s",
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
    maxWidth: 350,
  },
};

 