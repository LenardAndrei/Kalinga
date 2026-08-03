import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./SpecialistsDetails.css"
import { getSpecialistById } from "../../../services/specialistsData"

// ── BookingModal ──
function BookingModal({ onClose, doctorName }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contactNumber: "",
    date: "",
    time: "",
  })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Appointment booked:", form)
    alert(`Appointment booked successfully!`)
    onClose()
  }

  // available time slots
  const timeSlots = [
    "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
  ]

  return (
    // backdrop — clicking outside closes modal
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}  // prevent closing when clicking inside
      >
        {/* close button */}
        <button className="modal-close-btn" onClick={onClose}>✕</button>

        <h2 className="modal-title">Book an Appointment</h2>

        <form className="modal-form" onSubmit={handleSubmit}>

          {/* name */}
          <div className="modal-field">
            <label className="modal-label">Name</label>
            <input
              className="modal-input"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* email */}
          <div className="modal-field">
            <label className="modal-label">Email</label>
            <input
              className="modal-input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* contact number */}
          <div className="modal-field">
            <label className="modal-label">Contact Number</label>
            <input
              className="modal-input"
              type="tel"
              name="contactNumber"
              value={form.contactNumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* date + time row */}
          <div className="modal-row">
            <div className="modal-field">
              <label className="modal-label">Date</label>
              <div className="modal-select-wrapper">
                <input
                  className="modal-select"
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="modal-field">
              <label className="modal-label">Time</label>
              <div className="modal-select-wrapper">
                <select
                  className="modal-select"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled></option>
                  {timeSlots.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <span className="modal-select-arrow">▾</span>
              </div>
            </div>
          </div>

          {/* submit */}
          <div className="modal-submit-row">
            <button type="submit" className="modal-submit-btn">
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

// ── SpecialistsDetails ──
function SpecialistsDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const data = getSpecialistById(id)
  const [showModal, setShowModal] = useState(false)   // ← modal state

  if (!data) {
    return (
      <div className="sd-page sd-error">
        <p>Specialist not found.</p>
        <button className="sd-back-btn" onClick={() => navigate(-1)}>Back</button>
      </div>
    )
  }

  return (
    <div className="sd-page">

      <div className="sd-top-bar">
        <button className="sd-back-btn" onClick={() => navigate(-1)}>Back</button>
      </div>

      <div className="sd-profile-row">
        <div className="sd-photo-card">
          <img src={data.image} alt={data.name} className="sd-photo" />
        </div>
        <div className="sd-info-card">
          <h2 className="sd-info-title">Information</h2>
          <div className="sd-info-list">
            <p className="sd-info-item"><span className="sd-info-label">Name:</span> {data.name}</p>
            <p className="sd-info-item"><span className="sd-info-label">Specialization:</span> {data.specialization}</p>
            <p className="sd-info-item"><span className="sd-info-label">Subspecialty:</span> {data.subspecialty || ""}</p>
            <p className="sd-info-item"><span className="sd-info-label">License Number:</span> {data.licenseNumber}</p>
            <p className="sd-info-item"><span className="sd-info-label">Years of Practice:</span> {data.yearsOfPractice}</p>
            <p className="sd-info-item"><span className="sd-info-label">Contact Number:</span> {data.contactNumber}</p>
            <p className="sd-info-item"><span className="sd-info-label">Email:</span> {data.email}</p>
          </div>
        </div>
      </div>

      <div className="sd-schedule-card">
        <h2 className="sd-schedule-title">Schedule</h2>
        <div className="sd-schedule-list">
          {data.schedule.map((s, i) => (
            <p key={i} className="sd-schedule-item">
              <strong>{s.day}:</strong> {s.time}
            </p>
          ))}
        </div>
      </div>

      <div className="sd-book-row">
        <button
          className="sd-book-btn"
          onClick={() => setShowModal(true)}   // ← opens modal
        >
          Book an Appointment
        </button>
      </div>

      {/* modal — only renders when showModal is true */}
      {showModal && (
        <BookingModal
          onClose={() => setShowModal(false)}
          doctorName={data.name}
        />
      )}

    </div>
  )
}

export default SpecialistsDetails