import sanIsidroImg from "../assets/san_isidro2.png"
import vaccineImg from "../assets/vaccines.png"
import consultationImg from "../assets/consultation.png"
import familyPlanningImg from "../assets/family-planning.png"
import firstAidImg from "../assets/first-aid.jpg"
import dentalImg from "../assets/dental-service.jpg"
import spongebobImg from "../assets/spongebob.png"
import patrickImg from "../assets/patrick-star.png"
import sandyImg from "../assets/sandy.png"
import squidwardImg from "../assets/squidward.png"
import krabsImg from "../assets/mrkrabs.png"
import medicineImg from "../assets/medicine.png"

export const facilityData = {
  name: "Brgy. San Isidro Health Center",
  fullName: "San Isidro Barangay Health Center",
  location: "Brgy. San Isidro, Mauban, Quezon",
  status: "open",
  image: sanIsidroImg,
  phone: "(042) 555-2034",
  email: "sanisidro.health@kalinga.ph",
  facebook: "San Isidro Page - Facebook",
  instagram: "San Isidro Page - Instagram",
  clinicHours: [
    { day: "Monday – Friday", time: "8:00 AM – 5:00 PM" },
    { day: "Saturday", time: "8:00 AM – 12:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
}

export const servicesData = [
  { id: 1, name: "Immunization",    tags: ["Anti-flu", "MMR", "..."],          image: vaccineImg },
  { id: 2, name: "Consultation",    tags: ["General Checkup", "Fever + Cough"], image: consultationImg },
  { id: 3, name: "Family Planning", tags: ["Birth Control", "Counseling"],      image: familyPlanningImg },
  { id: 4, name: "Basic First Aid", tags: ["Wound Care", "Minor Burns"],        image: firstAidImg },
  { id: 5, name: "Dental Service",  tags: ["Wound Care", "Minor Burns"],        image: dentalImg },
]

export const officersData = [
  { id: 1, name: "Spongebob Squarpants", role: "General Physician",   image: spongebobImg },
  { id: 2, name: "Patrick Star",         role: "Dentist",             image: patrickImg },
  { id: 3, name: "Sandy Cheeks",         role: "Public Health Nurse", image: sandyImg },
  { id: 4, name: "Squidward Tentacles",  role: "Clinic Receptionist", image: squidwardImg },
  { id: 5, name: "Mr. Krabs",            role: "Clinic Administrator",image: krabsImg },
]

export const emergencyData = {
  facilityName: "San Isidro Barangay Health Center",
  ambulance: "0917-800-1122",
  nearestHospital: "Mauban District Hospital",
  distance: "2.5 km away",
}

export const eventsData = {
  month: "April, 2026",
  events: [
    {
      id: 1,
      day: 5,
      month: "April",
      title: "Child Immunization",
      time: "8:00 am – 12:30 pm",
      location: "San Isidro Covered Court",
      description: "Free vaccines for infants and children including measles, polio, and BCG. Please bring the child's vaccination card.",
      organizer: "Barangay Health Office",
      color: "#f59e0b",
    },
    {
      id: 2,
      day: 15,
      month: "April",
      title: "Prenatal Checkup Clinic",
      time: "9:00 AM – 3:00 PM",
      location: "Maternal Care Room, Health Center",
      description: "Free prenatal consultation for pregnant mothers including blood pressure monitoring and nutritional advice.",
      organizer: "Municipal Health Office",
      color: "#c084fc",
    },
    {
      id: 3,
      day: 21,
      month: "April",
      title: "Senior Citizen Health Screening",
      time: "8:00 AM – 11:00 AM",
      location: "Barangay Covered Court",
      description: "Free health screening for senior citizens including blood pressure check, glucose testing, and medical consultation.",
      organizer: "Senior Citizens Association & Health Center",
      color: "#86efac",
    },
  ],
}

export const medicinesData = [
  { id: 1, name: "Amoxicillin",  available: true,  image: medicineImg },
  { id: 2, name: "Paracetamol",  available: true,  image: medicineImg },
  { id: 3, name: "Vitamin C",    available: false, image: medicineImg },
  { id: 4, name: "Ibuprofen",    available: true,  image: medicineImg },
  { id: 5, name: "ORS",          available: false, image: medicineImg },
]

export const ratingsData = {
  average: 4.5,
  total: 37,
  reviews: [
    { id: 1, name: "MH Ot",      stars: 5, comment: "Staff were very helpful and organized." },
    { id: 2, name: "Poison 13.", stars: 4, comment: "Staff were very helpful and organized." },
    { id: 3, name: "Tipsy D.",   stars: 3, comment: "Staff were very helpful and organized." },
  ],
}