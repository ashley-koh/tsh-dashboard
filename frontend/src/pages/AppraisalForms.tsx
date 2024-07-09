import React from 'react';
import AppraisalList from '../components/AppraisalList';
import './AppraisalForms.css';

const AppraisalForms: React.FC = () => {
  return (
    <div className="appraisal-forms">
      <h2>Appraisal Forms</h2>
      <AppraisalList />
    </div>
  );
};

export default AppraisalForms;
