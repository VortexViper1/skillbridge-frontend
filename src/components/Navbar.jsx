import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  const location = useLocation();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (
    location.pathname === "/login" ||
    location.pathname === "/register"
  ) {
    return null;
  }

  return (

    <nav className="navbar-custom">

      <div className="nav-logo">
         SkillBridge AI
      </div>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        {user && (
          <>
            <Link to="/dashboard">
              Dashboard
            </Link>

            <Link to="/upload-resume">
              Resume Analyzer
            </Link>
            <Link to="/mock-interview">
              AI Mock Interview
            </Link>
          </>
        )}

      </div>

      <div>

        {!user ? (
          <>
            <Link
              to="/login"
              className="nav-btn"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="nav-btn primary"
            >
              Register
            </Link>
          </>
        ) : (
          <button
            className="nav-btn primary"
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        )}

      </div>

    </nav>

  );
}

export default Navbar;