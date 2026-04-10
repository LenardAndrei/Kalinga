import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getSpecialists, specialistCategories } from "../../../services/specialistsData"
import "./SpecialistsView.css"

const ITEMS_PER_PAGE = 9

// ── SpecialistCard ──
function SpecialistCard({ specialist }) {
  return (
    <Link to={`/client/specialists/${specialist.id}`} className="sp-card-link">
      <div className="sp-card">
        <div className="sp-card-img-wrapper">
          <img src={specialist.image} alt={specialist.name} className="sp-card-img" />
        </div>
        <div className="sp-card-body">
          <p className="sp-card-name">
            <span className="sp-label">Name: </span>{specialist.name}
          </p>
          <p className="sp-card-specialist">
            <span className="sp-label">Specialist: </span>{specialist.specialist}
          </p>
        </div>
      </div>
    </Link>
  )
}

// ── Pagination ──
function Pagination({ total, perPage, current, onChange }) {
  const totalPages = Math.ceil(total / perPage)
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const showDots = totalPages > 5

  return (
    <div className="sp-pagination">
      {pages.slice(0, showDots ? 5 : totalPages).map((p) => (
        <button
          key={p}
          className={`sp-page-btn ${p === current ? "active" : ""}`}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}
      {showDots && (
        <span className="sp-dots">...</span>
      )}
    </div>
  )
}

// ── SpecialistsView ──
function SpecialistsView() {
  const [allSpecialists, setAllSpecialists] = useState([])
  const [filtered, setFiltered]             = useState([])
  const [loading, setLoading]               = useState(true)
  const [search, setSearch]                 = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [page, setPage]                     = useState(1)

  useEffect(() => {
    getSpecialists().then((data) => {
      setAllSpecialists(data)
      setFiltered(data)
      setLoading(false)
    })
  }, [])

  // filter whenever search or category changes
  useEffect(() => {
    let results = [...allSpecialists]
    const q = search.toLowerCase().trim()

    if (q) {
      results = results.filter((s) =>
        s.name.toLowerCase().includes(q) ||
        s.specialist.toLowerCase().includes(q)
      )
    }

    if (activeCategory !== "All") {
      results = results.filter((s) => s.specialist === activeCategory)
    }

    setFiltered(results)
    setPage(1)
  }, [search, activeCategory, allSpecialists])

  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  )

  return (
    <div className="sp-page">

      {/* title */}
      <div className="sp-header">
        <h1 className="sp-title">Specialist</h1>

        {/* search */}
        <div className="sp-search-box">
          <input
            className="sp-search-input"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="#999" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </div>

        {/* category filter tabs */}
        <div className="sp-categories">
          {specialistCategories.map((cat) => (
            <button
              key={cat}
              className={`sp-cat-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
          {/* arrow indicator for overflow */}
          <div className="sp-cat-arrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="#2A787C" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </div>
        </div>
      </div>

      {/* content */}
      {loading ? (
        <div className="sp-loading">Loading specialists...</div>
      ) : filtered.length === 0 ? (
        <div className="sp-loading">No specialists found.</div>
      ) : (
        <>
          <div className="sp-grid">
            {paginated.map((item) => (
              <SpecialistCard key={item.id} specialist={item} />
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

export default SpecialistsView