import { useState, useEffect } from "react"
import { headlinesData } from "../../../services/headlinesData"
import "./Headlines.css"

function Headlines() {
  const [current, setCurrent] = useState(0)

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % headlinesData.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + headlinesData.length) % headlinesData.length)
  }

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % headlinesData.length)
  }

  const headline = headlinesData[current]

  return (
    <div className="headlines-container">
      <h2 className="headlines-title">Headlines</h2>
      
      <div className="headlines-carousel">
        {/* Left Arrow */}
        <button className="headlines-arrow headlines-arrow-left" onClick={handlePrev}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Slide */}
        <div className="headlines-slide" style={{ backgroundImage: `url(${headline.image})` }}>
          <div className="headlines-overlay"></div>
          <div className="headlines-content">
            <h3 className="headlines-slide-title">{headline.title}</h3>
            <p className="headlines-slide-description">{headline.description}</p>
            <button className="headlines-read-more">{headline.buttonText}</button>
          </div>
        </div>

        {/* Right Arrow */}
        <button className="headlines-arrow headlines-arrow-right" onClick={handleNext}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Indicators */}
      <div className="headlines-indicators">
        {headlinesData.map((_, index) => (
          <button
            key={index}
            className={`headlines-indicator ${index === current ? "active" : ""}`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  )
}

export default Headlines
