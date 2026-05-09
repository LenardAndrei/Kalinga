import { useNavigate } from "react-router-dom";
import bgBuilding from "../../assets/building.jpg";
import ServiceSlider from "../../components/client/ServiceSlider";
import AboutSection from "../../components/client/AboutSection";
import CTASection from "../../components/client/CTASection";
import "./Home.css";

function Home() {

  const navigate = useNavigate();

  return (
    <>
      <div className="hero">
      <div className="bgImage" />
      <div className="overlay" />
      <div className="content">
        <h1 className="title">
          Your Community Health,<br />One Click Away.
        </h1>
        <p className="desc">
          KALINGA is a local healthcare portal designed to connect residents
          with their barangay health services. From checking clinic schedules
          to booking doctor appointments, KALINGA makes healthcare access
          simple, organized, and convenient.
        </p>
        <p className="tagline">Bringing care closer to every home.</p>
        <button 
          className="ctaBtn" 
          onClick={() => navigate("/login")}
        >
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