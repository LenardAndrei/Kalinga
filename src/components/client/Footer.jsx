import logo from "../../assets/colored-logo.svg"
import facebookIcon from "../../assets/facebook.svg"
import instagramIcon from "../../assets/instagram.svg"
import emailIcon from "../../assets/email.svg"
import locationIcon from "../../assets/location.svg"
import phoneIcon from "../../assets/phone.svg"
import clockIcon from "../../assets/clock.svg"
import "./Footer.css"

function Footer() {

  return (
    <footer className="footer">

      {/* TITLE */}
      <div className="footer-top-section">
        <div className="footer-title">
          <img src={logo} alt="Kalinga Logo" style={{ width: "42px" }} />
          <h3 className="footer-title-name">Kalinga</h3>
        </div>
        <p className="footer-tagline">Bringing care closer to you.</p>
      </div>

      {/* INFO GRID */}
      <div className="footer-info-grid">

        {/* ADDRESS */}
        <div className="footer-info-item">
          <img src={locationIcon} alt="Location Icon" className="footer-icon-box" />
          <div>
            <p className="footer-info-label">Main Office Address:</p>
            <p className="footer-info-text">
              Batangas State University – Alangilan Campus, Alangilan,<br />Batangas
            </p>
          </div>
        </div>

        {/* PHONE */}
        <div className="footer-info-item">
          <img src={phoneIcon} alt="Phone Icon" className="footer-icon-box" />
          <div>
            <p className="footer-info-label">Phone:</p>
            <p className="footer-info-text">
              +63 9XX XXX XXXX<br />(042) XXX XXXX
            </p>
          </div>
        </div>

        {/* EMAIL + SOCIAL */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="footer-info-item">
            <img src={emailIcon} alt="Email Icon" className="footer-icon-box" />
            <div>
              <p className="footer-info-label">Email:</p>
              <p className="footer-info-text">
                support@kalingahealth.ph<br />kalinga.support@gmail.com
              </p>
            </div>
          </div>

          {/* SOCIAL ICONS */}
          <div className="footer-social-row" style={{ marginLeft: "100px" }}>
            {/* Facebook — replace with your icon */}
            <img src={facebookIcon} alt="Facebook Icon" className="footer-social-icon" />
            {/* Instagram — replace with your icon */}
            <img src={instagramIcon} alt="Instagram Icon" className="footer-social-icon" />
          </div>
        </div>

      </div>

      {/* OFFICE HOURS — sits below address in same left column feel */}
      <div className="footer-office-hours">
        <img src={clockIcon} alt="Clock Icon" className="footer-icon-box" />
        <div>
          <p className="footer-info-label">Office Hours:</p>
          <p className="footer-info-text">Monday – Friday | 8:00 AM – 5:00 PM</p>
        </div>
      </div>

      {/* PRIVACY NOTICE */}
      <div className="footer-privacy-section">
        <p className="footer-privacy-title">Privacy Notice</p>
        <p className="footer-privacy-text">
          KALINGA respects your privacy. All personal information submitted through this portal is
          handled in accordance with data protection policies and is used only for healthcare service purposes.
        </p>
      </div>

    </footer>
  )
}

export default Footer