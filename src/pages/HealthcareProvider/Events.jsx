import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../../components/HealthcareProvider/EventCalendar";
import UpcomingEventsView, {
  defaultUpcomingEvents,
  getUpcomingEvents,
  EventOverlay,
} from "../../components/HealthcareProvider/UpcomingEventsView";
import PastEventsView from "../../components/HealthcareProvider/PastEvents";

// Date helpers 
const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_NAMES   = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];

const monthMap = {
  Jan: "01", Feb: "02", Mar: "03", Apr: "04",
  May: "05", Jun: "06", Jul: "07", Aug: "08",
  Sep: "09", Oct: "10", Nov: "11", Dec: "12",
};

function formToEvent({ date, time, title, location, description }) {
  const d = new Date(date + "T00:00:00"); 
  return {
    date:        String(d.getDate()),
    month:       MONTH_NAMES[d.getMonth()],
    day:         DAY_NAMES[d.getDay()],
    year:        String(d.getFullYear()),
    time:        formatTime(time),
    title,
    location,
    description: description || "",
  };
}

/** "14:30" → "2:30 pm" */
function formatTime(timeStr) {
  if (!timeStr) return "";
  const [hStr, mStr] = timeStr.split(":");
  let h = parseInt(hStr, 10);
  const m = mStr;
  const ampm = h >= 12 ? "pm" : "am";
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}

// Add Event Overlay 

const EMPTY_FORM = { title: "", date: "", time: "", location: "", description: "" };

function AddEventOverlay({ onClose, onSave }) {
  const [form, setForm]     = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate() {
    const e = {};
    if (!form.title.trim())    e.title    = "Title is required.";
    if (!form.date)            e.date     = "Date is required.";
    if (!form.time)            e.time     = "Time is required.";
    if (!form.location.trim()) e.location = "Location is required.";
    return e;
  }

  function handleSave() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave(form);
    onClose();
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(3,41,50,0.45)", backdropFilter: "blur(3px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 24,
          padding: "32px 32px 28px",
          boxShadow: "0 20px 60px rgba(3,41,50,0.28)",
          width: "100%",
          maxWidth: 480,
          animation: "addEvtIn 0.25s ease",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        <style>{`
          @keyframes addEvtIn {
            from { opacity: 0; transform: translateY(-12px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .add-evt-input {
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            width: 100%;
            border: 1.5px solid #ddeee9;
            border-radius: 12px;
            padding: 11px 14px;
            color: #032932;
            background: #f6fbf9;
            outline: none;
            box-sizing: border-box;
            transition: border-color 0.2s, box-shadow 0.2s;
          }
          .add-evt-input:focus {
            border-color: #5fc6a0;
            box-shadow: 0 0 0 3px rgba(95,198,160,0.18);
          }
          .add-evt-input.err { border-color: #e05555; }
          .add-evt-save:hover  { opacity: 0.88; transform: translateY(-1px); }
          .add-evt-save:active { transform: translateY(0); }
          .add-evt-cancel:hover { background: #ddeee9 !important; }
        `}</style>

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 18, right: 20,
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "Poppins", fontWeight: 700, fontSize: 20,
            color: "#5a7a74", lineHeight: 1, padding: "4px 8px",
            borderRadius: 8,
          }}
        >✕</button>

        {/* Header */}
        <h2 style={{
          fontFamily: "Poppins", fontWeight: 900,
          fontSize: "clamp(20px, 4vw, 26px)",
          background: "linear-gradient(to right, #032932, #5fc6a0)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          display: "inline-block", margin: "0 0 6px", lineHeight: 1.2,
        }}>
          Add Event
        </h2>
        <p style={{ fontFamily: "Poppins", fontSize: 13, color: "#7a9e97", margin: "0 0 24px", fontWeight: 500 }}>
          Fill in the details for the new event.
        </p>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Title */}
          <Field label="Event Title" error={errors.title}>
            <input
              className={`add-evt-input${errors.title ? " err" : ""}`}
              placeholder="e.g. Free Medical Check-up"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
            />
          </Field>

          {/* Date + Time row */}
          <div style={{ display: "flex", gap: 12 }}>
            <Field label="Date" error={errors.date} style={{ flex: 1 }}>
              <input
                type="date"
                className={`add-evt-input${errors.date ? " err" : ""}`}
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
              />
            </Field>
            <Field label="Time" error={errors.time} style={{ flex: 1 }}>
              <input
                type="time"
                className={`add-evt-input${errors.time ? " err" : ""}`}
                value={form.time}
                onChange={(e) => set("time", e.target.value)}
              />
            </Field>
          </div>

          {/* Location */}
          <Field label="Location" error={errors.location}>
            <input
              className={`add-evt-input${errors.location ? " err" : ""}`}
              placeholder="e.g. Barangay Hall, Room 2"
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
            />
          </Field>

          {/* Description */}
          <Field label="Description (optional)">
            <textarea
              className="add-evt-input"
              placeholder="Brief description of the event…"
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              style={{ resize: "vertical", lineHeight: 1.6 }}
            />
          </Field>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 24 }}>
          <button
            className="add-evt-cancel"
            onClick={onClose}
            style={{
              fontFamily: "Poppins", fontWeight: 600, fontSize: 14,
              background: "#f0f9f6", border: "none", borderRadius: 12,
              padding: "10px 20px", cursor: "pointer", color: "#5a7a74",
              transition: "background 0.2s",
            }}
          >
            Cancel
          </button>
          <button
            className="add-evt-save"
            onClick={handleSave}
            style={{
              fontFamily: "Poppins", fontWeight: 700, fontSize: 14,
              background: "linear-gradient(to right, #032932, #5fc6a0)",
              border: "none", borderRadius: 12, padding: "10px 26px",
              cursor: "pointer", color: "#fff",
              transition: "opacity 0.2s, transform 0.15s",
              boxShadow: "0 4px 14px rgba(3,41,50,0.2)",
            }}
          >
            Save Event
          </button>
        </div>
      </div>
    </div>
  );
}

