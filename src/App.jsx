import { BrowserRouter, Routes, Route } from "react-router-dom"

import ClientLayout from "./layouts/ClientLayout"
import Home from "./pages/client/Home"
import Map from "./pages/client/Map"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/client" element={<ClientLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="map" element={<Map />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App