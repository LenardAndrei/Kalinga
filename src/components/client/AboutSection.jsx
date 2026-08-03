function AboutSection() {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "clamp(50px, 10vw, 90px) 20px",
      background: "#fff",
      fontFamily: "'Poppins', sans-serif",
    },
    title: {
      fontSize: "clamp(28px, 5vw, 40px)",
      fontWeight: "800",
      color: "#1a1a1a",
      marginBottom: "32px",
    },
    wrapper: {
      position: "relative",
      width: "100%",
      maxWidth: "1000px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    topCard: {
      position: "relative",
      zIndex: 2,
      width: "min(85%, 800px)", // Slightly wider for mobile comfort
      background: "#7FA8A7",
      borderRadius: "20px",
      padding: "clamp(24px, 5vw, 32px)",
      textAlign: "center",
      marginBottom: "-40px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    },
    topTitle: {
      fontSize: "clamp(16px, 2vw, 18px)",
      fontWeight: "800",
      color: "#fff",
      margin: "0 0 12px 0",
      textTransform: "uppercase",
    },
    topText: {
      fontSize: "clamp(14px, 2vw, 16px)",
      color: "#fff",
      lineHeight: 1.6,
      margin: 0,
    },
    bottomCard: {
      position: "relative",
      zIndex: 1,
      width: "100%",
      background: "#D2E4E8",
      borderRadius: "24px",
      padding: "clamp(60px, 8vw, 80px) 20px clamp(30px, 5vw, 40px)",
      display: "flex",
      flexWrap: "wrap", // This is the magic fix for responsiveness
      justifyContent: "center",
      alignItems: "stretch",
      gap: "20px",
    },
    section: {
      flex: "1 1 300px", // Grows, shrinks, but tries to stay at least 300px
      padding: "20px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    sectionTitle: {
      fontSize: "clamp(16px, 2vw, 18px)",
      fontWeight: "800",
      color: "#1a1a1a",
      marginBottom: "12px",
    },
    sectionText: {
      fontSize: "clamp(14px, 2vw, 16px)",
      color: "#333",
      lineHeight: 1.6,
      margin: 0,
    },
    
    divider: {
      width: "1px",
      background: "rgba(3, 41, 50, 0.2)",
      margin: "20px 0",
      display: window.innerWidth < 768 ? "none" : "block", 
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>About Us</h2>
      <div style={styles.wrapper}>
        
        <div style={styles.topCard}>
          <p style={styles.topTitle}>Who We Are</p>
          <p style={styles.topText}>
            KALINGA is a community-centered healthcare portal developed to improve
            access to local health services at the barangay level. Our goal is to bridge
            residents and healthcare providers through a simple and reliable digital platform.
          </p>
        </div>

        <div style={styles.bottomCard}>
          <div style={styles.section}>
            <p style={styles.sectionTitle}>Our Mission</p>
            <p style={styles.sectionText}>
              To make local healthcare services more accessible,
              organized, and transparent for every member of the community.
            </p>
          </div>

          <div style={styles.divider} />

          <div style={styles.section}>
            <p style={styles.sectionTitle}>Our Vision</p>
            <p style={styles.sectionText}>
              To become a trusted digital healthcare support
              system that strengthens community health management
              and improves service efficiency at the barangay level.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


export default AboutSection