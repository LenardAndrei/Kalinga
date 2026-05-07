import { useState, useEffect } from "react"
import { getDoctorApplications } from "../../../services/applicationsData"
import StatusBadge from "./StatusBadge"
import ReviewModal from "./ReviewModal"

function DoctorApplicationsTable() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedApplication, setSelectedApplication] = useState(null)

  useEffect(() => {
    getDoctorApplications().then((data) => {
      setApplications(data)
      setLoading(false)
    })
  }, [])

  const openApplication = (app) => {
    setSelectedApplication(app)
  }

  const closeApplication = () => {
    setSelectedApplication(null)
  }

  const updateApplicationStatus = (id, status) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    )
    setSelectedApplication((prev) =>
      prev && prev.id === id ? { ...prev, status } : prev
    )
  }

  const handleAccept = (id) => {
    updateApplicationStatus(id, "Accepted")
    closeApplication()
  }

  const handleDecline = (id) => {
    updateApplicationStatus(id, "Decline")
    closeApplication()
  }

  if (loading) return <div className="app-loading">Loading...</div>

  return (
    <>
      <table className="app-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Specialty</th>
          <th>Date Applied</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((app) => (
          <tr key={app.id}>
            <td className="app-name">{app.name}</td>
            <td className="app-specialty">{app.specialty}</td>
            <td>{app.dateApplied}</td>
            <td><StatusBadge status={app.status} /></td>
            <td>
              <button
                className="app-view-btn"
                onClick={() => openApplication(app)}
              >
                View Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <ReviewModal
      application={selectedApplication}
      type="doctor"
      onClose={closeApplication}
      onAccept={handleAccept}
      onDecline={handleDecline}
    />
  </>
  )
}

export default DoctorApplicationsTable