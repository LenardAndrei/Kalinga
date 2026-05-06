import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import ClientLayout from "./layouts/ClientLayout"
import RegisterLayout from "./layouts/RegisterLayout"

import Home from "./pages/client/Home"
import Map from "./pages/client/Map"
import Healthcare from "./pages/client/Healthcare"
import HealthCareDetails from "./pages/client/HealthCarePage"
import Specialists from "./pages/client/Specialists"
import SpecialistsPage from "./pages/client/SpecialistsPage"
import Announcement from "./pages/client/Announcement"

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Redirect root to client home - ito ung inadd ko kasi white lang nakikita sa page nung tinry ko irun ung web*/}
        <Route path="/" element={<Navigate to="/client/home" replace />} />
        
        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

          {/* register flow */}
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

      </Routes>
    </BrowserRouter>
  )
}

export default App
