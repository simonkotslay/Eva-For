import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppState } from "../../App";
import axiosBase from "../../axiosConfig";
import "./Home.css";

function Home() {
  const { user } = useContext(AppState);
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Protect route: if no user or no token, redirect to login
    const token = localStorage.getItem("token");
    if (!user || !token) {
      navigate("/");
      return;
    }
    axiosBase
      .get("/questions/all-questions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Fetched questions:", res.data);
        setQuestions((res.data.questions || []).reverse());
      })
      .catch((err) => console.error(err));
  }, [user, navigate]);

  return (
    <div className="home-container">
      <div className="home-header">
        <h2>Welcome: {user.username}!</h2>
      </div>
      <button className="ask-btn" onClick={() => navigate("/question")}>
        Ask Question
      </button>
      <h2 className="questions-title">Questions</h2>
      <div>
        {questions.map((q) => (
          <div
            className="question-row"
            key={q.questionid}
            onClick={() => navigate(`/answer/${q.questionid}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="question-avatar-col">
              <div className="simple-avatar">
                {String(q.userid || "")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div className="question-userid">{q.username}</div>
            </div>
            <div className="question-content">
              <div className="question-text">{q.title}</div>
              <div className="question-description">{q.description}</div>
            </div>
            <span className="arrow">&#8250;</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
