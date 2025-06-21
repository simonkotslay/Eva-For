import "./question.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Import useNavigate
import axiosBase from "../../axiosConfig";

const Question = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [message, setMessage] = useState(""); // <-- Add message state
  const [messageType, setMessageType] = useState(""); // <-- Add message type state
  const navigate = useNavigate(); // <-- Create navigate instance

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // or sessionStorage, or from context/state
      await axiosBase.post(
        "/questions/question",
        {
          title,
          description: desc,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle("");
      setDesc("");
      setMessage("Question posted successfully!,Redirecting to home...");
      setMessageType("success");
      setTimeout(() => {
        navigate("/home"); // <-- Redirect to home after 1 second
      }, 3000);
    } catch (error) {
      setMessage(error.response?.data?.msg || "Failed to post question");
      setMessageType("error");
    }
  };

  // Sample data for the list of questions
  const questions = [
    { id: 1, user: "sisay", title: "javascript" },
    { id: 2, user: "nati", title: "what is jwt" },
    // Add more questions here if you want
  ];

  // Arrow icon on the right of each question
  const ArrowIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.59003 16.59L13.17 12L8.59003 7.41L10 6L16 12L10 18L8.59003 16.59Z"
        fill="#424242"
      />
    </svg>
  );
  // User icon shown next to the username
  const UserIcon = () => (
    <svg
      width="60"
      height="60"
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

  return (
    <>
      {/* <Header /> */}
      <div className="q-page-wrapper">
        <div className="q-steps-container">
          <h2 className="q-steps-title">Steps to write a good question</h2>
          <ul className="q-steps-list">
            <li>Summerize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </div>

        <div className="q-form-container">
          <h2 className="q-form-title">Ask a public question</h2>
          <p className="q-form-link">Go to Question page</p>
          <form className="q-form" onSubmit={handleSubmit}>
            {message && (
              <div
                className="q-message"
                style={{
                  color: messageType === "success" ? "green" : "red",
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                {message}
              </div>
            )}
            <input
              type="text"
              className="q-form-input"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              className="q-form-textarea"
              placeholder="Question Description..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
            <button type="submit" className="q-form-button">
              Post Your Question
            </button>
          </form>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Question;
