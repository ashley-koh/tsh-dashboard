import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Badge,
  Button,
  Calendar,
  CalendarProps,
  Card,
  FloatButton,
  Layout,
} from 'antd';
import {
  CalendarOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

import Loading from '@/components/common/Loading';
import Scheduler from '../../components/calendar/Scheduler';
import useAuth from "@/context/auth/useAuth";
import './Dashboard.css';

const userInfo = {
  manager: true,
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
  const auth = useAuth();
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

  const handleCloseScheduler = () => {
    setShowScheduler(false);
  };

  if (auth.user === null) {
    console.error('User is not logged in, something went wrong.');
    alert('Something went wrong. Please try again later.');
    return <Loading />;
  }

  return (
    <div>
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
      {auth.user.dept === 'HR' && (
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
          style={{ bottom: auth.user.dept === 'HR' ? 100 : 48 }}
          tooltip={<div>Schedule an appraisal review</div>}
          onClick={() => setShowScheduler(true)}
        />
      )}
    </div>
  );
};

export default Dashboard;
