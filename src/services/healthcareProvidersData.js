export const healthcareProviders = [
  {
    id: 1,
    name: "St. Mary Health Center",
    specialty: "Primary Care",
    status: "Active",
    email: "contact@stmaryhealth.ph",
    phone: "+63 917 000 1111",
    address: "Lipa City, Batangas",
    facilityType: "Community Health Center",
    accreditation: "PhilHealth Accredited",
    manager: "Atty. Maria Santos",
  },
  {
    id: 2,
    name: "Barangay San Isidro Clinic",
    specialty: "Family Medicine",
    status: "Active",
    email: "info@sanisidroclinic.ph",
    phone: "+63 917 000 2222",
    address: "Brgy. San Isidro, Batangas City",
    facilityType: "Barangay Clinic",
    accreditation: "DOH Registered",
    manager: "Mr. Jose Reyes",
  },
  {
    id: 3,
    name: "Kalinga Pharmacy and Care",
    specialty: "Outpatient Services",
    status: "Inactive",
    email: "hello@kalingapharmacy.ph",
    phone: "+63 917 000 3333",
    address: "Alangilan, Batangas City",
    facilityType: "Pharmacy Clinic",
    accreditation: "PhilHealth Accredited",
    manager: "Dr. Gina Dela Cruz",
  },
  {
    id: 4,
    name: "HeartCare Diagnostic Center",
    specialty: "Cardiology",
    status: "Active",
    email: "support@heartcare.ph",
    phone: "+63 917 000 4444",
    address: "Bauan, Batangas",
    facilityType: "Diagnostic Center",
    accreditation: "Private Health Network",
    manager: "Engr. Renato Tan",
  },
]

export function getHealthcareProviders() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(healthcareProviders), 300)
  })
}
