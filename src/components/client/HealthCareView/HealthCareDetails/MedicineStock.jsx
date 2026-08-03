import "./MedicineStock.css"

function MedicineStock({ medicines }) {
  return (
    <div className="medicine-wrapper">
      <h2 className="medicine-title">Free Medicine Stock</h2>
      <div className="medicine-scroll">
        {medicines.map((m) => (
          <div key={m.id} className="medicine-card">
            <img src={m.image} alt={m.name} className="medicine-img" />
            <p className="medicine-name">{m.name}</p>
            <span className={`medicine-badge ${m.available ? "available" : "out"}`}>
              {m.available ? "Available" : "Out of Stock"}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MedicineStock