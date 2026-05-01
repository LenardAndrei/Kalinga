import "./DoctorPrescriptions.css"
import DoctorSearchBar from "../../../components/doctor/search-bar/DoctorSearchBar.jsx";
import {useState} from "react";
import DoctorDialog from "../../../components/doctor/dialog/DoctorDialog.jsx";


function ViewPrescriptionDialog({prescription, onClose}) {
    return (
        <DoctorDialog onClose={onClose}>
            <div className="doctor-view-prescriptions-dialog">

                <div className="doctor-view-prescriptions-dialog__header">
                    <h1 className="doctor-view-prescriptions-dialog__title">Patient's Prescription</h1>
                    <p className="doctor-view-prescriptions-dialog__subtitle">View patient's prescription details</p>
                </div>

                <div className="doctor-view-prescriptions-dialog__patient-card">
                    <p className="doctor-view-prescriptions-dialog__patient-card-title">Patient Info</p>

                    <div className="doctor-view-prescriptions-dialog__patient-field">
                        <span className="doctor-view-prescriptions-dialog__patient-label">Name:</span>
                        <span className="doctor-view-prescriptions-dialog__patient-value">
                            {prescription.patient}
                        </span>
                    </div>

                    <div className="doctor-view-prescriptions-dialog__patient-field">
                        <span className="doctor-view-prescriptions-dialog__patient-label">Concern:</span>
                        <span className="doctor-view-prescriptions-dialog__patient-value">
                            {prescription.concern}
                        </span>
                    </div>
                </div>


                <table className="doctor-view-prescriptions-dialog__table">
                    <thead className="doctor-view-prescriptions-dialog__table-head">
                    <tr>
                        <th className="doctor-view-prescriptions-dialog__th">Medicine</th>
                        <th className="doctor-view-prescriptions-dialog__th">Dosage</th>
                        <th className="doctor-view-prescriptions-dialog__th">Frequency</th>
                        <th className="doctor-view-prescriptions-dialog__th">Duration</th>
                    </tr>
                    </thead>
                    <tbody className="doctor-view-prescriptions-dialog__table-body">
                        {prescription.medicine.map((med, index) => (
                            <tr key={index}>
                                <td>{med.name}</td>
                                <td>{med.dosage}</td>
                                <td>{med.frequency}</td>
                                <td>{med.duration}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="doctor-view-prescriptions-dialog__footer">
                    <button className="doctor-view-prescriptions-dialog__edit-btn">Edit</button>
                </div>

            </div>
        </DoctorDialog>
    )
}

function PrescriptionTable({children}) {
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

function PrescriptionTableEntry({date, patient, medicine, status, onClick}) {

    let statusClass = status === "Completed"
        ? "doctor-prescriptions-table__status--completed"
        : "";

    return (
        <tr className="doctor-patients-table__entry">
            <td>{date}</td>
            <td>{patient}</td>
            <td>{medicine.name}</td>
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
        {
            date: "2023-05-10",
            patient: "Juan Dela Cruz",
            concern: "Body pain",
            medicine: [
                { name: "Ibuprofen", dosage: "200 mg", frequency: "3x a day", duration: "5 days" }
            ],
            status: "Pending"
        },
        {
            date: "2023-05-11",
            patient: "Maria Santos",
            concern: "Fever",
            medicine: [
                { name: "Paracetamol", dosage: "500 mg", frequency: "2x a day", duration: "3 days" }
            ],
            status: "Completed"
        },
        {
            date: "2023-05-12",
            patient: "Carlos Reyes",
            concern: "Bacterial infection",
            medicine: [
                { name: "Amoxicillin", dosage: "500 mg", frequency: "3x a day", duration: "7 days" }
            ],
            status: "Pending"
        },
        {
            date: "2023-05-13",
            patient: "Ana Lopez",
            concern: "Allergy",
            medicine: [
                { name: "Cetirizine", dosage: "10 mg", frequency: "1x a day", duration: "5 days" }
            ],
            status: "Completed"
        },
        {
            date: "2023-05-14",
            patient: "Mark Bautista",
            concern: "Allergic rhinitis",
            medicine: [
                { name: "Loratadine", dosage: "10 mg", frequency: "1x a day", duration: "7 days" }
            ],
            status: "Pending"
        },
        {
            date: "2023-05-15",
            patient: "Ella Cruz",
            concern: "Type 2 Diabetes",
            medicine: [
                { name: "Metformin", dosage: "500 mg", frequency: "2x a day", duration: "6 months" }
            ],
            status: "Completed"
        },
        {
            date: "2023-05-16",
            patient: "Daniel Garcia",
            concern: "High cholesterol",
            medicine: [
                { name: "Atorvastatin", dosage: "20 mg", frequency: "1x a day", duration: "6 months" }
            ],
            status: "Pending"
        },
        {
            date: "2023-05-17",
            patient: "Sofia Mendoza",
            concern: "Hypertension",
            medicine: [
                { name: "Losartan", dosage: "50 mg", frequency: "1x a day", duration: "6 months" }
            ],
            status: "Completed"
        },
        {
            date: "2023-05-18",
            patient: "Rafael Torres",
            concern: "Acid reflux",
            medicine: [
                { name: "Omeprazole", dosage: "20 mg", frequency: "1x a day", duration: "14 days" }
            ],
            status: "Pending"
        },
        {
            date: "2023-05-19",
            patient: "Isabel Flores",
            concern: "Hypertension",
            medicine: [
                { name: "Amlodipine", dosage: "5 mg", frequency: "1x a day", duration: "6 months" },
                { name: "Amlodipine", dosage: "5 mg", frequency: "1x a day", duration: "6 months" }
            ],
            status: "Completed"
        }
    ]);

    const [selectedPrescription, setSelectedPrescription] = useState(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

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
                                medicine={prescription.medicine[0]}
                                status={prescription.status}
                                onClick={() => {
                                    setSelectedPrescription(prescription)
                                    setIsViewDialogOpen(true)
                                }}
                            />
                    ))
                }
            </PrescriptionTable>


            {isViewDialogOpen &&
                <ViewPrescriptionDialog
                    prescription={selectedPrescription}
                    onClose={() => setIsViewDialogOpen(false)}
                />
            }

        </section>
    )
}

export default DoctorPrescriptions