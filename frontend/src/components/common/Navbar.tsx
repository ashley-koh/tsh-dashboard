import React from "react";
import { NavLink } from "react-router-dom";

import useAuth from "@/context/auth/useAuth";
import "./Navbar.css";
import logo from "../../assets/logo.png";

const Navbar: React.FC = () => {
  const auth = useAuth();

  const roles = ["hr", "head_of_department"];

  return (
    <header className="header">
      <nav className="nav">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
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
          {auth.user && roles.includes(auth.user.role) && (
            <li>
              <NavLink
                to="/statistics"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Department Statistics
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Appraisals
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="logout" onClick={auth.logout}>
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
