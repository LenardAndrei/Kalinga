
export default function AppointmentIcon({className}) {
    return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <circle cx="24" cy="11" r="7" fill="currentColor" stroke="currentColor" strokeWidth="2" />

            <path
                d="M4 41C4 32.1634 12.0589 25 22 25"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <circle cx="34" cy="34" r="9" fill="currentColor" stroke="currentColor" strokeWidth="2"></circle>

            <path d="M33 31V35H37" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>

        </svg>
    )
}