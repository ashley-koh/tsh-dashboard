import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Form,
  Modal,
  Select,
  message,
} from 'antd';

import FormObj from '@/types/form.type';
import Loading from '@/components/common/Loading';
import axiosClient from '@/lib/axiosInstance';
import { fetchForms } from '@/services/form.services';
import useAuth from '@/context/auth/useAuth';

interface FormSelectProps {
  onClose: () => void;
};

const FormSelect: React.FC<FormSelectProps> = ({ onClose }) => {
  const auth = useAuth();
  const client = axiosClient();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [forms, setForms] = useState<FormObj[]>([]);
  const [selectedForm, setSelectedForm] = useState<FormObj | null>(null);

  if (auth.user === null) {
    console.error('User is not logged in, something went wrong.');
    message.error('Something went wrong. Please try again later.');
    return <Loading />;
  }

  /* Run this useEffect on first form selector load */
  useEffect(() => {
    const loadData = async () => {
      // Get relevant forms
      const allForms: FormObj[] = await fetchForms(client);
      // Do some filtering here...
      setForms(allForms);
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
      <Form data-cy='form-selector'
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
          <Select data-cy='select-form'
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
