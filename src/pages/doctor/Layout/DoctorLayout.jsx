import "./DoctorLayout.css"

import DoctorSidebar from "../../../components/doctor/DoctorSidebar.jsx";
import {Outlet} from "react-router-dom";


export default function DoctorLayout() {
    return (
        <section className="doctor-layout">
            <DoctorSidebar/>
            <div className="doctor-layout__content">
                <Outlet/>
            </div>
        </section>
    )
}