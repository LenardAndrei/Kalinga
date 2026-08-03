import { Outlet } from "react-router-dom"
import Navbar from "../components/client/Navbar"
import Footer from "../components/client/Footer"

function ClientLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default ClientLayout