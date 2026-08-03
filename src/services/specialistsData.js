import doctorImg from "../assets/doctor.png"  
import lenardImg from "../assets/lenard-formal.jpg"
import adaloveyouImg from "../assets/adaloveyou.png"
import ledoctorImg from "../assets/ledoctor.jpg"
import lameloImg from "../assets/lamelo.jpg"
import kyrieImg from "../assets/kyrie.jpg"
import durantImg from "../assets/durant.jpg"
import curryImg from "../assets/curry.png"
import bronnyImg from "../assets/bronny.jpg"

export const specialistsData = [
  {
    id: 1,
    name: "Dr. Lenard Panganiban",
    specialist: "Dentist",
    specialization: "Dentist",
    subspecialty: "Oral Surgery",
    licenseNumber: "1234-90",
    yearsOfPractice: 5,
    contactNumber: "0999-123-4567",
    email: "lenard.panganiban@example.com",
    image: lenardImg,
    schedule: [
      { day: "Monday", time: "10:00 AM - 4:00 PM" },
      { day: "Wednesday", time: "10:00 AM - 4:00 PM" },
      { day: "Friday", time: "10:00 AM - 4:00 PM" },
    ],
  },
  {
    id: 2,
    name: "Dr. Josephine Bracken",
    specialist: "Pediatrician",
    specialization: "Pediatrician",
    subspecialty: "Child Wellness",
    licenseNumber: "2234-11",
    yearsOfPractice: 8,
    contactNumber: "0998-222-3344",
    email: "josephine.bracken@example.com",
    image: doctorImg,
    schedule: [
      { day: "Tuesday", time: "9:00 AM - 3:00 PM" },
      { day: "Thursday", time: "9:00 AM - 3:00 PM" },
      { day: "Saturday", time: "9:00 AM - 1:00 PM" },
    ],
  },
  {
    id: 3,
    name: "Dr. Ada Loveyou",
    specialist: "OB-GYN",
    specialization: "OB-GYN",
    subspecialty: "Women�s Health",
    licenseNumber: "3344-55",
    yearsOfPractice: 7,
    contactNumber: "0997-333-5566",
    email: "ada.laveyou@example.com",
    image: adaloveyouImg,
    schedule: [
      { day: "Monday", time: "11:00 AM - 5:00 PM" },
      { day: "Wednesday", time: "11:00 AM - 5:00 PM" },
      { day: "Friday", time: "11:00 AM - 5:00 PM" },
    ],
  },
  {
    id: 4,
    name: "Dr. LeBron James",
    specialist: "Physical Therapist",
    specialization: "Physical Therapist",
    subspecialty: "Patient Care",
    licenseNumber: "4455-66",
    yearsOfPractice: 6,
    contactNumber: "0996-444-7788",
    email: "jenha.lalu@example.com",
    image: ledoctorImg,
    schedule: [
      { day: "Tuesday", time: "8:00 AM - 2:00 PM" },
      { day: "Thursday", time: "8:00 AM - 2:00 PM" },
    ],
  },
  {
    id: 5,
    name: "Dr. Lamelo Ball",
    specialist: "Pediatrician",
    specialization: "Pediatrician",
    subspecialty: "Infant Care",
    licenseNumber: "5566-77",
    yearsOfPractice: 9,
    contactNumber: "0995-555-8899",
    email: "marissa.santos@example.com",
    image: lameloImg,
    schedule: [
      { day: "Monday", time: "10:00 AM - 4:00 PM" },
      { day: "Friday", time: "10:00 AM - 4:00 PM" },
    ],
  },
  {
    id: 6,
    name: "Dr. Kyrie Irving",
    specialist: "Dentist",
    specialization: "Dentist",
    subspecialty: "Cosmetic Dentistry",
    licenseNumber: "6677-88",
    yearsOfPractice: 10,
    contactNumber: "0994-666-9900",
    email: "tomas.villar@example.com",
    image: kyrieImg,
    schedule: [
      { day: "Wednesday", time: "10:00 AM - 4:00 PM" },
      { day: "Saturday", time: "10:00 AM - 2:00 PM" },
    ],
  },
  {
    id: 7,
    name: "Dr. Kevin Durant",
    specialist: "Dentist",
    specialization: "Dentist",
    subspecialty: "Cosmetic Dentistry",
    licenseNumber: "7788-99",
    yearsOfPractice: 4,
    contactNumber: "0993-777-0011",
    email: "althea.cruz@example.com",
    image: durantImg,
    schedule: [
      { day: "Tuesday", time: "10:00 AM - 4:00 PM" },
      { day: "Thursday", time: "10:00 AM - 4:00 PM" },
    ],
  },
  {
    id: 8,
    name: "Dr. Stephen Curry",
    specialist: "Pediatrician",
    specialization: "Pediatrician",
    subspecialty: "Adolescent Medicine",
    licenseNumber: "8899-00",
    yearsOfPractice: 6,
    contactNumber: "0992-888-1122",
    email: "rico.valdez@example.com",
    image: curryImg,
    schedule: [
      { day: "Monday", time: "8:00 AM - 2:00 PM" },
      { day: "Thursday", time: "8:00 AM - 2:00 PM" },
    ],
  },
  {
    id: 9,
    name: "Dr. Bronny James",
    specialist: "Neurologist",
    specialization: "Neurologist",
    subspecialty: "Brain Disorders",
    licenseNumber: "9900-11",
    yearsOfPractice: 8,
    contactNumber: "0991-999-2233",
    email: "aileen.reyes@example.com",
    image: bronnyImg,
    schedule: [
      { day: "Wednesday", time: "9:00 AM - 3:00 PM" },
      { day: "Friday", time: "9:00 AM - 3:00 PM" },
    ],
  },
  {
    id: 10,
    name: "Dr. Jorge Mercado",
    specialist: "Cardiologist",
    specialization: "Cardiologist",
    subspecialty: "Heart Care",
    licenseNumber: "1011-22",
    yearsOfPractice: 11,
    contactNumber: "0990-101-3344",
    email: "jorge.mercado@example.com",
    image: ledoctorImg,
    schedule: [
      { day: "Monday", time: "12:00 PM - 6:00 PM" },
      { day: "Thursday", time: "12:00 PM - 6:00 PM" },
    ],
  },
  {
    id: 11,
    name: "Dr. Josephine Bracken",
    specialist: "Pediatrician",
    specialization: "Pediatrician",
    subspecialty: "Nutrition",
    licenseNumber: "1213-23",
    yearsOfPractice: 7,
    contactNumber: "0989-121-5566",
    email: "josephine.bracken2@example.com",
    image: lenardImg,
    schedule: [
      { day: "Tuesday", time: "10:00 AM - 4:00 PM" },
      { day: "Saturday", time: "9:00 AM - 1:00 PM" },
    ],
  },
  {
    id: 12,
    name: "Dr. Ada Laveyou",
    specialist: "OB-GYN",
    specialization: "OB-GYN",
    subspecialty: "Prenatal Care",
    licenseNumber: "1415-24",
    yearsOfPractice: 12,
    contactNumber: "0988-131-6677",
    email: "ada.laveyou2@example.com",
    image: kyrieImg,
    schedule: [
      { day: "Friday", time: "10:00 AM - 4:00 PM" },
      { day: "Sunday", time: "10:00 AM - 2:00 PM" },
    ],
  },
  {
    id: 13,
    name: "Dr. Jenha Lalu",
    specialist: "Registered Nurse",
    specialization: "Registered Nurse",
    subspecialty: "Critical Care",
    licenseNumber: "1617-25",
    yearsOfPractice: 5,
    contactNumber: "0987-141-7788",
    email: "jenja.lalu2@example.com",
    image: curryImg,
    schedule: [
      { day: "Wednesday", time: "8:00 AM - 2:00 PM" },
      { day: "Friday", time: "8:00 AM - 2:00 PM" },
    ],
  },
  {
    id: 14,
    name: "Dr. Lea Santos",
    specialist: "Dentist",
    specialization: "Dentist",
    subspecialty: "Family Dentistry",
    licenseNumber: "1819-26",
    yearsOfPractice: 6,
    contactNumber: "0986-151-8899",
    email: "lea.santos@example.com",
    image: durantImg,
    schedule: [
      { day: "Tuesday", time: "11:00 AM - 5:00 PM" },
      { day: "Thursday", time: "11:00 AM - 5:00 PM" },
    ],
  },
]

export const specialistCategories = [
  "All",
  "Pediatrician",
  "Dentist",
  "OB-GYN",
  "Cardiologist",
  "Registered Nurse",
  "Neurologist"
]

export function getSpecialists() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(specialistsData), 400)
  })
}

export function getSpecialistById(id) {
  const numericId = Number(id)
  return specialistsData.find((specialist) => specialist.id === numericId) || null
}

