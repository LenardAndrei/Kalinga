function AboutSection() {

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "clamp(50px, 15vw, 90px) clamp(20px, 10vw, 40px)",
      background: "#fff",
      fontFamily: "'Poppins', sans-serif",
    },

    title: {
      fontSize: "clamp(24px, 5vw, 40px)",
      fontWeight: "800",
      color: "#1a1a1a",
      marginBottom: "32px",
    },

    wrapper: {
      position: "relative",
      width: "100%",
      maxWidth: "min(1000px, 90vw)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    topCard: {
      position: "relative",
      zIndex: 2,
      width: "min(75%, 90vw)",
      background: "#7FA8A7",
      borderRadius: "20px",
      padding: "clamp(16px, 5vw, 32px) clamp(24px, 10vw, 48px)",
      textAlign: "center",
      marginBottom: "-40px",
    },

    topTitle: {
      fontSize: "18px",
      fontWeight: "800",
      color: "#fff",
      margin: "0 0 18px 0",
    },

    topText: {
      fontSize: "16px",
      fontWeight: "400",
      color: "#fff",
      lineHeight: 1.7,
      margin: 0,
    },

    bottomCard: {
      position: "relative",
      zIndex: 1,
      width: "100%",
      background: "#D2E4E8",
      borderRadius: "20px",
      padding: "clamp(40px, 10vw, 65px) 0px clamp(20px, 5vw, 36px)",
      display: "flex",
      flexDirection: window.innerWidth < 768 ? "column" : "row",
      alignItems: "flex-start",
    },

    section: {
      flex: 1,
      padding: "clamp(20px, 5vw, 40px) 40px",
      textAlign: "center",
    },

    sectionTitle: {
      fontSize: "18px",
      fontWeight: "800",
      color: "#1a1a1a",
      marginBottom: "16px",
    },

    sectionText: {
      fontSize: "16px",
      fontWeight: "400",
      color: "#333",
      lineHeight: 1.7,
      margin: 0,
    },

    divider: {
      width: window.innerWidth < 768 ? "80%" : "1px",
      height: window.innerWidth < 768 ? "1px" : "auto",
      alignSelf: "stretch",
      background: "#032932",
      margin: window.innerWidth < 768 ? "20px 0" : "8px 0",
    }
  }

  return (
    <div style={styles.container}>

      <h2 style={styles.title}>About Us</h2>

      <div style={styles.wrapper}>

        {/* TOP CARD */}
        <div style={styles.topCard}>
          <p style={styles.topTitle}>Who We Are</p>
          <p style={styles.topText}>
            KALINGA is a community-centered healthcare portal developed to improve
            access to local health services at the barangay level. Our goal is to bridge
            residents and healthcare providers through a simple and reliable digital platform.
          </p>
        </div>

        {/* BOTTOM CARD */}
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