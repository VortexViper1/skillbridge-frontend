import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Auth.css";

function Login() {

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
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
      const response = await API.post("/login", formData);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/dashboard");
    } catch {
      alert("Invalid Email or Password");
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
            Sharpen your skills.<br />
            <em>Ship with confidence.</em>
          </h2>
          <p className="auth-hero-sub">
            AI-powered learning paths built around your goals, your pace, and the stack you actually use.
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
          <p className="auth-eyebrow">Welcome back</p>
          <h1 className="auth-title">Sign in</h1>
          <p className="auth-subtitle">Enter your credentials to continue</p>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label className="auth-label" htmlFor="email">Email address</label>
              <input className="auth-input" id="email" type="email" name="email" placeholder="you@example.com" onChange={handleChange} />
            </div>
            <div className="auth-field">
              <label className="auth-label" htmlFor="password">Password</label>
              <input className="auth-input" id="password" type="password" name="password" placeholder="••••••••" onChange={handleChange} />
            </div>
            <div className="auth-forgot">
              <a href="#">Forgot password?</a>
            </div>
            <button className="auth-btn" type="submit">Continue</button>
          </form>
          <div className="auth-divider">
            <span className="auth-divider-line"></span>
            <span className="auth-divider-text">or</span>
            <span className="auth-divider-line"></span>
          </div>
          <div className="auth-link">
            New to SkillBridge? <Link to="/register">Create an account</Link>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Login;