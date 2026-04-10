import { useNavigate } from "react-router-dom";

function CTASection() {
  const navigate = useNavigate(); 

  const styles = {
    section: {
      background: "#032932",
      padding: "40px 40px",
      textAlign: "center",
      fontFamily: "'Poppins', sans-serif",
    },
    title: {
      fontSize: "36px",
      fontWeight: "800",
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
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      flexWrap: "wrap",
    },
    btn: {
      background: "#fff",
      color: "#032932",
      border: "none",
      padding: "12px 40px",
      borderRadius: "50px",
      fontSize: "15px",
      fontWeight: "800",
      fontFamily: "'Poppins', sans-serif",
      cursor: "pointer",
      whiteSpace: "nowrap",
    },
  };

  return (
    <div style={styles.section}>
      <h2 style={styles.title}>Ready to Prioritize your Health?</h2>
      <p style={styles.subtitle}>
        Explore your community's health services or meet specialists today.
      </p>
      <div style={styles.btnRow}>
        <button 
          style={styles.btn} 
          onClick={() => navigate("/client/map")}
        >
          Open the Health Map
        </button>

        <button 
          style={styles.btn} 
          onClick={() => navigate("/client/specialists")}
        >
          Meet our Specialists
        </button>
      </div>
    </div>
  );
}

export default CTASection;
