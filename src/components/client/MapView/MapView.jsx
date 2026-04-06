
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet"
import { useEffect, useState, useRef } from "react"
import "leaflet/dist/leaflet.css"
import "./MapView.css"
import L from "leaflet"
import locationIcon from "../../../assets/location-icon.svg"
import { getFacilities } from "../../../services/facilityService"
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const BATANGAS_BOUNDS = [[13.4500, 120.6500], [14.1500, 121.5500]]
const BATANGAS_CENTER = [13.7565, 121.0583]

const createUserIcon = (starred) => new L.DivIcon({
  className: "",
  html: `
    <div style="position:relative;width:18px;height:18px;">
      <div style="width:18px;height:18px;background:#2A787C;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>
      ${starred ? `<div style="position:absolute;top:-10px;right:-10px;font-size:14px;line-height:1;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.3));">⭐</div>` : ""}
    </div>
  `,
  iconSize: [18, 18], iconAnchor: [9, 9], popupAnchor: [0, -12],
})

const savedIcon = new L.DivIcon({
  className: "",
  html: `
    <div style="position:relative;width:22px;height:22px;">
      <div style="width:22px;height:22px;background:#f59e0b;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>
      <div style="position:absolute;top:-10px;right:-10px;font-size:14px;line-height:1;">⭐</div>
    </div>
  `,
  iconSize: [22, 22], iconAnchor: [11, 11], popupAnchor: [0, -14],
})

const highlightedIcon = new L.DivIcon({
  className: "",
  html: `
    <div style="position:relative;width:26px;height:26px;">
      <div style="width:26px;height:26px;background:#ef4444;border:3px solid #fff;border-radius:50%;box-shadow:0 0 0 4px rgba(239,68,68,0.3);"></div>
      <div style="position:absolute;top:-10px;right:-10px;font-size:14px;line-height:1;">⭐</div>
    </div>
  `,
  iconSize: [26, 26], iconAnchor: [13, 13], popupAnchor: [0, -16],
})

function MapController({ target }) {
  const map = useMap()
  useEffect(() => {
    if (target) {
      map.flyTo([target.lat, target.lng], 15, { animate: true, duration: 1.2 })
    } else {
      map.flyTo(BATANGAS_CENTER, 11, { animate: true, duration: 1.2 })
    }
  }, [target])
  return null
}

function ClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng })
    }
  })
  return null
}

// SearchBar — replace inline styles with classNames
function SearchBar({ onSearch, notFound, query, setQuery }) {
  const handleSubmit = (e) => { e.preventDefault(); onSearch(query) }
  const handleClear = () => { setQuery(""); onSearch("") }

  return (
    <div className="search-wrapper">
      <form className="search-form" onSubmit={handleSubmit}>
        <input className="search-input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search health facilities..." />
        {query.length > 0 && (
          <button type="button" className="search-clear-btn" onClick={handleClear}>✕</button>
        )}
        <button type="submit" className="search-submit-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </button>
      </form>
      {notFound && <div className="search-not-found">No facility found for "{query}"</div>}
    </div>
  )
}

