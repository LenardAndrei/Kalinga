import RatingCard from "../../components/HealthcareProvider/RatingCard";
import RecentAnnouncement from "../../components/HealthcareProvider/RecentAnnouncementCard";
import ServicesOfferedCard from "../../components/HealthcareProvider/ServicesOfferedSummaryCard";
import UpcomingEventsCard from "../../components/HealthcareProvider/UpcomingEventsCard";
import Pharmacy from "../../components/HealthcareProvider/DashboardServiceComponents/Pharmacy";
import Laboratory from "../../components/HealthcareProvider/DashboardServiceComponents/Laboratory";

const mockAccount = {
  modules: ["pharmacy", "laboratory"],
};

const moduleComponents = {
  pharmacy: <Pharmacy />,
  laboratory: <Laboratory />,
};

export default function Dashboard() {
  return (
    <>
      <h1 style={{
        fontFamily: "Poppins, sans-serif",
        fontWeight: 900,
        fontSize: "48px",
        marginBottom: 20,
        background: "linear-gradient(to right, #032932, #5fc6a0)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline-block",
      }}>
        Dashboard
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        alignItems: "start",
        marginBottom: "20px",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <RatingCard facilityId="brgy-san-isidro" />
          <ServicesOfferedCard />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <UpcomingEventsCard />
          <RecentAnnouncement />
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "20px",
      }}>
        {mockAccount.modules.map((mod) =>
          moduleComponents[mod]
            ? <div key={mod}>{moduleComponents[mod]}</div>
            : null
        )}
      </div>
    </>
  );
}