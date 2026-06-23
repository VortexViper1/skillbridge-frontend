import { Link } from "react-router-dom";
import "./Home.css";

function Home() {

  return (

    <div className="home">

      <div className="glow g1"></div>
      <div className="glow g2"></div>
      <div className="glow g3"></div>

      <section className="hero-section">

        <h1 className="hero-title">

          Build a Resume That
          <span className="hero-gradient">
            {" "}Gets You Hired
          </span>

        </h1>

        <p className="hero-subtitle">

          SkillBridge AI analyzes resumes,
          calculates ATS scores, identifies
          missing skills, and provides
          career recommendations to help
          students land internships and jobs.

        </p>

        <div className="hero-buttons">

          <Link
            to="/register"
            className="primary-btn"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="secondary-btn"
          >
            Login
          </Link>

        </div>

      </section>

      <section className="features">

        <div className="feature-box">
          <h3>📄 Resume Analysis</h3>
          <p>
            Upload your resume and
            instantly extract skills,
            technologies and keywords.
          </p>
        </div>

        <div className="feature-box">
          <h3> ATS Scoring</h3>
          <p>
            Get a realistic ATS score
            and understand how recruiters
            view your resume.
          </p>
        </div>

        <div className="feature-box">
          <h3> Career Guidance</h3>
          <p>
            Discover job roles,
            missing skills and
            personalized recommendations.
          </p>
        </div>

      </section>

    </div>

  );
}

export default Home;