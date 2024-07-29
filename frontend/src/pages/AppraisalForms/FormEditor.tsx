import React, { useEffect, useState } from 'react';
import { Location, useLocation, useNavigate } from 'react-router-dom';
import {
  CheckOutlined,
  CloseOutlined,
  FontSizeOutlined,
  MessageOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  StarOutlined
} from '@ant-design/icons';
import {
  Button,
  Form,
  FormInstance,
  Input,
  Popconfirm,
  Space,
  Switch,
  message,
} from 'antd';

import FormObj, { FormType } from '@/types/form.type';
import IAppraisalForm, { FormQuestion, FormSection } from './types/form.type';
import QuestionObj, { QuestionType } from '@/types/question.type';
import SectionObj, { SectionType } from '@/types/section.type';
import axiosClient from "@/lib/axiosInstance";
import { fetchForm, formObjToType, sectionObjToType } from '@/utils/fetchData';
import './FormEditor.css';

const { TextArea } = Input;

const FormEditor: React.FC = () => {
  const client = axiosClient();
  const location: Location<string | null> = useLocation();
  const navigate = useNavigate();

  const [form]: [FormInstance<IAppraisalForm>] = Form.useForm();
  const [fieldsCount, setFieldsCount] = useState<number[]>([]);

  /* Run this useEffect on first form load */
  useEffect(() => {
    const loadData = async () => {
      const fieldCount: number[] = [];
      const editForm: FormObj | null =
        location.state === null ? null : await fetchForm(client, location.state);

      const formFields: IAppraisalForm = {
        _id: location.state === null ? undefined : location.state,
        formTitle: editForm === null ? '' : editForm.name,
        sections: editForm === null ? [] : editForm.sections.map(section => {
          fieldCount.push(section.questions.length);

          const formSection: FormSection = {
            _id: section._id,
            sectionTitle: section.title,
            sectionDescription: section.description,
            questions: section.questions.map(question => {

              const formQuestion: FormQuestion = {
                _id: question._id,
                question: question.description,
                required: question.required,
                type: question.type === QuestionType.RATING,
              };
              return formQuestion;
            }),
          };

          return formSection;
        }),
      };

      form.setFieldsValue(formFields);
      setFieldsCount(fieldCount);
    };

    loadData();
  }, [form, location.state]);

  /**
   * Handles the submission of a (new) question.
   *
   * @param question The form question to submit.
   *
   * @returns The submitted question object, if any.
   */
  async function handleQuestionSubmit(question: FormQuestion) {
    let newQuestion: QuestionObj = {
      description: question.question,
      type: question.type ? QuestionType.RATING : QuestionType.OPEN_ENDED,
      required: question.required,
    };

    try {
      if (question._id === undefined) {
        await client
          .post<{ data: QuestionObj, message: string }>('/questions/', newQuestion)
          .then(response => newQuestion = { ...newQuestion, _id: response.data.data._id } );
      }
      else {
        await client
          .put(`/questions/${question._id}`, newQuestion)
          .then(() => newQuestion = { ...newQuestion, _id: question._id });
      }
      return newQuestion;
    }
    catch (err) {
      message.error('Something went wrong. Please try again later.');
      console.error(`Error in question edit submission: ${err}`);
      return null;
    }
  };

  /**
   * Handles the submission of a (new) section.
   *
   * @param section The form section to submit.
   *
   * @returns The submitted section object.
   */
  async function handleSectionSubmit(section: FormSection) {
    const questions: (QuestionObj | null)[] = await Promise.all(
      section.questions.map(
        async question => await handleQuestionSubmit(question)
      )
    );

    let newSection: SectionObj = {
      title: section.sectionTitle,
      description: section.sectionDescription,
      questions: questions.filter(question => question !== null),
    };
    const newSectionType: SectionType = sectionObjToType(newSection);

    try {
      if (section._id === undefined) {
        await client
          .post<{ data: SectionType, message: string }>('/formSection/', newSectionType)
          .then(response => newSection = { ...newSection, _id: response.data.data._id } );
      }
      else {
        await client
          .put(`/formSection/${section._id}`, newSectionType)
          .then(() => newSection = { ...newSection, _id: section._id });
      }
      return newSection;
    }
    catch (err) {
      message.error('Something went wrong. Please try again later.');
      console.error(`Error in section edit submission: ${err}`);
      return null;
    }
  }

  /**
   * Handles the submission of a (new) form.
   *
   * @param form The form to submit.
   */
  async function handleSubmit(form: IAppraisalForm) {
    const sections: (SectionObj | null)[] = await Promise.all(
      form.sections.map(
        async section => await handleSectionSubmit(section)
      )
    );

    let newForm: FormObj = {
      name: form.formTitle,
      sections: sections.filter(section => section !== null),
    };
    const newFormType: FormType = formObjToType(newForm);

    try {
      if (location.state === null) {
        await client.post('/form/', newFormType);
      }
      else {
        await client.put(`/form/${location.state}`, newFormType);
      }
      message.success(`Form successfully ${location.state === null ? 'created' : 'edited'}!`);
      navigate('/dashboard');
    }
    catch (err) {
      message.error('Something went wrong. Please try again later.');
      console.error(`Error in form edit submission: ${err}`);
    }
  };

  const handleSectionAdd = () => {
    setFieldsCount([...fieldsCount, 0]);
    form.setFieldsValue({
      sections: [
        ...form.getFieldValue('sections'),
        {
          sectionTitle: '',
          sectionDescription: '',
          questions: []
        }
      ]
    });
  };

  const handleSectionRemove = (index: number, remove: (name: number) => void) => {
    const newFieldsCount = fieldsCount.slice();
    newFieldsCount.splice(index, 1);
    setFieldsCount(newFieldsCount);
    remove(index);
  };

  const handleQuestionAdd = (sectionIndex: number, add: () => void) => {
    const newFieldsCount = fieldsCount.slice();
    newFieldsCount[sectionIndex]++;
    setFieldsCount(newFieldsCount);
    add();
  };

  const handleQuestionRemove = (
      sectionIndex: number,
      questionIndex: number,
      remove: (name: number) => void
  ) => {
    const newFieldsCount = fieldsCount.slice();
    newFieldsCount[sectionIndex]--;
    setFieldsCount(newFieldsCount);
    remove(questionIndex);
  };

  return (
    <Form
      className='form-container'
      form={form}
      onFinish={handleSubmit}
      layout='vertical'
    >
      <Form.Item
        name='formTitle'
        hasFeedback
        label='Title of Form:'
        layout='horizontal'
        rules={[{ required: true, message: 'Form title is required' }]}
      >
        <Input placeholder='Form title' />
      </Form.Item>

      <Form.List name='sections'>
        {(sectionFields, { remove: removeSection }) => (
          <>
            {sectionFields.map((sectionField, sectionIndex) => (
              <div key={sectionField.key} className='section-container'>
                <Space className='section-header'>
                  <Form.Item
                    name={[sectionField.name, 'sectionTitle']}
                    hasFeedback
                    rules={[{ required: true, message: 'Section title is required' }]}
                  >
                    <Input placeholder='Section title' />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type='primary'
                      className='remove'
                      onClick={() => handleSectionRemove(sectionIndex, removeSection)}
                    >
                      Remove Section
                    </Button>
                  </Form.Item>
                </Space>
                <Form.Item
                  name={[sectionField.name, 'sectionDescription']}
                >
                  <TextArea rows={2} placeholder='Enter a short description of the section.' />
                </Form.Item>
                <Form.List name={[sectionField.name, 'questions']}>
                  {(questionFields, { add: addQuestion, remove: removeQuestion }) => (
                    <>
                      {fieldsCount[sectionIndex] > 0 && (
                        <div className='question-container'>
                          <label>Questions</label>
                          <label>Required</label>
                          <label>Type</label>
                          <br />
                        </div>
                      )}
                      {questionFields.map((questionField) => (
                        <Space key={questionField.key} className='question-container'>
                          <Form.Item
                            name={[questionField.name, 'question']}
                            hasFeedback
                            rules={[{ required: true, message: 'Question header required.' }]}
                          >
                            <Input placeholder='Type your question here.' />
                          </Form.Item>
                          <Form.Item
                            name={[questionField.name, 'required']}
                            valuePropName='checked'
                            initialValue={true}
                          >
                            <Switch
                              checkedChildren={<CheckOutlined />}
                              unCheckedChildren={<CloseOutlined />}
                              defaultChecked
                            />
                          </Form.Item>
                          <Form.Item
                            name={[questionField.name, 'type']}
                            valuePropName='checked'
                            initialValue={false}
                          >
                            <Switch
                              style={{ backgroundColor: '#5a81ee' }}
                              checkedChildren={<StarOutlined />}
                              unCheckedChildren={<MessageOutlined />}
                            />
                          </Form.Item>
                          <Form.Item>
                            <MinusCircleOutlined onClick={() => handleQuestionRemove(sectionIndex, questionField.name, removeQuestion)} />
                          </Form.Item>
                        </Space>
                      ))}
                      <Button
                        type='dashed'
                        onClick={() => handleQuestionAdd(sectionIndex, addQuestion)}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Question
                      </Button>
                    </>
                  )}
                </Form.List>
              </div>
            ))}
            <Form.Item>
              <Button
                type='dashed'
                onClick={handleSectionAdd}
                block
                icon={<FontSizeOutlined />}
              >
                Add Section
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <div className='submit-container'>
        <Popconfirm
          title={`Cancel ${location.state === undefined ? 'Create' : 'Edit'} Form`}
          description='Are you sure you want to cancel?'
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={() => navigate('/dashboard')}
          okText='Yes'
          cancelText='No'
        >
          <Button
            type='default'
            className='reset'
          >
            Cancel
          </Button>
        </Popconfirm>
        <Button
          type='primary'
          htmlType='submit'
          className='submit'
        >
          Save
        </Button>
      </div>
    </Form>
  );
};

export default FormEditor;
