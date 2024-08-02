import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Card,
  List
} from 'antd';
import { PDFDownloadLink } from '@react-pdf/renderer';

import { DownloadOutlined } from '@ant-design/icons';
import User from '@/types/user.type';
import UserReport from './UserReport';
import axiosClient from '@/lib/axiosInstance';
import { calculateOverallRating } from '@/utils/rateEmployee';
import { fetchUsers } from '@/services/user.services';
import './StatsComponents.css';

interface RankingProps {
  department: string;
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
              <PDFDownloadLink
                document={<UserReport user={employee} />}
                fileName={`report-${employee.name.replace(' ', '-')}.pdf`}
              >
                <div>
                  <DownloadOutlined />
                  <span> Download Employee Report</span>
                </div>
              </PDFDownloadLink>,
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
            <div>{calculateOverallRating(employee)}</div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Ranking;
