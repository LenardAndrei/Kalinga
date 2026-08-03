import { useEffect, useMemo, useState } from "react"
import { getPatients } from "../../../services/patientsData"
import PatientDetailsModal from "./PatientDetailsModal"

function PatientTable() {
  const [patients, setPatients]         = useState([])
  const [statusFilter, setStatusFilter] = useState("All")
  const [search, setSearch]             = useState("")
  const [selected, setSelected]         = useState(null)

  useEffect(() => {
    getPatients().then((data) => setPatients(data))
  }, [])

  const filtered = useMemo(() => {
    return patients.filter((p) => {
      const statusMatch = statusFilter === "All" || p.status === statusFilter
      const q = search.toLowerCase()
      const searchMatch =
        p.name.toLowerCase().includes(q) ||
        p.gender.toLowerCase().includes(q) ||
        p.condition.toLowerCase().includes(q)
      return statusMatch && searchMatch
    })
  }, [patients, search, statusFilter])

  return (
    <>
      <div className="doctor-table-card">

        {/* toolbar */}
        <div className="doctor-table-header">
          <div className="doctors-toolbar">
            <div className="doctor-search-group">
              <label className="doctor-input-label" htmlFor="patient-search">
                Search
              </label>
              <input
                id="patient-search"
                type="search"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="doctor-search"
              />
            </div>
            <div className="doctor-filter-group">
              <label className="doctor-input-label" htmlFor="patient-status">
                Status
              </label>
              <select
                id="patient-status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="doctor-filter"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* table */}
        <div className="doctor-table-wrap">
          <table className="doctor-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td className="doctor-name">{p.name}</td>
                  <td className="doctor-specialty">{p.gender}</td>
                  <td>{p.age}</td>
                  <td>
                    <span className={`status-pill ${p.status.toLowerCase()}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="doctor-action-btn"
                      type="button"
                      onClick={() => setSelected(p)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="doctor-empty-state">No patients found.</div>
          )}
        </div>
      </div>

      <PatientDetailsModal
        patient={selected}
        onClose={() => setSelected(null)}
      />
    </>
  )
}

export default PatientTable