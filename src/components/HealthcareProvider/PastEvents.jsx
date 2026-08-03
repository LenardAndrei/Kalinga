import { useState } from "react";
import { defaultUpcomingEvents } from "./UpcomingEventsView";

const MONTH_ABBR_TO_INDEX = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function getEventDate(event) {
  return new Date(
    parseInt(event.year, 10),
    MONTH_ABBR_TO_INDEX[event.month],
    parseInt(event.date, 10)
  );
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const pastEvents = defaultUpcomingEvents
  .filter((e) => getEventDate(e) < today)
  .sort((a, b) => getEventDate(b) - getEventDate(a))
  .slice(0, 2);

// Overlay 

const EventOverlay = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "90vw",
          maxWidth: 1052,
          borderRadius: "clamp(16px, 3vw, 35px)",
          backgroundColor: "#ffffff",
          border: "1.5px solid #848383",
          padding: "clamp(24px, 4vw, 48px) clamp(20px, 5vw, 60px)",
          boxSizing: "border-box",
          position: "relative",
          fontFamily: "'Poppins', sans-serif",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 20,
            background: "none",
            border: "none",
            fontSize: "clamp(20px, 4vw, 28px)",
            fontWeight: 700,
            color: "#032932",
            cursor: "pointer",
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(22px, 5vw, 48px)",
            margin: "0 0 8px 0",
            textAlign: "center",
            background: "linear-gradient(to right, #032932, #5fc6a0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.2,
          }}
        >
          {event.title}
        </h1>

        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(14px, 3vw, 32px)",
            color: "#82ACAB",
            textAlign: "center",
            margin: "0 0 clamp(16px, 3vw, 32px) 0",
            lineHeight: 1.3,
          }}
        >
          {event.month} {event.date}, {event.year}, {event.time} |{" "}
          <em>{event.location}</em>
        </p>

        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(13px, 2.5vw, 24px)",
            color: "#032932",
            textAlign: "center",
            margin: "0 0 clamp(24px, 4vw, 48px) 0",
            lineHeight: 1.6,
            whiteSpace: "pre-line",
          }}
        >
          {event.description}
        </p>
      </div>
    </div>
  );
};

// Event Card 

const EventCard = ({ event, onClick }) => (
  <button
    onClick={() => onClick(event)}
    style={{
      all: "unset",
      cursor: "pointer",
      width: "100%",
      minHeight: "clamp(80px, 12vw, 109px)",
      borderRadius: "clamp(16px, 4vw, 35px)",
      backgroundColor: "#DADADA",
      padding: "14px 22px 14px clamp(90px, 18vw, 120px)",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 2,
      boxSizing: "border-box",
      transition: "filter 0.15s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(0.95)")}
    onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
  >
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "clamp(80px, 16vw, 112px)",
        borderRadius: "clamp(16px, 4vw, 35px)",
        backgroundColor: "#5A8A89",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 1,
      }}
    >
      <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 900, fontSize: "clamp(28px, 6vw, 48px)", color: "#fff" }}>
        {event.date}
      </span>
      <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(14px, 3vw, 24px)", color: "#fff" }}>
        {event.month}
      </span>
      <span style={{ fontFamily: "'Poppins', sans-serif", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(10px, 2vw, 16px)", color: "#fff" }}>
        {event.day}
      </span>
    </div>

    <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(12px, 2.5vw, 16px)", color: "#032932" }}>
      {event.title}
    </span>
    <span style={{ fontFamily: "'Poppins', sans-serif", fontStyle: "italic", fontSize: "clamp(10px, 2vw, 12px)", color: "#032932" }}>
      {event.location}
    </span>
    <span
      style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: "clamp(10px, 2vw, 12px)",
        color: "#032932",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}
    >
      {event.description}
    </span>
  </button>
);

// Main Component

export default function PastEventsView() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Poppins', sans-serif",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "clamp(16px, 4vw, 35px)",
          backgroundColor: "#ffffff",
          border: "1.5px solid #848383",
          padding: "clamp(16px, 3vw, 28px) clamp(12px, 3vw, 24px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(8px, 2vw, 14px)",
          boxSizing: "border-box",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(20px, 5vw, 36px)",
            color: "#82ACAB",
            margin: 0,
            paddingBottom: 6,
            lineHeight: 1.1,
          }}
        >
          Past Events
        </h1>

        {pastEvents.length > 0 ? (
          pastEvents.map((event, i) => (
            <EventCard key={i} event={event} onClick={setSelectedEvent} />
          ))
        ) : (
          <p style={{ fontFamily: "'Poppins', sans-serif", color: "#848383", fontSize: 16 }}>
            No past events yet.
          </p>
        )}
      </div>

      </div>
      <EventOverlay event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </>
  );
}