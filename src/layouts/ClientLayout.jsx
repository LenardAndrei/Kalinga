import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

function ClientLayout() {
  return (
    <div style={{ margin: 0, padding: 0, overflow: "hidden" }}>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default ClientLayout