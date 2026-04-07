import { useState } from "react"
import "./RatingSection.css"

function StarDisplay({ count, filled = true }) {
  return (
    <div className="stars-row">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`star ${i < count && filled ? "star-filled" : "star-empty"}`}>★</span>
      ))}
    </div>
  )
}

function RatingSection({ data }) {
  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [review, setReview] = useState("")

  const handleSubmit = () => {
    if (!userRating || !review.trim()) return
    alert(`Submitted: ${userRating} stars — "${review}"`)
    setUserRating(0)
    setReview("")
  }

  return (
    <div className="rating-wrapper">

      {/* average */}
      <div className="rating-header">
        <h2 className="rating-title">Ratings</h2>
        <span className="rating-avg">{data.average}/5.0</span>
        <StarDisplay count={Math.round(data.average)} />
      </div>
      <p className="rating-count">Based on {data.total} community Reviews</p>

      {/* review list */}
      <div className="review-list">
        {data.reviews.map((r) => (
          <div key={r.id} className="review-item">
            <div className="review-top">
              <span className="review-stars">{r.stars}</span>
              <span className="review-star-icon">★</span>
              <span className="review-name">{r.name}</span>
            </div>
            <p className="review-comment">"{r.comment}"</p>
          </div>
        ))}
      </div>

      {/* add review */}
      <div className="add-review">
        <div className="add-review-header">
          <h3 className="add-review-title">Add a Review</h3>
          <div className="add-review-stars">
            <p className="add-rating-label">Add your Rating</p>
            <div className="stars-row">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={`star-clickable ${i < (hoverRating || userRating) ? "star-filled" : "star-empty"}`}
                  onClick={() => setUserRating(i + 1)}
                  onMouseEnter={() => setHoverRating(i + 1)}
                  onMouseLeave={() => setHoverRating(0)}
                >★</span>
              ))}
            </div>
          </div>
        </div>

        <input
          className="review-input"
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <div className="review-submit-row">
          <button className="review-submit-btn" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default RatingSection