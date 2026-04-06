import { useState, useEffect } from "react"
import { getHealthcareServices } from "../../services/healthcareService"

const ITEMS_PER_PAGE = 9

const styles = {
  page: {
    padding: "40px 32px",
    fontFamily: "'Poppins', sans-serif",
    background: "#f0f4f4",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    marginBottom: "28px",
  },
  title: {
    fontSize: "38px",
    fontWeight: "900",
    color: "#032932",
    margin: "0 0 6px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#666",
    margin: 0,
  },
  searchWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    background: "#fff",
    borderRadius: "50px",
    padding: "10px 20px",
    width: "360px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    gap: "10px",
  },
  searchInput: {
    border: "none",
    outline: "none",
    fontSize: "14px",
    fontFamily: "'Poppins', sans-serif",
    flex: 1,
    background: "transparent",
    color: "#1a1a1a",
  },
  filterRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "24px",
    flexWrap: "wrap",
  },
  filterBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "8px 14px",
    fontSize: "13px",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "600",
    color: "#333",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 400px)",
    gap: "24px",
    marginBottom: "32px",
    justifyContent: "center",
  },
  cardName: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#032932",
    margin: "0 0 2px",
  },
  cardLocation: {
    fontSize: "14px",
    fontStyle: "italic",
    color: "#555",
    margin: 0,
  },
  cardTime: {
    fontSize: "14px",
    color: "#555",
    margin: 0,
  },
  cardServices: {
    fontSize: "14px",
    color: "#444",
    margin: 0,
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
  },
  pageBtn: (active) => ({
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "none",
    background: active ? "#2A787C" : "#fff",
    color: active ? "#fff" : "#333",
    fontWeight: "700",
    fontSize: "14px",
    fontFamily: "'Poppins', sans-serif",
    cursor: "pointer",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    transition: "background 0.2s",
  }),
  loading: {
    textAlign: "center",
    padding: "60px",
    color: "#999",
    fontSize: "15px",
  },
}

// ── OpenCard ──
function OpenCard({ item, hovered, onMouseEnter, onMouseLeave }) {
  return (
    <div
      style={{
        width: "400px",
        height: "490px",
        borderRadius: "25px",
        background: "#fff",
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        transform: hovered ? "scale(1.02)" : "scale(1)",
        boxShadow: hovered
          ? "0 8px 24px rgba(0,0,0,0.14)"
          : "0 2px 12px rgba(0,0,0,0.07)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* image with Open Now badge overlapping bottom edge */}
      <div style={{ position: "relative", width: "100%", height: "300px", flexShrink: 0 }}>
        <img
          src={item.image}
          alt={item.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        {/* badge sits at bottom of image, half outside */}
        <div style={{
          position: "absolute",
          bottom: "-18px",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 3,
        }}>
          <span style={{
            background: "#22c55e",
            color: "#fff",
            fontSize: "15px",
            fontWeight: "800",
            padding: "8px 32px",
            borderRadius: "50px",
            fontFamily: "'Poppins', sans-serif",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            whiteSpace: "nowrap",
          }}>
            Open Now
          </span>
        </div>
      </div>

      {/* body */}
      <div style={{
        padding: "32px 18px 18px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        flex: 1,
      }}>
        <p style={styles.cardName}>{item.name}</p>
        <p style={styles.cardLocation}>{item.location}</p>
        {item.time && <p style={styles.cardTime}>{item.time}</p>}
        <p style={styles.cardServices}>
          <strong>Services:</strong> {item.services}
        </p>
      </div>
    </div>
  )
}

// ── ClosingCard ──
function ClosingCard({ item, hovered, onMouseEnter, onMouseLeave }) {
  return (
    <div
      style={{
        width: "400px",
        height: "490px",
        borderRadius: "25px",
        background: "#fff",
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        transform: hovered ? "scale(1.02)" : "scale(1)",
        boxShadow: hovered
          ? "0 8px 24px rgba(0,0,0,0.14)"
          : "0 2px 12px rgba(0,0,0,0.07)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* image — no badge, just fills top cleanly */}
      <div style={{ width: "100%", height: "260px", flexShrink: 0 }}>
        <img
          src={item.image}
          alt={item.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      {/* body — content top, badge bottom */}
      <div style={{
        padding: "16px 18px 18px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flex: 1,
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <p style={styles.cardName}>{item.name}</p>
          <p style={styles.cardLocation}>{item.location}</p>
          {item.time && <p style={styles.cardTime}>{item.time}</p>}
          <p style={styles.cardServices}>
            <strong>Services:</strong> {item.services}
          </p>
        </div>

        {/* orange badge pinned to bottom center */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span style={{
            background: "#f97316",
            color: "#fff",
            fontSize: "15px",
            fontWeight: "800",
            padding: "8px 32px",
            borderRadius: "50px",
            fontFamily: "'Poppins', sans-serif",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            whiteSpace: "nowrap",
          }}>
            Closing soon
          </span>
        </div>
      </div>
    </div>
  )
}

// ── ServiceCard — picks which card to render ──
function ServiceCard({ item }) {
  const [hovered, setHovered] = useState(false)

  const props = {
    item,
    hovered,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  }

  return item.status === "closing"
    ? <ClosingCard {...props} />
    : <OpenCard {...props} />
}

// ── Pagination ──
function Pagination({ total, perPage, current, onChange }) {
  const totalPages = Math.ceil(total / perPage)
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div style={styles.pagination}>
      {pages.map((p) => (
        <button
          key={p}
          style={styles.pageBtn(p === current)}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}
      {totalPages > 5 && (
        <span style={{ color: "#999", fontSize: "14px" }}>...</span>
      )}
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

  const filters = ["Service Type", "Location", "Cost", "Availability", "Rating"]

  useEffect(() => {
    getHealthcareServices().then((data) => {
      setAllServices(data)
      setFiltered(data)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    const q = search.toLowerCase().trim()
    if (!q) {
      setFiltered(allServices)
    } else {
      setFiltered(
        allServices.filter((s) =>
          s.name.toLowerCase().includes(q) ||
          s.services.toLowerCase().includes(q) ||
          s.location.toLowerCase().includes(q)
        )
      )
    }
    setPage(1)
  }, [search, allServices])

  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  )

  return (
    <div style={styles.page}>

      <div style={styles.header}>
        <h1 style={styles.title}>Search for Healthcare Services</h1>
        <p style={styles.subtitle}>Search for clinics, services, or health programs near you.</p>
      </div>

      <div style={styles.searchWrapper}>
        <div style={styles.searchBox}>
          <input
            style={styles.searchInput}
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

      <div style={styles.filterRow}>
        {filters.map((f) => (
          <button key={f} style={styles.filterBtn}>
            {f}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
        ))}
      </div>

      {loading ? (
        <div style={styles.loading}>Loading services...</div>
      ) : filtered.length === 0 ? (
        <div style={styles.loading}>No services found.</div>
      ) : (
        <>
          <div style={styles.grid}>
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