import React, { useEffect, useState } from 'react';
import {
  CheckOutlined,
  CloseOutlined,
  FontSizeOutlined,
  MessageOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  StarOutlined
} from '@ant-design/icons';
import { Button, Form, Input, Space, Switch } from 'antd';
import './FormEditor.css';

const { TextArea } = Input;

const FormEditor: React.FC = () => {
  const [form] = Form.useForm();
  const [fieldsCount, setFieldsCount] = useState<number[]>([]);

  const handleCancel = () => {
    alert('Resetting forms.');
    form.resetFields();
    setFieldsCount([]);
  };

  const handleSubmit = (values: object) => {
    alert('Form successfully edited!');
    console.log('Form Values:', values);
  };

  const handleSectionAdd = () => {
    setFieldsCount([...fieldsCount, 0]);
    form.setFieldsValue({
      sections: [...form.getFieldValue('sections'), { sectionTitle: '', sectionDescription: '', questions: [] }]
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

  const handleQuestionRemove = (sectionIndex: number, questionIndex: number, remove: (name: number) => void) => {
    const newFieldsCount = fieldsCount.slice();
    newFieldsCount[sectionIndex]--;
    setFieldsCount(newFieldsCount);
    remove(questionIndex);
  };

  useEffect(() => {
    form.setFieldsValue({ sections: [] });
  }, [form]);

  return (
    <Form
      className='form-container'
      form={form}
      onFinish={handleSubmit}
      layout='vertical'
    >
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
        <Button
          type='default'
          htmlType='reset'
          className='reset'
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          type='primary'
          htmlType='submit'
          className='submit'
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormEditor;
