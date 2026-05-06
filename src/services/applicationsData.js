export const doctorApplications = [
  { id: 1, name: "Dr. Jose Rizal",    specialty: "Ophthalmologist", dateApplied: "05/20/2026", status: "Pending"  },
  { id: 2, name: "Dr. Kwak Kwak",     specialty: "Dentist",         dateApplied: "05/20/2026", status: "Pending"  },
  { id: 3, name: "Dr. Kwek Kwek",     specialty: "Dentist",         dateApplied: "05/20/2026", status: "Decline"  },
  { id: 4, name: "Dr. Ada Loveyou",   specialty: "OB-GYN",          dateApplied: "05/20/2026", status: "Accepted" },
]

export function getDoctorApplications() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(doctorApplications), 300)
  })
}

export const healthcareApplications = [
  { id: 1, name: "Brgy San Isidro Health Center", location: "Bauan, Batangas", dateApplied: "03/21/2025", status: "Accepted"  },
  { id: 2, name: "Kalinga Pharmacy", location: "Alangilan, Batangas", dateApplied: "04/1/2026", status: "Accepted"  },
]

export function getHealthcareApplications() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(healthcareApplications), 300)
  })
}