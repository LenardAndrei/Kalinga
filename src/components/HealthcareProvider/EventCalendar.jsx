import { useState } from "react";
import { upcomingEvents } from "./UpcomingEventsView"; 

const DAYS_OF_WEEK = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function buildCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const days = [];
  for (let i = firstDay - 1; i >= 0; i--) days.push({ n: daysInPrevMonth - i, gray: true });
  for (let d = 1; d <= daysInMonth; d++) days.push({ n: d });
  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) days.push({ n: d, gray: true });
  return days;
}

const MONTH_ABBR_TO_INDEX = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

export default function Calendar({ date, onEventClick }) {
  const [hoveredCell, setHoveredCell] = useState(null);

  const now = date instanceof Date ? date : new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const calendarDays = buildCalendarDays(year, month);

  // Build a map: "day-number" → event object for quick lookup
  const eventMap = new Map(
    upcomingEvents
      .filter((e) => {
        const eMonth = MONTH_ABBR_TO_INDEX[e.month];
        const eYear = parseInt(e.year, 10);
        return eMonth === month && eYear === year;
      })
      .map((e) => [parseInt(e.date, 10), e])
  );

  const getEvent = (day) => {
    if (day.gray) return null;
    return eventMap.get(day.n) ?? null;
  };

  const styles = {
    wrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Poppins', sans-serif",
    },
    container: {
      width: "500px",
      height: "405px",
      background: "#ffffff",
      border: "1px solid #848383",
      borderRadius: "35px",
      padding: "20px 24px",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
    },
    header: { display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "14px" },
    month: { fontFamily: "'Poppins', sans-serif", fontSize: "24px", fontWeight: 700, color: "#032932", lineHeight: 1 },
    year: { fontFamily: "'Poppins', sans-serif", fontSize: "24px", fontWeight: 900, color: "#032932", lineHeight: 1 },
    grid: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" },
    dayLabel: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: "16px",
      fontWeight: 700,
      color: "#032932",
      textAlign: "center",
      padding: "4px 0",
      marginBottom: "2px",
    },
    cell: (isEvent, isHovered, isGray) => ({
      width: "58px",
      height: "46px",
      background: isEvent && isHovered ? "#5fc6a0" : "#EEEEEE",
      borderRadius: "6px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "2px",
      cursor: isEvent ? "pointer" : "default",
      transition: "background 0.15s",
    }),
    dateText: (gray, isEvent, isHovered) => ({
      fontFamily: "'Poppins', sans-serif",
      fontSize: "16px",
      fontWeight: 700,
      color: isEvent && isHovered ? "#ffffff" : gray ? "#848383" : "#032932",
      lineHeight: 1,
      transition: "color 0.15s",
    }),
    dot: (gray, isHovered) => ({
      width: "9px",
      height: "9px",
      borderRadius: "50%",
      background: isHovered ? "#ffffff" : gray ? "#848383" : "#032932",
      transition: "background 0.15s",
    }),
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.month}>{MONTHS[month]}</span>
          <span style={styles.year}>{year}</span>
        </div>
        <div style={styles.grid}>
          {DAYS_OF_WEEK.map((day) => (
            <div key={day} style={styles.dayLabel}>{day}</div>
          ))}
          {calendarDays.map((day, i) => {
            const event = getEvent(day);
            const isHovered = hoveredCell === i;
            return (
              <div
                key={i}
                style={styles.cell(!!event, isHovered, day.gray)}
                onClick={() => event && onEventClick?.(event)}
                onMouseEnter={() => event && setHoveredCell(i)}
                onMouseLeave={() => setHoveredCell(null)}
              >
                <span style={styles.dateText(day.gray, !!event, isHovered)}>{day.n}</span>
                {event && <div style={styles.dot(day.gray, isHovered)} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}