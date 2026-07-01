import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Auth.css";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", formData);
      alert("Registration Successful");
      navigate("/login");
    } catch {
      alert("Registration Failed");
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-panel-left">
        <div className="auth-brand">
          <div className="auth-brand-icon">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="auth-brand-name">SkillBridge AI</span>
        </div>
        <div className="auth-hero">
          <h2 className="auth-hero-headline">
            Start your journey.<br />
            <em>Learn what matters.</em>
          </h2>
          <p className="auth-hero-sub">
            Join thousands of developers building real skills with AI-powered learning paths tailored to their goals.
          </p>
        </div>
        <div className="auth-stats">
          <div>
            <div className="auth-stat-value">40k+</div>
            <div className="auth-stat-label">Active learners</div>
          </div>
          <div>
            <div className="auth-stat-value">200+</div>
            <div className="auth-stat-label">Skill tracks</div>
          </div>
          <div>
            <div className="auth-stat-value">4.9★</div>
            <div className="auth-stat-label">Avg. rating</div>
          </div>
        </div>
      </div>

      <div className="auth-panel-right">
        <div className="auth-card">
          <p className="auth-eyebrow">Get started</p>
          <h1 className="auth-title">Create account</h1>
          <p className="auth-subtitle">Join SkillBridge AI for free</p>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label className="auth-label" htmlFor="name">Full name</label>
              <input className="auth-input" id="name" type="text" name="name" placeholder="Ganesh" onChange={handleChange} />
            </div>
            <div className="auth-field">
              <label className="auth-label" htmlFor="email">Email address</label>
              <input className="auth-input" id="email" type="email" name="email" placeholder="you@example.com" onChange={handleChange} />
            </div>
            <div className="auth-field">
              <label className="auth-label" htmlFor="password">Password</label>
              <input className="auth-input" id="password" type="password" name="password" placeholder="••••••••" onChange={handleChange} />
            </div>
            <button className="auth-btn" type="submit" style={{ marginTop: "8px" }}>Create account</button>
          </form>
          <div className="auth-divider">
            <span className="auth-divider-line"></span>
            <span className="auth-divider-text">or</span>
            <span className="auth-divider-line"></span>
          </div>
          <div className="auth-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Register;