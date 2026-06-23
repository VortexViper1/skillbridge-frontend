import { useState } from "react";
import API from "../services/api";
import "./MockInterview.css";

function MockInterview() {

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAnswer, setOpenAnswer] = useState(null);

  const generateInterview = async () => {

    try {

      setLoading(true);

      const response = await API.get(
        "/generate-interview"
      );

      console.log(
        "Interview Response:",
        response.data
      );

      const data =
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;

      setQuestions(data);

    } catch (error) {

      console.error(error);

      alert(
        "Failed to generate interview questions."
      );

    } finally {

      setLoading(false);

    }
  };

  const toggleAnswer = (index) => {

    if (openAnswer === index) {
      setOpenAnswer(null);
    } else {
      setOpenAnswer(index);
    }

  };

  return (

    <div className="mock-page">

      <div className="mock-container">

        <h1 className="mock-title">
          AI Mock Interview
        </h1>

        <p className="mock-subtitle">
          Personalized interview questions generated from your resume
        </p>

        <button
          className="generate-btn"
          onClick={generateInterview}
        >
          {loading
            ? "Generating..."
            : "Generate AI Interview"}
        </button>

        <div className="questions-grid">

          {questions.length > 0 ? (

            questions.map((item, index) => (

              <div
                key={index}
                className="question-card"
              >

                <h3>
                  Q{index + 1}. {item.question}
                </h3>

                <button
                  className="answer-btn"
                  onClick={() =>
                    toggleAnswer(index)
                  }
                >
                  {openAnswer === index
                    ? "Hide Answer"
                    : "Reveal Ideal Answer"}
                </button>

                {openAnswer === index && (

                  <div className="answer-box">

                    {item.answer || "Fuck You!, go learn by ur self, this is the project done by you NOT AI!"}

                  </div>

                )}

              </div>

            ))

          ) : (

            <div className="empty-state">

              Click "Generate AI Interview"
              to create personalized
              interview questions.

            </div>

          )}

        </div>

      </div>

    </div>

  );
}

export default MockInterview;