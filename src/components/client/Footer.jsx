import logo from "../../assets/LOGO.svg"
import facebookIcon from "../../assets/facebook.svg"
import instagramIcon from "../../assets/instagram.svg"
import emailIcon from "../../assets/email.svg"
import locationIcon from "../../assets/location.svg"
import phoneIcon from "../../assets/phone.svg"
import clockIcon from "../../assets/clock.svg"

function Footer() {
  const styles = {
    footer: {
      background: "#7FA8A7",
      padding: "48px 80px 0px",
      fontFamily: "'Poppins', sans-serif",
      color: "#fff",
    },
    topSection: {
      marginBottom: "40px",
    },
    title: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "8px",
    },
    titleName: {
      fontSize: "36px",
      fontWeight: "750",
      color: "#fff",
      margin: 0,
    },
    tagline: {
      fontSize: "16px",
      fontWeight: "700",
      color: "#fff",
      margin: 0,
    },
    infoGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "100px",
      padding: "32px 0",
    },
    infoItem: {
      display: "flex",
      justifyContent: "center",
      gap: "14px",
    },
    iconBox: {
      width: "32px",
      height: "32px",
      flexShrink: 0,
      marginTop: "2px",
    },
    infoLabel: {
      fontSize: "16px",
      fontWeight: "800",
      color: "#fff",
      margin: "0 0 4px 0",
    },
    infoText: {
      fontSize: "13px",
      color: "#fff",
      margin: 0,
      lineHeight: 1.6,
    },
    socialRow: {
      display: "flex",
      gap: "12px",
      marginTop: "12px",
    },
    socialIcon: {
      width: "32px",
      height: "32px",
      cursor: "pointer",
    },
    privacySection: {
      padding: "20px 0 24px",
      textAlign: "center",
    },
    privacyTitle: {
      fontSize: "13px",
      fontWeight: "800",
      color: "#fff",
      margin: "0 0 6px 0",
    },
    privacyText: {
      fontSize: "12px",
      color: "rgba(255,255,255,0.85)",
      lineHeight: 1.7,
      margin: 0,
      maxWidth: "500px",
      marginLeft: "auto",
      marginRight: "auto",
    },
  }

  return (
    <footer style={styles.footer}>

      {/* TITLE */}
      <div style={styles.topSection}>
        <div style={styles.title}>
          <img src={logo} alt="Kalinga Logo" style={{ width: "42px" }} />
          <h3 style={styles.titleName}>Kalinga</h3>
        </div>
        <p style={styles.tagline}>Bringing care closer to you.</p>
      </div>

      {/* INFO GRID */}
      <div style={styles.infoGrid}>

        {/* ADDRESS */}
        <div style={styles.infoItem}>
          <img src={locationIcon} alt="Location Icon" style={styles.iconBox} />
          <div>
            <p style={styles.infoLabel}>Main Office Address:</p>
            <p style={styles.infoText}>
              Batangas State University – Alangilan Campus, Alangilan,<br />Batangas
            </p>
          </div>
        </div>

        {/* PHONE */}
        <div style={styles.infoItem}>
          <img src={phoneIcon} alt="Phone Icon" style={styles.iconBox} />
          <div>
            <p style={styles.infoLabel}>Phone:</p>
            <p style={styles.infoText}>
              +63 9XX XXX XXXX<br />(042) XXX XXXX
            </p>
          </div>
        </div>

        {/* EMAIL + SOCIAL */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={styles.infoItem}>
            <img src={emailIcon} alt="Email Icon" style={styles.iconBox} />
            <div>
              <p style={styles.infoLabel}>Email:</p>
              <p style={styles.infoText}>
                support@kalingahealth.ph<br />kalinga.support@gmail.com
              </p>
            </div>
          </div>

          {/* SOCIAL ICONS */}
          <div style={{ ...styles.socialRow, marginLeft: "100px" }}>
            {/* Facebook — replace with your icon */}
            <img src={facebookIcon} alt="Facebook Icon" style={styles.socialIcon} />
            {/* Instagram — replace with your icon */}
            <img src={instagramIcon} alt="Instagram Icon" style={styles.socialIcon} />
          </div>
        </div>

      </div>

      {/* OFFICE HOURS — sits below address in same left column feel */}
      <div style={{
        display: "flex",
        gap: "14px",
        alignItems: "flex-start",
        marginTop: "-30px",
        marginBottom: "32px",
      }}>
        <img src={clockIcon} alt="Clock Icon" style={{ width: "32px", height: "32px", flexShrink: 0, marginTop: "2px" }} />
        <div>
          <p style={styles.infoLabel}>Office Hours:</p>
          <p style={styles.infoText}>Monday – Friday | 8:00 AM – 5:00 PM</p>
        </div>
      </div>

      {/* PRIVACY NOTICE */}
      <div style={styles.privacySection}>
        <p style={styles.privacyTitle}>Privacy Notice</p>
        <p style={styles.privacyText}>
          KALINGA respects your privacy. All personal information submitted through this portal is
          handled in accordance with data protection policies and is used only for healthcare service purposes.
        </p>
      </div>

    </footer>
  )
}

export default Footer