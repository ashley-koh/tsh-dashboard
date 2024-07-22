import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">
          <img src="../../assets/logo.png" alt="Logo" />
        </div>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/statistics"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Department Statistics
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/appraisals"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Appraisal Forms
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
