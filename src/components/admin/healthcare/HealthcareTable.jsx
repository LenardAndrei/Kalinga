import { useEffect, useMemo, useState } from "react"
import { getHealthcareProviders } from "../../../services/healthcareProvidersData"
import HealthcareDetailsModal from "./HealthcareDetailsModal"

function HealthcareTable() {
  const [providers, setProviders] = useState([])
  const [statusFilter, setStatusFilter] = useState("All")
  const [search, setSearch] = useState("")
  const [selectedProvider, setSelectedProvider] = useState(null)

  useEffect(() => {
    getHealthcareProviders().then((data) => setProviders(data))
  }, [])

  const filteredProviders = useMemo(() => {
    return providers.filter((provider) => {
      const statusMatches = statusFilter === "All" || provider.status === statusFilter
      const searchTerm = search.toLowerCase()
      const searchMatches =
        provider.name.toLowerCase().includes(searchTerm) ||
        provider.specialty.toLowerCase().includes(searchTerm) ||
        provider.address.toLowerCase().includes(searchTerm)

      return statusMatches && searchMatches
    })
  }, [providers, search, statusFilter])

  const openProvider = (provider) => setSelectedProvider(provider)
  const closeProvider = () => setSelectedProvider(null)

  return (
    <>
      <div className="healthcare-table-card">
        <div className="healthcare-table-header">
          <div className="healthcare-toolbar">
            <div className="healthcare-search-group">
              <label className="healthcare-input-label" htmlFor="healthcare-search">
                Search
              </label>
              <input
                id="healthcare-search"
                type="search"
                placeholder="Search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="healthcare-search"
              />
            </div>
            <div className="healthcare-filter-group">
              <label className="healthcare-input-label" htmlFor="healthcare-status">
                Status
              </label>
              <select
                id="healthcare-status"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="healthcare-filter"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="healthcare-table-wrap">
          <table className="healthcare-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialty</th>
                <th>Address</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProviders.map((provider) => (
                <tr key={provider.id}>
                  <td className="healthcare-name">{provider.name}</td>
                  <td className="healthcare-specialty">{provider.specialty}</td>
                  <td>{provider.address}</td>
                  <td>
                    <span className={`status-pill ${provider.status.toLowerCase()}`}>
                      {provider.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="healthcare-action-btn"
                      type="button"
                      onClick={() => openProvider(provider)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProviders.length === 0 && (
            <div className="healthcare-empty-state">No providers found.</div>
          )}
        </div>
      </div>

      <HealthcareDetailsModal provider={selectedProvider} onClose={closeProvider} />
    </>
  )
}

export default HealthcareTable
