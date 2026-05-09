import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CTASection() {
  const navigate = useNavigate(); 
  
  const [hoverMap, setHoverMap] = useState(false);
  const [hoverSpec, setHoverSpec] = useState(false);

  const getBtnStyle = (isHovered) => ({
    ...styles.btn,
    transform: isHovered ? "translateY(-5px)" : "translateY(0)",
    boxShadow: isHovered ? "0 10px 20px rgba(0,0,0,0.15)" : "none",
    background: isHovered ? "#f0f0f0" : "#fff", // Subtle feedback
  });

  const styles = {
    section: {
      background: "#032932",
      padding: "clamp(20px, 10vw, 40px) clamp(20px, 10vw, 40px)",
      textAlign: "center",
    },
    title: {
      fontSize: "clamp(24px, 5vw, 36px)",
      fontWeight: "700",
      color: "#fff",
      margin: "0 0 16px 0",
    },
    subtitle: {
      fontSize: "15px",
      color: "#fff",
      margin: "0 0 40px 0",
      lineHeight: 1.6,
    },
    btnRow: {
      flexDirection: window.innerWidth < 768 ? "column" : "row",
      gap: "20px",
      display: "flex",
      justifyContent: "center",
    },
    btn: {
      background: "#fff",
      color: "#032932",
      border: "none",
      padding: "clamp(16px, 5vw, 20px)",
      borderRadius: "50px",
      fontSize: "clamp(13px, 5vw, 18px)",
      fontWeight: "700",
      whiteSpace: "nowrap",
      cursor: "pointer", 
      transition: "transform 0.3s ease", 
    }
  };

  return (
    <div style={styles.section}>
      <h2 style={styles.title}>Ready to Prioritize your Health?</h2>
      <p style={styles.subtitle}>
        Explore your community's health services or meet specialists today.
      </p>
      <div style={styles.btnRow}>
        <button 
          style={{
            ...styles.btn, 
            transform: hoverMap ? "translateY(-5px)" : "translateY(0)" // Apply hover logic here
          }} 
          onMouseEnter={() => setHoverMap(true)}
          onMouseLeave={() => setHoverMap(false)}
          onClick={() => navigate("/client/map")}
        >
          Open the Health Map
        </button>

        <button 
          style={{
            ...styles.btn, 
            transform: hoverSpec ? "translateY(-5px)" : "translateY(0)" // Apply hover logic here
          }} 
          onMouseEnter={() => setHoverSpec(true)}
          onMouseLeave={() => setHoverSpec(false)}
          onClick={() => navigate("/client/specialists")}
        >
          Meet our Specialists
        </button>
      </div>
    </div>
  );
}

export default CTASection;
