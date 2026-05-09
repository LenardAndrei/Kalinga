import { BrowserRouter, Routes, Route, Navigate, useNavigate, Outlet } from "react-router-dom"

import ClientLayout from "./layouts/ClientLayout"
import RegisterLayout from "./layouts/RegisterLayout"

import Home from "./pages/client/Home"
import Map from "./pages/client/Map"
import Healthcare from "./pages/client/Healthcare"
import HealthCareDetails from "./pages/client/HealthCarePage"
import Specialists from "./pages/client/Specialists"
import SpecialistsPage from "./pages/client/SpecialistsPage"
import Announcement from "./pages/client/Announcement"

import Dashboard from "./pages/HealthcareProvider/dashboard"
import FacilityProfile from "./pages/HealthcareProvider/FacilityProfile"
import EventCalendar from "./pages/HealthcareProvider/Events"
import Announcements from "./pages/HealthcareProvider/Announcements"
import Reviews from "./pages/HealthcareProvider/Reviews"
import Services from "./pages/HealthcareProvider/ServicesManagement"
import LaboratoryManagement from "./pages/HealthcareProvider/LaboratoryManagement"
import PharmacyManagement from "./pages/HealthcareProvider/PharmacyManagement"
import ConsultationManagement from "./pages/HealthcareProvider/ConsultationManagement"
import DentistManagement from "./pages/HealthcareProvider/DentistManagement"
import KalingaSidebar from "./components/HealthcareProvider/NavbarHC"

import AdminLayout from "./layouts/admin/AdminLayout"
import AdminDashboard from "./pages/admin/AdminDashboard"
import Applications from "./pages/admin/Applications"
import Doctors from "./pages/admin/Doctors"
import AdminHealthcare from "./pages/admin/Healthcare"
import Patients from "./pages/admin/Patient"

import Login from "./pages/auth/Login"
import SelectRole from "./pages/auth/SelectRole"

const mockAccount = {
  facilityName: "Brgy. San Isidro Health Center",
}

function HCLayout() {
  const navigate = useNavigate()

  const handleNavigate = (id) => {
    const routes = {
      dashboard:     "/healthcare-provider/dashboard",
      facility:      "/healthcare-provider/facility-profile",
      services:      "/healthcare-provider/services",
      appointments:  "/healthcare-provider/appointments",
      events:        "/healthcare-provider/events",
      announcements: "/healthcare-provider/announcements",
      reviews:       "/healthcare-provider/reviews",
    }
    if (routes[id]) navigate(routes[id])
  }

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", backgroundColor: "#EDEDED" }}>
      <KalingaSidebar
        facilityName={mockAccount.facilityName}
        onNavigate={handleNavigate}
        onLogout={() => navigate("/login")}
      />
      <main style={{ flex: 1, overflowY: "auto", padding: "20px 20px 20px 44px" }}>
        <Outlet />
      </main>
    </div>
  )
}

function App() {
  return (      
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* REGISTER FLOW */}
        <Route path="/register" element={<RegisterLayout />}>

          {/* default page */}
          <Route index element={<SelectRole />} />

        </Route>

        {/* CLIENT */}
        <Route path="/client" element={<ClientLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="map" element={<Map />} />
          <Route path="healthcare" element={<Healthcare />} />
          <Route path="healthcare/:id" element={<HealthCareDetails />} />
          <Route path="specialists" element={<Specialists />} />
          <Route path="specialists/:id" element={<SpecialistsPage />} />
          <Route path="announcement" element={<Announcement />} />
        </Route>

        {/* ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard"    element={<AdminDashboard />} />
          <Route path="applications" element={<Applications />} />
          <Route path="doctors"      element={<Doctors />} />
          <Route path="healthcare"   element={<AdminHealthcare />} />
          <Route path="patients"     element={<Patients />} />
          <Route path="reviews"      element={<div>Reviews</div>} />
        </Route>

        <Route path="/healthcare-provider" element={<HCLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="facility-profile" element={<FacilityProfile />} />
          <Route path="events"        element={<EventCalendar />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="reviews"       element={<Reviews />} /> 
          <Route path="services"      element={<Services />} />
          <Route path="services/laboratory"          element={<LaboratoryManagement />} />
          <Route path="services/pharmacy"            element={<PharmacyManagement />} />\
          <Route path="services/consultation"        element={<ConsultationManagement />} />
          <Route path="services/dentist"             element={<DentistManagement />} />

          {/* Add more HC pages here as you build them:
              
              <Route path="appointments"  element={<Appointments />} />
              
              
          */}
        </Route>

      </Routes>
    </BrowserRouter> 
  )
}

export default App