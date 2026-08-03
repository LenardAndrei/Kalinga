import { useState } from "react";

// Seed data
export const defaultUpcomingEvents = [
  {
    date: "15", month: "May", day: "Wed", title: "Annual Health Fair",
    location: "Community Center", time: "8:00 am", year: "2026",
    description: "Join us for our Annual Barangay Health Fair, a day dedicated to your health and well-being! Enjoy FREE medical check-ups, health screenings, and consultations, plus learn valuable tips on proper nutrition, hygiene, and healthy living.\nBring your family and take this opportunity to stay informed, stay healthy, and connect with your community. Don't miss out!",
  },
  {
    date: "20", month: "May", day: "Mon", title: "Mental Health Awareness Seminar",
    location: "Local Library Auditorium", time: "9:00 am", year: "2026",
    description: "An interactive seminar focused on mental health resources and support strategies.",
  },
  {
    date: "23", month: "May", day: "Thurs", title: "Diabetes Management Workshop",
    location: "Healthcare Clinic", time: "10:00 am", year: "2026",
    description: "Hands-on workshop aimed at educating participants on managing diabetes effectively.",
  },
  {
    date: "27", month: "May", day: "Mon", title: "Nutrition and Wellness Expo",
    location: "Convention Center", time: "8:00 am", year: "2026",
    description: "An expo highlighting nutrition tips and healthy lifestyle choices with expert speakers.",
  },
  {
    date: "1", month: "May", day: "Fri", title: "Cardiovascular Health Screening",
    location: "City Park", time: "7:00 am", year: "2026",
    description: "Free health screenings available to assess heart health and provide guidance.",
  },
  {
    date: "5", month: "May", day: "Tues", title: "Pediatric Health Day",
    location: "Children's Hospital", time: "8:00 am", year: "2026",
    description: "A day dedicated to children's health with activities, screenings, and expert advice for parents.",
  },
];

// Month / day helpers
const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_NAMES   = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];

function eventToDate(event) {
  const monthIndex = MONTH_NAMES.indexOf(event.month);
  return new Date(Number(event.year), monthIndex, Number(event.date));
}

export function getUpcomingEvents(allEvents, limit = 6) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return allEvents
    .filter((e) => eventToDate(e) >= today)
    .sort((a, b) => eventToDate(a) - eventToDate(b))
    .slice(0, limit);
}

