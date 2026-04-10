import { useState } from "react"
import { articlesData } from "../../../services/articlesData"
import "./Articles.css"

function Articles() {
  const [current, setCurrent] = useState(0)

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + articlesData.length) % articlesData.length)
  }

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % articlesData.length)
  }

  // Show 3 cards at a time
  const getVisibleArticles = () => {
    const articles = []
    for (let i = 0; i < 3; i++) {
      const index = (current + i) % articlesData.length
      articles.push(articlesData[index])
    }
    return articles
  }

  const visibleArticles = getVisibleArticles()

  return (
    <div className="articles-container">
      <h2 className="articles-title">Articles</h2>

      <div className="articles-carousel">
        {/* Left Arrow */}
        <button className="articles-arrow articles-arrow-left" onClick={handlePrev}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Cards Grid */}
        <div className="articles-grid">
          {visibleArticles.map((article, index) => (
            <article key={article.id} className={`article-card ${index === 1 ? "center" : "side"}`}>
              <div className="article-card-img-wrapper">
                <img src={article.image} alt={article.title} className="article-card-img" />
              </div>
              <div className="article-card-body">
                <h3 className="article-card-title">{article.title}</h3>
                <p className="article-card-description">{article.description}</p>
                <button className="article-card-btn">
                  {article.buttonText}
                </button>
                <div className="article-card-footer">
                  <span className="article-card-author">{article.author}</span>
                  <span className="article-card-date">{article.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Right Arrow */}
        <button className="articles-arrow articles-arrow-right" onClick={handleNext}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Indicators */}
      <div className="articles-indicators">
        {articlesData.map((_, index) => (
          <button
            key={index}
            className={`articles-indicator ${index === current ? "active" : ""}`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to article ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  )
}

export default Articles
