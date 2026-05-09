import { useEffect, useMemo, useState } from "react"
import { getDoctors } from "../../../services/doctorsData"
import DoctorDetailsModal from "./DoctorDetailsModal"

function DoctorTable() {
  const [doctors, setDoctors] = useState([])
  const [statusFilter, setStatusFilter] = useState("All")
  const [search, setSearch] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState(null)

  useEffect(() => {
    getDoctors().then((data) => setDoctors(data))
  }, [])

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const statusMatches = statusFilter === "All" || doctor.status === statusFilter
      const searchTerm = search.toLowerCase()
      const searchMatches =
        doctor.name.toLowerCase().includes(searchTerm) ||
        doctor.specialty.toLowerCase().includes(searchTerm)
      return statusMatches && searchMatches
    })
  }, [doctors, search, statusFilter])

  const openDoctor = (doctor) => setSelectedDoctor(doctor)
  const closeDoctor = () => setSelectedDoctor(null)

  return (
    <>
      <div className="doctor-table-card">
        <div className="doctor-table-header">
          <div className="doctors-toolbar">
            <div className="doctor-search-group">
              <label className="doctor-input-label" htmlFor="doctor-search">
                Search
              </label>
              <input
                id="doctor-search"
                type="search"
                placeholder="Search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="doctor-search"
              />
            </div>
            <div className="doctor-filter-group">
              <label className="doctor-input-label" htmlFor="doctor-status">
                Status
              </label>
              <select
                id="doctor-status"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="doctor-filter"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="doctor-table-wrap">
          <table className="doctor-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialty</th>
                <th>Patients</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td className="doctor-name">{doctor.name}</td>
                  <td className="doctor-specialty">{doctor.specialty}</td>
                  <td>{doctor.patients}</td>
                  <td>
                    <span className={`status-pill ${doctor.status.toLowerCase()}`}>
                      {doctor.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="doctor-action-btn"
                      type="button"
                      onClick={() => openDoctor(doctor)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredDoctors.length === 0 && (
            <div className="doctor-empty-state">No doctors found.</div>
          )}
        </div>
      </div>

      <DoctorDetailsModal doctor={selectedDoctor} onClose={closeDoctor} />
    </>
  )
}

export default DoctorTable
