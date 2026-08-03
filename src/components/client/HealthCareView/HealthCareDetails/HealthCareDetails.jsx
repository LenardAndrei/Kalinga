import HeroSection      from "./HeroSection"
import InfoSection      from "./InfoSection"
import ServicesOffered  from "./ServicesOffered"
import ClinicOfficers   from "./ClinicOfficers"
import EmergencyContact from "./EmergencyContact"
import EventCalendar    from "./EventCalendar"
import MedicineStock    from "./MedicineStock"
import RatingSection    from "./RatingSection"

import {
  facilityData,
  servicesData,
  officersData,
  emergencyData,
  eventsData,
  medicinesData,
  ratingsData,
} from "../../../../services/healthcareDetailData"

function HealthcareDetail() {
  return (
    <div style={{ background: "#fff", minHeight: "100vh", paddingBottom: "40px" }}>
      <HeroSection      facility={facilityData} />
      <InfoSection      facility={facilityData} />
      <ServicesOffered  services={servicesData} />
      <ClinicOfficers   officers={officersData} />
      <EmergencyContact data={emergencyData} />
      <EventCalendar    data={eventsData} />
      <MedicineStock    medicines={medicinesData} />
      <RatingSection    data={ratingsData} />
    </div>
  )
}

export default HealthcareDetail