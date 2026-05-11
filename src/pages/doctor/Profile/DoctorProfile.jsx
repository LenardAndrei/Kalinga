import "./DoctorProfile.css"
import PencilIcon from "../../../components/doctor/icons/PencilIcon.jsx";

function DoctorInfoField({label, value}) {
    return (
        <>
            <p className="doctor-info__label">{label}</p>
            <p className="doctor-info__value">{value}</p>
        </>
    )
}

function DoctorInfoImageField({label}) {
    return (
        <>
            <p className="doctor-info__label">{label}</p>
            <div className="doctor-info__value-image"/>
        </>
    )
}

function DoctorInfoCard({title, children}){
    return (
        <div className="doctor-profile__info-card">
            <h1 className="doctor-info__title">{title}</h1>
            <div className="doctor-info__fields">
                {children}
            </div>
            <button className="doctor-info__edit-btn">
                <PencilIcon className="doctor-info__edit-icon"/>
                Edit
            </button>
        </div>
    )
}

export default function DoctorProfile() {
    return (
        <section className="doctor-profile">
            <h1 className="doctor-profile__title">Doctor Profile</h1>
            <DoctorInfoCard title="Basic Information">
                <DoctorInfoField label="First Name" value="John"/>
                <DoctorInfoField label="Last Name" value="Doe"/>
                <DoctorInfoField label="Date of Birth" value="Alangilan, Batangas"/>
                <DoctorInfoField label="Gender" value="Male"/>
                <DoctorInfoField label="Nationality" value="Filipino"/>
                <DoctorInfoImageField label="Profile Photo"/>
            </DoctorInfoCard>

            <DoctorInfoCard title="Contact Information">
                <DoctorInfoField label="Email Address" value="johndoe@example.com"/>
                <DoctorInfoField label="Contact Number" value="0999 987 6767"/>
                <DoctorInfoField label="Clinic Address" value="Brgy San Isidro, San Isidro, Batangas"/>
                <DoctorInfoField label="Clinic No." value="0999 987 6767"/>
            </DoctorInfoCard>
        </section>
    )
}