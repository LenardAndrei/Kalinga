import Calendar from "react-calendar";
import { useState } from "react";
import "./ScheduleCalendar.css";

export default function ScheduleCalendar({ onDateChange }) {
    const [value, setValue] = useState(new Date());

    const handleChange = (date) => {
        setValue(date);
        onDateChange?.(date);
    };

    return (
        <div className="schedule-calendar">
            <Calendar
                onChange={handleChange}
                value={value}
                calendarType="gregory"
                locale="en-US"
                prevLabel={<span className="schedule-calendar__nav-icon">&#8249;</span>}
                nextLabel={<span className="schedule-calendar__nav-icon">&#8250;</span>}
                prev2Label={null}
                next2Label={null}
                formatShortWeekday={(locale, date) =>
                    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()]
                }
                tileClassName={({ date, view }) => {
                    if (view !== "month") return null;
                    const today = new Date();
                    const isToday =
                        date.getDate() === today.getDate() &&
                        date.getMonth() === today.getMonth() &&
                        date.getFullYear() === today.getFullYear();
                    return isToday ? "schedule-calendar__tile--today" : null;
                }}
                navigationLabel={({ date }) =>
                    date.toLocaleString("en-US", { month: "long", year: "numeric" })
                }
            />
        </div>
    );
}