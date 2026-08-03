import sanIsidroImg from "../assets/san_isidro.png"
import pharmacyImg from "../assets/pharmacy.jpg"
import klinikImg from "../assets/klinik.jpg"

const healthcareServices = [
  {
    id: 1,
    name: "Brgy. San Isidro Health Center",
    location: "Bauan, Batangas",
    services: "General Consultation, Immunization, ...",
    time: "",
    status: "Open",
    type: "Health Center",
    cost: "Free",
    rating: 4,
    image: sanIsidroImg,
  },
  {
    id: 2,
    name: "Kalinga Pharmacy",
    location: "Alangilan, Batangas City",
    services: "Immunization, Pharmaceutical",
    time: "9:00 am - 5:00 pm",
    status: "Closing",
    type: "Pharmacy",
    cost: "Paid",
    rating: 3,
    image: pharmacyImg,
  },
  {
    id: 3,
    name: "Klinik Clinic",
    location: "Bolbok, Batangas City",
    services: "Immunization, Consultation, Child Care, BP Monitoring",
    time: "",
    status: "Open",
    type: "Clinic",
    cost: "Free",
    rating: 5,
    image: klinikImg,
  },
]

export function getHealthcareServices() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(healthcareServices), 500)
  })
}

export function getServiceById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const service = healthcareServices.find((s) => s.id === parseInt(id))
      if (service) {
        resolve(service)
      } else {
        reject(new Error("Service not found"))
      }
    }, 300)
  })
}