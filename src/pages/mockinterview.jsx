import { useState } from "react";
import API from "../services/api";
import "./MockInterview.css";

function MockInterview() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateInterview = async () => {
    try {
      setLoading(true);
      const response = await API.get("/generate-interview");
      const data =
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;
      setQuestions(data);
    } catch (error) {
      console.error(error);
      alert("Failed to generate interview questions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mock-page">

      <div className="mock-grid-bg" aria-hidden="true" />
      <div className="mock-glow" aria-hidden="true" />

      <div className="mock-container">

        <div className="mock-header">
          <div className="mock-badge">
            <span className="mock-badge-dot" />
            AI-Powered
          </div>
          <h1 className="mock-title">
            Mock Interview
          </h1>
          <p className="mock-subtitle">
            Personalized questions generated from your resume and role.
          </p>
        </div>

        {questions.length === 0 && !loading && (
          <div className="mock-start">
            <div className="mock-start-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 3L17 11H25L19 16L21.5 24L14 19.5L6.5 24L9 16L3 11H11L14 3Z"
                  fill="url(#qGrad)" />
                <defs>
                  <linearGradient id="qGrad" x1="3" y1="3" x2="25" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#93c5fd" />
                    <stop offset="1" stopColor="#c4b5fd" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <p className="mock-start-text">
              Ready when you are. Hit generate and your personalized<br />
              interview questions will appear here.
            </p>
            <button className="mock-btn" onClick={generateInterview}>
              Generate Interview Questions
            </button>
          </div>
        )}

        {loading && (
          <div className="mock-loading">
            <div className="mock-loading-dots">
              <span /><span /><span />
            </div>
            <p>Analyzing your resume and crafting questions…</p>
          </div>
        )}

        {questions.length > 0 && (
          <>
            <div className="mock-results-header">
              <p className="mock-results-label">
                {questions.length} questions generated
              </p>
              <button className="mock-btn-outline" onClick={generateInterview}>
                Regenerate
              </button>
            </div>

            <ol className="mock-questions">
              {questions.map((item, index) => (
                <li key={index} className="mock-question-item">
                  <span className="mock-q-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mock-q-text">
                    {item.question}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mock-footer-action">
              <button className="mock-btn" onClick={generateInterview}>
                Generate New Set
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default MockInterview;