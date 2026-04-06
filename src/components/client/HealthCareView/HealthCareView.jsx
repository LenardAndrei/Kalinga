import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getHealthcareServices } from "../../../services/healthcareService"
import "./HealthCareView.css"

const ITEMS_PER_PAGE = 9

// ── filter options ──
const FILTER_OPTIONS = {
  "Service Type": ["All", "Health Center", "Clinic", "Hospital"],
  "Location":     ["All", "Mauban", "Quezon"],
  "Cost":         ["All", "Free", "Paid"],
  "Availability": ["All", "Open", "Closing"],
  "Rating":       ["All", "5", "4", "3", "2", "1"],
}

// ── OpenCard ──
function OpenCard({ item }) {
  return (
    <Link to={`/client/healthcare/${item.id}`} state={{ service: item }} className="hc-card-link">
      <div className="hc-card">
        <div className="hc-card-img-wrapper open">
          <img src={item.image} alt={item.name} className="hc-card-img" />
          <div className="hc-open-badge-wrapper">
            <span className="hc-open-badge">Open Now</span>
          </div>
        </div>
        <div className="hc-card-body open">
          <p className="hc-card-name">{item.name}</p>
          <p className="hc-card-location">{item.location}</p>
          {item.time && <p className="hc-card-time">{item.time}</p>}
          <p className="hc-card-services"><strong>Services:</strong> {item.services}</p>
        </div>
      </div>
    </Link>
  )
}

// ── ClosingCard ──
function ClosingCard({ item }) {
  return (
    <Link to={`/client/healthcare/${item.id}`} state={{ service: item }} className="hc-card-link">
      <div className="hc-card">
        <div className="hc-card-img-wrapper closing">
          <img src={item.image} alt={item.name} className="hc-card-img" />
        </div>
        <div className="hc-card-body closing">
          <div>
            <p className="hc-card-name">{item.name}</p>
            <p className="hc-card-location">{item.location}</p>
            {item.time && <p className="hc-card-time">{item.time}</p>}
            <p className="hc-card-services"><strong>Services:</strong> {item.services}</p>
          </div>
          <div className="hc-closing-badge-wrapper">
            <span className="hc-closing-badge">Closing soon</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ── ServiceCard ──
function ServiceCard({ item }) {
  return item.status === "closing"
    ? <ClosingCard item={item} />
    : <OpenCard item={item} />
}

// ── FilterDropdown ──
function FilterDropdown({ label, options, active, onSelect }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: "relative" }}>
      <button
        className={`hc-filter-btn ${active !== "All" ? "hc-filter-btn-active" : ""}`}
        onClick={() => setOpen((o) => !o)}
      >
        {label}{active !== "All" ? `: ${active}` : ""}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <div className="hc-dropdown">
          {options.map((opt) => (
            <div
              key={opt}
              className={`hc-dropdown-item ${active === opt ? "hc-dropdown-item-active" : ""}`}
              onClick={() => {
                onSelect(opt)
                setOpen(false)
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Pagination ──
function Pagination({ total, perPage, current, onChange }) {
  const totalPages = Math.ceil(total / perPage)
  if (totalPages <= 1) return null
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="hc-pagination">
      {pages.map((p) => (
        <button
          key={p}
          className={`hc-page-btn ${p === current ? "active" : ""}`}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}
      {totalPages > 5 && <span style={{ color: "#999", fontSize: "14px" }}>...</span>}
    </div>
  )
}

// ── Healthcare ──
function Healthcare() {
  const [allServices, setAllServices] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  // ── filter state ──
  const [activeFilters, setActiveFilters] = useState({
    "Service Type": "All",
    "Location":     "All",
    "Cost":         "All",
    "Availability": "All",
    "Rating":       "All",
  })

  useEffect(() => {
    getHealthcareServices().then((data) => {
      setAllServices(data)
      setLoading(false)
    })
  }, [])

  // ── apply search + filters together ──
  useEffect(() => {
    let results = [...allServices]
    const q = search.toLowerCase().trim()

    // search
    if (q) {
      results = results.filter((s) =>
        s.name.toLowerCase().includes(q) ||
        s.services.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q)
      )
    }

    // service type filter
    if (activeFilters["Service Type"] !== "All") {
      results = results.filter((s) => s.type === activeFilters["Service Type"])
    }

    // location filter
    if (activeFilters["Location"] !== "All") {
      results = results.filter((s) =>
        s.location.toLowerCase().includes(activeFilters["Location"].toLowerCase())
      )
    }

    // cost filter
    if (activeFilters["Cost"] !== "All") {
      results = results.filter((s) => s.cost === activeFilters["Cost"])
    }

    // availability filter
    if (activeFilters["Availability"] !== "All") {
      results = results.filter((s) => s.status === activeFilters["Availability"])
    }

    // rating filter
    if (activeFilters["Rating"] !== "All") {
      results = results.filter((s) => s.rating === Number(activeFilters["Rating"]))
    }

    setFiltered(results)
    setPage(1)
  }, [search, activeFilters, allServices])

  const handleFilterSelect = (filterKey, value) => {
    setActiveFilters((prev) => ({ ...prev, [filterKey]: value }))
  }

  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  )

  return (
    <div className="hc-page">

      <div className="hc-header">
        <h1 className="hc-title">Search for Healthcare Services</h1>
        <p className="hc-subtitle">Search for clinics, services, or health programs near you.</p>
      </div>

      <div className="hc-search-wrapper">
        <div className="hc-search-box">
          <input
            className="hc-search-input"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </div>
      </div>

      {/* filter row — now uses FilterDropdown */}
      <div className="hc-filter-row">
        {Object.keys(FILTER_OPTIONS).map((filterKey) => (
          <FilterDropdown
            key={filterKey}
            label={filterKey}
            options={FILTER_OPTIONS[filterKey]}
            active={activeFilters[filterKey]}
            onSelect={(value) => handleFilterSelect(filterKey, value)}
          />
        ))}
      </div>

      {loading ? (
        <div className="hc-loading">Loading services...</div>
      ) : filtered.length === 0 ? (
        <div className="hc-loading">No services found.</div>
      ) : (
        <>
          <div className="hc-grid">
            {paginated.map((item) => (
              <ServiceCard key={item.id} item={item} />
            ))}
          </div>
          <Pagination
            total={filtered.length}
            perPage={ITEMS_PER_PAGE}
            current={page}
            onChange={setPage}
          />
        </>
      )}
    </div>
  )
}

export default Healthcare