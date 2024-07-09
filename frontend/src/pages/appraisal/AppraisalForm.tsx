import React from 'react';
import { Button, Collapse, Form, Input, Rate } from 'antd';
import './AppraisalForm.css';

const { TextArea } = Input;
const { Panel } = Collapse;

const sections = [
  {
    title: 'Role & Responsibilities',
    questions: [
      {
        title: 'Elaborate your understanding of your primary role and responsibilities.',
        ranking: false,
        required: true
      }
    ]
  },
  {
    title: 'Discussion',
    questions: [
      {
        title: 'Elaborate if the past year has been good/bad/satisfactory for you.',
        ranking: false,
        required: true
      },
      {
        title: 'What do you consider to be your most important achievements of the past months / years?',
        ranking: false,
        required: true
      },
      {
        title: 'What element(s) of your job do you find most difficult and challenging?',
        ranking: false,
        required: true
      },
      {
        title: 'What do you consider to be your most important goal and objective for next year?',
        ranking: false,
        required: true
      },
      {
        title: 'What recommendable action could be taken by you and/or your boss to improve your performance in your current function?',
        ranking: false,
        required: true
      },
      {
        title: 'What kind of work would you like to do in one/three/five years\' time?',
        ranking: false,
        required: true
      },
      {
        title: 'What kind of training/experience would develop your strength which will benefit you and your work in the next year?',
        ranking: false,
        required: true
      },
      {
        title: 'List the objectives you set out to achieve in the past 12 months (or the period covered by the appraisal) with the measures or standards agreed - ' +
               'against each comment on achievement or otherwise, with reasons where appropriate. Score the performance against each objective as per below rating (1-5).',
        ranking: false,
        required: true
      }
    ]
  },
  {
    title: 'Evaluating You Own Capability',
    description: 'Score your own capability or knowledge in the following areas in terms of your current function requirements. ' +
                 'If appropriate, provide evidence to the appraisal to support your assessment.',
    questions: [
      {
        title: 'Corporate Responsibility and Ethics',
        ranking: true,
        required: true
      },
      {
        title: 'Job / Technical Knowledge',
        ranking: true,
        required: true
      },
      {
        title: 'Time Management',
        ranking: true,
        required: true
      },
      {
        title: 'Planning, Budgeting, and Forecasting',
        ranking: true,
        required: true
      },
      {
        title: 'Reporting & Administrative Skills',
        ranking: true,
        required: true
      },
      {
        title: 'Delegation Skills',
        ranking: true,
        required: true
      },
      {
        title: 'Problem Solving & Decision Making',
        ranking: true,
        required: true
      },
      {
        title: 'Meeting Deadlines / Commitments',
        ranking: true,
        required: true
      },
      {
        title: 'Work Creativity',
        ranking: true,
        required: true
      },
      {
        title: 'Team-working and Developing Others',
        ranking: true,
        required: true
      },
      {
        title: 'Work Initiative',
        ranking: true,
        required: true
      },
      {
        title: 'Energy, Determination, and Work-Rate',
        ranking: true,
        required: true
      },
      {
        title: 'Work Responsibility',
        ranking: true,
        required: true
      },
      {
        title: 'Steadiness under Pressure',
        ranking: true,
        required: true
      },
      {
        title: 'Leadership and Integrity',
        ranking: true,
        required: true
      },
      {
        title: 'Adaptability, Flexibility, and Mobility',
        ranking: true,
        required: true
      },
      {
        title: 'IT/Equipment/Machinery Skill',
        ranking: true,
        required: true
      },
      {
        title: 'Communication Skills',
        ranking: true,
        required: true
      },
      {
        title: 'Personal Appearance and Image',
        ranking: true,
        required: true
      },
      {
        title: 'Attendance / Punctuality',
        ranking: true,
        required: true
      }
    ]
  }
];

const AppraisalForm: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: object) => {
    alert('Form successfully submitted!');
    console.log('Form Values:', values); // TODO debug
  };

  return (
    <Form
      className='form-container'
      form={form}
      scrollToFirstError
      layout='vertical'
      onFinish={handleSubmit}>
        {sections.map(section => (
          <div key={section.title}>
            <div className='section-container'>
              <h1>{section.title}</h1>
              {section?.description !== undefined && <p><em>{section.description}</em></p>}
            </div>
            {section.questions.map(question => (
              <Collapse
                key={question.title}
                className='question-container'
                ghost
                defaultActiveKey={question.ranking ? [] : ['panel']}>
                  <Panel
                    key='panel'
                    header={
                      <div className='header-container'>
                        <p className={`header ${question.required ? 'required-field' : ''}`}>{question.title}</p>
                        { question.ranking && (
                          <Form.Item
                            name={`${question.title}_ranking`}
                            rules={[{
                              required: question.ranking && question.required,
                              message: 'Ranking is required'
                            }]}>
                              <Rate className='ranking' />
                          </Form.Item>
                        ) }
                      </div>
                    }>
                      <Form.Item
                        name={`${question.title}_input`}
                        hasFeedback
                        rules={[{
                          required: !question.ranking && question.required,
                          message: 'Input is required'
                        }]}>
                          <TextArea
                            rows={4}
                            placeholder={question.ranking ? 'Your comments, if any' : 'Your response'} />
                      </Form.Item>
                    </Panel>
              </Collapse>
            ))}
          </div>
        ))}
        <Form.Item className='submit-container'>
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

export default AppraisalForm;
