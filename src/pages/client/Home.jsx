import bgBuilding from "../../assets/building.jpg";
import ServiceSlider from "../../components/client/ServiceSlider";
import AboutSection from "../../components/client/AboutSection";
import CTASection from "../../components/client/CTASection";

function Home() {
  const styles = {
    hero: {
      position: "relative",
      height: "100vh", 
      width: "100%",
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
      margin: 0,
      padding: 0,
    },
    bgImage: {
      position: "absolute",
      inset: 0,
      backgroundImage: `url(${bgBuilding})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      zIndex: 0,
      borderRadius: "0 0 20px 20px",
    },
    overlay: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to top, rgba(20,60,55,0.88) 3%, rgba(20,60,55,0.2))",
      zIndex: 1,
      borderRadius: "0 0 20px 20px",
    },
    content: {
      position: "relative",
      zIndex: 2,
      padding: "60px 80px",
      maxWidth: "800px",
    },
    title: {
      fontSize: "clamp(2rem, 2.5vw, 5rem)",
      fontWeight: 800,
      fontFamily: "'Poppins', sans-serif",
      color: "#fff",
      lineHeight: 1.2,
      marginBottom: "30px",
    },
    desc: {
      color: "rgba(255,255,255,0.8)",
      fontSize: "clamp(15px, 1.2vw, 16px)",
      fontFamily: "'Poppins', sans-serif",
      lineHeight: 1.7,
      marginBottom: "20px",
      maxWidth: "500px",
    },
    tagline: {
      color: "rgba(255,255,255,0.8)",
      fontSize: "clamp(15px, 1.2vw, 16px)",
      fontFamily: "'Poppins', sans-serif",
      marginBottom: "36px",
    },
    ctaBtn: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      background: "#fff",
      color: "#1a3a3a",
      fontWeight: 800,
      fontSize: "25px",
      padding: "14px 28px",
      borderRadius: "50px",
      border: "none",
      cursor: "pointer",
    }
  };

  return (
    <>
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

      <ServiceSlider />
      <AboutSection />
      <CTASection />
    </>

  );
}

export default Home