import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Badge,
  Button,
  Calendar,
  CalendarProps,
  Card,
  FloatButton,
  Layout,
  Progress
} from 'antd';
import {
  CalendarOutlined,
  EditOutlined,
  InfoCircleOutlined,
  UserOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import './Dashboard.css';
import Scheduler from '../../components/calendar/Scheduler';

const { Sider } = Layout;

const userInfo = {
  name: 'John Doe',
  department: 'Engineer',
  role: 'Lead Software Engineer (Frontend)',
  manager: true,
  modules: [
    { name: 'Elements of Software Construction', progress: 80 },
    { name: 'Computer Software Engineering', progress: 60 },
    { name: 'Machine Learning', progress: 90 },
    { name: 'Foundations of Cybersecurity', progress: 75 },
    { name: 'Module 5 onwards will not display', progress: 15 },
  ],
  overallRating: 85,
  schedule: [
    { date: dayjs('2024-07-16 15:00:00'), employee: 'Mary Jane', review: true },
    { date: dayjs('2024-07-28 10:00:00'), employee: 'Peter Parker', review: false },
    { date: dayjs('2024-08-01 13:30:00'), employee: 'Austin Lim', review: true }
  ],
  meetings:[
    {date: dayjs('2024-07-21 06:00:00'), employee: 'David'}
  ]
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showScheduler, setShowScheduler] = useState(false);

  const dateCellRender = (value: Dayjs) => {
    const listData = userInfo.schedule.filter(item => item.date.isSame(value, 'day'));
    const meetingData = userInfo.meetings.filter(item => item.date.isSame(value, 'day'));
    return (
      <ul className="events">
        {listData.map(item => {
          const key = item.date.toString();
          const time = item.date.isAfter(dayjs()) ? `${item.date.format('HH:mm')} - ` : '';
          const review = !item.review ? 'Review with' : (item.date.isAfter(dayjs()) ? 'To review' : 'Complete review of');
          return (
            <li key={key}>
              <Badge
                status={item.date.isAfter(dayjs()) ? 'error' : 'processing'}
                text={`${time}${review} ${item.employee}`}
              />
              {item.review && item.date.isBefore(dayjs()) && (
                <Button
                  type='link'
                  onClick={() => navigate('/appraisals')} // FIXME: add proper link
                >
                  Review
                </Button>
              )}
            </li>
          );
        })}
        {
          meetingData.map(item =>{
            const key = item.date.toString();
            const time= item.date.format('HH:mm');
            console.log(`${time} - Meeting with ${item.employee}`)
            return(
              <li key={key}>
              <Badge status='success'
                text={`${time} - Meeting with ${item.employee}`}
              />
            </li>
            )
          })
        }
      </ul>
    );
  };

  const monthCellRender = (value: Dayjs) => {
    const count = userInfo.schedule.filter(item => item.date.isSame(value, 'month')).length;
    return count > 0 ? <div>{count} events</div> : null;
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  useEffect(() => {
    console.log('showScheduler changed:', showScheduler);
  }, [showScheduler]);

  const handleCloseScheduler = () => {
    setShowScheduler(false);
  };

  return (
    <Layout hasSider>
      <Sider width={300}>
        <div className='info-panel'>
          <div className='para-break'>
            <Avatar size={64} icon={<UserOutlined />} />
            <h1>{userInfo.name}</h1>
            <p>{userInfo.department} Department</p>
            <p>{userInfo.role}</p>
          </div>
          <div>
            {userInfo.modules.slice(0, 4).map((module, index) => (
              <Card
                key={index}
                className='module-card'
                title={<span className='card-title'>{module.name}</span>}
              >
                <Progress
                  percent={module.progress}
                  percentPosition={{ align: 'center', type: 'inner' }}
                  size={[ 200, 20 ]}
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                />
              </Card>
            ))}
            <p><strong>Overall Rating: {userInfo.overallRating}%</strong></p>
          </div>
        </div>
      </Sider>
      <Layout>
        <Card className='alert-card'>
          <div className='alert-content'>
            <InfoCircleOutlined className='alert-icon' />
            <p className='alert-text'>Your appraisal form is due on: <strong>26 July 2024</strong></p>
            <Button
              type='dashed'
              className='alert-text'
              onClick={() => navigate('/appraisals')} // FIXME: add proper link
            >
              Complete Appraisal Form
            </Button>
          </div>
        </Card>
        <Calendar cellRender={cellRender} />
        {showScheduler && <Scheduler onClose={handleCloseScheduler} />}
      </Layout>
      {userInfo.department === 'HR' && (
        <FloatButton
          type='primary'
          icon={<EditOutlined />}
          tooltip={<div>Create / Edit a form template</div>}
          onClick={() => navigate('/edit')}
        />
      )}
      {userInfo.manager && (
        <FloatButton
          type='primary'
          icon={<CalendarOutlined />}
          style={{ bottom: userInfo.department === 'HR' ? 100 : 48 }}
          tooltip={<div>Schedule an appraisal review</div>}
          onClick={() => setShowScheduler(true)}
        />
      )}
    </Layout>
  );
};

export default Dashboard;
