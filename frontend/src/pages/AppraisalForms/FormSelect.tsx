import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Form,
  Modal,
  Select,
} from 'antd';

import FormType from '@/types/form.type';
import Loading from '@/components/common/Loading';
import axiosClient from '@/lib/axiosInstance';
import useAuth from '@/context/auth/useAuth';

interface FormSelectProps {
  onClose: () => void;
};

const FormSelect: React.FC<FormSelectProps> = ({ onClose }) => {
  const auth = useAuth();
  const client = axiosClient();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [forms, setForms] = useState<FormType[]>([]);
  const [selectedForm, setSelectedForm] = useState<FormType | null>(null);

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

  /* Run this useEffect on first form selector load */
  useEffect(() => {
    const loadData = async () => {
      try {
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

  const onChangeForm = (value: string | null) => {
    const newSelectedForm = forms.find(form => form._id === value);
    setSelectedForm(newSelectedForm === undefined ? null : newSelectedForm);
  }

  const handleSubmit = () =>
    navigate('/edit', selectedForm === null ? undefined : { state: selectedForm._id });

  return (
    <Modal
      title='Select Form'
      open={true}
      onCancel={onClose}
      onOk={handleSubmit}
      footer={[
        <Button key='back' onClick={onClose}>
          Cancel
        </Button>,
        <Button
          form='form-select'
          key='submit'
          type='primary'
          htmlType='submit'
        >
          Select
        </Button>,
      ]}
    >
      <Form
        id='form-select'
        form={form}
        name='form-select'
        layout='horizontal'
        onFinish={handleSubmit}
      >
        <Form.Item
          name='pick-form'
          label='Form:'
        >
          <Select
            showSearch
            placeholder='Leave blank to create a new form!'
            optionFilterProp='label'
            onChange={onChangeForm}
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

export default FormSelect;
