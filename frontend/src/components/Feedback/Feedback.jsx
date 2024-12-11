import React from "react";
import { Link } from "react-router-dom";
import "./FeedBack.css";

const Feedback = () => {
  return (
    <>
      <Link to="/feedback">
        <button className="feedback-container">FeedBack</button>
      </Link>
    </>
  );
};

export default Feedback;
