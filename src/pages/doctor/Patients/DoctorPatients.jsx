
import "./DoctorPatients.css"
import SearchIcon from "../../../components/doctor/icons/SearchIcon.jsx";

function PatientsSearchBar() {
    return (
        <div className="doctor-patients-search__container">
            <input type="text" placeholder="Search Patients" className="doctor-patients-search__input"/>
            <SearchIcon className="doctor-patients-search__icon"/>
        </div>
    )
}

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

function PatientsTableEntry({name, age, gender, lastVisit, status}){
    return (
        <tr className="doctor-patients-table__entry">
            <td>{name}</td>
            <td>{age}</td>
            <td>{gender}</td>
            <td>{lastVisit}</td>
            <td>{status}</td>
            <td>
                <button className="doctor-patients-table__entry-action-btn">
                    View
                </button>
            </td>
        </tr>
    )
}

export default function DoctorPatients() {
    return (
        <section className="doctor-patients">
            <h1 className="doctor-patients__title">Patient</h1>
            <PatientsSearchBar/>

            <PatientsTable>
                <PatientsTableEntry
                    name="Alonzo Realonda"
                    age="25"
                    gender="Male"
                    lastVisit="2023/01/01"
                    status="Active"
                />

                <PatientsTableEntry
                    name="Lebron James"
                    age="25"
                    gender="Male"
                    lastVisit="2023/01/01"
                    status="Active"
                />

                <PatientsTableEntry
                    name="Maria Teodora Alonzo"
                    age="25"
                    gender="Male"
                    lastVisit="2023/01/01"
                    status="Active"
                />
            </PatientsTable>
        </section>
    )
}