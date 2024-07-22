import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";

import App from "./App";
import DepartmentStatistics from "./pages/Dashboard/DepartmentStatistics";
import AppraisalForms from "./pages/AppraisalForms";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import DetailedEmployeeStats from "./pages/Dashboard/DetailedEmployeeStats";

import AuthProvider from "./context/auth/AuthContext";
import PrivateRoute from "./components/router/PrivateRoute";
import RoleBasedRoute from "./components/router/RoleBasedRoute";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<App />}>
              <Route element={<RoleBasedRoute roles={['hr', 'head_of_department']} />}>
                <Route path="statistics" element={<DepartmentStatistics />} />
                <Route path="employee/:employeeId" element={<DetailedEmployeeStats />} />
              </Route>
              <Route path="appraisals" element={<AppraisalForms />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);