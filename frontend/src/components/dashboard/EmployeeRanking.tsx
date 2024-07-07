import React from 'react';
import { employees, HIGH_KPI_THRESHOLD, AVERAGE_KPI_THRESHOLD } from '../../data/mockData';
import './EmployeeRanking.css';

const EmployeeRanking: React.FC = () => {
  return (
    <div className="employee-ranking">
      <ul>
        {employees.map((employee, index) => {
          let className = '';
          if (employee.kpi >= HIGH_KPI_THRESHOLD) {
            className = 'high-kpi';
          } else if (employee.kpi >= AVERAGE_KPI_THRESHOLD) {
            className = 'average-kpi';
          } else {
            className = 'low-kpi';
          }
          return (
            <li key={index} className={className}>
              {employee.name} - KPI: {employee.kpi}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EmployeeRanking;
