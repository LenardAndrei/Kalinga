import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { useEffect, useState } from "react"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import locationIcon from "../../assets/location-icon.svg"
import { getFacilities } from "../../services/facilityService" // ✅ IMPORT FIX

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const BATANGAS_BOUNDS = [
  [13.4500, 120.6500],
  [14.1500, 121.5500],
]

const BATANGAS_CENTER = [13.7565, 121.0583]

// ── MapController ──
function MapController({ target }) {
  const map = useMap()

  useEffect(() => {
    if (target) {
      map.flyTo([target.lat, target.lng], 15, {
        animate: true,
        duration: 1.2,
      })
    } else {
      map.flyTo(BATANGAS_CENTER, 11, { animate: true })
    }
  }, [target])

  return null
}

// ── SearchBar ──
function SearchBar({ onSearch, notFound }) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleClear = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <div style={{ position: "absolute", top: "16px", left: "16px", zIndex: 1000 }}>
      <form onSubmit={handleSubmit} style={{
        display: "flex",
        background: "#fff",
        borderRadius: "50px",
        padding: "10px 18px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
        width: "300px",
      }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search health facilities..."
          style={{ border: "none", outline: "none", flex: 1 }}
        />

        <button
          type="submit"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex"
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#666"  
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </form>

      {notFound && (
        <div style={{ background: "#fff", marginTop: "8px", padding: "10px" }}>
          No facility found
        </div>
      )}
    </div>
  )
}

// ── LocationButton ──
function LocationButton() {
  const map = useMap()

  const handleLocate = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      map.flyTo([coords.latitude, coords.longitude], 15)
    })
  }

  return (
    <button
      onClick={handleLocate}
      style={{
        position: "absolute",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        borderRadius: "50%",
        width: "50px",
        height: "50px",
      }}
    >
      <img src={locationIcon} style={{ width: "24px" }} />
    </button>
  )
}

// ── MAIN ──
function MapView() {
  const [allFacilities, setAllFacilities] = useState([]) // ✅ ORIGINAL DATA
  const [facilities, setFacilities] = useState([])       // ✅ DISPLAYED DATA
  const [target, setTarget] = useState(null)
  const [notFound, setNotFound] = useState(false)

  // ✅ FETCH FROM FAKE API
  useEffect(() => {
    getFacilities().then((data) => {
      setAllFacilities(data)
      setFacilities(data)
    })
  }, [])

  // ✅ SEARCH FUNCTION
  const handleSearch = (query) => {
    const q = query.toLowerCase().trim()

    if (!q) {
      setFacilities(allFacilities)
      setTarget(null)
      setNotFound(false)
      return
    }

    const results = allFacilities.filter((f) =>
      f.name.toLowerCase().includes(q)
    )

    if (results.length === 0) {
      setFacilities([])
      setTarget(null)
      setNotFound(true)
    } else {
      setFacilities(results)
      setTarget(results[0])
      setNotFound(false)
    }
  }

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <SearchBar onSearch={handleSearch} notFound={notFound} />

      <MapContainer
        center={BATANGAS_CENTER}
        zoom={11}
        minZoom={10}
        maxZoom={18}
        maxBounds={BATANGAS_BOUNDS}
        maxBoundsViscosity={1.0}
        zoomControl={false}
        style={{ height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MapController target={target} />

        {facilities.map((f) => (
          <Marker key={f.id} position={[f.lat, f.lng]}>
            <Popup>{f.name}</Popup>
          </Marker>
        ))}

        <LocationButton />
      </MapContainer>
    </div>
  )
}

export default MapView