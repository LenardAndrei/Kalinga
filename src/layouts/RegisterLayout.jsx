import { Outlet } from "react-router-dom";
import RegisterHeader from "../components/auth/RegisterHeader";

function RegisterLayout() {
    return (    
        <div>
            <RegisterHeader />
            <Outlet />
        </div>
    )
}
export default RegisterLayout