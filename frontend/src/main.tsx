// import React from "react";
// import ReactDOM from "react-dom/client";
// import Root from "./routes/root";
// import ErrorPage from "./error-page";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./index.css";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <ErrorPage />,
//   },
// ]);

// // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import DepartmentStatistics from './routes/DepartmentStatistics';
import AppraisalForms from './routes/AppraisalForms';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="statistics" element={<DepartmentStatistics />} />
          <Route path="appraisals" element={<AppraisalForms />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
);

