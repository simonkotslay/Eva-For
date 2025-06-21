import React from "react";
import logo from "../../images/evangadi-logo.png"; // Adjust path if needed
import "./About.css";

function About() {
  return (
    <section className="about-container">
      <div className="about-header">
        <img src={logo} alt="Evangadi Logo" className="about-logo" />
        <h1>About Evangadi Forum</h1>
      </div>
      <div className="about-content">
        <p>
          Evangadi Forum is a community-driven platform designed to facilitate
          discussions, share knowledge, and connect individuals with similar
          interests. Our mission is to create a welcoming space for users to ask
          questions, provide answers, and engage in meaningful conversations.
        </p>
        <p>
          Whether you're looking for help with a specific topic or want to
          contribute your expertise, Evangadi Forum is the place for you. Join
          us today and be part of our growing community!
        </p>
      </div>
    </section>
  );
}

export default About;
