import doctorImg from "../assets/doctor.png"  // replace with actual doctor images

export const specialistsData = [
  { id: 1,  name: "Dr. Lenard Panganiban",  specialist: "Dentist",           image: doctorImg },
  { id: 2,  name: "Dr. Josephine Bracken",  specialist: "Pediatrician",      image: doctorImg },
  { id: 3,  name: "Dr. Ada Laveyou",        specialist: "OB-GYN",            image: doctorImg },
  { id: 4,  name: "Dr. Jenha Lalu",         specialist: "Registered Nurse",  image: doctorImg },
  { id: 5,  name: "Dr. Lenard Panganiban",  specialist: "Pediatrician",      image: doctorImg },
  { id: 6,  name: "Dr. Lenard Panganiban",  specialist: "OB-GYN",            image: doctorImg },
  { id: 7,  name: "Dr. Lenard Panganiban",  specialist: "Dentist",           image: doctorImg },
  { id: 8,  name: "Dr. Lenard Panganiban",  specialist: "Pediatrician",      image: doctorImg },
  { id: 9,  name: "Dr. Lenard Panganiban",  specialist: "OB-GYN",            image: doctorImg },
  { id: 10, name: "Dr. Lenard Panganiban",  specialist: "Cardiologist",      image: doctorImg },
  { id: 11, name: "Dr. Josephine Bracken",  specialist: "Pediatrician",      image: doctorImg },
  { id: 12, name: "Dr. Ada Laveyou",        specialist: "OB-GYN",            image: doctorImg },
  { id: 13, name: "Dr. Jenha Lalu",         specialist: "Registered Nurse",  image: doctorImg },
  { id: 14, name: "Dr. Lenard Panganiban",  specialist: "Dentist",           image: doctorImg },
]

export const specialistCategories = [
  "All",
  "Pediatrician",
  "Dentist",
  "OB-GYN",
  "Cardiologist",
  "Registered Nurse",
]

export function getSpecialists() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(specialistsData), 400)
  })
}