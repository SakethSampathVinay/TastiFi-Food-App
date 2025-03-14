import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
const Navbar = () => {
  return (
    <div className="navbar">
      <img
        src="https://res.cloudinary.com/dgtfgihga/image/upload/v1727961916/Screenshot_2024-10-03_185337_kfx3hh.png"
        className="logo"
      />
      <p className="active">Admin Panel</p>
      {/* <img className="logo" src={assets.logo} alt="logo" /> */}
      <img className="profile" src={assets.profile_image} alt="profile image" />
    </div>
  );
};

export default Navbar;
