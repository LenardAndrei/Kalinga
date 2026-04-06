
import sanIsidroImg from "../assets/san_isidro.png"

const healthcareServices = [
  {
    id: 1,
    name: "Brgy. San Isidro Health Center",
    location: "Brgy. San Isidro, Mauban, Quezon",
    services: "General Consultation, Immunization, ...",
    time: "",
    status: "open",       // "open" or "closing"
    image: sanIsidroImg,
  },
  {
    id: 2,
    name: "Brgy. San Isidro Health Center",
    location: "Brgy. San Isidro, Mauban, Quezon",
    services: "Immunization, Consultation",
    time: "9:00 am - 5:00 pm",
    status: "closing",
    image: sanIsidroImg,
  },
  {
    id: 3,
    name: "Brgy. San Isidro Health Center",
    location: "Brgy. San Isidro, Mauban, Quezon",
    services: "Immunization, Consultation",
    time: "",
    status: "open",
    image: sanIsidroImg,
  },
]

export function getHealthcareServices() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(healthcareServices), 500)
  })
}