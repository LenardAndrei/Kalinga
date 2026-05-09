import { useState, useEffect } from "react";

// Sample data 
const SAMPLE_DATA = {
  average: 4.5,
  total: 32,
  recentReviews: [
    { id: 1, score: 5, comment: "dubai chewy cookie mangga sushi ramen fries ice cream jabee", author: "Tipsy D" },
  ],
};

function useRatingData(facilityId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRatings() {
      try {
        setLoading(true);
        // TODO: replace with real endpoint
        // const res = await fetch(`/api/facilities/${facilityId}/ratings`);
        // if (!res.ok) throw new Error("Failed to fetch ratings");
        // const json = await res.json();
        // setData(json);

        await new Promise((r) => setTimeout(r, 600)); // fake network delay
        setData(SAMPLE_DATA);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchRatings();
  }, [facilityId]);

  return { data, loading, error };
}

//Star
function Stars({ score, max = 5 }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {Array.from({ length: max }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < score ? "#F5C518" : "none"}
          stroke={i < score ? "#F5C518" : "#94a3b8"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );
}

// Individual review
function ReviewRow({ review, delay }) {
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.11)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 12,
        padding: "10px 14px",
        height: "fit-content",
        animation: `slideIn 0.4s ease both`,
        animationDelay: `${delay}ms`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <span style={{ color: "#F5C518", fontWeight: 700, fontSize: 13 }}>
          {review.score}/{5}
        </span>
        <Stars score={review.score} />
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 13,
          color: "#ffffff",
          fontStyle: "italic",
          lineHeight: 1.4,
        }}
      >
        "{review.comment}"
      </p>
      <p
        style={{
          margin: "4px 0 0",
          fontSize: 11,
          color: "#ffffff",
          textAlign: "right",
        }}
      >
        • {review.author}
      </p>
    </div>
  );
}

//Skeleton
function Skeleton() {
  const bar = (w, h = 12, mb = 0) => (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: 6,
        background: "rgba(255,255,255,0.1)",
        marginBottom: mb,
        animation: "pulse 1.4s ease-in-out infinite",
      }}
    />
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            background: "rgba(255,255,255,0.06)",
            borderRadius: 12,
            padding: "10px 14px",
          }}
        >
          {bar("60%", 12, 8)}
          {bar("80%", 10, 4)}
          {bar("40%", 10)}
        </div>
      ))}
    </div>
  );
}

//Main card 
export default function RatingCard({ facilityId = "facility-1" }) {
  const { data, loading, error } = useRatingData(facilityId);

  const cardStyle = {
    background: "linear-gradient(145deg, #5fc6a0 0%, #032932 100%)",
    borderRadius: 20,
    padding: "24px 20px",
    width: "516px",
    height: "321px",
    fontFamily: "'Poppins', system-ui, sans-serif",
    color: "#fff",
    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.8); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>

      <div style={cardStyle}>
        {/* Decorative glow blob */}
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 130,
            height: 130,
            borderRadius: "50%",
            background: "rgba(20,200,180,0.12)",
            filter: "blur(30px)",
            pointerEvents: "none",
          }}
        />

        {/* Title */}
          <h2
          style={{
            display: "flex",
            width: "100%",
            height: "43px",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "36px",
            fontWeight: 900,
            margin: 0,
            marginBottom: 12,
          }}
        >
          Rating
        </h2>

        <div style={{ display: "flex", gap: 16, flex: 1 }}>
          {/* Left — average score */}
          <div
            style={{
              minWidth: 100,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center", 
              gap: 8,
              animation: "popIn 0.5s ease both",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 48, fontWeight: 900, lineHeight: 1 }}>
                {loading ? "—" : data?.average.toFixed(1)}
              </span>
              <span style={{ fontSize: 48, color: "#ffffff", fontWeight: 900 }}>/5</span>
              <span style={{ fontSize: 30 }}>⭐</span>
            </div>
            <span style={{ fontSize: 20, color: "#ffffff" , fontStyle: "italic", fontWeight: 700}}>
              {loading ? "…" : `${data?.total} Reviews`}
            </span>
          </div>

          {/* Divider */}
          <div
            style={{
              width: 1,
              alignSelf: "stretch",
              background: "rgb(255, 255, 255)",
              flexShrink: 0,
            }}
          />

          {/* Right — recent reviews */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              height: "100%", 
            }}
            >

            <p
              style={{
                margin: "0 0 10px",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: 1,
                color: "#ffffff",
              }}
            >
              Recent Reviews
            </p>

            {error && (
              <p style={{ color: "#f87171", fontSize: 13 }}>⚠ {error}</p>
            )}

            {loading && !error && <Skeleton />}

            {!loading && !error && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingRight: 4}}>
                {data.recentReviews.map((review, i) => (
                  <ReviewRow key={review.id} review={review} delay={i * 100} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}