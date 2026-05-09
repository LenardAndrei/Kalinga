import logo from "../../assets/colored-logo.svg"

/* ── Styles ── */
const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "16px 32px",
    background: "transparent",
  },
  logo: {
    width: "48px",
    height: "48px",
    objectFit: "contain",
  },
  brand: {
    fontSize: "28px",
    fontWeight: "900",
    color: "#032932",
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "0.1px",
    margin: 0,
  },
}

/* ── Component ── */
function RegisterHeader() {
  return (
      <header style={styles.header}>
        <img
            src={logo}
            alt="Kalinga Logo"
            style={styles.logo}
        />
        <h1 style={styles.brand}>KALINGA</h1>
      </header>
  )
}

export default RegisterHeader
