export const doctorApplications = [
  {
    id: 1,
    name: "Dr. Jose Rizal",
    specialty: "Ophthalmologist",
    clinicName: "Rizal Eye Clinic",
    dateApplied: "05/20/2026",
    status: "Pending",
    email: "jose.rizal@kalinga.ph",
    phone: "+63 917 555 0123",
    address: "Barangay 3, Lucena City, Quezon",
    licenseNumber: "PN 2021-8741",
    experience: "8 years",
    boardStatus: "Board Certified",
  },
  {
    id: 2,
    name: "Dr. Kwak Kwak",
    specialty: "Dentist",
    clinicName: "Kwak Dental Care",
    dateApplied: "05/20/2026",
    status: "Pending",
    email: "kwak.kwak@kalinga.ph",
    phone: "+63 917 555 0456",
    address: "Brgy. San Jose, Batangas City",
    licenseNumber: "PN 2019-6234",
    experience: "5 years",
    boardStatus: "Board Eligible",
  },
  {
    id: 3,
    name: "Dr. Kwek Kwek",
    specialty: "Dentist",
    clinicName: "Kwek Dental Studio",
    dateApplied: "05/20/2026",
    status: "Decline",
    email: "kwek.kwek@kalinga.ph",
    phone: "+63 917 555 0789",
    address: "Brgy. Poblacion, Batangas City",
    licenseNumber: "PN 2020-4419",
    experience: "4 years",
    boardStatus: "Board Certified",
  },
  {
    id: 4,
    name: "Dr. Ada Loveyou",
    specialty: "OB-GYN",
    clinicName: "Love & Life Maternity",
    dateApplied: "05/20/2026",
    status: "Accepted",
    email: "ada.loveyou@kalinga.ph",
    phone: "+63 917 555 0321",
    address: "Brgy. Malvar, Batangas City",
    licenseNumber: "PN 2018-9023",
    experience: "10 years",
    boardStatus: "Board Certified",
  },
]

export function getDoctorApplications() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(doctorApplications), 300)
  })
}

export const healthcareApplications = [
  {
    id: 1,
    name: "Brgy San Isidro Health Center",
    location: "Bauan, Batangas",
    dateApplied: "03/21/2025",
    status: "Accepted",
    contactPerson: "Mariel Cruz",
    email: "sanisidro.health@kalinga.ph",
    phone: "+63 917 555 0999",
    facilityType: "Community Health Center",
    bedCapacity: "25 beds",
    servicesOffered: "Outpatient care, maternal support, vaccination",
    accreditation: "CHD Accredited",
  },
  {
    id: 2,
    name: "Kalinga Pharmacy",
    location: "Alangilan, Batangas",
    dateApplied: "04/1/2026",
    status: "Accepted",
    contactPerson: "Jonah Santos",
    email: "kalinga.pharmacy@kalinga.ph",
    phone: "+63 917 555 0111",
    facilityType: "Pharmacy",
    bedCapacity: "N/A",
    servicesOffered: "Prescription fulfillment, health monitoring, consultation",
    accreditation: "FDA Licensed",
  },
]

export function getHealthcareApplications() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(healthcareApplications), 300)
  })
}
