import React, { useEffect, useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Modal,
  Select,
  message
} from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

import Appraisal from '@/types/appraisal.type';
import FormType from '@/types/form.type';
import Loading from '@/components/common/Loading';
import User from '@/types/user.type';
import axiosClient from '@/lib/axiosInstance';
import useAuth from '@/context/auth/useAuth';

interface SchedulerProps {
  onClose: () => void;
};

const Scheduler: React.FC<SchedulerProps> = ({ onClose }) => {
  const auth = useAuth();
  const client = axiosClient();

  const [form] = Form.useForm();
  const [employees, setEmployees] = useState<User[]>([]);
  const [forms, setForms] = useState<FormType[]>([]);

  const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedAppraisalForm, setSelectedAppraisalForm] = useState<FormType | null>(null);
  const [selectedReviewForm, setSelectedReviewForm] = useState<FormType | null>(null);


  if (auth.user === null) {
    console.error('User is not logged in, something went wrong.');
    alert('Something went wrong. Please try again later.');
    return <Loading />;
  }

  const fetchForms: () => Promise<FormType[]> = async () => {
    try {
      const response = await client.get<{ data: FormType[], message: string }>('/form');
      return response.data.data;
    }
    catch (err) {
      alert('Something went wrong. Please try again later.');
      console.error(err);
      return [];
    };
  };

  const fetchUsers: () => Promise<User[]> = async () => {
    try {
      const response = await client.get<{ data: User[], message: string }>('/user');
      return response.data.data;
    }
    catch (err) {
      alert('Something went wrong. Please try again later.');
      console.error(err);
      return [];
    };
  };

  /* Run this useEffect on first scheduler load */
  useEffect(() => {
    const loadData = async () => {
      try {
        // Get relevant employees
        const users = await fetchUsers();
        setEmployees(users.filter(user => auth.user?.dept === user.dept && (
          (auth.user.role === 'business_owner' && user.role !== 'business_owner') ||
          (auth.user.role === 'head_of_department' && user.role === 'employee')
        )));

        // Get relevant forms
        const allForms = await fetchForms();
        // Do some filtering here...
        setForms(allForms);
      }
      catch (err) {
        alert('Something went wrong. Please try again later.');
        console.error(err);
      }
    };

    loadData();
  }, []);

  const onChangeForm = (value: string | null, appraisal: boolean) => {
    const newSelectedForm = forms.find(form => form._id === value);
    if (appraisal) {
      setSelectedAppraisalForm(newSelectedForm === undefined ? null : newSelectedForm);
    }
    else {
      setSelectedReviewForm(newSelectedForm === undefined ? null : newSelectedForm);
    }
  }

  const onChangeUser = (value: string | null) => {
    const newSelectedEmployee = employees.find(employee => employee._id === value);
    setSelectedEmployee(newSelectedEmployee === undefined ? null : newSelectedEmployee);
  }

  const handleSubmit = async () => {
    if (auth.user?._id === undefined || selectedEmployee?._id === undefined) {
      console.error('User is not logged in, something went wrong.');
      alert('Something went wrong. Please try again later.');
      return;
    }
    else if (selectedDate === null) {
      console.error('Date is not selected, something went wrong.');
      alert('Cannot find selected date. Please try again.');
      return;
    }
    else if (selectedAppraisalForm?._id === undefined || selectedReviewForm?._id === undefined) {
      console.error('Form is not selected, something went wrong.');
      alert('Cannot find selected form(s). Please try again.');
      return;
    }

    try {
      const appraisals: Appraisal[] = await client
        .get<{ data: Appraisal[], message: string }>('/appraisal')
        .then(response => response.data.data);

      for (const appraisal of appraisals) {
        const reviewDate = dayjs(appraisal.deadline);
        const selfClash = appraisal.manageeId === auth.user?._id || appraisal.managerId === auth.user?._id;
        const othrClash = appraisal.manageeId === selectedEmployee?._id || appraisal.managerId === selectedEmployee?._id;

        if ((selfClash || othrClash) && (
          (!reviewDate.isAfter(selectedDate, 'minute') && !reviewDate.add(30, 'minute').isBefore(selectedDate, 'minute')) ||
          (!reviewDate.isBefore(selectedDate, 'minute') && !reviewDate.subtract(30, 'minute').isAfter(selectedDate, 'minute'))
        )) {
          message.warning(
            `${selfClash ? 'You' : selectedEmployee?.name} ${selfClash ? 'have' : 'has'} a scheduled meeting at the selected time.`
          );
          form.resetFields(['pick-date']);
          setSelectedDate(null);
          return;
        }
      };

      const newAppraisal: Appraisal = {
        manageeId: auth.user._id,
        managerId: selectedEmployee._id,
        formId: selectedAppraisalForm._id,
        status: 'in review',
        answers: '{}',
        reviewId: selectedReviewForm._id,
        deadline: selectedDate.toDate(),
      }
      client.post<Appraisal>('/appraisal/createAppraisal', newAppraisal);
      message.success(
        `Scheduled meeting with ${selectedEmployee.name} on ${selectedDate.format('DD MMM YYYY HH:mm')}`
      );
      onClose();
    }
    catch (err) {
      console.error('User is not logged in, something went wrong.');
      alert('Something went wrong. Please try again later.');
    }
  }

  return (
    <Modal
      title='Schedule Meeting'
      open={true}
      onCancel={onClose}
      onOk={handleSubmit}
      footer={[
        <Button key='back' onClick={onClose}>
          Cancel
        </Button>,
        <Button
          form='scheduler'
          key='submit'
          type='primary'
          htmlType='submit'
        >
          Submit
        </Button>,
      ]}
    >
      <Form
        id='scheduler'
        form={form}
        name='scheduler'
        layout='horizontal'
        onFinish={handleSubmit}
      >
        <Form.Item
          name='pick-person'
          label='Employee:'
          rules={[
            { required: true, message: 'Please select an employee.' },
          ]}
        >
          <Select
            showSearch
            placeholder='Select an employee'
            optionFilterProp='label'
            onChange={onChangeUser}
            options={
              employees.map(employee => ({
                value: employee._id,
                label: employee.name,
              }))
            }
          />
        </Form.Item>
        <Form.Item
          name='pick-date'
          label='Date:'
          rules={[
            { required: true, message: 'Please select a date.' },
          ]}
        >
          <DatePicker minDate={dayjs()}
            showTime={{ format: 'HH:mm' }}
            onOk={setSelectedDate}
          />
        </Form.Item>
        <Form.Item
          name='pick-appraisal'
          label='Appraisal Form:'
          rules={[
            { required: true, message: 'Please select a form.' },
          ]}
        >
          <Select
            showSearch
            placeholder='Select a form'
            optionFilterProp='label'
            onChange={(value: string | null) => onChangeForm(value, true)}
            options={
              forms.map(form => ({
                value: form._id,
                label: form.name,
              }))
            }
          />
        </Form.Item>
        <Form.Item
          name='pick-review'
          label='Review Form:'
          rules={[
            { required: true, message: 'Please select a form.' },
          ]}
        >
          <Select
            showSearch
            placeholder='Select a form'
            optionFilterProp='label'
            onChange={(value: string | null) => onChangeForm(value, false)}
            options={
              forms.map(form => ({
                value: form._id,
                label: form.name,
              }))
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default Scheduler;
