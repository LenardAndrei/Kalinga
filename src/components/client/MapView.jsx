import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"  // ← add useMap
import { useState } from "react"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

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

const facilities = [
  { id: 1, name: "Batangas City Health Office",      lat: 13.7565, lng: 121.0583 },
  { id: 2, name: "Alangilan Barangay Health Center", lat: 13.7850, lng: 121.0730 },
  { id: 3, name: "San Pascual Rural Health Unit",    lat: 13.8195, lng: 121.0274 },
  { id: 4, name: "Bauan District Hospital",          lat: 13.7934, lng: 121.0044 },
]

// ── SearchBar ──
function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("")

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSearch?.(query) }}
      style={{
        position: "absolute",
        top: "16px",
        left: "16px",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        background: "#fff",
        borderRadius: "50px",
        padding: "10px 18px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
        gap: "10px",
        width: "300px",
      }}
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search health facilities..."
        style={{
          border: "none",
          outline: "none",
          fontSize: "14px",
          fontFamily: "'Poppins', sans-serif",
          flex: 1,
          background: "transparent",
          color: "#1a1a1a",
        }}
      />
      <button type="submit" style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </button>
    </form>
  )
}

// ── LocationButton — must be INSIDE MapContainer to use useMap() ──
import locationIcon from "../../assets/location-icon.svg"   // ← your svg here

function LocationButton() {
  const map = useMap()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported")
      return
    }

    setLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        map.flyTo([latitude, longitude], 15, {
          animate: true,
          duration: 1.5,     // smooth 1.5s fly animation
        })
        setLoading(false)
      },
      (err) => {
        console.error("Location error:", err)
        setError("Could not get location")
        setLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    )
  }

  return (
    // useMap() returns the map instance but renders nothing by itself
    // so we use a regular div positioned over the map via zIndex
    <div
      style={{
        position: "absolute",
        bottom: "32px",
        right: "16px",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "6px",
      }}
    >
      {/* error message */}
      {error && (
        <div style={{
          background: "#fff",
          color: "#e53e3e",
          fontSize: "11px",
          fontFamily: "'Poppins', sans-serif",
          padding: "4px 10px",
          borderRadius: "50px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          whiteSpace: "nowrap",
        }}>
          {error}
        </div>
      )}

      {/* the button */}
      <button
        onClick={handleLocate}
        title="Go to my location"
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "#fff",
          border: "none",
          boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
          cursor: loading ? "wait" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
          opacity: loading ? 0.7 : 1,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08)"
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.25)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)"
          e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.2)"
        }}
      >
        {loading ? (
          // simple spinner while locating
          <div style={{
            width: "20px",
            height: "20px",
            border: "2px solid #ddd",
            borderTop: "2px solid #2A787C",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }} />
        ) : (
          <img src={locationIcon} alt="My location" style={{ width: "24px", height: "24px" }} />
        )}
      </button>
    </div>
  )
}

// ── MapView ──
function MapView() {
  return (
    <div style={{ position: "relative", width: "100%", height: "calc(100vh - 70px)" }}>

      <SearchBar onSearch={(q) => console.log("search:", q)} />

      <MapContainer
        center={BATANGAS_CENTER}
        zoom={11}
        minZoom={10}
        maxZoom={18}
        maxBounds={BATANGAS_BOUNDS}
        maxBoundsViscosity={1.0}
        bounceAtZoomLimits={false}
        zoomControl={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {facilities.map((f) => (
          <Marker key={f.id} position={[f.lat, f.lng]}>
            <Popup>
              <div style={{ fontFamily: "'Poppins', sans-serif" }}>
                <p style={{ fontWeight: 700, margin: "0 0 4px", color: "#032932", fontSize: "13px" }}>
                  {f.name}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* LocationButton MUST be inside MapContainer */}
        <LocationButton />

      </MapContainer>

      {/* spinner keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

export default MapView