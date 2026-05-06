import { useState, useEffect } from "react"
import { getDoctorApplications } from "../../../services/applicationsData"
import StatusBadge from "./StatusBadge"

function DoctorApplicationsTable() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDoctorApplications().then((data) => {
      setApplications(data)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="app-loading">Loading...</div>

  return (
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
                onClick={() => console.log("View:", app.id)}
              >
                View Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DoctorApplicationsTable