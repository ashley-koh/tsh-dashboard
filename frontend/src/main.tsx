import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import DepartmentStatistics from "./pages/DepartmentStatistics";
import AppraisalForms from "./pages/AppraisalForms";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="statistics" element={<DepartmentStatistics />} />
          <Route path="appraisals" element={<AppraisalForms />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
