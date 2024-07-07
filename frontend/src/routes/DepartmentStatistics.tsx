import React from 'react';
import PieChartComponent from '../components/PieChartComponent';
import EmployeeRanking from '../components/EmployeeRanking';
import DashboardFlexBox from '../components/DashboardFlexBox';
import './DepartmentStatistics.css';

const DepartmentStatistics: React.FC = () => {
  return (
    <div className="department-statistics">
      <h2>Department Statistics</h2>
      <div className="stats-container">
        <DashboardFlexBox title="KPI Distribution">
          <PieChartComponent />
        </DashboardFlexBox>
        <DashboardFlexBox title="Employee Ranking">
          <EmployeeRanking />
        </DashboardFlexBox>
      </div>
    </div>
  );
};

export default DepartmentStatistics;
