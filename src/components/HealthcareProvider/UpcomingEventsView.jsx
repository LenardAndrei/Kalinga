import { useState } from "react";

export const upcomingEvents = [
  {
    date: "15", month: "Apr", day: "Wed", title: "Annual Health Fair",
    location: "Community Center", time: "8:00 am", year: "2026",
    description: "Join us for our Annual Barangay Health Fair, a day dedicated to your health and well-being! Enjoy FREE medical check-ups, health screenings, and consultations, plus learn valuable tips on proper nutrition, hygiene, and healthy living.\nBring your family and take this opportunity to stay informed, stay healthy, and connect with your community. Don't miss out!",
  },
  {
    date: "20", month: "Apr", day: "Mon", title: "Mental Health Awareness Seminar",
    location: "Local Library Auditorium", time: "9:00 am", year: "2026",
    description: "An interactive seminar focused on mental health resources and support strategies.",
  },
  {
    date: "23", month: "Apr", day: "Thurs", title: "Diabetes Management Workshop",
    location: "Healthcare Clinic", time: "10:00 am", year: "2026",
    description: "Hands-on workshop aimed at educating participants on managing diabetes effectively.",
  },
  {
    date: "27", month: "Apr", day: "Mon", title: "Nutrition and Wellness Expo",
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

export const EventOverlay = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: 1052, borderRadius: 35, backgroundColor: "#ffffff",
        border: "1.5px solid #848383", padding: "48px 60px",
        boxSizing: "border-box", position: "relative", fontFamily: "'Poppins', sans-serif",
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 24, right: 32, background: "none", border: "none",
          fontSize: 28, fontWeight: 700, color: "#032932", cursor: "pointer", lineHeight: 1,
        }}>✕</button>

        <h1 style={{
          fontFamily: "'Poppins', sans-serif", fontWeight: 900, fontSize: 48,
          margin: "0 0 8px 0", textAlign: "center",
          background: "linear-gradient(to right, #032932, #5fc6a0)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.2,
        }}>{event.title}</h1>

        <p style={{
          fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 32,
          color: "#82ACAB", textAlign: "center", margin: "0 0 32px 0", lineHeight: 1.3,
        }}>
          {event.month} {event.date}, {event.year}, {event.time} | <em>{event.location}</em>
        </p>

        <p style={{
          fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: 24,
          color: "#032932", textAlign: "center", margin: "0 0 48px 0",
          lineHeight: 1.6, whiteSpace: "pre-line",
        }}>{event.description}</p>

        <div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
          {[{ icon: "✏️", label: "Edit Event" }, { icon: "🗑️", label: "Delete Event" }].map(({ icon, label }) => (
            <button key={label} style={{
              width: 250, height: 50, borderRadius: 999, border: "none",
              background: "linear-gradient(to right, #032932, #5fc6a0)", color: "#ffffff",
              fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 20,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            }}>
              <span style={{ fontSize: 18 }}>{icon}</span> {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const EventCard = ({ event, onClick }) => (
  <button onClick={() => onClick(event)} style={{
    all: "unset", cursor: "pointer", width: 480, minHeight: 109, borderRadius: 35,
    backgroundColor: "#DADADA", padding: "14px 22px 14px 120px", position: "relative",
    display: "flex", flexDirection: "column", justifyContent: "center", gap: 2,
    boxSizing: "border-box", transition: "filter 0.15s",
  }}
    onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(0.95)")}
    onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
  >
    <div style={{
      position: "absolute", left: 0, top: 0, bottom: 0, width: 112,
      borderRadius: "35px", backgroundColor: "#032932",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", lineHeight: 1,
    }}>
      <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 900, fontSize: 48, color: "#fff" }}>{event.date}</span>
      <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 24, color: "#fff" }}>{event.month}</span>
      <span style={{ fontFamily: "'Poppins', sans-serif", fontStyle: "italic", fontWeight: 700, fontSize: 16, color: "#fff" }}>{event.day}</span>
    </div>
    <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, color: "#032932" }}>{event.title}</span>
    <span style={{ fontFamily: "'Poppins', sans-serif", fontStyle: "italic", fontSize: 12, color: "#032932" }}>{event.location}</span>
    <span style={{
      fontFamily: "'Poppins', sans-serif", fontSize: 12, color: "#032932",
      display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
    }}>{event.description}</span>
  </button>
);

export default function UpcomingEventsView({ onEventClick }) {
  return (
    <div style={{
      width: 560, borderRadius: 35, backgroundColor: "#ffffff",
      border: "1.5px solid #848383", padding: "28px 24px",
      display: "flex", flexDirection: "column", alignItems: "center",
      gap: 14, boxSizing: "border-box", fontFamily: "'Poppins', sans-serif",
    }}>
      <h1 style={{
        fontFamily: "'Poppins', sans-serif", fontWeight: 900, fontSize: 36,
        color: "#82ACAB", margin: 0, paddingBottom: 6, lineHeight: 1.1,
      }}>Upcoming Events</h1>

      {upcomingEvents.map((event, i) => (
        <EventCard key={i} event={event} onClick={onEventClick} />
      ))}
    </div>
  );
}