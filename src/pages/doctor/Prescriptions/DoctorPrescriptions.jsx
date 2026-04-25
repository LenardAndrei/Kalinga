import "./DoctorPrescriptions.css"
import DoctorSearchBar from "../../../components/doctor/search-bar/DoctorSearchBar.jsx";
import {useState} from "react";

function PrescriptionTable({children}){
    return (
        <table className="doctor-prescriptions__table">
            <thead className="doctor-prescriptions__table-header">
            <tr className="doctor-prescriptions__table-header-row">
                <th className="doctor-prescriptions__table-title">Date</th>
                <th className="doctor-prescriptions__table-title">Patient</th>
                <th className="doctor-prescriptions__table-title">Medicine</th>
                <th className="doctor-prescriptions__table-title">Status</th>
                <th className="doctor-prescriptions__table-title">Action</th>
            </tr>
            </thead>
            <tbody>
            {children}
            </tbody>
        </table>
    )
}

function PrescriptionTableEntry({date, patient, medicine, status, onClick}){

    let statusClass = status === "Completed"
        ? "doctor-prescriptions-table__status--completed"
        : "";

    return (
        <tr className="doctor-patients-table__entry">
            <td>{date}</td>
            <td>{patient}</td>
            <td>{medicine}</td>
            <td className={statusClass}>{status}</td>
            <td>
                <button className={`doctor-patients-table__entry-action-btn `} onClick={onClick}>
                    View
                </button>
            </td>
        </tr>
    )
}

function DoctorPrescriptions() {

    const [searchTerm, setSearchTerm] = useState("");

    // eslint-disable-next-line
    const [prescriptions, setPrescriptions] = useState([
        { date: "2023-05-10", patient: "Juan Dela Cruz", medicine: "Ibuprofen", status: "Pending" },
        { date: "2023-05-11", patient: "Maria Santos", medicine: "Paracetamol", status: "Completed" },
        { date: "2023-05-12", patient: "Carlos Reyes", medicine: "Amoxicillin", status: "Pending" },
        { date: "2023-05-13", patient: "Ana Lopez", medicine: "Cetirizine", status: "Completed" },
        { date: "2023-05-14", patient: "Mark Bautista", medicine: "Loratadine", status: "Pending" },
        { date: "2023-05-15", patient: "Ella Cruz", medicine: "Metformin", status: "Completed" },
        { date: "2023-05-16", patient: "Daniel Garcia", medicine: "Atorvastatin", status: "Pending" },
        { date: "2023-05-17", patient: "Sofia Mendoza", medicine: "Losartan", status: "Completed" },
        { date: "2023-05-18", patient: "Rafael Torres", medicine: "Omeprazole", status: "Pending" },
        { date: "2023-05-19", patient: "Isabel Flores", medicine: "Amlodipine", status: "Completed" },
    ]);

    return (
        <section className="doctor-prescriptions">
            <h1 className="doctor-prescriptions__title">Prescriptions</h1>

            <div className="doctor-prescriptions__header">
                <DoctorSearchBar onEdit={(e) => setSearchTerm(e.target.value.toLowerCase())}/>
                <button className="doctor-prescriptions__add-btn">Add Prescription</button>
            </div>

            <PrescriptionTable>
                {
                    prescriptions.map((prescription, index) => (
                        prescription.patient.toLowerCase().startsWith(searchTerm) &&
                            <PrescriptionTableEntry
                                key={index}
                                date={prescription.date}
                                patient={prescription.patient}
                                medicine={prescription.medicine}
                                status={prescription.status}
                                onClick={() => {}}
                            />
                    ))
                }
            </PrescriptionTable>

        </section>
    )
}

export default DoctorPrescriptions