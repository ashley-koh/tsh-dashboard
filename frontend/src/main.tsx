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

