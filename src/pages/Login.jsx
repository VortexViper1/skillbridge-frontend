import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Auth.css";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

      const response = await API.post(
        "/login",
        formData
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      navigate("/dashboard");

    } catch {

      alert("Invalid Email or Password");

    }

  };

  return (

    <div className="auth-page">

      <div className="auth-bg bg1"></div>
      <div className="auth-bg bg2"></div>
      <div className="auth-bg bg3"></div>

      <div className="auth-card">

        <h1 className="auth-title">
          Welcome Back
        </h1>

        <p className="auth-subtitle">
          Sign in to SkillBridge AI
        </p>

        <form onSubmit={handleSubmit}>

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
            Login
          </button>

        </form>

        <div className="auth-link">
          New here? <Link to="/register">Register</Link>
        </div>

      </div>

    </div>

  );
}

export default Login;