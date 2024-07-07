import React from 'react';

const appraisals = [
  { employee: 'Alice', form: 'Form A' },
  { employee: 'Bob', form: 'Form B' },
  { employee: 'Charlie', form: 'Form C' },
];

const AppraisalList: React.FC = () => {
  return (
    <div>
      <h3>Appraisal Forms</h3>
      <ul>
        {appraisals.map((appraisal, index) => (
          <li key={index}>{appraisal.employee} - {appraisal.form}</li>
        ))}
      </ul>
    </div>
  );
};

export default AppraisalList;
