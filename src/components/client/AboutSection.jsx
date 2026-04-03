function AboutSection() {

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "90px 40px",
      background: "#fff",
      fontFamily: "'Poppins', sans-serif",
    },

    title: {
      fontSize: "40px",
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
      width: "75%",
      background: "#7FA8A7",
      borderRadius: "20px",
      padding: "32px 48px",
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
      padding: "65px 0px 36px",
      display: "flex",
      alignItems: "flex-start",
    },

    section: {
      flex: 1,
      padding: "0 40px",
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
      width: "1px",
      alignSelf: "stretch",
      background: "#032932",
      margin: "8px 0",
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