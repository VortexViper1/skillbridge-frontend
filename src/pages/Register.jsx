import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Auth.css";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/register",
        formData
      );

      alert("Registration Successful");

      navigate("/login");

    } catch {

      alert("Registration Failed");

    }

  };

  return (

    <div className="auth-page">

      <div className="auth-bg bg1"></div>
      <div className="auth-bg bg2"></div>
      <div className="auth-bg bg3"></div>

      <div className="auth-card">

        <h1 className="auth-title">
          Create Account
        </h1>

        <p className="auth-subtitle">
          Join SkillBridge AI
        </p>

        <form onSubmit={handleSubmit}>

          <input
            className="auth-input"
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <input
            className="auth-input"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            className="auth-input"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button
            className="auth-btn"
            type="submit"
          >
            Register
          </button>

        </form>

        <div className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>

      </div>

    </div>

  );
}

export default Register;