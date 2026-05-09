import CloseIcon from "../icons/CloseIcon.jsx";
import "./DoctorDialog.css"
import { createPortal } from "react-dom";

export default function DoctorDialog({ className, onClose, children }) {
    return (
        createPortal(
            <>
                <div className="doctor-dialog__overlay" onClick={onClose}/>

                <div className="doctor-dialog">
                    <div className="doctor-dialog__header">
                        <button className="doctor-dialog__close-btn" onClick={onClose}>
                            <CloseIcon className="doctor-dialog__close-btn-icon"/>
                        </button>
                    </div>
                    <div className={className}>
                        {children}
                    </div>
                </div>
            </>,
            document.body
        )
    );
}