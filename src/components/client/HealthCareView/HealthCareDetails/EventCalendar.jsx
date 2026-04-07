import "./EventCalendar.css"

function EventCalendar({ data }) {
  return (
    <div className="calendar-wrapper">
      <h2 className="calendar-title">Event Calendar</h2>
      <p className="calendar-month">{data.month}</p>

      <div className="calendar-list">
        {data.events.map((event) => (
          <div key={event.id} className="calendar-item">
            <div className="calendar-date" style={{ borderLeft: `5px solid ${event.color}` }}>
              <span className="calendar-day">{event.day}</span>
              <span className="calendar-month-label">{event.month}</span>
            </div>
            <div className="calendar-info">
              <p className="calendar-event-title">{event.title}</p>
              <p className="calendar-meta">Time: {event.time}</p>
              <p className="calendar-meta">{event.location}</p>
              <p className="calendar-desc">Description: {event.description}</p>
              <p className="calendar-meta">Organizer: {event.organizer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventCalendar