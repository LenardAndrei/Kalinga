import { Outlet, useNavigate } from "react-router-dom";
import KalingaSidebar from "../components/HealthcareProvider/NavbarHC";

export default function HCLayout() {
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    const routes = {
      dashboard:     "/hc/dashboard",
      facility:      "/hc/facility-profile",
      services:      "/hc/services",
      appointments:  "/hc/appointments",
      events:        "/hc/events",
      announcements: "/hc/announcements",
      reviews:       "/hc/reviews",
    };
    if (routes[id]) navigate(routes[id]);
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", backgroundColor: "#EDEDED" }}>
      <KalingaSidebar
        facilityName="Brgy. San Isidro Health Center"
        onNavigate={handleNavigate}
        onLogout={() => navigate("/login")}
      />
      <main style={{ flex: 1, overflowY: "auto", padding: "20px 20px 20px 44px" }}>
        <Outlet />
      </main>
    </div>
  );
}