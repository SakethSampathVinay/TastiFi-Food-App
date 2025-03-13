import "./HelpButton.css"
import React from 'react';
import { Link } from 'react-router-dom';

const HelpButton = () => {
  return (
    <>
    <Link to="/help">
      <button className="help-button">Help</button>
    </Link>
    </>
  );
};

export default HelpButton;