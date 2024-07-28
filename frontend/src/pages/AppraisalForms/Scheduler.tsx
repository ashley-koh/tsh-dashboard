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

import AppraisalObj, { AppraisalStatus, AppraisalType } from '@/types/appraisal.type';
import FormObj from '@/types/form.type';
import Loading from '@/components/common/Loading';
import User, { RoleOptions } from '@/types/user.type';
import axiosClient from '@/lib/axiosInstance';
import useAuth from '@/context/auth/useAuth';
import {
  appraisalObjToType,
  fetchAppraisals,
  fetchForms,
  fetchUsers
} from '@/utils/fetchData';

interface SchedulerProps {
  onClose: () => void;
};

const Scheduler: React.FC<SchedulerProps> = ({ onClose }) => {
  const auth = useAuth();
  const client = axiosClient();

  const [form] = Form.useForm();
  const [employees, setEmployees] = useState<User[]>([]);
  const [forms, setForms] = useState<FormObj[]>([]);

  const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedForm, setSelectedForm] = useState<FormObj | null>(null);


  if (auth.user === null) {
    console.error('User is not logged in, something went wrong.');
    message.error('Something went wrong. Please try again later.');
    return <Loading />;
  }

  /* Run this useEffect on first scheduler load */
  useEffect(() => {
    const loadData = async () => {
      // Get relevant employees
      const users = await fetchUsers(client);
      setEmployees(users.filter(user => auth.user?.dept === user.dept && (
        (auth.user.role === RoleOptions.OWNER && user.role !== RoleOptions.OWNER) ||
        (auth.user.role === RoleOptions.HOD && user.role === RoleOptions.EMPLOYEE)
      )));

      // Get relevant forms
      const allForms = await fetchForms(client);
      // Do some filtering here...
      setForms(allForms);
    };

    loadData();
  }, []);

  const onChangeForm = (value: string | null) => {
    const newSelectedForm = forms.find(form => form._id === value);
    setSelectedForm(newSelectedForm === undefined ? null : newSelectedForm);
  }

  const onChangeUser = (value: string | null) => {
    const newSelectedEmployee = employees.find(employee => employee._id === value);
    setSelectedEmployee(newSelectedEmployee === undefined ? null : newSelectedEmployee);
  }

  const handleSubmit = async () => {
    if (auth.user?._id === undefined || selectedEmployee?._id === undefined) {
      console.error('User is not logged in, something went wrong.');
      message.error('Something went wrong. Please try again later.');
      return;
    }
    else if (selectedDate === null) {
      console.error('Date is not selected, something went wrong.');
      message.error('Cannot find selected date. Please try again.');
      return;
    }
    else if (selectedForm?._id === undefined) {
      console.error('Form is not selected, something went wrong.');
      message.error('Cannot find selected form(s). Please try again.');
      return;
    }

    const appraisals: AppraisalObj[] = await fetchAppraisals(client);
    for (const appraisal of appraisals) {
      const reviewDate = dayjs(appraisal.deadline);
      const selfClash =
        appraisal.managee._id === auth.user?._id ||
        appraisal.manager._id === auth.user?._id;
      const othrClash =
        appraisal.managee._id === selectedEmployee?._id ||
        appraisal.manager._id === selectedEmployee?._id;

      if ((selfClash || othrClash) && (
        (
          !reviewDate.isAfter(selectedDate, 'minute') &&
          !reviewDate.add(30, 'minute').isBefore(selectedDate, 'minute')
        ) ||
        (
          !reviewDate.isBefore(selectedDate, 'minute') &&
          !reviewDate.subtract(30, 'minute').isAfter(selectedDate, 'minute')
        )
      )) {
        message.warning(
          `${selfClash ? 'You' : selectedEmployee?.name} ${selfClash ? 'have' : 'has'} ` +
          'a scheduled meeting at the selected time.'
        );
        form.resetFields(['pick-date']);
        setSelectedDate(null);
        return;
      }
    };

    const newAppraisal: AppraisalObj = {
      managee: auth.user,
      manager: selectedEmployee,
      form: selectedForm,
      status: AppraisalStatus.REVIEW,
      deadline: selectedDate.toDate(),
      answers: [],
      comments: '',
    }
    client.post<AppraisalType>('/appraisal/', appraisalObjToType(newAppraisal));
    message.success(
      `Scheduled meeting with ${selectedEmployee.name} ` +
      `on ${selectedDate.format('DD MMM YYYY HH:mm')}`
    );
    onClose();
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
            onChange={(value: string | null) => onChangeForm(value)}
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
