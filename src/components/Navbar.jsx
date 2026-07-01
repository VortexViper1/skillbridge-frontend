import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  if (
    location.pathname === "/login" ||
    location.pathname === "/register"
  ) {
    return null;
  }

  const navLinks = [
    { to: "/", label: "Home" },
    ...(user
      ? [
          { to: "/dashboard", label: "Dashboard" },
          { to: "/upload-resume", label: "Resume Analyzer" },
          { to: "/mock-interview", label: "AI Mock Interview" },
        ]
      : []),
  ];

  return (
    <header className="nb-header">
      <nav className="nb-inner">

        {/* Brand */}
        <Link to="/" className="nb-brand">
          <span className="nb-brand-icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8.5 1.5L10 6H14.5L11 8.75L12.5 13.5L8.5 10.75L4.5 13.5L6 8.75L2.5 6H7L8.5 1.5Z"
                fill="white"
                fillOpacity="0.9"
              />
            </svg>
          </span>
          <span className="nb-brand-name">SkillBridge AI</span>
        </Link>

        {/* Desktop links */}
        <div className="nb-links">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`nb-link${location.pathname === to ? " active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="nb-actions">
          {!user ? (
            <>
              <Link to="/login" className="nb-link">
                Sign in
              </Link>
              <Link to="/register" className="nb-cta">
                Get Started
              </Link>
            </>
          ) : (
            <button
              className="nb-cta"
              onClick={() => {
                localStorage.removeItem("user");
                window.location.href = "/";
              }}
            >
              Logout
            </button>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="nb-hamburger"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen
            ? <X size={18} strokeWidth={1.75} />
            : <Menu size={18} strokeWidth={1.75} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`nb-mobile${mobileOpen ? " open" : ""}`}>
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`nb-mobile-link${location.pathname === to ? " active" : ""}`}
            onClick={() => setMobileOpen(false)}
          >
            {label}
          </Link>
        ))}
        <div className="nb-mobile-actions">
          {!user ? (
            <>
              <Link to="/login" className="nb-mobile-ghost" onClick={() => setMobileOpen(false)}>
                Sign in
              </Link>
              <Link to="/register" className="nb-cta" onClick={() => setMobileOpen(false)}>
                Get Started
              </Link>
            </>
          ) : (
            <button
              className="nb-cta"
              onClick={() => {
                localStorage.removeItem("user");
                window.location.href = "/";
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;