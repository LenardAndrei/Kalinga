
export const getFacilities = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Batangas City Health Office",
          lat: 13.7565,
          lng: 121.0583,
        },
        {
          id: 2,
          name: "Alangilan Barangay Health Center",
          lat: 13.7850,
          lng: 121.0730,
        },
        {
          id: 3,
          name: "San Pascual Rural Health Unit",
          lat: 13.8195,
          lng: 121.0274,
        },
        {
          id: 4,
          name: "Bauan District Hospital",
          lat: 13.7934,
          lng: 121.0044,
        },
      ])
    }, 500) // simulate loading
  })
}