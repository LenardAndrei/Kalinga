import "./DoctorPrescriptions.css"
import DoctorSearchBar from "../../../components/doctor/search-bar/DoctorSearchBar.jsx";
import {useState} from "react";
import DoctorDialog from "../../../components/doctor/dialog/DoctorDialog.jsx";


function CreatePrescriptionDialog({onClose}) {

    const [patient, setPatient] = useState("");
    const [currentMed, setCurrentMed] = useState({ name: "", dosage: "", frequency: "", duration: "" });
    const [notes, setNotes] = useState("");

    return (
        <DoctorDialog onClose={onClose}>
            <div className="doctor-create-prescription">
                <div className="doctor-create-prescription__card">

                    <div className="doctor-create-prescription__header">
                        <h1 className="doctor-create-prescription__title">Create Prescription</h1>
                        <p className="doctor-create-prescription__subtitle">Create prescription for patient</p>
                    </div>

                    <div className="doctor-create-prescription__field">
                        <span className="doctor-create-prescription__field-label">Patient</span>
                        <div className="doctor-create-prescription__field-controls">
                            <input
                                type="text"
                                className="doctor-create-prescription__input"
                                placeholder="Input Patient's Name"
                                value={patient}
                                onChange={(e) => setPatient(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="doctor-create-prescription__field">
                        <span className="doctor-create-prescription__field-label">Medicine</span>
                        <div className="doctor-create-prescription__field-controls">
                            <div className="doctor-create-prescription__medicine-row">
                                <input
                                    type="text"
                                    className="doctor-create-prescription__input"
                                    placeholder="Medicine Name"
                                    value={currentMed.name}
                                    onChange={(e) => setCurrentMed((p) => ({ ...p, name: e.target.value }))}
                                />
                                <input
                                    type="text"
                                    className="doctor-create-prescription__input"
                                    placeholder="Dosage"
                                    value={currentMed.dosage}
                                    onChange={(e) => setCurrentMed((p) => ({ ...p, dosage: e.target.value }))}
                                />
                                <input
                                    type="text"
                                    className="doctor-create-prescription__input doctor-create-prescription__input--frequency"
                                    placeholder="Frequency"
                                    value={currentMed.frequency}
                                    onChange={(e) => setCurrentMed((p) => ({ ...p, frequency: e.target.value }))}
                                />
                                <input
                                    type="text"
                                    className="doctor-create-prescription__input doctor-create-prescription__input--duration"
                                    placeholder="Duration"
                                    value={currentMed.duration}
                                    onChange={(e) => setCurrentMed((p) => ({ ...p, duration: e.target.value }))}
                                />
                            </div>

                        </div>
                    </div>

                    <div className="doctor-create-prescription__notes-section">
                        <p className="doctor-create-prescription__notes-label">Instructions / Notes</p>
                        <textarea
                            className="doctor-create-prescription__notes"
                            placeholder="Write your instruction"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>

                    <button
                        className="doctor-create-prescription__submit"
                        onClick={() => {
                            alert("Prescription created successfully!");
                            onClose();
                        }}>
                        <span className="doctor-create-prescription__submit-icon">+</span>
                        Create Prescription
                    </button>

                </div>
            </div>
        </DoctorDialog>
    )
}

function ViewPrescriptionDialog({ prescription, onClose }) {
  const [isEditOpen, setIsEditOpen] = useState(false)   // ← add this

  return (
    <>
      <DoctorDialog onClose={onClose}>
        <div className="doctor-view-prescriptions-dialog">

          <div className="doctor-view-prescriptions-dialog__header">
            <h1 className="doctor-view-prescriptions-dialog__title">
              Patient's Prescription
            </h1>
            <p className="doctor-view-prescriptions-dialog__subtitle">
              View patient's prescription details
            </p>
          </div>

          <div className="doctor-view-prescriptions-dialog__patient-card">
            <p className="doctor-view-prescriptions-dialog__patient-card-title">
              Patient Info
            </p>
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
                  <td className="doctor-view-prescriptions-dialog__td">{med.name}</td>
                  <td className="doctor-view-prescriptions-dialog__td">{med.dosage}</td>
                  <td className="doctor-view-prescriptions-dialog__td">{med.frequency}</td>
                  <td className="doctor-view-prescriptions-dialog__td">{med.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="doctor-view-prescriptions-dialog__footer">
            {/* ← wire edit button */}
            <button
              className="doctor-view-prescriptions-dialog__edit-btn"
              onClick={() => setIsEditOpen(true)}
            >
              Edit
            </button>
          </div>

        </div>
      </DoctorDialog>

      {/* edit dialog stacks on top of view dialog */}
      {isEditOpen && (
        <EditPrescriptionDialog
          prescription={prescription}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </>
  )
}

function EditPrescriptionDialog({ prescription, onClose }) {
  const [patient, setPatient] = useState(prescription.patient)
  const [medicines, setMedicines] = useState(
    prescription.medicine.map((m) => ({ ...m }))
  )
  const [notes, setNotes] = useState(prescription.notes || "")

  const updateMedicine = (index, field, value) => {
    setMedicines((prev) =>
      prev.map((m, i) => (i === index ? { ...m, [field]: value } : m))
    )
  }

  const addMedicine = () => {
    setMedicines((prev) => [
      ...prev,
      { name: "", dosage: "", frequency: "", duration: "" },
    ])
  }

  const handleSubmit = () => {
    alert("Prescription updated successfully!")
    onClose()
  }

  return (
    <DoctorDialog onClose={onClose}>
      <div className="doctor-create-prescription">
        <div className="doctor-create-prescription__card">

          {/* header */}
          <div className="doctor-create-prescription__header">
            <h1 className="doctor-create-prescription__title">Edit Prescription</h1>
            <p className="doctor-create-prescription__subtitle">
              Create prescription for patient
            </p>
          </div>

          {/* patient field */}
          <div className="doctor-create-prescription__field">
            <span className="doctor-create-prescription__field-label">Patient</span>
            <div className="doctor-create-prescription__field-controls">
              <input
                type="text"
                className="doctor-create-prescription__input"
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
                placeholder="Patient's Name"
              />
            </div>
          </div>

          {/* medicine fields */}
          <div className="doctor-create-prescription__field">
            <span className="doctor-create-prescription__field-label">Medicine</span>
            <div className="doctor-create-prescription__field-controls">
              {medicines.map((med, index) => (
                <div key={index} className="doctor-create-prescription__medicine-row">
                  <input
                    type="text"
                    className="doctor-create-prescription__input"
                    placeholder="Medicine Name"
                    value={med.name}
                    onChange={(e) => updateMedicine(index, "name", e.target.value)}
                  />
                  <input
                    type="text"
                    className="doctor-create-prescription__input"
                    placeholder="Dosage"
                    value={med.dosage}
                    onChange={(e) => updateMedicine(index, "dosage", e.target.value)}
                  />

                  {/* + button only on first row */}
                  {index === 0 ? (
                    <button
                      type="button"
                      className="doctor-edit-prescription__add-med-btn"
                      onClick={addMedicine}
                      title="Add another medicine"
                    >
                      +
                    </button>
                  ) : (
                    <div style={{ width: "40px" }} />
                  )}

                  <input
                    type="text"
                    className="doctor-create-prescription__input doctor-create-prescription__input--frequency"
                    placeholder="Frequency"
                    value={med.frequency}
                    onChange={(e) => updateMedicine(index, "frequency", e.target.value)}
                  />
                  <input
                    type="text"
                    className="doctor-create-prescription__input doctor-create-prescription__input--duration"
                    placeholder="Duration"
                    value={med.duration}
                    onChange={(e) => updateMedicine(index, "duration", e.target.value)}
                  />

                  {/* empty cell to align with + button column */}
                  <div style={{ width: "40px" }} />
                </div>
              ))}
            </div>
          </div>

          {/* notes */}
          <div className="doctor-create-prescription__notes-section">
            <p className="doctor-create-prescription__notes-label">
              Instructions / Notes
            </p>
            <textarea
              className="doctor-create-prescription__notes"
              placeholder="Write your instruction"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* submit */}
          <button
            className="doctor-create-prescription__submit"
            onClick={handleSubmit}
          >
            <span className="doctor-create-prescription__submit-icon">+</span>
            Edit Prescription
          </button>

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

    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

    // eslint-disable-next-line no-unused-vars
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
                <button
                    className="doctor-prescriptions__add-btn"
                    onClick={() => setIsCreateDialogOpen(true)}
                >
                    + Add Prescription
                </button>
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

            {isCreateDialogOpen &&
                <CreatePrescriptionDialog onClose={() => setIsCreateDialogOpen(false)}/>
            }

        </section>
    )
}

export default DoctorPrescriptions