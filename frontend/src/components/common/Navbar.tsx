import React from "react";
import { NavLink } from "react-router-dom";

import useAuth from "@/context/auth/useAuth";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const auth = useAuth();

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
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Appraisals
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className='logout'
              onClick={auth.logout}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
