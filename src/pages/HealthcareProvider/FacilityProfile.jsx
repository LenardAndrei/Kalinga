import { useState, useRef } from "react";

//Pill Field (read-only display)
function PillField({ value, placeholder }) {
  return (
    <div style={s.pill}>
      <span style={{ color: value ? "#222" : "#aaa" }}>{value || placeholder || "—"}</span>
    </div>
  );
}

//Editable Pill Input
function PillInput({ value, onChange, placeholder }) {
  return (
    <input
      style={{ ...s.pill, ...s.pillInput }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

//Section Card
function SectionCard({ title, children, onEdit, onSave, editing }) {
  return (
    <div style={s.card}>
      <h2 style={s.cardTitle}>{title}</h2>
      {children}
      <div style={{ marginTop: 24 }}>
        {editing ? (
          <button style={s.editBtn} onClick={onSave}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
            Save
          </button>
        ) : (
          <button style={s.editBtn} onClick={onEdit}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

//Row Layout
function Row({ label, children, labelStyle }) {
  return (
    <div style={s.row}>
      <span style={{ ...s.rowLabel, ...labelStyle }}>{label}</span>
      <div style={s.rowValue}>{children}</div>
    </div>
  );
}

//Main Page
export default function FacilityProfile() {
  // Basic Info state
  const [basicEditing, setBasicEditing] = useState(false);
  const [basic, setBasic] = useState({
    facilityName: "San Isidro Health Center",
    type: "Health Center",
    description: "Meow meow arf arf dubai chewy chookie ilocos empanada",
    photoUrl: null, // will hold object URL if uploaded
  });
  const [basicDraft, setBasicDraft] = useState({ ...basic });
  const photoInputRef = useRef();

  // Location state
  const [locEditing, setLocEditing] = useState(false);
  const [loc, setLoc] = useState({
    building: "San Isidro Health Center",
    street: "Health Center",
    barangay: "dubai chewy cookie",
    city: "ilocos empanada",
    province: "seasalt matcha latte",
    postal: "beef burrito",
  });
  const [locDraft, setLocDraft] = useState({ ...loc });

  // Contact state
  const [contactEditing, setContactEditing] = useState(false);
  const [contact, setContact] = useState({
    email: "sanisidro@health.gov.ph",
    phone: "+63 912 345 6789",
    website: "",
    facebook: "",
  });
  const [contactDraft, setContactDraft] = useState({ ...contact });

  // Operating Hours state
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [hoursEditing, setHoursEditing] = useState(false);
  const [hours, setHours] = useState(
    Object.fromEntries(days.map((d) => [d, { open: "08:00", close: "17:00", closed: false }]))
  );
  const [hoursDraft, setHoursDraft] = useState(JSON.parse(JSON.stringify(hours)));

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBasicDraft((p) => ({ ...p, photoUrl: url }));
    }
  };

  return (
    <div style={s.page}>
      {/* Page Title */}
      <h1 style={{
        fontFamily: "Poppins, sans-serif",
        fontWeight: 900,
        fontSize: "48px",
        marginBottom: 20,
        background: "linear-gradient(to right, #032932, #5fc6a0)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline-block",
      }}>
        Facility Profile
      </h1>

      {/*BASIC INFORMATION*/}
      <SectionCard
        title="Basic Information"
        editing={basicEditing}
        onEdit={() => { setBasicDraft({ ...basic }); setBasicEditing(true); }}
        onSave={() => { setBasic({ ...basicDraft }); setBasicEditing(false); }}
      >
        <Row label="Facility Name">
          {basicEditing
            ? <PillInput value={basicDraft.facilityName} onChange={(v) => setBasicDraft((p) => ({ ...p, facilityName: v }))} />
            : <PillField value={basic.facilityName} />}
        </Row>
        <Row label="Type">
          {basicEditing
            ? (
              <select
                style={{ ...s.pill, ...s.pillInput, cursor: "pointer" }}
                value={basicDraft.type}
                onChange={(e) => setBasicDraft((p) => ({ ...p, type: e.target.value }))}
              >
                {["Health Center", "Hospital", "Clinic", "Rural Health Unit", "Lying-in Center"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            )
            : <PillField value={basic.type} />}
        </Row>
        <Row label="Description">
          {basicEditing
            ? <PillInput value={basicDraft.description} onChange={(v) => setBasicDraft((p) => ({ ...p, description: v }))} placeholder="Describe your facility..." />
            : <PillField value={basic.description} />}
        </Row>
        <Row label="Facility Photo" labelStyle={{ alignSelf: "flex-start", paddingTop: 6 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {(basicEditing ? basicDraft.photoUrl : basic.photoUrl)
              ? <img src={basicEditing ? basicDraft.photoUrl : basic.photoUrl} alt="Facility" style={s.photo} />
              : (
                <div style={s.photoPlaceholder}>
                  <svg viewBox="0 0 24 24" fill="#bbb" width="40" height="40"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" /></svg>
                  <span style={{ color: "#bbb", fontSize: 13, marginTop: 4 }}>No photo</span>
                </div>
              )}
            {basicEditing && (
              <>
                <button style={s.uploadBtn} onClick={() => photoInputRef.current.click()}>
                  Upload Photo
                </button>
                <input ref={photoInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhotoChange} />
              </>
            )}
          </div>
        </Row>
      </SectionCard>

      {/*LOCATION INFORMATION*/}
      <SectionCard
        title="Location Information"
        editing={locEditing}
        onEdit={() => { setLocDraft({ ...loc }); setLocEditing(true); }}
        onSave={() => { setLoc({ ...locDraft }); setLocEditing(false); }}
      >
        {[
          { label: "House / Blk No. ? Building Name", key: "building" },
          { label: "Street Name", key: "street" },
          { label: "Barangay", key: "barangay" },
          { label: "City/Municipality", key: "city" },
          { label: "Province", key: "province" },
          { label: "Postal Code", key: "postal" },
        ].map(({ label, key }) => (
          <Row key={key} label={label} labelStyle={key === "building" ? { fontSize: 13 } : {}}>
            {locEditing
              ? <PillInput value={locDraft[key]} onChange={(v) => setLocDraft((p) => ({ ...p, [key]: v }))} />
              : <PillField value={loc[key]} />}
          </Row>
        ))}
      </SectionCard>

      {/*CONTACT INFORMATION*/}
      <SectionCard
        title="Contact Information"
        editing={contactEditing}
        onEdit={() => { setContactDraft({ ...contact }); setContactEditing(true); }}
        onSave={() => { setContact({ ...contactDraft }); setContactEditing(false); }}
      >
        {[
          { label: "Email", key: "email", placeholder: "facility@email.com" },
          { label: "Phone Number", key: "phone", placeholder: "+63 XXX XXX XXXX" },
          { label: "Website", key: "website", placeholder: "https://..." },
          { label: "Facebook Page", key: "facebook", placeholder: "facebook.com/yourpage" },
        ].map(({ label, key, placeholder }) => (
          <Row key={key} label={label}>
            {contactEditing
              ? <PillInput value={contactDraft[key]} onChange={(v) => setContactDraft((p) => ({ ...p, [key]: v }))} placeholder={placeholder} />
              : <PillField value={contact[key]} placeholder={placeholder} />}
          </Row>
        ))}
      </SectionCard>

      {/*OPERATING HOURS*/}
      <SectionCard
        title="Operating Hours"
        editing={hoursEditing}
        onEdit={() => { setHoursDraft(JSON.parse(JSON.stringify(hours))); setHoursEditing(true); }}
        onSave={() => { setHours(JSON.parse(JSON.stringify(hoursDraft))); setHoursEditing(false); }}
      >
        {days.map((day) => (
          <Row key={day} label={day}>
            {hoursEditing ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <input
                  type="time"
                  style={{ ...s.pill, ...s.pillInput, width: 130 }}
                  value={hoursDraft[day].open}
                  disabled={hoursDraft[day].closed}
                  onChange={(e) => setHoursDraft((p) => ({ ...p, [day]: { ...p[day], open: e.target.value } }))}
                />
                <span style={{ color: "#666", fontWeight: 700 }}>–</span>
                <input
                  type="time"
                  style={{ ...s.pill, ...s.pillInput, width: 130 }}
                  value={hoursDraft[day].close}
                  disabled={hoursDraft[day].closed}
                  onChange={(e) => setHoursDraft((p) => ({ ...p, [day]: { ...p[day], close: e.target.value } }))}
                />
                <label style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer", fontSize: 13, color: "#666" }}>
                  <input
                    type="checkbox"
                    checked={hoursDraft[day].closed}
                    onChange={(e) => setHoursDraft((p) => ({ ...p, [day]: { ...p[day], closed: e.target.checked } }))}
                  />
                  Closed
                </label>
              </div>
            ) : (
              <PillField
                value={hours[day].closed ? "Closed" : `${hours[day].open} – ${hours[day].close}`}
              />
            )}
          </Row>
        ))}
      </SectionCard>
    </div>
  );
}

const s = {
  page: {
    fontFamily: "'Poppins', sans-serif",
    maxWidth: 900,
    padding: "0 0 60px 0",
  },
  card: {
    background: "#fff",
    borderRadius: 20,
    padding: "28px 32px",
    marginBottom: 24,
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 900,
    color: "#032932",
    marginBottom: 20,
    marginTop: 0,
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 14,
    flexWrap: "wrap",
  },
  rowLabel: {
    width: 220,
    minWidth: 180,
    fontWeight: 900,
    fontSize: 15,
    color: "#032932",
    textAlign: "right",
    flexShrink: 0,
  },
  rowValue: {
    flex: 1,
    minWidth: 200,
  },
  pill: {
    display: "block",
    width: "100%",
    background: "#e8e8e8",
    borderRadius: 50,
    padding: "11px 20px",
    fontSize: 15,
    color: "#222",
    boxSizing: "border-box",
    border: "none",
    outline: "none",
    fontFamily: "'Poppins', sans-serif",
  },
  pillInput: {
    background: "#f0f0f0",
    border: "2px solid #5fc6a0",
    cursor: "text",
  },
  photo: {
    width: 160,
    height: 120,
    objectFit: "cover",
    borderRadius: 12,
    border: "2px solid #e0e0e0",
  },
  photoPlaceholder: {
    width: 160,
    height: 120,
    background: "#f0f0f0",
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "2px dashed #ccc",
  },
  uploadBtn: {
    background: "#5fc6a0",
    border: "none",
    borderRadius: 50,
    color: "#fff",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: 13,
    padding: "8px 18px",
    cursor: "pointer",
    width: "fit-content",
  },
  editBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "#5fc6a0",
    border: "none",
    borderRadius: 50,
    color: "#fff",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 900,
    fontSize: 14,
    padding: "10px 22px",
    cursor: "pointer",
  },
};