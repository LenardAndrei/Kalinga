import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../../components/HealthcareProvider/EventCalendar";
import UpcomingEventsView, { upcomingEvents, EventOverlay } from "../../components/HealthcareProvider/UpcomingEventsView";
import PastEventsView from "../../components/HealthcareProvider/PastEvents";

const monthMap = {
  Jan: "01", Feb: "02", Mar: "03", Apr: "04",
  May: "05", Jun: "06", Jul: "07", Aug: "08",
  Sep: "09", Oct: "10", Nov: "11", Dec: "12",
};

export default function EventCalendarPage() {
  const [date] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const eventDates = upcomingEvents.map(
    (e) => `${e.year}-${monthMap[e.month]}-${String(e.date).padStart(2, "0")}`
  );

  return (
    <>
      <h1 style={{
        fontFamily: "Poppins, sans-serif",
        fontWeight: 900,
        fontSize: "48px",
        marginBottom: 20,
        background: "linear-gradient(to right, #032932, #5fc6a0)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline-block",
      }}>
        Event Calendar
      </h1>

      <div style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: "24px",
        width: "fit-content",
        boxSizing: "border-box",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "stretch" }}>
          <Calendar date={date} onEventClick={setSelectedEvent} />
          <PastEventsView />
        </div>

        <UpcomingEventsView onEventClick={setSelectedEvent} />
      </div>

      <EventOverlay event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </>
  );
}