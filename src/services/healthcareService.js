import sanIsidroImg from "../assets/san_isidro.png"

const healthcareServices = [
  {
    id: 1,
    name: "Brgy. San Isidro Health Center",
    location: "Mauban",
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
    name: "Brgy. San Isidro Health Center",
    location: "Quezon",
    services: "Immunization, Consultation",
    time: "9:00 am - 5:00 pm",
    status: "Closing",
    type: "Clinic",
    cost: "Paid",
    rating: 3,
    image: sanIsidroImg,
  },
  {
    id: 3,
    name: "Brgy. San Isidro Health Center",
    location: "Mauban",
    services: "Immunization, Consultation",
    time: "",
    status: "Open",
    type: "Hospital",
    cost: "Free",
    rating: 5,
    image: sanIsidroImg,
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