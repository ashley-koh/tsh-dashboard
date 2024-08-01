import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Card,
  List,
  message
} from 'antd';

import User from '@/types/user.type';
import axiosClient from '@/lib/axiosInstance';
import { fetchUsers } from '@/services/user.services';
import './StatsComponents.css';

interface RankingProps {
  department: string;
};

/**
 * Generate and allow download of employee report in PDF format.
 *
 * @param user The employee to generate the report for.
 */
export function downloadPDF(user: User) {
  message.warning('This feature is not implemented yet, sorry!');
};

const Ranking: React.FC<RankingProps> = ({ department }) => {
  const client = axiosClient();
  const [employees, setEmployees] = useState<User[]>([]);

  /** Run each time department changes */
  useEffect(() => {
    const loadData = async () => {
      const users: User[] = await fetchUsers(client);
      setEmployees(users.filter(user => user.dept === department));
    };

    loadData();
  }, [department]);

  return (
    <Card title='Department Ranking' className='stats-container'>
      <List
        pagination={{ position: 'bottom', align: 'center' }}
        itemLayout='horizontal'
        dataSource={employees}
        renderItem={(employee, index) => (
          <List.Item
            actions={[
              <a
                key='list-loadmore-view'
                onClick={() => downloadPDF(employee)}
              >
                Download Employee Report
              </a>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={employee.name}
              description={employee.jobTitle}
            />
            <div>{employee?.rating || 80}</div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Ranking;
