import bgBuilding from "../../assets/building.jpg";

function Home() {
  const styles = {
    hero: {
      position: "relative",
      height: "100vh", 
      width: "100vw",
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
    },
    bgImage: {
      position: "absolute",
      inset: 0,
      backgroundImage: `url(${bgBuilding})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      zIndex: 0,
    },
    overlay: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to right, rgba(20,60,55,0.88) 55%, rgba(20,60,55,0.4))",
      zIndex: 1,
    },
    content: {
      position: "relative",
      zIndex: 2,
      padding: "60px 80px",
      maxWidth: "560px",
    },
    title: {
      fontSize: "clamp(2rem, 10vw, 3rem)",
      fontWeight: 800,
      fontFamily: "'Poppins', sans-serif",
      color: "#fff",
      lineHeight: 1.1,
      marginBottom: "20px",
    },
    desc: {
      color: "rgba(255,255,255,0.8)",
      fontSize: "14px",
      fontFamily: "'Poppins', sans-serif",
      lineHeight: 1.7,
      marginBottom: "12px",
      maxWidth: "400px",
    },
    tagline: {
      color: "rgba(255,255,255,0.6)",
      fontSize: "13px",
      marginBottom: "36px",
    },
    ctaBtn: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      background: "#fff",
      color: "#1a3a3a",
      fontWeight: 700,
      fontSize: "15px",
      padding: "14px 28px",
      borderRadius: "50px",
      border: "none",
      cursor: "pointer",
    }
  };

  return (
    <div style={styles.hero}>
      <div style={styles.bgImage} />
      <div style={styles.overlay} />
      <div style={styles.content}>
        <h1 style={styles.title}>
          Your Community Health,<br />One Click Away.
        </h1>
        <p style={styles.desc}>
          KALINGA is a local healthcare portal designed to connect residents
          with their barangay health services. From checking clinic schedules
          to booking doctor appointments, KALINGA makes healthcare access
          simple, organized, and convenient.
        </p>
        <p style={styles.tagline}>Bringing care closer to every home.</p>
        <button style={styles.ctaBtn}>
          Get Started →
        </button>
      </div>
    </div>
  );
}

export default Home