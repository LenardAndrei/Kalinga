import "./ServicesOffered.css"

function ServicesOffered({ services }) {
  return (
    <div className="services-wrapper">
      <h2 className="services-title">Services Offered</h2>
      <div className="services-scroll">
        {services.map((s) => (
          <div key={s.id} className="service-card">
            <div className="service-img-wrapper">
              {s.image
                ? <img src={s.image} alt={s.name} className="service-img" />
                : <div className="service-img-placeholder" />
              }
              <div className="service-overlay" />
              <div className="service-info">
                <p className="service-name">{s.name}</p>
                <div className="service-tags">
                  {s.tags.map((tag, i) => (
                    <span key={i} className="service-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServicesOffered