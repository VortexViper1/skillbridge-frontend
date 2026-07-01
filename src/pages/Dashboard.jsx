import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (

    <div className="dashboard">

      <div className="bg-blob blob1"></div>
      <div className="bg-blob blob2"></div>
      <div className="bg-blob blob3"></div>

     

      <section className="hero">
        <h1>
          Welcome Back,
          <span> {user?.name}</span>
        </h1>
        <p>
          AI Powered Resume Analysis &
          Career Intelligence Platform
        </p>
      </section>

      <div className="cards">
        <div className="glass-card">
          <h2>88%</h2>
          <p>ATS Score</p>
        </div>
        <div className="glass-card">
          <h2>12</h2>
          <p>Skills Found</p>
        </div>
        <div className="glass-card">
          <h2>4</h2>
          <p>Job Matches</p>
        </div>
        <div className="glass-card">
          <h2>AI</h2>
          <p>Recommendations</p>
        </div>
      </div>

      <div className="upload-section">
        <h2>Resume Analyzer</h2>
        <p>
          Upload your resume and receive ATS insights, skill detection,
          job recommendations and AI suggestions.
        </p>
        <Link to="/upload-resume" className="upload-btn">Upload Resume</Link>
        <Link to="/mock-interview" className="upload-btn">AI Mock Interview</Link>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>ATS Analysis</h3>
          <p>Check resume compatibility with hiring systems.</p>
        </div>
        <div className="feature-card">
          <h3>Skill Detection</h3>
          <p>Automatically identify technologies from resume.</p>
        </div>
        <div className="feature-card">
          <h3>Career Insights</h3>
          <p>AI suggestions for better placement opportunities.</p>
        </div>
      </div>

    </div>

  );
}

export default Dashboard;