// Convert an event object → form field values (for pre-filling the edit form)
function eventToForm(event) {
  const monthIndex  = MONTH_NAMES.indexOf(event.month);
  const paddedMonth = String(monthIndex + 1).padStart(2, "0");
  const paddedDate  = String(event.date).padStart(2, "0");
  const dateStr     = `${event.year}-${paddedMonth}-${paddedDate}`;

  const timeStr = (() => {
    const match = event.time?.match(/(\d+):(\d+)\s*(am|pm)/i);
    if (!match) return "";
    let h = parseInt(match[1], 10);
    const m      = match[2];
    const period = match[3].toLowerCase();
    if (period === "pm" && h !== 12) h += 12;
    if (period === "am" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}:${m}`;
  })();

  return { title: event.title || "", date: dateStr, time: timeStr, location: event.location || "", description: event.description || "" };
}

// Convert form field values → event object
function formToEvent({ date, time, title, location, description }) {
  const d = new Date(date + "T00:00:00");
  const formatTime = (t) => {
    if (!t) return "";
    const [hStr, mStr] = t.split(":");
    let h = parseInt(hStr, 10);
    const period = h >= 12 ? "pm" : "am";
    h = h % 12 || 12;
    return `${h}:${mStr} ${period}`;
  };
  return {
    date: String(d.getDate()), month: MONTH_NAMES[d.getMonth()],
    day: DAY_NAMES[d.getDay()], year: String(d.getFullYear()),
    time: formatTime(time), title, location, description: description || "",
  };
}

// Shared input style
const inputStyle = {
  fontFamily: "'Poppins', sans-serif", fontSize: 14, width: "100%",
  border: "1.5px solid #ddeee9", borderRadius: 12, padding: "11px 14px",
  color: "#032932", background: "#f6fbf9", outline: "none", boxSizing: "border-box",
};

function Field({ label, error, children, style }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, ...style }}>
      <label style={{
        fontFamily: "Poppins", fontSize: 12, fontWeight: 700, color: "#5a7a74",
        textTransform: "uppercase", letterSpacing: "0.06em",
      }}>
        {label}
      </label>
      {children}
      {error && <span style={{ fontFamily: "Poppins", fontSize: 11, color: "#e05555", fontWeight: 500 }}>{error}</span>}
    </div>
  );
}

// Delete Confirmation Overlay

function DeleteConfirmOverlay({ event, onClose, onConfirm }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1100,
        background: "rgba(3,41,50,0.55)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 24, padding: "36px 32px 28px",
          boxShadow: "0 20px 60px rgba(3,41,50,0.28)", width: "100%", maxWidth: 420,
          boxSizing: "border-box", textAlign: "center", animation: "delIn 0.2s ease",
        }}
      >
        <style>{`@keyframes delIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }`}</style>
        <div style={{ fontSize: 44, marginBottom: 14 }}>🗑️</div>
        <h2 style={{ fontFamily: "Poppins", fontWeight: 900, fontSize: 22, color: "#032932", margin: "0 0 10px" }}>
          Delete Event?
        </h2>
        <p style={{ fontFamily: "Poppins", fontSize: 14, color: "#5a7a74", margin: "0 0 28px", lineHeight: 1.6 }}>
          Are you sure you want to delete <strong>"{event.title}"</strong>?<br />This action cannot be undone.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button
            onClick={onClose}
            style={{
              fontFamily: "Poppins", fontWeight: 600, fontSize: 14, background: "#f0f9f6",
              border: "none", borderRadius: 12, padding: "10px 24px", cursor: "pointer", color: "#5a7a74",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              fontFamily: "Poppins", fontWeight: 700, fontSize: 14,
              background: "linear-gradient(to right, #c0392b, #e05555)",
              border: "none", borderRadius: 12, padding: "10px 24px",
              cursor: "pointer", color: "#fff", boxShadow: "0 4px 14px rgba(192,57,43,0.3)",
            }}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// Edit Event Overlay

function EditEventOverlay({ event, onClose, onSave }) {
  const [form, setForm]     = useState(eventToForm(event));
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
    onSave(formToEvent(form));
    onClose();
  }

  const inp = (field) => ({ ...inputStyle, borderColor: errors[field] ? "#e05555" : "#ddeee9" });

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1100,
        background: "rgba(3,41,50,0.55)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 24, padding: "32px 32px 28px",
          boxShadow: "0 20px 60px rgba(3,41,50,0.28)", width: "100%", maxWidth: 480,
          boxSizing: "border-box", position: "relative", animation: "editIn 0.25s ease",
        }}
      >
        <style>{`@keyframes editIn { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:translateY(0); } }`}</style>

        <button onClick={onClose} style={{
          position: "absolute", top: 18, right: 20, background: "none", border: "none",
          cursor: "pointer", fontFamily: "Poppins", fontWeight: 700, fontSize: 20,
          color: "#5a7a74", lineHeight: 1, padding: "4px 8px", borderRadius: 8,
        }}>✕</button>

        <h2 style={{
          fontFamily: "Poppins", fontWeight: 900, fontSize: "clamp(20px, 4vw, 26px)",
          background: "linear-gradient(to right, #032932, #5fc6a0)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          display: "inline-block", margin: "0 0 6px", lineHeight: 1.2,
        }}>Edit Event</h2>
        <p style={{ fontFamily: "Poppins", fontSize: 13, color: "#7a9e97", margin: "0 0 24px", fontWeight: 500 }}>
          Update the details for this event.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Field label="Event Title" error={errors.title}>
            <input style={inp("title")} value={form.title} onChange={(e) => set("title", e.target.value)} />
          </Field>

          <div style={{ display: "flex", gap: 12 }}>
            <Field label="Date" error={errors.date} style={{ flex: 1 }}>
              <input type="date" style={inp("date")} value={form.date} onChange={(e) => set("date", e.target.value)} />
            </Field>
            <Field label="Time" error={errors.time} style={{ flex: 1 }}>
              <input type="time" style={inp("time")} value={form.time} onChange={(e) => set("time", e.target.value)} />
            </Field>
          </div>

          <Field label="Location" error={errors.location}>
            <input style={inp("location")} value={form.location} onChange={(e) => set("location", e.target.value)} />
          </Field>

          <Field label="Description (optional)">
            <textarea
              style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </Field>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 24 }}>
          <button onClick={onClose} style={{
            fontFamily: "Poppins", fontWeight: 600, fontSize: 14, background: "#f0f9f6",
            border: "none", borderRadius: 12, padding: "10px 20px", cursor: "pointer", color: "#5a7a74",
          }}>Cancel</button>
          <button onClick={handleSave} style={{
            fontFamily: "Poppins", fontWeight: 700, fontSize: 14,
            background: "linear-gradient(to right, #032932, #5fc6a0)",
            border: "none", borderRadius: 12, padding: "10px 26px",
            cursor: "pointer", color: "#fff", boxShadow: "0 4px 14px rgba(3,41,50,0.2)",
          }}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

// EventOverlay

export const EventOverlay = ({ event, onClose, onEdit, onDelete }) => {
  const [showEdit,   setShowEdit]   = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  if (!event) return null;

  return (
    <>
      {/* Main detail overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1000, padding: "16px", boxSizing: "border-box",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "90vw", maxWidth: 1052, borderRadius: "clamp(16px, 3vw, 35px)",
            backgroundColor: "#ffffff", border: "1.5px solid #848383",
            padding: "clamp(24px, 4vw, 48px) clamp(20px, 5vw, 60px)",
            boxSizing: "border-box", position: "relative",
            fontFamily: "'Poppins', sans-serif", maxHeight: "90vh", overflowY: "auto",
          }}
        >
          <button onClick={onClose} style={{
            position: "absolute", top: 16, right: 20, background: "none", border: "none",
            fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 700, color: "#032932",
            cursor: "pointer", lineHeight: 1,
          }}>✕</button>

          <h1 style={{
            fontFamily: "'Poppins', sans-serif", fontWeight: 900,
            fontSize: "clamp(22px, 5vw, 48px)", margin: "0 0 8px 0", textAlign: "center",
            background: "linear-gradient(to right, #032932, #5fc6a0)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.2,
          }}>
            {event.title}
          </h1>

          <p style={{
            fontFamily: "'Poppins', sans-serif", fontWeight: 700,
            fontSize: "clamp(14px, 3vw, 32px)", color: "#82ACAB", textAlign: "center",
            margin: "0 0 clamp(16px, 3vw, 32px) 0", lineHeight: 1.3,
          }}>
            {event.month} {event.date}, {event.year}, {event.time} | <em>{event.location}</em>
          </p>

          <p style={{
            fontFamily: "'Poppins', sans-serif", fontWeight: 400,
            fontSize: "clamp(13px, 2.5vw, 24px)", color: "#032932", textAlign: "center",
            margin: "0 0 clamp(24px, 4vw, 48px) 0", lineHeight: 1.6, whiteSpace: "pre-line",
          }}>
            {event.description}
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(12px, 3vw, 32px)", flexWrap: "wrap" }}>
            {/* Edit button */}
            <button
              onClick={() => setShowEdit(true)}
              style={{
                width: "clamp(160px, 25vw, 250px)", height: "clamp(40px, 6vw, 50px)",
                borderRadius: 999, border: "none",
                background: "linear-gradient(to right, #032932, #5fc6a0)",
                color: "#fff", fontFamily: "'Poppins', sans-serif",
                fontWeight: 700, fontSize: "clamp(14px, 2vw, 20px)",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              }}
            >
              Edit Event
            </button>

            {/* Delete button */}
            <button
              onClick={() => setShowDelete(true)}
              style={{
                width: "clamp(160px, 25vw, 250px)", height: "clamp(40px, 6vw, 50px)",
                borderRadius: 999, border: "none",
                background: "linear-gradient(to right, #7f1d1d, #dc2626)",
                color: "#fff", fontFamily: "'Poppins', sans-serif",
                fontWeight: 700, fontSize: "clamp(14px, 2vw, 20px)",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              }}
            >
              Delete Event
            </button>
          </div>
        </div>
      </div>

      {/* Edit overlay (zIndex 1100, renders on top) */}
      {showEdit && (
        <EditEventOverlay
          event={event}
          onClose={() => setShowEdit(false)}
          onSave={(updated) => {
            onEdit?.(event, updated);
            setShowEdit(false);
            onClose();
          }}
        />
      )}

      {/* Delete confirmation (zIndex 1100, renders on top) */}
      {showDelete && (
        <DeleteConfirmOverlay
          event={event}
          onClose={() => setShowDelete(false)}
          onConfirm={() => {
            onDelete?.(event);
            setShowDelete(false);
            onClose();
          }}
        />
      )}
    </>
  );
};

// EventCard 

const EventCard = ({ event, onClick }) => (
  <button
    onClick={() => onClick(event)}
    style={{
      all: "unset", cursor: "pointer", width: "100%",
      minHeight: "clamp(80px, 12vw, 109px)", borderRadius: "clamp(16px, 4vw, 35px)",
      backgroundColor: "#DADADA", padding: "14px 22px 14px clamp(90px, 18vw, 120px)",
      position: "relative", display: "flex", flexDirection: "column",
      justifyContent: "center", gap: 2, boxSizing: "border-box", transition: "filter 0.15s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(0.95)")}
    onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
  >
    <div style={{
      position: "absolute", left: 0, top: 0, bottom: 0,
      width: "clamp(80px, 16vw, 112px)", borderRadius: "clamp(16px, 4vw, 35px)",
      backgroundColor: "#032932", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", lineHeight: 1,
    }}>
      <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 900, fontSize: "clamp(28px, 6vw, 48px)", color: "#fff" }}>{event.date}</span>
      <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(14px, 3vw, 24px)", color: "#fff" }}>{event.month}</span>
      <span style={{ fontFamily: "'Poppins', sans-serif", fontStyle: "italic", fontWeight: 700, fontSize: "clamp(10px, 2vw, 16px)", color: "#fff" }}>{event.day}</span>
    </div>
    <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(12px, 2.5vw, 16px)", color: "#032932" }}>{event.title}</span>
    <span style={{ fontFamily: "'Poppins', sans-serif", fontStyle: "italic", fontSize: "clamp(10px, 2vw, 12px)", color: "#032932" }}>{event.location}</span>
    <span style={{
      fontFamily: "'Poppins', sans-serif", fontSize: "clamp(10px, 2vw, 12px)", color: "#032932",
      display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
    }}>{event.description}</span>
  </button>
);

// UpcomingEventsView 

export default function UpcomingEventsView({ events, onEventClick }) {
  const visible = getUpcomingEvents(events);

  return (
    <div style={{
      width: "100%", maxWidth: 560, borderRadius: "clamp(16px, 4vw, 35px)",
      backgroundColor: "#ffffff", border: "1.5px solid #848383",
      padding: "clamp(16px, 3vw, 28px) clamp(12px, 3vw, 24px)",
      display: "flex", flexDirection: "column", alignItems: "center",
      gap: "clamp(8px, 2vw, 14px)", boxSizing: "border-box", fontFamily: "'Poppins', sans-serif",
    }}>
      <h1 style={{
        fontFamily: "'Poppins', sans-serif", fontWeight: 900,
        fontSize: "clamp(20px, 5vw, 36px)", color: "#82ACAB",
        margin: 0, paddingBottom: 6, lineHeight: 1.1,
      }}>
        Upcoming Events
      </h1>

      {visible.length === 0 && (
        <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 14, color: "#aac4be", textAlign: "center", padding: "24px 0", margin: 0 }}>
          No upcoming events. Add one to get started!
        </p>
      )}

      {visible.map((event, i) => (
        <EventCard key={i} event={event} onClick={onEventClick} />
      ))}
    </div>
  );
}