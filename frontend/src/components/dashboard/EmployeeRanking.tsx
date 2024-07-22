// src/components/dashboard/EmployeeRanking.tsx
import React, { useEffect } from 'react';
import { List } from 'antd';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/context/auth/useAuth';
import { employees, HIGH_KPI_THRESHOLD, AVERAGE_KPI_THRESHOLD } from '../../data/mockData';
import './EmployeeRanking.css';

const EmployeeRanking: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('EmployeeRanking: user', user);
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user found</div>;
  }

  const handleEmployeeClick = (employeeId: string) => {
    navigate(`/employee/${employeeId}`);
  };

  // if (user.role !== 'manager' && user.role !== 'dep_head' && user.role !== 'hr') {
  //   return <div>You do not have access to this page.</div>;
  // }

  return (
    <div className="employee-ranking">
      <List
        dataSource={employees}
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