// SavedPanel
function SavedPanel({ savedLocations, onSelect, onRemove, onEdit, highlightedId }) {
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editLabel, setEditLabel] = useState("")

  const startEdit = (loc) => { setEditingId(loc.id); setEditLabel(loc.label) }
  const confirmEdit = (id) => { onEdit(id, editLabel); setEditingId(null) }

  return (
    <>
      <div className={`saved-btn ${open ? "open" : "closed"}`} onClick={() => setOpen((o) => !o)} title="Saved locations">
        ⭐
        {savedLocations.length > 0 && (
          <div className="saved-badge">{savedLocations.length}</div>
        )}
      </div>

      {open && (
        <div className="saved-panel">
          <div className="saved-panel-header">
            <span className="saved-panel-title">⭐ Saved Locations</span>
            <span className="saved-panel-count">{savedLocations.length} saved</span>
          </div>
          <div className="saved-panel-list">
            {savedLocations.length === 0 ? (
              <div className="saved-empty">No saved locations yet.<br />Click on the map to add one.</div>
            ) : (
              savedLocations.map((loc) => (
                <div key={loc.id} className={`saved-item ${highlightedId === loc.id ? "highlighted" : "normal"}`}>
                  {editingId === loc.id ? (
                    <div className="saved-item-edit">
                      <input className="saved-edit-input" value={editLabel} onChange={(e) => setEditLabel(e.target.value)} autoFocus />
                      <button className="saved-edit-confirm" onClick={() => confirmEdit(loc.id)}>✓</button>
                      <button className="saved-edit-cancel" onClick={() => setEditingId(null)}>✕</button>
                    </div>
                  ) : (
                    <div className="saved-item-view">
                      <div className="saved-item-info" onClick={() => onSelect(loc)}>
                        <p className="saved-item-name">{loc.label}</p>
                        <p className="saved-item-coords">{loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}</p>
                      </div>
                      <button className="icon-btn" onClick={() => startEdit(loc)} title="Edit">✏️</button>
                      <button className="icon-btn" onClick={() => onRemove(loc.id)} title="Remove">🗑️</button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  )
}

// AddLocationModal
function AddLocationModal({ position, onSave, onCancel }) {
  const [label, setLabel] = useState("")
  if (!position) return null

  return (
    <div className="add-modal">
      <p className="add-modal-title">📍 Save this location?</p>
      <p className="add-modal-coords">{position.lat.toFixed(5)}, {position.lng.toFixed(5)}</p>
      <input
        className="add-modal-input"
        autoFocus
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Enter a label (e.g. Clinic A)"
        onKeyDown={(e) => e.key === "Enter" && label.trim() && onSave(label)}
      />
      <div className="add-modal-btns">
        <button className="add-modal-save" onClick={() => label.trim() && onSave(label)} disabled={!label.trim()}>Save ⭐</button>
        <button className="add-modal-cancel" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  )
}

// LocationButton
function LocationButton({ userLocation, setUserLocation }) {
  const map = useMap()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [starred, setStarred] = useState(false)
  const markerRef = useRef(null)

  const handleLocate = () => {
    if (!navigator.geolocation) { setError("Geolocation not supported"); return }
    setLoading(true); setError(null)
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const pos = { lat: coords.latitude, lng: coords.longitude }
        setUserLocation(pos); setStarred(false)
        map.flyTo([pos.lat, pos.lng], 16, { animate: true, duration: 1.5 })
        setLoading(false)
      },
      (err) => {
        const messages = { 1: "Location access denied", 2: "Location unavailable", 3: "Request timed out" }
        setError(messages[err.code] || "Could not get location")
        setLoading(false)
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  useEffect(() => {
    if (markerRef.current) markerRef.current.openPopup()
  }, [userLocation])

  return (
    <>
      {userLocation && (
        <Marker ref={markerRef} position={[userLocation.lat, userLocation.lng]} icon={createUserIcon(starred)}>
          <Popup>
            <div className="popup-content">
              <p className="popup-title">📍 You are here</p>
              <button className="popup-star-btn" onClick={() => setStarred((s) => !s)}>
                {starred ? "⭐" : "☆"}
              </button>
            </div>
          </Popup>
        </Marker>
      )}

      <div className="location-btn-wrapper">
        {error && <div className="location-error">⚠ {error}</div>}
        <button className="location-btn" onClick={handleLocate} disabled={loading} title="Go to my location">
          {loading ? <div className="spinner" /> : <img src={locationIcon} alt="My location" style={{ width: "24px", height: "24px" }} />}
        </button>
      </div>
    </>
  )
}

function MapView() {
  const [allFacilities, setAllFacilities] = useState([])
  const [facilities, setFacilities] = useState([])
  const [target, setTarget] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [query, setQuery] = useState("")
  const [userLocation, setUserLocation] = useState(null)
  const [savedLocations, setSavedLocations] = useState(() => {
    try { return JSON.parse(localStorage.getItem("kalinga_saved") || "[]") }
    catch { return [] }
  })
  const [highlightedId, setHighlightedId] = useState(null)
  const [pendingClick, setPendingClick] = useState(null)
  const savedMarkerRefs = useRef({})

  useEffect(() => {
    localStorage.setItem("kalinga_saved", JSON.stringify(savedLocations))
  }, [savedLocations])

  useEffect(() => {
    getFacilities().then((data) => { setAllFacilities(data); setFacilities(data) })
  }, [])

  const handleSearch = (q) => {
    const trimmed = q.toLowerCase().trim()
    if (!trimmed) { setFacilities(allFacilities); setTarget(null); setNotFound(false); return }
    const results = allFacilities.filter((f) => f.name.toLowerCase().includes(trimmed))
    if (results.length === 0) { setFacilities([]); setTarget(null); setNotFound(true) }
    else { setFacilities(results); setTarget(results[0]); setNotFound(false) }
  }

  const handleMapClick = (pos) => setPendingClick(pos)

  const handleSave = (label) => {
    setSavedLocations((prev) => [...prev, { id: Date.now(), label, lat: pendingClick.lat, lng: pendingClick.lng }])
    setPendingClick(null)
  }

  const handleSelect = (loc) => {
    setHighlightedId(loc.id)
    setTarget(loc)
    setTimeout(() => {
      const ref = savedMarkerRefs.current[loc.id]
      if (ref) ref.openPopup()
    }, 1300)
  }

  const handleRemove = (id) => {
    setSavedLocations((prev) => prev.filter((l) => l.id !== id))
    if (highlightedId === id) setHighlightedId(null)
  }

  const handleEdit = (id, newLabel) => {
    setSavedLocations((prev) => prev.map((l) => l.id === id ? { ...l, label: newLabel } : l))
  }

  return (
    <div className="map-wrapper">

      <SearchBar
        onSearch={handleSearch}
        notFound={notFound}
        query={query}
        setQuery={setQuery}
      />

      <SavedPanel
        savedLocations={savedLocations}
        onSelect={handleSelect}
        onRemove={handleRemove}
        onEdit={handleEdit}
        highlightedId={highlightedId}
      />

      <AddLocationModal
        position={pendingClick}
        onSave={handleSave}
        onCancel={() => setPendingClick(null)}
      />

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

        <MapController target={target} />
        <ClickHandler onMapClick={handleMapClick} />

        {facilities.map((f) => (
          <Marker key={f.id} position={[f.lat, f.lng]}>
            <Popup>
              <div style={{ fontFamily: "'Poppins', sans-serif" }}>
                <p style={{ fontWeight: 700, margin: 0, color: "#032932", fontSize: "13px" }}>{f.name}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {savedLocations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            icon={highlightedId === loc.id ? highlightedIcon : savedIcon}
            ref={(r) => { savedMarkerRefs.current[loc.id] = r }}
          >
            <Popup>
              <div style={{ fontFamily: "'Poppins', sans-serif", minWidth: "120px" }}>
                <p style={{ fontWeight: 700, margin: "0 0 4px", color: "#032932", fontSize: "13px" }}>⭐ {loc.label}</p>
                <p style={{ margin: 0, fontSize: "11px", color: "#999" }}>{loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}</p>
                <button className="popup-remove-btn" onClick={() => handleRemove(loc.id)}>Remove</button>
              </div>
            </Popup>
          </Marker>
        ))}

        <LocationButton
          userLocation={userLocation}
          setUserLocation={setUserLocation}
        />
      </MapContainer>
    </div>
  )
}

export default MapView