import { useState } from "react";
import API from "../services/api";
import "./UploadResume.css";

function UploadResume() {

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a resume first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {

      setLoading(true);

      const response = await API.post(
        "/upload-resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setResult(response.data);

    } catch (error) {

      console.error(error);
      alert("Resume Upload Failed");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="upload-page">

      <div className="bg-circle circle1"></div>
      <div className="bg-circle circle2"></div>
      <div className="bg-circle circle3"></div>

      <div className="upload-container">

        <h1 className="upload-title">
          AI Resume Analyzer
        </h1>

        <p className="upload-subtitle">
          Upload your resume and receive ATS insights, skill analysis and AI-powered recommendations.
        </p>

        <div className="upload-box">

          <input
            type="file"
            className="file-input"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            className="upload-btn"
            onClick={handleUpload}
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>

        </div>

        {result && (

          <div className="result-grid">

            <div className="result-card">
              <h2>ATS Score</h2>

              <div className="big-score">
                {result.ats_score}%
              </div>
            </div>

            <div className="result-card">
              <h2>Resume Strength</h2>

              <h3>
                {result.resume_strength}
              </h3>
            </div>

            <div className="result-card">
              <h2>Skills Found</h2>

              <ul className="skills-list">

                {result.skills_found?.map((skill, index) => (

                  <li key={index}>
                    ✓ {skill}
                  </li>

                ))}

              </ul>
            </div>

            <div className="result-card">
              <h2>Recommended Roles</h2>

              <ul className="skills-list">

                {result.recommended_roles?.map((role, index) => (

                  <li key={index}>
                    🎯 {role}
                  </li>

                ))}

              </ul>
            </div>

                    <div className="result-card">
          <h2>📝 Professional Summary</h2>
          <p>{result.summary}</p>
        </div>

        <div className="result-card">
          <h2>💪 Strengths</h2>

          <ul className="skills-list">
            {result.strengths?.map((item, index) => (
              <li key={index}>✓ {item}</li>
            ))}
          </ul>
        </div>
            <div className="result-card">
  <h2>🎯 Job Match Engine</h2>

  {result.job_matches?.map((job, index) => (

    <div
      key={index}
      style={{ marginBottom: "20px" }}
    >

      <p>
        <strong>{job.role}</strong>
      </p>

      <div className="progress">

        <div
          className="progress-bar"
          style={{
            width: `${job.match_percentage}%`
          }}
        >
          {job.match_percentage}%
        </div>

      </div>

    </div>

  ))}

</div>
        <div className="result-card">
          <h2>⚠️ Weaknesses</h2>

          <ul className="skills-list">
            {result.weaknesses?.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="result-card">
          <h2>🚀 Missing Skills</h2>

          <ul className="skills-list">
            {result.missing_skills?.map((item, index) => (
              <li key={index}>+ {item}</li>
            ))}
          </ul>
        </div>

        <div className="result-card">
          <h2>📈 ATS Improvement Suggestions</h2>

          <ul className="skills-list">
            {result.improvement_suggestions?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="result-card">
          <h2>💡 Recommended Projects</h2>

          <ul className="skills-list">
            {result.recommended_projects?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="result-card">
          <h2>🎤 Interview Questions</h2>

          <ul className="skills-list">
            {result.interview_questions?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          
        </div>
            
            </div>


        )}

      </div>

    </div>
  );
}

export default UploadResume;