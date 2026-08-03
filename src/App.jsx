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

import DoctorLayout from "./pages/doctor/Layout/DoctorLayout.jsx"
import DoctorProfile from "./pages/doctor/Profile/DoctorProfile.jsx"
import DoctorPatients from "./pages/doctor/Patients/DoctorPatients.jsx"
import DoctorAppointments from "./pages/doctor/Appointments/DoctorAppointments.jsx"
import DoctorPrescriptions from "./pages/doctor/Prescriptions/DoctorPrescriptions.jsx"
import DoctorSchedules from "./pages/doctor/Schedules/DoctorSchedules.jsx"
import DoctorDashboard from "./pages/doctor/Dashboard/DoctorDashboard.jsx"

import Login from "./pages/auth/Login"
import SelectRole from "./pages/auth/SelectRole"

import UserStep1 from "./components/auth/user/UserStep1"
import UserStep2 from "./components/auth/user/UserStep2"

import DoctorStep1 from "./components/auth/doctor/DoctorStep1"
import DoctorStep2 from "./components/auth/doctor/DoctorStep2"
import DoctorStep3 from "./components/auth/doctor/DoctorStep3"
import DoctorStep4 from "./components/auth/doctor/DoctorStep4"

import ProviderStep1 from "./components/auth/provider/ProviderStep1"
import ProviderStep2 from "./components/auth/provider/ProviderStep2"
import ProviderStep3 from "./components/auth/provider/ProviderStep3"
import ProviderStep4 from "./components/auth/provider/ProviderStep4"
import ProviderStep5 from "./components/auth/provider/ProviderStep5"
import ProviderStep6 from "./components/auth/provider/ProviderStep6"
import ProviderStep7 from "./components/auth/provider/ProviderStep7"

import './index.css';

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
        
        {/* Redirect root to client home */}
        <Route path="/" element={<Navigate to="/client/home" replace />} />
        
        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* REGISTER FLOW */}
        <Route path="/register" element={<RegisterLayout />}>

          {/* default page — role selector */}
          <Route index element={<SelectRole />} />

          {/* user registration steps */}
          <Route path="user">
            <Route index element={<Navigate to="step1" replace />} />
            <Route path="step1" element={<UserStep1 />} />
            <Route path="step2" element={<UserStep2 />} />
          </Route>

          {/* doctor registration steps */}
          <Route path="doctor">
            <Route index element={<Navigate to="step1" replace />} />
            <Route path="step1" element={<DoctorStep1 />} />
            <Route path="step2" element={<DoctorStep2 />} />
            <Route path="step3" element={<DoctorStep3 />} />
            <Route path="step4" element={<DoctorStep4 />} />
          </Route>

          {/* healthcare service provider registration steps */}
          <Route path="provider">
            <Route index element={<Navigate to="step1" replace />} />
            <Route path="step1" element={<ProviderStep1 />} />
            <Route path="step2" element={<ProviderStep2 />} />
            <Route path="step3" element={<ProviderStep3 />} />
            <Route path="step4" element={<ProviderStep4 />} />
            <Route path="step5" element={<ProviderStep5 />} />
            <Route path="step6" element={<ProviderStep6 />} />
            <Route path="step7" element={<ProviderStep7 />} />
          </Route>

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

        {/* DOCTOR */}
        <Route path="/doctors" element={<DoctorLayout/>}>
          <Route path="dashboard" element={<DoctorDashboard/>}/>
          <Route path="profile" element={<DoctorProfile/>}/>
          <Route path="patients" element={<DoctorPatients/>}/>
          <Route path="schedule" element={<DoctorSchedules/>}/>
          <Route path="appointments" element={<DoctorAppointments/>}/>
          <Route path="prescriptions" element={<DoctorPrescriptions/>}/>
        </Route>

        {/* HEALTHCARE PROVIDER */}
        <Route path="/healthcare-provider" element={<HCLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="facility-profile" element={<FacilityProfile />} />
          <Route path="events"        element={<EventCalendar />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="reviews"       element={<Reviews />} /> 
          <Route path="services"      element={<Services />} />
          <Route path="services/laboratory"          element={<LaboratoryManagement />} />
          <Route path="services/pharmacy"            element={<PharmacyManagement />} />
          <Route path="services/consultation"        element={<ConsultationManagement />} />
          <Route path="services/dentist"             element={<DentistManagement />} />
        </Route>

      </Routes>
    </BrowserRouter> 
  )
}

export default App
