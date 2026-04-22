
import "./DoctorPatients.css"
import DoctorDialog from "../../../components/doctor/dialog/DoctorDialog.jsx";
import {DoctorSearchBar} from "../../../components/doctor/search-bar/DoctorSearchBar.jsx";
import {useState} from "react";

function PatientsTable({children}){
    return (
        <table className="doctor-patients__table">
            <thead className="doctor-patients__table-header">
            <tr className="doctor-patients__table-header-row">
                <th className="doctor-patients__table-title">Name</th>
                <th className="doctor-patients__table-title">Age</th>
                <th className="doctor-patients__table-title">Gender</th>
                <th className="doctor-patients__table-title">Last Visit</th>
                <th className="doctor-patients__table-title">Status</th>
                <th className="doctor-patients__table-title">Action</th>
            </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
    )
}

function PatientInfoDialog({patient, onClose}){
    return (
        <DoctorDialog onClose={onClose} >
            <div className="doctor-patients-card">
                <h1 className="doctor-patients-card__title">Patient Details</h1>

                <div className="doctor-patients-card__profile">
                    <div className="doctor-patients-card__avatar">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                        </svg>
                    </div>

                    <div className="doctor-patients-card__profile-info">
                        <div className="doctor-patients-card__info-row">
                            <span className="doctor-patients-card__info-label">Name:</span>
                            <span className="doctor-patients-card__info-value">{patient.name}</span>
                        </div>
                        <div className="doctor-patients-card__info-row">
                            <span className="doctor-patients-card__info-label">Age:</span>
                            <span className="doctor-patients-card__info-value">{patient.age}</span>
                        </div>
                        <div className="doctor-patients-card__info-row">
                            <span className="doctor-patients-card__info-label">Gender:</span>
                            <span className="doctor-patients-card__info-value">{patient.gender}</span>
                        </div>
                        <div className="doctor-patients-card__info-row">
                            <span className="doctor-patients-card__info-label">Last Visit:</span>
                            <span className="doctor-patients-card__info-value">{patient.lastVisit}</span>
                        </div>
                        <div className="doctor-patients-card__info-row">
                            <span className="doctor-patients-card__info-label">Status:</span>
                            <span className="doctor-patients-card__info-value">{patient.status}</span>
                        </div>
                    </div>
                </div>

                <div className="doctor-patients-card__section">
                    <h2 className="doctor-patients-card__section-title">Contact Details</h2>
                    <div className="doctor-patients-card__info-row">
                        <span className="doctor-patients-card__info-label">Contact Number:</span>
                        <span className="doctor-patients-card__info-value">0999-987-6767</span>
                    </div>
                    <div className="doctor-patients-card__info-row">
                        <span className="doctor-patients-card__info-label">Primary Address:</span>
                        <span className="doctor-patients-card__info-value">Alangilan, Batangas</span>
                    </div>
                </div>

                <div className="doctor-patients-card__section">
                    <h2 className="doctor-patients-card__section-title">Health Information</h2>
                    <div className="doctor-patients-card__info-row">
                        <span className="doctor-patients-card__info-label">Blood Type:</span>
                        <span className="doctor-patients-card__info-value">Moreno</span>
                    </div>
                    <div className="doctor-patients-card__info-row">
                        <span className="doctor-patients-card__info-label">Allergies:</span>
                        <span className="doctor-patients-card__info-value">Babaero</span>
                    </div>
                    <div className="doctor-patients-card__info-row">
                        <span className="doctor-patients-card__info-label">Conditions:</span>
                        <span className="doctor-patients-card__info-value">If Else Condition</span>
                    </div>
                </div>
            </div>
        </DoctorDialog>
    )
}

function PatientsTableEntry({name, age, gender, lastVisit, status, onSelect}) {
    return (
        <tr className="doctor-patients-table__entry">
            <td>{name}</td>
            <td>{age}</td>
            <td>{gender}</td>
            <td>{lastVisit}</td>
            <td>{status}</td>
            <td>
                <button className="doctor-patients-table__entry-action-btn" onClick={onSelect}>
                    View
                </button>
            </td>
        </tr>
    )
}

export default function DoctorPatients() {

    const [isDialogOpen, setIsDialogOpen] = useState(false)

    /* eslint-disable-next-line */
    const [patients, setPatients] = useState([
        {
            name: "Alonzo Realonda",
            age: 25,
            gender: "Male",
            lastVisit: "2023/01/01",
            status: "Active"
        },
        {
            name: "Michael Jackson",
            age: 25,
            gender: "Male",
            lastVisit: "2023/01/06",
            status: "Active"
        },
        {
            name: "Jeffrey Epstein",
            age: 25,
            gender: "Male",
            lastVisit: "2016/06/07",
            status: "Active"
        },
    ])

    const [selectedPatient, setSelectedPatient] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")

    return (
        <section className="doctor-patients">
            <h1 className="doctor-patients__title">Patient</h1>
            <DoctorSearchBar onEdit={(e) => setSearchTerm(e.target.value.toLowerCase())}/>

            <PatientsTable>
                {
                    patients.map((patient, index) => (
                        patient.name.toLowerCase().startsWith(searchTerm) &&
                            <PatientsTableEntry
                                key={index}
                                name={patient.name}
                                age={patient.age}
                                gender={patient.gender}
                                lastVisit={patient.lastVisit}
                                status={patient.status}
                                onSelect={() => {
                                    setSelectedPatient(patient)
                                    setIsDialogOpen(true)
                                }}
                            />
                    ))
                }
            </PatientsTable>

            {isDialogOpen &&
                <PatientInfoDialog
                    patient={selectedPatient}
                    onClose={() => setIsDialogOpen(false)}
                />
            }
        </section>
    )
}