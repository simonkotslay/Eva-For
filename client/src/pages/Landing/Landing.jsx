import React, { useRef, useState, useContext } from "react";
import "./Landing.css";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { AppState } from "../../App"; // <-- import context

// Login component
function Login({ onToggle }) {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();
  const { setUser } = useContext(AppState);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "error" or "success"

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;
    if (!emailValue || !passValue) {
      setMessage("Please provide all required fields");
      setMessageType("error");
      return;
    }
    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });
      setMessage("Login successful.");
      setMessageType("success");
      localStorage.setItem("token", data.token);

      const userRes = await axios.get("/users/check", {
        headers: { Authorization: "Bearer " + data.token },
      });
      setUser(userRes.data);

      navigate("/home");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage("Invalid email or password.");
        setMessageType("error");
      } else {
        setMessage("Something went wrong, please try again later");
        setMessageType("error");
      }
      console.log(error.response?.data);
    }
  }

  return (
    <div className="login-box">
      {message && (
        <div className={`form-message ${messageType}`}>{message}</div>
      )}

      <h2>Login to your account</h2>

      <p>
        Don't have an account?{" "}
        <button type="button" className="toggle-btn" onClick={onToggle}>
          Create a new account
        </button>
      </p>
      <form onSubmit={handleSubmit}>
        <input ref={emailDom} type="email" placeholder="Your Email" />
        <input ref={passwordDom} type="password" placeholder="Your Password" />
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
      <button
        type="button"
        className="create-account-link"
        onClick={onToggle}
        style={{ marginTop: 18 }}
      >
        Forgot Password?
      </button>
    </div>
  );
}

// Register component
function Register({ onToggle }) {
  const navigate = useNavigate();
  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "error" or "success"

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    const usernameValue = usernameDom.current.value;
    const firstnameValue = firstnameDom.current.value;
    const lastnameValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;
    if (
      !usernameValue ||
      !firstnameValue ||
      !lastnameValue ||
      !emailValue ||
      !passValue
    ) {
      setMessage("Please provide all required fields");
      setMessageType("error");
      return;
    }
    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passValue,
      });
      setMessage("Registration successful. Please login.");
      setMessageType("success");
      setTimeout(() => {
        setMessage("");
        setMessageType("");
        onToggle(); // Switch to login after registration
      }, 1500);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMessage("Email already registered.");
        setMessageType("error");
      } else {
        setMessage("Something went wrong, please try again later");
        setMessageType("error");
      }
      console.log(error.response?.data);
    }
  }

  return (
    <div className="login-box">
      {message && (
        <div className={`form-message ${messageType}`}>{message}</div>
      )}

      <h2>Join the network</h2>

      <p>
        Already have an account?{" "}
        <button type="button" className="toggle-btn" onClick={onToggle}>
          Sign in
        </button>
      </p>
      <form onSubmit={handleSubmit}>
        <input ref={usernameDom} type="text" placeholder="User Name" />
        <div className="register-names-row">
          <input ref={firstnameDom} type="text" placeholder="First Name" />
          <input ref={lastnameDom} type="text" placeholder="Last Name" />
        </div>
        <input ref={emailDom} type="email" placeholder="Email" />
        <input ref={passwordDom} type="password" placeholder="Password" />
        <button type="submit" className="register-btn">
          Agree and Join
        </button>
      </form>
      <div className="register-agreement">
        I agree to the{" "}
        <a href="#" target="_blank" rel="noopener noreferrer">
          privacy policy
        </a>{" "}
        and{" "}
        <a href="#" target="_blank" rel="noopener noreferrer">
          terms of service.
        </a>
      </div>
      <button type="button" className="create-account-link" onClick={onToggle}>
        Already have an account?
      </button>
    </div>
  );
}

// Landing page
function Landing() {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate(); // Add this line

  return (
    <div className="landing-container">
      <div className="landing-login">
        {showLogin ? (
          <Login onToggle={() => setShowLogin(false)} />
        ) : (
          <Register onToggle={() => setShowLogin(true)} />
        )}
      </div>
      <div className="landing-about">
        <h4>About</h4>
        <h2>Evangadi Networks Q&amp;A</h2>
        <p>
          No matter what stage of life you are in, whether you're just starting
          elementary school or being promoted to CEO of a Fortune 500 company,
          you have much to offer to those who are trying to follow in your
          footsteps.
        </p>
        <button className="how-it-works-btn" onClick={() => navigate("/about")}>
          HOW IT WORKS
        </button>
      </div>
    </div>
  );
}

export default Landing;
