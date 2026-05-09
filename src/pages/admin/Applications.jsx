import { useState } from "react"
import ApplicationsTabs from "../../components/admin/applications/ApplicationsTabs"
import "../../components/admin/applications/Applications.css"

function Applications() {
  const [activeTab, setActiveTab] = useState("doctor")

  return (
    <div className="app-page">
      <h1 className="app-title">Applications</h1>
      <ApplicationsTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  )
}

export default Applications