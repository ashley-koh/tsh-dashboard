import React from 'react';
import { useNavigate } from 'react-router-dom';
import { List } from 'antd';

import {
  AVERAGE_KPI_THRESHOLD,
  HIGH_KPI_THRESHOLD,
  employees
} from '@/data/mockData';
import useAuth from '@/context/auth/useAuth';
import './EmployeeRanking.css';

interface EmployeeRankingProps {
  department: string;
}

const EmployeeRanking: React.FC<EmployeeRankingProps> = ({ department }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user found</div>;
  }

  const filteredEmployees = employees.filter(emp => emp.department === department);

  const handleEmployeeClick = (employeeId: string) => {
    navigate(`/employee/${employeeId}`);
  };

  return (
    <div className="employee-ranking">
      <List
        dataSource={filteredEmployees}
        renderItem={(employee, index) => {
          let className = '';
          if (employee.kpi >= HIGH_KPI_THRESHOLD) {
            className = 'high-kpi';
          } else if (employee.kpi >= AVERAGE_KPI_THRESHOLD) {
            className = 'average-kpi';
          } else {
            className = 'low-kpi';
          }
          return (
            <List.Item
              key={index}
              className={`employee-item ${className}`}
              onClick={() => handleEmployeeClick(employee.id)}
            >
              <div className="employee-info">
                {employee.name} - KPI: {employee.kpi}
              </div>
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default EmployeeRanking;