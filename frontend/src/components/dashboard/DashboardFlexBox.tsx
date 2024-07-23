import React from 'react';
import './DashboardFlexBox.css';

interface DashboardFlexBoxProps {
  title: string;
  children: React.ReactNode;
}

const DashboardFlexBox: React.FC<DashboardFlexBoxProps> = ({ title, children }) => {
  return (
    <div className="dashboard-flex-box">
      <h3>{title}</h3>
      <div className="dashboard-flex-box-content">
        {children}
      </div>
    </div>
  );
};

export default DashboardFlexBox;
