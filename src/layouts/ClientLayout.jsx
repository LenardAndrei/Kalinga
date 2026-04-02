import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

function ClientLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default ClientLayout