import { Outlet, useLocation } from "react-router-dom"
import RegisterHeader from "../components/auth/RegisterHeader"

const DOCTOR_STEP_PATH = "/register/doctor/step"

/* ── Styles ── */
const styles = {
    container: {
        minHeight: "100vh",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
    },
}

/* ── Component ── */
function RegisterLayout() {
    const { pathname } = useLocation()
    const isStep = pathname.startsWith(DOCTOR_STEP_PATH)

    return (
        <div style={styles.container}>
            <RegisterHeader isStep={isStep} />
            <Outlet />
        </div>
    )
}

export default RegisterLayout
