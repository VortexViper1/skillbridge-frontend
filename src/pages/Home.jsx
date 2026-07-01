import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (

    <div className="home">

      <div className="home-grid"></div>
      <div className="home-glow"></div>
      <div className="home-glow-2"></div>

      
  

      <section className="hero-section">


        <h1 className="hero-title">
          Build a Resume That<br />
          <em className="hero-em">Gets You Hired</em>
        </h1>

        <p className="hero-subtitle">
          SkillBridge AI analyzes your resume, calculates ATS scores,
          identifies missing skills, and provides career recommendations
          to help you land internships and jobs.
        </p>

        {user ? (
          <Link to="/dashboard" className="primary-btn">Go to Dashboard</Link>
        ) : (
          <div className="hero-buttons">
            <Link to="/register" className="primary-btn">Get Started</Link>
            <Link to="/login" className="secondary-btn">Login</Link>
          </div>
        )}

      </section>

      <div className="section-divider"></div>

      <div className="features-wrapper">

        <p className="features-label">Everything you need</p>

        <div className="features">

          <div className="feature-box">
            <div className="feature-icon">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3>Resume Analysis</h3>
            <p>
              Upload your resume and instantly extract skills,
              technologies, and keywords that matter to recruiters.
            </p>
          </div>

          <div className="feature-box">
            <div className="feature-icon">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3>ATS Scoring</h3>
            <p>
              Get a realistic ATS score and understand exactly how
              hiring systems and recruiters read your resume.
            </p>
          </div>

          <div className="feature-box">
            <div className="feature-icon">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3>Career Guidance</h3>
            <p>
              Discover matching job roles, identify skill gaps, and
              receive personalized AI recommendations.
            </p>
          </div>

        </div>

      </div>

    </div>

  );
}

export default Home;