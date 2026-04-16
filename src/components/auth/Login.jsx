import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import logo from "../../assets/colored-logo.svg"         
import googleIcon from "../../assets/google.png"  
import facebookIcon from "../../assets/facebook_login.png"   

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Login:", form)
    navigate("/client/home")   // change to your route after login
  }

  return (
    <div className="login-page">

      {/* left panel — teal gradient */}
      <div className="login-left" />

      {/* right panel — form */}
      <div className="login-right">

        {/* logo */}
        <img src={logo} alt="Kalinga Logo" className="login-logo" />

        <h1 className="login-title">LOG IN</h1>

        <form className="login-form" onSubmit={handleSubmit}>

          {/* email */}
          <input
            className="login-input"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* password */}
          <div className="login-password-wrapper">
            <input
              className="login-input"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="login-eye-btn"
              onClick={() => setShowPassword((s) => !s)}
            >
              {showPassword ? (
                // eye open
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              ) : (
                // eye off
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              )}
            </button>
          </div>

          {/* forgot password */}
          <div className="login-forgot-row">
            <span
              className="login-forgot"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </span>
          </div>

          {/* submit */}
          <button type="submit" className="login-btn">
            Log In
          </button>

        </form>

        {/* or with */}
        <p className="login-or">Or with</p>

        <div className="login-social-row">
          <button className="login-social-btn" type="button">
            <img src={googleIcon} alt="Google" className="login-social-icon" />
          </button>
          <button className="login-social-btn" type="button">
            <img src={facebookIcon} alt="Facebook" className="login-social-icon" />
          </button>
        </div>

        {/* register */}
        <p className="login-register-text">
          Don't have an account yet?{" "}
          <span
            className="login-register-link"
            onClick={() => navigate("/register")}
          >
            Register here
          </span>
        </p>

      </div>
    </div>
  )
}

export default Login