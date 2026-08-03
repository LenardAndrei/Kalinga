import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { defaultUpcomingEvents } from "../../components/HealthcareProvider/UpcomingEventsView";

// API CONFIG
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://your-api.example.com";

async function fetchUpcomingEvents() {
  const response = await fetch(`${API_BASE_URL}/api/events/upcoming`);
  if (!response.ok) throw new Error(`Failed to fetch events: ${response.status}`);
  return response.json();
}

// Sub-components

function EventRow({ event, index }) {
  return (
    <div
      style={{
        ...styles.eventRow,
        animationDelay: `${index * 60}ms`,
      }}
    >
      {/* Date block */}
      <div style={styles.dateBubble}>
        <span style={styles.dateNumber}>{event.date}</span>
        <span style={styles.dateMonth}>{event.month}</span>
      </div>

      {/* Info */}
      <div style={styles.eventInfo}>
        <span style={styles.eventTitle}>{event.title}</span>
        <div style={styles.eventMeta}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ flexShrink: 0, opacity: 0.6 }}>
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <span>{event.time}</span>
          <span style={styles.metaDot}>·</span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ flexShrink: 0, opacity: 0.6 }}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          <span style={styles.metaLocation}>{event.location}</span>
        </div>
      </div>
    </div>
  );
}

// Main Component

export default function UpcomingEventsCard({ onViewCalendar, useMock = true }) {
  const navigate = useNavigate();
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);
  
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const result = useMock ? defaultUpcomingEvents : await fetchUpcomingEvents();
        if (!cancelled) setEvents(result);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [useMock]);

  const preview = events ? events.slice(0, 3) : [];
  const total   = events ? events.length : 0;

  return (
    <div style={styles.card}>
      <style>{`
        @keyframes evRowIn {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .ev-row-anim { animation: evRowIn 0.3s ease both; }
        .ev-view-btn:hover { background: #3d8a7a !important; transform: translateY(-1px); }
        .ev-view-btn:active { transform: translateY(0) !important; }
      `}</style>

      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>Upcoming Events</h2>
        {!loading && !error && (
          <span style={styles.countBadge}>{total}</span>
        )}
      </div>

      {/* Spacer row */}
      <div style={styles.summaryRow}>
        <div style={styles.statBox}>
          <span style={styles.statLabel}>Total Events</span>
          <span style={styles.statValue}>{loading ? "—" : total}</span>
        </div>
        <div style={styles.statDivider} />
        <div style={styles.statBox}>
          <span style={styles.statLabel}>This Month</span>
          <span style={styles.statValue}>
            {loading ? "—" : preview.filter(e => e.month === preview[0]?.month).length}
          </span>
        </div>
      </div>

      {/* States */}
      {loading && (
        <div style={styles.stateBox}>
          <span style={styles.stateText}>Loading events…</span>
        </div>
      )}
      {error && (
        <div style={{ ...styles.stateBox, background: "#fdecea" }}>
          <span style={{ ...styles.stateText, color: "#c0392b" }}>⚠ {error}</span>
        </div>
      )}

      {/* Event rows */}
      {!loading && !error && events && (
        <div style={styles.listWrap}>
          {preview.map((event, i) => (
            <div key={i} className="ev-row-anim" style={{ animationDelay: `${i * 60}ms` }}>
              <EventRow event={event} index={i} />
            </div>
          ))}
          {total > 3 && (
            <p style={styles.moreLabel}>+{total - 3} more event{total - 3 !== 1 ? "s" : ""}</p>
          )}
        </div>
      )}

      {/* CTA */}
      <div style={styles.buttonWrapper}>
        <button
          className="ev-view-btn"
          style={styles.calendarButton}
          onClick={onViewCalendar ?? (() => navigate("/healthcare-provider/events"))}
        >
          View Calendar
        </button>
      </div>
    </div>
  );
}

// Styles

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
    gap: 10,
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
    borderRadius: 12,
    border: "1px solid #d4e6e1",
    padding: "10px 8px",
  },

  statBox: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  },

  statDivider: {
    width: "1px",
    height: 28,
    background: "#d4e6e1",
    flexShrink: 0,
  },

  statLabel: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 10,
    fontWeight: 600,
    color: "#7a9e97",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
  },

  statValue: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 20,
    fontWeight: 800,
    color: TEXT_DARK,
    lineHeight: 1,
  },

  listWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },

  eventRow: {
    backgroundColor: "#f0f5f4",
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    minHeight: 64,
  },

  dateBubble: {
    backgroundColor: TEAL_DARK,
    minWidth: 60,
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 10px",
    flexShrink: 0,
    gap: 1,
  },

  dateNumber: {
    fontSize: 26,
    fontWeight: 900,
    color: "#fff",
    lineHeight: 1,
  },

  dateMonth: {
    fontSize: 11,
    fontWeight: 700,
    color: TEAL,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    lineHeight: 1,
  },

  eventInfo: {
    paddingLeft: 14,
    paddingRight: 12,
    display: "flex",
    flexDirection: "column",
    gap: 3,
    flex: 1,
    minWidth: 0,
  },

  eventTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: TEXT_DARK,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  eventMeta: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 11,
    fontWeight: 500,
    color: "#5a7a74",
  },

  metaDot: {
    opacity: 0.4,
    fontSize: 13,
  },

  metaLocation: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  stateBox: {
    flex: 1,
    minHeight: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#f0f5f4",
  },

  stateText: {
    fontSize: 13,
    color: TEXT_DARK,
    opacity: 0.6,
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

  calendarButton: {
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