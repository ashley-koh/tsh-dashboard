import React from 'react';
import { Card } from 'antd';
import './DashboardFlexBox.css';

interface DashboardFlexBoxProps {
  title: string;
  children: React.ReactNode;
}

const DashboardFlexBox: React.FC<DashboardFlexBoxProps> = ({ title, children }) => {
  return (
    <Card title={title} className="dashboard-flex-box">
      <div className="dashboard-flex-box-content">
        {children}
      </div>
    </Card>
  );
};

export default DashboardFlexBox;
