import "./ClinicOfficers.css"

function ClinicOfficers({ officers }) {
  return (
    <div className="officers-wrapper">
      <h2 className="officers-title">Clinic Officers</h2>
      <div className="officers-scroll">
        {officers.map((o) => (
          <div key={o.id} className="officer-card">
            <img src={o.image} alt={o.name} className="officer-img" />
            <p className="officer-name">{o.name}</p>
            <p className="officer-role">{o.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ClinicOfficers