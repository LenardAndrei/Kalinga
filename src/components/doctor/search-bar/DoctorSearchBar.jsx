import SearchIcon from "../icons/SearchIcon.jsx";
import "./DoctorSearchBar.css"

export function DoctorSearchBar({onEdit}) {
    return (
        <div className="doctor-search__container">
            <input type="text" placeholder="Search Patients" className="doctor-search__input" onChange={onEdit}/>
            <SearchIcon className="doctor-search__icon"/>
        </div>
    )
}

export default DoctorSearchBar;