// Simple label + error wrapper
function Field({ label, error, children, style }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, ...style }}>
      <label style={{
        fontFamily: "Poppins", fontSize: 12, fontWeight: 700,
        color: "#5a7a74", textTransform: "uppercase", letterSpacing: "0.06em",
      }}>
        {label}
      </label>
      {children}
      {error && (
        <span style={{ fontFamily: "Poppins", fontSize: 11, color: "#e05555", fontWeight: 500 }}>
          {error}
        </span>
      )}
    </div>
  );
}

// Page 

export default function EventCalendarPage() {
  const [date]          = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddEvent, setShowAddEvent]   = useState(false);
  const [allEvents, setAllEvents] = useState(defaultUpcomingEvents);

  const eventDates = getUpcomingEvents(allEvents).map(
    (e) => `${e.year}-${monthMap[e.month]}-${String(e.date).padStart(2, "0")}`
  );

  function handleSaveEvent(form) {
    const newEvent = formToEvent(form);
    setAllEvents((prev) => [...prev, newEvent]);
  }

  return (
    <>
      <style>{`
        .add-event-btn {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 14px;
          border: none;
          border-radius: 50px;
          padding: 10px 22px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(to right, #032932, #2a6b60);
          color: #fff;
          position: relative;
          overflow: hidden;
          transition: transform 0.15s, box-shadow 0.15s;
          box-shadow: 0 4px 14px rgba(3,41,50,0.2);
          white-space: nowrap;
        }
        .add-event-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, #2a6b60, #5fc6a0);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .add-event-btn > * { position: relative; z-index: 1; }
        .add-event-btn:hover::after { opacity: 1; }
        .add-event-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(3,41,50,0.25); }
        .add-event-btn:active { transform: translateY(0); box-shadow: none; }
      `}</style>

      {/* ── Page header row ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
        marginBottom: 20,
      }}>
        <h1 style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 900,
          fontSize: "clamp(28px, 5vw, 48px)",
          margin: 0,
          background: "linear-gradient(to right, #032932, #5fc6a0)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block",
          lineHeight: 1.2,
        }}>
          Event Calendar
        </h1>

        <button className="add-event-btn" onClick={() => setShowAddEvent(true)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Event
        </button>
      </div>

      {/* ── Main content ── */}
      <div style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "clamp(12px, 3vw, 24px)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        gap: "clamp(12px, 2vw, 24px)",
        width: "100%",
        boxSizing: "border-box",
      }}>
        {/* Left column: Calendar + Past Events */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(12px, 2vw, 20px)",
          flex: "1 1 300px",
          minWidth: 0,
        }}>
          <Calendar date={date} onEventClick={setSelectedEvent} eventDates={eventDates} />
          <PastEventsView />
        </div>

        {/* Right column: Upcoming Events — pass ALL events; the component filters */}
        <div style={{ flex: "1 1 300px", minWidth: 0 }}>
          <UpcomingEventsView events={allEvents} onEventClick={setSelectedEvent} />
        </div>
      </div>

      {/* ── Overlays ── */}
      <EventOverlay
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onEdit={(original, updated) => {
          setAllEvents((prev) =>
            prev.map((e) => e === original ? updated : e)
          );
        }}
        onDelete={(toDelete) => {
          setAllEvents((prev) => prev.filter((e) => e !== toDelete));
        }}
      />

      {showAddEvent && (
        <AddEventOverlay
          onClose={() => setShowAddEvent(false)}
          onSave={handleSaveEvent}
        />
      )}
    </>
  );
}