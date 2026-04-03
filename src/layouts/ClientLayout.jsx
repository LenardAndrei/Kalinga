import { Outlet } from "react-router-dom"
import Navbar from "../components/client/Navbar"
import ServiceSlider from "../components/client/ServiceSlider"

function ClientLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <ServiceSlider />
    </div>
  )
}

export default ClientLayout