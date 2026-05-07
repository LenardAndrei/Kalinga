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

import AdminLayout from "./layouts/admin/AdminLayout"
import AdminDashboard from "./pages/admin/AdminDashboard"
import Applications from "./pages/admin/Applications"
import Doctors from "./pages/admin/Doctors"
import AdminHealthcare from "./pages/admin/Healthcare"

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
          <Route path="patients"     element={<div>Patients</div>} />
          <Route path="reviews"      element={<div>Reviews</div>} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App