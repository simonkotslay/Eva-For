import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // <-- import useParams
import axiosBase from "../../axiosConfig";
import "./answer.css";

// User icon shown next to the username
const UserIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" fill="#E0E0E0" />
    <circle cx="12" cy="7" r="3" fill="#757575" />
    <path
      d="M12 14C9.23858 14 7 16.2386 7 19H17C17 16.2386 14.7614 14 12 14Z"
      fill="#757575"
    />
  </svg>
);

// Arrow icon for the question title
const RightArrowIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" fill="#3b4a6b" />
    <path
      d="M10 17L15 12L10 7"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// --- Main Page Component ---
const Answer = () => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user")); // <-- Add this line

  // Fetch the selected question and its answers
  useEffect(() => {
    const fetchQuestionAndAnswers = async () => {
      try {
        const token = localStorage.getItem("token");
        // Fetch the question with auth header
        const qRes = await axiosBase.get(`/questions/${questionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuestion(qRes.data.question);

        // Fetch answers for this question with auth header
        const aRes = await axiosBase.get(
          `/answers/all-answers?questionId=${questionId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAnswers(aRes.data || []);
      } catch (err) {
        setError("Failed to load question or answers.");
      }
    };
    if (questionId) fetchQuestionAndAnswers();
  }, [questionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (newAnswer.trim() === "") return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axiosBase.post(
        "/answers/answer",
        {
          questionid: questionId,
          answer: newAnswer,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Re-fetch answers from backend after posting
      const aRes = await axiosBase.get(
        `/answers/all-answers?questionId=${questionId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAnswers(aRes.data || []);
      setNewAnswer("");
    } catch (err) {
      setError("Failed to post answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ans-container">
      {/* --- Selected Question Display --- */}
      <section className="ans-question-section">
        {question ? (
          <div className="ans-question-title-container">
            <RightArrowIcon />
            <h3 className="ans-question-title">{question.title}</h3>
            <p className="ans-question-detail">{question.description}</p>
          </div>
        ) : (
          <p>Loading question...</p>
        )}
      </section>

      {/* --- Community Answers Section --- */}
      <section className="ans-community-section">
        <h2>Answer From The Community</h2>
        <ul className="ans-list">
          {answers.map((answer) => (
            <li key={answer.id || answer.answerid} className="ans-item">
              <div className="ans-user-info">
                <UserIcon />
                <span className="ans-user-name">
                  {answer.user ||
                    answer.username ||
                    answer.userid ||
                    "Anonymous"}
                </span>
              </div>
              <p className="ans-text">{answer.text || answer.answer}</p>
            </li>
          ))}
        </ul>
      </section>
      {error && <div className="ans-error">{error}</div>}
      {/* --- Form to Post a New Answer --- */}
      <form className="ans-form" onSubmit={handleSubmit}>
        <textarea
          className="ans-textarea"
          placeholder="Your answer ..."
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          disabled={loading}
        ></textarea>
        <button type="submit" className="ans-submit-btn" disabled={loading}>
          {loading ? "Posting..." : "Post Answer"}
        </button>
      </form>
    </div>
  );
};

export default Answer;
