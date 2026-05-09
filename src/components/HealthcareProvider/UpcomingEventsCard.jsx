import { useState, useEffect } from "react";

//API CONFIG
// Replace BASE_URL with your actual backend endpoint
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://your-api.example.com";

async function fetchUpcomingEvents() {
  const response = await fetch(`${API_BASE_URL}/api/events/upcoming`);
  if (!response.ok) throw new Error(`Failed to fetch events: ${response.status}`);
  return response.json();
}

//MOCK DATA
const MOCK_DATA = {
  total: 2,
  events: [
    { id: "1", day: 23, title: "Free Vaccination Drive" },
    { id: "2", day: 28, title: "Closed on March 28 due to maintenance and dubai chew cookie" },
  ],
};

//SUB-COMPONENTS 

function SummaryBadge({ total }) {
  return (
    <div style={styles.summaryBadge}>
      <div style={{ ...styles.dateBubble, ...styles.dateBubbleSummary }}>
        <span style={styles.summaryCount}>{total}</span>
      </div>
      <span style={styles.summaryLabel}>Upcoming Events</span>
    </div>
  );
}

function EventRow({ day, title }) {
  return (
    <div style={styles.eventRow}>
      <div style={styles.dateBubble}>
        <span style={styles.dateNumber}>{day}</span>
      </div>
      <span style={styles.eventTitle}>{title}</span>
    </div>
  );
}

function ViewCalendarButton({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={styles.buttonWrapper}>
      <button
        style={{
          ...styles.calendarButton,
          ...(hovered ? styles.calendarButtonHover : {}),
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
      >
        View Calendar
      </button>
    </div>
  );
}

//MAIN COMPONENT 

export default function UpcomingEventsCard({ onViewCalendar, useMock = true }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const result = useMock ? MOCK_DATA : await fetchUpcomingEvents();
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [useMock]);

  const handleViewCalendar = () => {
    if (onViewCalendar) onViewCalendar();
    else console.log("Navigate to calendar");
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Upcoming Events</h2>

      {loading && (
        <div style={styles.stateBox}>
          <span style={styles.stateText}>Loading events…</span>
        </div>
      )}

      {error && (
        <div style={{ ...styles.stateBox, ...styles.errorBox }}>
          <span style={styles.stateText}>⚠ {error}</span>
        </div>
      )}

      {!loading && !error && data && (
        <>
          <SummaryBadge total={data.total} />
          {data.events.map((event) => (
            <EventRow key={event.id} day={event.day} title={event.title} />
          ))}
        </>
      )}

      <ViewCalendarButton onClick={handleViewCalendar} />
    </div>
  );
}

//STYLES

const TEAL = "#5fa89a";
const TEAL_DARK = "#3d8a7a";
const TEXT_DARK = "#032932";
const ROW_BG = "#e8e8e8";

const styles = {
  card: {
    width: 515,
    height: 321,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: "20px 24px",
    boxSizing: "border-box",
    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    fontFamily: "'Poppins', sans-serif",
  },
  title: {
    margin: 0,
    textAlign: "center",
    fontSize: 24,
    fontWeight: 900,
    color: TEXT_DARK,
  },

  // Summary badge
  summaryBadge: {
    backgroundColor: TEAL,
    borderRadius: 25,
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    height: 62,
  },
  summaryCount: {
    fontSize: 36,
    fontWeight: 900,
    color: "#fff",
    lineHeight: 1,
  },
  summaryLabel: {
    fontSize: 20,
    fontWeight: 700,
    textAlign: "center",
    color: "#fff",
    paddingLeft: 16,
  },

  // Individual event rows
  eventRow: {
    backgroundColor: ROW_BG,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    height: 62,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 900,
    color: TEXT_DARK,
    paddingLeft: 16,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  // Shared date bubble (left circle of each row)
  dateBubble: {
    backgroundColor: TEAL,
    borderRadius: 20,
    minWidth: 115,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  dateBubbleSummary: {
    backgroundColor: TEAL_DARK,
    height: 62,
    minWidth: 70,
  },
  dateNumber: {
    fontSize: 40,
    fontWeight: 900,
    color: "#fff",
    lineHeight: 1,
  },

  // View Calendar button
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
    fontSize: 20,
    fontWeight: 700,
    color: "#fff",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "background-color 0.15s ease, transform 0.1s ease",
  },
  calendarButtonHover: {
    backgroundColor: TEAL_DARK,
    transform: "scale(0.98)",
  },

  // Loading / error states
  stateBox: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: ROW_BG,
  },
  errorBox: {
    backgroundColor: "#fdecea",
  },
  stateText: {
    fontSize: 14,
    color: TEXT_DARK,
    opacity: 0.7,
  },
};