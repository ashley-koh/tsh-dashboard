import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import App from "./App";
import AppraisalForm from "./pages/AppraisalForms/AppraisalForm";
import AppraisalReview from "./pages/AppraisalForms/AppraisalReview";
import Dashboard from "./pages/AppraisalForms/Dashboard";
import DepartmentStatistics from "./pages/Statistics";
import FormEditor from "./pages/AppraisalForms/FormEditor";
import InfoHome from "./pages/InfoHome";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import DetailedEmployeeStats from "./pages/Statistics/DetailedEmployeeStats";

import AuthProvider from "./context/auth/AuthContext";
import PrivateRoute from "./components/router/PrivateRoute";
import RoleBasedRoute from "./components/router/RoleBasedRoute";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="/" element={<App />}>
              <Route index element={<Navigate to="/home" replace={true} />} />
              <Route path="/home" element={<InfoHome />} />
              <Route
                element={
                  <RoleBasedRoute
                    roles={["business_owner", "head_of_department"]}
                  />
                }
              >
                <Route path="statistics" element={<DepartmentStatistics />} />
                <Route
                  path="employee/:employeeId"
                  element={<DetailedEmployeeStats />}
                />
              </Route>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/appraisals" element={<AppraisalForm />} />
              <Route path="/edit" element={<FormEditor />} />
              <Route path="/review" element={<AppraisalReview />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
