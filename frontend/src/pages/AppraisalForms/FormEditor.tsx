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

      form.setFieldsValue({
        formTitle: editForm === null ? '' : editForm.name,
        sections: editForm === null ? [] : editForm.sections.map(section => {
          fieldCount.push(section.questions.length);
          return {
            sectionTitle: section.title,
            sectionDescription: section.description,
            questions: section.questions.map(question => {
              return {
                ...question,
                type: question.type === QuestionType.RATING,
              };
            }),
          };
        }),
      });

      setFieldsCount(fieldCount);
    };

    loadData();
  }, [form, location.state]);

  /**
   * Handles the submission of a (new) question.
   *
   * @param question The form question to submit.
   *
   * @returns The submitted question object.
   */
  async function handleQuestionSubmit(question: FormQuestion) {
    let newQuestion: QuestionObj = {
      description: question.question,
      type: question.type ? QuestionType.RATING : QuestionType.OPEN_ENDED,
      required: question.required,
    };
    if (question._id !== undefined) {
      newQuestion = { ...newQuestion, _id: question._id };
    }
    console.log(`Question: ${newQuestion}`); // TODO debug

    try {
      const response = await (newQuestion?._id === undefined ?
        client.post<string>('/question/', newQuestion) :
        client.put<string>(`/question/${newQuestion._id}`, newQuestion)
      );
      if (newQuestion?._id === undefined) {
        newQuestion = { ...newQuestion, _id: response.data };
      }
    }
    catch (err) {
      message.error('Something went wrong. Please try again later.');
      console.error(`Error in question edit submission: ${err}`);
    }
    finally {
      return newQuestion;
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
    let newSection: SectionObj = {
      title: section.sectionTitle,
      description: section.sectionDescription,
      questions: [],
    };
    section.questions.forEach(async formQuestion => {
      const question: QuestionObj = await handleQuestionSubmit(formQuestion);
      newSection.questions.push(question);
    });
    if (section._id !== undefined) {
      newSection = { ...newSection, _id: section._id };
    }
    const newSectionType: SectionType = sectionObjToType(newSection);
    console.log(`Section: ${newSectionType}`); // TODO debug

    try {
      const response = await (newSectionType?._id === undefined ?
        client.post<string>('/formSection/', newSectionType) :
        client.put<string>(`/formSection/${newSectionType._id}`, newSectionType)
      );
      if (newSectionType?._id === undefined) {
        newSection = { ...newSection, _id: response.data };
      }
    }
    catch (err) {
      message.error('Something went wrong. Please try again later.');
      console.error(`Error in section edit submission: ${err}`);
    }
    finally {
      return newSection;
    }
  }

  /**
   * Handles the submission of a (new) form.
   *
   * @param form The form to submit.
   */
  async function handleSubmit(form: IAppraisalForm) {
    let newForm: FormObj = {
      name: form.formTitle,
      sections: [],
    };
    form.sections.forEach(async formSection => {
      const section: SectionObj = await handleSectionSubmit(formSection);
      newForm.sections.push(section);
    });
    if (form._id !== undefined) {
      newForm = { ...newForm, _id: form._id };
    }
    const newFormType: FormType = formObjToType(newForm);
    console.log(`Form: ${newFormType}`); // TODO debug

    try {
      const response = await (newFormType?._id === undefined ?
        client.post<string>('/form/', newFormType) :
        client.put<string>(`/form/${newFormType._id}`, newFormType)
      );
      if (newFormType?._id === undefined) {
        newForm = { ...newForm, _id: response.data };
      }

      message.success(`Form successfully ${location.state === undefined ? 'created' : 'edited'}!`);
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
      <Form.Item className='submit-container'>
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
            htmlType='reset'
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
      </Form.Item>
    </Form>
  );
};

export default FormEditor;
