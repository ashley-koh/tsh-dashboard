import React from 'react';
import {
  Avatar,
  Card,
  Progress
} from 'antd';
import type { ProgressProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import Loading from '@/components/common/Loading';
import useAuth from "@/context/auth/useAuth";
import './InfoHome.css';

const lms = {
  modules: [
    { name: 'Elements of Software Construction', progress: 80 },
    { name: 'Computer Software Engineering', progress: 60 },
    { name: 'Machine Learning', progress: 90 },
    { name: 'Foundations of Cybersecurity', progress: 75 },
    { name: 'Module 5 onwards will not display', progress: 15 },
  ],
  overallRating: 85
};

const InfoHome: React.FC = () => {
  const auth = useAuth();

  const twoColors: ProgressProps['strokeColor'] = {
    '0%': '#108ee9',
    '100%': '#87d068',
  };

  if (auth.user === null) {
    console.error('User is not logged in, something went wrong.');
    alert('Something went wrong. Please try again later.');
    return <Loading />;
  }

  return (
    <div className='container'>
      <div className='info-panel'>
        <div>
          <Avatar size={128} icon={<UserOutlined />} />
          <h1>{auth.user.name}</h1>
          <p>{auth.user.dept} Department</p>
          <p>{auth.user.role}</p>
        </div>
        <div className='overall'>
          <h2>Overall Rating</h2>
          <Progress
            type='dashboard'
            percent={lms.overallRating}
            strokeColor={twoColors}
            size={125}
          />
        </div>
      </div>
      <Card title={<p className='module-title'>Module Progress Overview</p>} className='card-panel'>
        {lms.modules.slice(0, 4).map((module, index) => (
          <Card.Grid
            hoverable
            key={index}
            className='module-card'
            style={{ width: '45%', fontSize: '15px' }}
          >
            <>
            <strong><span className='card-title'>{module.name}</span></strong>
            <Progress
              percent={module.progress}
              percentPosition={{ align: 'center', type: 'inner' }}
              size={{ height: 20 }}
              strokeColor={twoColors}
            />
            </>
          </Card.Grid>
        ))}
      </Card>
    </div>
  );
}

export default InfoHome;
