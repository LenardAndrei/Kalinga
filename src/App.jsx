import { BrowserRouter, Routes, Route } from "react-router-dom"

import ClientLayout from "./layouts/ClientLayout"
import Home from "./pages/client/Home"
import Map from "./pages/client/Map"
import Healthcare from "./pages/client/Healthcare"
import Specialists from "./pages/client/Specialists"



function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/client" element={<ClientLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="map" element={<Map />} />
          <Route path="healthcare" element={<Healthcare />} />
          <Route path="specialists" element={<Specialists />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App