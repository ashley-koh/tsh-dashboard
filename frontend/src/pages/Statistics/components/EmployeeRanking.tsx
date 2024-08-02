import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List } from 'antd';

import {
  AVERAGE_KPI_THRESHOLD,
  HIGH_KPI_THRESHOLD,
} from '@/utils/rateEmployee';
import Loading from '@/components/common/Loading';
import User from '@/types/user.type';
import axiosClient from '@/lib/axiosInstance';
import { fetchUsers } from '@/services/user.services';
import useAuth from '@/context/auth/useAuth';
import './EmployeeRanking.css';

interface EmployeeRankingProps {
  department: string;
}

const EmployeeRanking: React.FC<EmployeeRankingProps> = ({ department }) => {
  const client = axiosClient();
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [employees, setEmployees] = useState<User[]>([]);

  /** Run on first ranking load */
  useEffect(() => {
    const loadData = async () => {
      const users: User[] = await fetchUsers(client);
      setEmployees(users.filter(user => user.dept === department));
    };

    loadData();
  }, []);

  const handleEmployeeClick = (employeeId: string) => {
    navigate('/employee', { state: employeeId });
  };

  if (loading || !user) {
    console.error("User is not logged in, something went wrong.");
    alert("Something went wrong. Please try again later.");
    return <Loading />;
  }

  return (
    <div className="employee-ranking">
      <List
        dataSource={employees}
        renderItem={(employee, index) => {
          let className = '';
          if (employee.rating >= HIGH_KPI_THRESHOLD) {
            className = 'high-kpi';
          } else if (employee.rating >= AVERAGE_KPI_THRESHOLD) {
            className = 'average-kpi';
          } else {
            className = 'low-kpi';
          }
          return (
            <List.Item
              key={index}
              className={`employee-item ${className}`}
              onClick={() => handleEmployeeClick(employee.rating)}
            >
              <div className="employee-info">
                {employee.name} - KPI: {employee.rating}
              </div>
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default EmployeeRanking;