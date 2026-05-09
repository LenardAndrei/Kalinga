import RatingCard from "../../components/HealthcareProvider/RatingCard";
import RecentAnnouncement from "../../components/HealthcareProvider/RecentAnnouncementCard";
import ServicesOfferedCard from "../../components/HealthcareProvider/ServicesOfferedSummaryCard";
import UpcomingEventsCard from "../../components/HealthcareProvider/UpcomingEventsCard";
import Pharmacy from "../../components/HealthcareProvider/DashboardServiceComponents/Pharmacy";
import Laboratory from "../../components/HealthcareProvider/DashboardServiceComponents/Laboratory";
import Consultation from "../../components/HealthcareProvider/DashboardServiceComponents/Consultation";

const mockAccount = {
  modules: ["pharmacy", "laboratory", "consultation"]
};

const moduleComponents = {
  pharmacy: <Pharmacy />,
  laboratory: <Laboratory />,
  consultation: <Consultation />,
};

export default function Dashboard() {
  return (
    <>
      <style>{`
        .dashboard-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          align-items: stretch;
          margin-bottom: 20px;
        }

        .dashboard-cards-grid > .card-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Each card fills its column's height equally */
        .dashboard-cards-grid > .card-col > * {
          flex: 1;
          height: 100%;
        }

        /* Collapse to single column on narrow screens */
        @media (max-width: 768px) {
          .dashboard-cards-grid {
            grid-template-columns: 1fr;
          }

          /* On mobile, cards don't need to stretch-match — stack naturally */
          .dashboard-cards-grid > .card-col > * {
            flex: none;
            height: auto;
          }
        }

        .dashboard-title {
          font-family: Poppins, sans-serif;
          font-weight: 900;
          font-size: clamp(28px, 6vw, 48px);
          margin-bottom: 20px;
          margin-top: 0;
          background: linear-gradient(to right, #032932, #5fc6a0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
          line-height: 1.2;
        }

        .modules-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        @media (max-width: 480px) {
          .modules-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <h1 className="dashboard-title">Dashboard</h1>

      <div className="dashboard-cards-grid">
        <div className="card-col">
          <RatingCard facilityId="brgy-san-isidro" />
          <ServicesOfferedCard />
        </div>
        <div className="card-col">
          <UpcomingEventsCard />
          <RecentAnnouncement />
        </div>
      </div>

      <div className="modules-grid">
        {mockAccount.modules.map((mod) =>
          moduleComponents[mod]
            ? <div key={mod}>{moduleComponents[mod]}</div>
            : null
        )}
      </div>
    </>
  );
}