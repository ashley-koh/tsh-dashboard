import React from 'react';
import PieChartComponent from '../components/dashboard/PieChartComponent';
import EmployeeRanking from '../components/dashboard/EmployeeRanking';
import DashboardFlexBox from '../components/dashboard/DashboardFlexBox';
import './DepartmentStatistics.css';

import { cur_department } from '../data/mockData';

const DepartmentStatistics: React.FC = () => {
  return (
    <div className="department-statistics">
      <h2>{cur_department} statistics</h2>
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
