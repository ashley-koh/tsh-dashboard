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
  message,
} from 'antd';
import {
  CalendarOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

import AppraisalObj, { AppraisalStatus } from '@/types/appraisal.type';
import FormSelect from './FormSelect';
import Loading from '@/components/common/Loading';
import Scheduler from './Scheduler';
import { DepartmentOptions, RoleOptions } from '@/types/user.type';
import axiosClient from '@/lib/axiosInstance';
import { fetchAppraisals } from '@/utils/fetchData';
import useAuth from '@/context/auth/useAuth';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const auth = useAuth();
  const client = axiosClient();
  const navigate = useNavigate();

  const [showEdit, setShowEdit] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [nextReview, setNextReview] = useState<AppraisalObj | null>(null);
  const [scheduledReviews, setScheduledReviews] = useState<AppraisalObj[]>([]);

  if (auth.user === null) {
    console.error('User is not logged in, something went wrong.');
    message.error('Something went wrong. Please try again later.');
    return <Loading />;
  }

  /* Run this useEffect on first dashboard load */
  useEffect(() => {
    const loadData = async () => {
      const reviews: AppraisalObj[] = [];
      let currReview: AppraisalObj | null = null;

      try {
        const appraisals: AppraisalObj[] = await fetchAppraisals(client);
        appraisals.forEach(appraisal => {
          // Fetch relevant appraisals
          const isManagee: boolean = appraisal.managee._id === auth.user?._id;
          if (appraisal.manager._id !== auth.user?._id && !isManagee) {
            return;
          }
          reviews.push(appraisal);

          // Determine if this is the next appraisal review
          const reviewDate = dayjs(appraisal.deadline);
          if (isManagee &&
            appraisal.status === AppraisalStatus.REVIEW &&
            reviewDate.isAfter(dayjs(), 'minute') &&
            (currReview === null || reviewDate.isAfter(dayjs(currReview.deadline), 'minute'))
          ) {
            currReview = appraisal;
          }
        });
      }
      catch (err) {
        message.error('Something went wrong. Please try again later.');
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
    const listData = scheduledReviews.filter(review => dayjs(review.deadline).isSame(value, 'day'));

    return (
      <ul className='events'>
        {listData.map(review => {
          const reviewDate = dayjs(review.deadline);
          const key = reviewDate.toString();
          const time = reviewDate.isAfter(dayjs()) ? `${reviewDate.format('HH:mm')} - ` : '';

          const isManager = review.manager._id === auth.user?._id;
          const desc = isManager ?
            (reviewDate.isAfter(dayjs()) ? 'To review' : 'Complete review of') :
            'Review with';

          return (
            <li key={key}>
              <Badge
                status={reviewDate.isAfter(dayjs()) ? 'error' : 'processing'}
                text={`${time}${desc} ${isManager ? review.managee.name : review.manager.name}`}
              />
              {isManager && reviewDate.isBefore(dayjs()) && (
                <Button
                  type='link'
                  onClick={() => navigate('/appraisals', /* { state: review.reviewId } */)} // TODO add form link
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
      review => dayjs(review.deadline).isSame(value, 'month')
    ).length;
    return count > 0 ? <div>{count} {count === 1 ? 'event' : 'events'}</div> : null;
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
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
                onClick={() => navigate('/appraisals', { state: nextReview._id } )}
              >
                Complete Appraisal Form
              </Button>
            </div>
          </Card>
        )}
        <Calendar cellRender={cellRender} />
        {showEdit && <FormSelect onClose={() => setShowEdit(false)} />}
        {showScheduler && <Scheduler onClose={() => {
          setShowScheduler(false);
          window.location.reload();
        }} />}
      </Layout>
      {auth.user.role !== RoleOptions.EMPLOYEE && (
        <FloatButton
          type='primary'
          icon={<CalendarOutlined />}
          tooltip={<div>Schedule an appraisal review</div>}
          onClick={() => setShowScheduler(true)}
        />
      )}
      {auth.user.dept === DepartmentOptions.HR && (
        <FloatButton
          type='primary'
          icon={<EditOutlined />}
          style={{ bottom: auth.user.role !== RoleOptions.EMPLOYEE ? 100 : 48 }}
          tooltip={<div>Create / Edit a form template</div>}
          onClick={() => setShowEdit(true)}
        />
      )}
    </div>
  );
};

export default Dashboard;
