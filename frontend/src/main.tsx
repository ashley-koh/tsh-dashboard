import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";

import App from "./App";
import AppraisalForm from "./pages/AppraisalForms/AppraisalForm";
import Dashboard from "./pages/AppraisalForms/Dashboard";
import DepartmentStatistics from "./pages/DepartmentStatistics";
import FormEditor from "./pages/AppraisalForms/FormEditor";
import InfoHome from "./pages/InfoHome";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

import AuthProvider from "./context/auth/AuthContext";
import PrivateRoute from "./components/router/PrivateRoute";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="/" element={<App />}>
              <Route path="/home" element={<InfoHome />} />
              <Route path="/statistics" element={<DepartmentStatistics />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/appraisals" element={<AppraisalForm />} />
              <Route path="/edit" element={<FormEditor />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
