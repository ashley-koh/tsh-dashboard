import React, { useEffect, useState } from 'react';
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

import Appraisal from '@/types/appraisal.type';
import Loading from '@/components/common/Loading';
import Scheduler from './Scheduler';
import User from '@/types/user.type';
import axiosClient from "@/lib/axiosInstance";
import useAuth from "@/context/auth/useAuth";
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const auth = useAuth();
  const client = axiosClient();
  const navigate = useNavigate();

  const [showEdit, setShowEdit] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [nextReview, setNextReview] = useState<Appraisal | null>(null);
  const [scheduledReviews, setScheduledReviews] = useState<{ appraisal: Appraisal, with: User }[]>([]);

  if (auth.user === null) {
    console.error('User is not logged in, something went wrong.');
    alert('Something went wrong. Please try again later.');
    return <Loading />;
  }

  const fetchAppraisals: () => Promise<Appraisal[]> = async () => {
    try {
      const response = await client.get<{ data: Appraisal[], message: string }>('/appraisal');
      return response.data.data;
    }
    catch (err) {
      alert('Something went wrong. Please try again later.');
      console.error(err);
      return [];
    };
  };

  const fetchEmployee: (id: string) => Promise<User> = async (id: string) => {
    try {
      const response = await client.get<{ data: User, message: string }>(`/user/${id}`);
      return response.data.data;
    }
    catch (err) {
      alert('Something went wrong. Please try again later.');
      console.error(err);
      return {
        name: 'name',
        email: 'email',
        password: 'password',
        employeeId: 'XXXXXXXXXX',
        role: 'employee',
        jobTitle: 'job',
        dept: 'dept',
        employmentStatus: 'full_time'
      };
    };
  }

  /* Run this useEffect on first dashboard load */
  useEffect(() => {
    const loadData = async () => {
      const reviews: { appraisal: Appraisal, with: User }[] = [];
      let currReview: Appraisal | null = null;

      try {
        // Fetch relevant appraisals
        const appraisals = await fetchAppraisals();
        appraisals.forEach(async (appraisal) => {
          const isManager = appraisal.managerId === auth.user?._id;
          const isManagee = appraisal.manageeId === auth.user?._id;
          if (!isManager && !isManagee) {
            return;
          }

          // Fetch user details related to appraisal
          const userId = isManager ? appraisal.manageeId : appraisal.managerId;
          const user = await fetchEmployee(userId);
          reviews.push({ appraisal: appraisal, with: user });

          // Determine if this is the next review
          const reviewDate = dayjs(appraisal.deadline);
          if (currReview === null || (
            reviewDate.isAfter(dayjs(), 'minute') &&
            reviewDate.isAfter(dayjs(currReview.deadline), 'minute') &&
            appraisal.status === 'in review'
          )) {
            currReview = appraisal;
          }
        });
      }
      catch (err) {
        alert('Something went wrong. Please try again later.');
        console.error(err);
      }
      finally {
        setNextReview(currReview);
        setScheduledReviews(reviews);
      }
    };

    loadData();
  }, []);

  const dateCellRender = (value: Dayjs) => {
    const listData = scheduledReviews.filter(review => dayjs(review.appraisal.deadline).isSame(value, 'day'));

    return (
      <ul className='events'>
        {listData.map(review => {
          const reviewDate = dayjs(review.appraisal.deadline);
          const key = reviewDate.toString();
          const time = reviewDate.isAfter(dayjs()) ? `${reviewDate.format('HH:mm')} - ` : '';

          const isManager = review.appraisal.managerId === auth.user?._id;
          const desc = isManager ? (reviewDate.isAfter(dayjs()) ? 'To review' : 'Complete review of') : 'Review with';

          return (
            <li key={key}>
              <Badge
                status={reviewDate.isAfter(dayjs()) ? 'error' : 'processing'}
                text={`${time}${desc} ${review.with.name}`}
              />
              {isManager && reviewDate.isBefore(dayjs()) && (
                <Button
                  type='link'
                  onClick={() => navigate('/appraisals', { state: review.appraisal.reviewId })}
                >
                  Complete Review
                </Button>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  const monthCellRender = (value: Dayjs) => {
    const count = scheduledReviews.filter(
      review => dayjs(review.appraisal.deadline).isSame(value, 'month')
    ).length;
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

  return (
    <div>
      <Layout>
        {nextReview && (
          <Card className='alert-card'>
            <div className='alert-content'>
              <InfoCircleOutlined className='alert-icon' />
              <p className='alert-text'>
                Your next appraisal form is due on: <strong>{dayjs(nextReview.deadline).format('DD MMM YYYY')}</strong>
              </p>
              <Button
                type='dashed'
                className='alert-text'
                onClick={() => navigate('/appraisals', { state: nextReview.formId } )}
              >
                Complete Appraisal Form
              </Button>
            </div>
          </Card>
        )}
        <Calendar cellRender={cellRender} />
        {showScheduler && <Scheduler onClose={handleCloseScheduler} />}
      </Layout>
      {auth.user.role !== 'employee' && (
        <FloatButton
          type='primary'
          icon={<CalendarOutlined />}
          tooltip={<div>Schedule an appraisal review</div>}
          onClick={() => setShowScheduler(true)}
        />
      )}
      {auth.user.dept === 'hr' && (
        <FloatButton
          type='primary'
          icon={<EditOutlined />}
          style={{ bottom: auth.user.role !== 'employee' ? 100 : 48 }}
          tooltip={<div>Create / Edit a form template</div>}
          onClick={() => navigate('/edit')} // FIXME add proper state
        />
      )}
    </div>
  );
};

export default Dashboard;
