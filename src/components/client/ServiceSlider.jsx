import { useState } from "react"
import firstaidImg from "../../assets/firstaid.png"
import announcementImg from "../../assets/announcement.png"
import phoneMapImg from "../../assets/phone_map.png"
import appointmentImg from "../../assets/appointment.png"

const RADIUS = 600
const SPREAD = 450

function ServiceSlider() {
  const services = [
    { img: phoneMapImg, title: "Health Map" },
    { img: firstaidImg, title: "Barangay Health Services Information" },
    { img: appointmentImg, title: "Specialist Search and Appointment Booking" },
    { img: announcementImg, title: "Announcement and Community Updates" },
  ]

  const n = services.length
  const [current, setCurrent] = useState(0)
  const [sliding, setSliding] = useState(false)

  const getIdx = (i) => ((i % n) + n) % n

  const go = (dir) => {
    setCurrent((c) => getIdx(c + dir));
    setSliding(true);
    setTimeout(() => setSliding(false), 400); 
  };


  const cards = [-2, -1, 0, 1, 2].map((offset) => {
    const idx = getIdx(current + offset)
    const angleDeg = offset * (360 / n)
    const rad = (angleDeg * Math.PI) / 180
    const x = Math.sin(rad) * SPREAD
    const z = Math.cos(rad) * RADIUS
    const depth = (z + RADIUS) / (2 * RADIUS)   // 0 → 1
    const opacity = offset === 0 ? 1 : Math.max(0, depth * 0.9)
    const zIndex = Math.round(z + RADIUS)
    return { ...services[idx], offset, x, z, depth, opacity, zIndex }
  })

  const TRANSITION = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), width 0.4s cubic-bezier(0.4, 0, 0.2, 1), height 0.4s cubic-bezier(0.4, 0, 0.2, 1), margin 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)";

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "clamp(30px, 10vw, 60px) 0px",
      background: "#fff",
    }}>

      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: "100%",
        height: "560px",
        perspective: "1600px",
      }}>
        {cards.map((card) => {
          const isCenter = card.offset === 0
          const cardW = Math.min(230, window.innerWidth * 0.2) + card.depth * 130   
          const cardH = Math.min(320, window.innerWidth * 0.25) + card.depth * 160  

          return (
            <div
              key={card.title + card.offset}
              onClick={() => {
                if (card.offset === -1) go(-1)
                if (card.offset === 1) go(1)
              }}
              style={{
                position: "absolute",
                width: `${cardW}px`,
                height: `${cardH}px`,
                left: "50%",
                top: "50%",
                marginLeft: `-${cardW / 2}px`,
                marginTop: `-${cardH / 2}px`,
                borderRadius: "28px",
                background: "linear-gradient(to bottom, #ffffff 40%, #9DBDBC)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                padding: "0 20px 28px",
                boxShadow: isCenter
                  ? "0 28px 70px rgba(0,0,0,0.2)"
                  : "0 6px 20px rgba(0,0,0,0.08)",
                cursor: (card.offset === -1 || card.offset === 1) ? "pointer" : "default",
                transform: `translateX(${card.x}px) translateZ(${card.z - RADIUS}px)`,
                opacity: card.opacity,
                zIndex: card.zIndex,
                transition: TRANSITION,
                willChange: "transform, opacity, width, height",
              }}
            >
              <img
                src={card.img}
                style={{
                  width: `${cardW * 0.72}px`,
                  height: `${cardH * 0.56}px`,
                  objectFit: "contain",
                  marginBottom: "16px",
                  pointerEvents: "none",
                  transition: `width 0.4s cubic-bezier(0.4, 0, 0.2, 1), height 0.4s cubic-bezier(0.4, 0, 0.2, 1)`,
                }}
              />
              <p style={{
                margin: 0,
                fontSize: `${12 + card.depth * 10}px`,
                fontWeight: "800",
                color: "#fff",
                fontFamily: "'Poppins', sans-serif",
                lineHeight: 1.3,
                textAlign: "center",
                textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                transition: `font-size 0.4s cubic-bezier(0.4, 0, 0.2, 1)`,
              }}>
                {card.title}
              </p>
            </div>
          )
        })}
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        {["◀", "▶"].map((arrow, i) => (
          <button
            key={i}
            onClick={() => go(i === 0 ? -1 : 1)}
            style={{
              background: "#7FA8A7",
              border: "none",
              padding: "7px 60px",
              borderRadius: "50px",
              cursor: "pointer",
              fontSize: "28px",
              color: "#032932",
              opacity: sliding ? 0.6 : 1,
              transition: "opacity 0.3s ease",
            }}
          >
            {arrow}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ServiceSlider