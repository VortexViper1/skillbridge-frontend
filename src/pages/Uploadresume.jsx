import { useState,useEffect } from "react";
import API from "../services/api";
import "./UploadResume.css";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  useEffect(() => {

  const savedResult = localStorage.getItem("resumeAnalysis");

  if (savedResult) {
    setResult(JSON.parse(savedResult));
  }

}, []);
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume first");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      setLoading(true);
      const response = await API.post("/upload-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);

localStorage.setItem(
  "resumeAnalysis",
  JSON.stringify(response.data)
);
    } catch (error) {
      console.error(error);
      alert("Resume Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped?.type === "application/pdf") setFile(dropped);
  };

  const scoreColor = (score) => {
    if (score >= 80) return "#4ade80";
    if (score >= 60) return "#facc15";
    return "#f87171";
  };

  return (
    <div className="ur-page">

      <div className="ur-grid-bg" aria-hidden="true" />
      <div className="ur-glow" aria-hidden="true" />
      <div className="ur-glow-2" aria-hidden="true" />

      <div className="ur-container">

        {/* Header */}
        <div className="ur-header">
          <div className="ur-badge">
            <span className="ur-badge-dot" />
            AI-Powered Analysis
          </div>
          <h1 className="ur-title">Resume Analyzer</h1>
          <p className="ur-subtitle">
            Upload your resume and receive ATS insights, skill gaps,
            job matches, and personalized recommendations.
          </p>
        </div>

        {/* Upload box */}
        <div
          className={`ur-dropzone${dragOver ? " drag-over" : ""}${file ? " has-file" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <div className="ur-drop-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 3v16M7 10l7-7 7 7M5 22h18"
                stroke="url(#upGrad)" strokeWidth="1.75"
                strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="upGrad" x1="5" y1="3" x2="23" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#93c5fd" />
                  <stop offset="1" stopColor="#c4b5fd" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {file ? (
            <div className="ur-file-name">
              <span className="ur-file-icon">📄</span>
              {file.name}
              <button
        className="ur-file-clear"
        onClick={() => {
          setFile(null);
          setResult(null);
          localStorage.removeItem("resumeAnalysis");
        }}
        aria-label="Remove file"
      >
        ×
</button>
            </div>
          ) : (
            <>
              <p className="ur-drop-text">
                Drag & drop your PDF resume here
              </p>
              <span className="ur-drop-or">or</span>
              <label className="ur-file-label">
                Browse File
                <input
                  type="file"
                  accept=".pdf"
                  className="ur-file-input"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
            </>
          )}

          <button
            className="ur-btn"
            onClick={handleUpload}
            disabled={!file || loading}
          >
            {loading ? (
              <span className="ur-btn-loading">
                <span /><span /><span />
                Analyzing…
              </span>
            ) : (
              "Analyze Resume"
            )}
          </button>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="ur-loading">
            <div className="ur-loading-dots">
              <span /><span /><span />
            </div>
            <p>Scanning your resume and generating insights…</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="ur-results">

            <div className="ur-results-header">
              <p className="ur-results-label">Analysis complete</p>
              <button className="ur-btn-outline" onClick={() => { setResult(null); setFile(null); }}>
                Analyze another
              </button>
            </div>

            {/* ATS Score — hero card */}
            <div className="ur-score-card">
              <div className="ur-score-left">
                <p className="ur-card-label">ATS Score</p>
                <div className="ur-score-big" style={{ color: scoreColor(result.ats_score) }}>
                  {result.ats_score}
                  <span>%</span>
                </div>
                <p className="ur-score-strength">{result.resume_strength}</p>
              </div>
              <div className="ur-score-ring-wrap" aria-hidden="true">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none"
                    stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                  <circle cx="60" cy="60" r="50" fill="none"
                    stroke={scoreColor(result.ats_score)} strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - result.ats_score / 100)}`}
                    transform="rotate(-90 60 60)"
                    style={{ transition: "stroke-dashoffset 1.2s ease" }}
                  />
                </svg>
                <span className="ur-ring-label" style={{ color: scoreColor(result.ats_score) }}>
                  {result.ats_score}%
                </span>
              </div>
            </div>

            {/* Job Match Engine */}
            {result.job_matches?.length > 0 && (
              <div className="ur-card ur-wide">
                <p className="ur-card-label">Job Match Engine</p>
                <div className="ur-job-list">
                  {result.job_matches.map((job, i) => (
                    <div key={i} className="ur-job-row">
                      <span className="ur-job-role">{job.role}</span>
                      <div className="ur-progress">
                        <div
                          className="ur-progress-bar"
                          style={{ width: `${job.match_percentage}%` }}
                        />
                      </div>
                      <span className="ur-job-pct">{job.match_percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Grid cards */}
            <div className="ur-grid">

              {result.skills_found?.length > 0 && (
                <div className="ur-card">
                  <p className="ur-card-label">Skills Found</p>
                  <ul className="ur-list">
                    {result.skills_found.map((s, i) => (
                      <li key={i} className="ur-list-item ur-list-check">{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.missing_skills?.length > 0 && (
                <div className="ur-card">
                  <p className="ur-card-label">Missing Skills</p>
                  <ul className="ur-list">
                    {result.missing_skills.map((s, i) => (
                      <li key={i} className="ur-list-item ur-list-plus">{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.strengths?.length > 0 && (
                <div className="ur-card">
                  <p className="ur-card-label">Strengths</p>
                  <ul className="ur-list">
                    {result.strengths.map((s, i) => (
                      <li key={i} className="ur-list-item ur-list-check">{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.weaknesses?.length > 0 && (
                <div className="ur-card">
                  <p className="ur-card-label">Weaknesses</p>
                  <ul className="ur-list">
                    {result.weaknesses.map((s, i) => (
                      <li key={i} className="ur-list-item ur-list-dot">{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.recommended_roles?.length > 0 && (
                <div className="ur-card">
                  <p className="ur-card-label">Recommended Roles</p>
                  <ul className="ur-list">
                    {result.recommended_roles.map((r, i) => (
                      <li key={i} className="ur-list-item ur-list-arrow">{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.recommended_projects?.length > 0 && (
                <div className="ur-card">
                  <p className="ur-card-label">Recommended Projects</p>
                  <ul className="ur-list">
                    {result.recommended_projects.map((p, i) => (
                      <li key={i} className="ur-list-item ur-list-dot">{p}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.improvement_suggestions?.length > 0 && (
                <div className="ur-card">
                  <p className="ur-card-label">ATS Improvement Tips</p>
                  <ul className="ur-list">
                    {result.improvement_suggestions.map((s, i) => (
                      <li key={i} className="ur-list-item ur-list-dot">{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.interview_questions?.length > 0 && (
                <div className="ur-card">
                  <p className="ur-card-label">Interview Questions</p>
                  <ul className="ur-list">
                    {result.interview_questions.map((q, i) => (
                      <li key={i} className="ur-list-item ur-list-num">
                        <span className="ur-q-num">{String(i + 1).padStart(2, "0")}</span>
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.summary && (
                <div className="ur-card ur-wide">
                  <p className="ur-card-label">Professional Summary</p>
                  <p className="ur-summary">{result.summary}</p>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default UploadResume;