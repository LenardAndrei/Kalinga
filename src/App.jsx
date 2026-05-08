import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router-dom";
// import Dashboard from "./pages/doctor/Dashboard/Dashboard.jsx";
import DoctorLayout from "./pages/doctor/Layout/DoctorLayout.jsx";
import DoctorProfile from "./pages/doctor/Profile/DoctorProfile.jsx";
import DoctorPatients from "./pages/doctor/Patients/DoctorPatients.jsx";
import DoctorAppointments from "./pages/doctor/Appointments/DoctorAppointments.jsx";
import DoctorPrescriptions from "./pages/doctor/Prescriptions/DoctorPrescriptions.jsx";
import DoctorSchedules from "./pages/doctor/Schedules/DoctorSchedules.jsx";
import DoctorDashboard from "./pages/doctor/Dashboard/DoctorDashboard.jsx";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/doctors" element={<DoctorLayout/>}>
                  <Route path="/doctors/dashboard" element={<DoctorDashboard/>}/>
                  <Route path="/doctors/profile" element={<DoctorProfile/>}/>
                  <Route path="/doctors/patients" element={<DoctorPatients/>}/>
                  <Route path="/doctors/schedule" element={<DoctorSchedules/>}/>
                  <Route path="/doctors/appointments" element={<DoctorAppointments/>}/>
                  <Route path="/doctors/prescriptions" element={<DoctorPrescriptions/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
