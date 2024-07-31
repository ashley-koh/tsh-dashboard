import React, { useEffect, useState } from 'react';
import { Location, useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  Collapse,
  Form,
  FormInstance,
  Input,
  Rate,
  message,
} from 'antd';
import axiosClient from '@/lib/axiosInstance';

import { ANSWER_ROUTE } from '@/services/answer.services';
import AnswerObj, {
  AnswerResponse,
  AnswerType
} from '@/types/answer.type';
import AppraisalObj, {
  AppraisalResponse,
  AppraisalStatus,
  AppraisalType,
  defaultAppraisal
} from '@/types/appraisal.type';
import IAppraisalAnswer, {
  FormAnswer,
  ISectionAnswer
} from './types/formAnswer.type';
import QuestionObj, { QuestionType } from '@/types/question.type';
import SectionObj from '@/types/section.type';
import {
  APPRAISAL_ROUTE,
  appraisalObjToType,
  fetchAppraisal
} from '@/services/appraisal.services';
import './AppraisalForm.css';

const { TextArea } = Input;
const { Panel } = Collapse;
const PANEL_KEY = 'panel';

const AppraisalForm: React.FC = () => {
  const client = axiosClient();
  const [form]: [FormInstance<IAppraisalAnswer>] = Form.useForm();
  const location: Location<string> = useLocation();
  const navigate = useNavigate();

  const [appraisal, setAppraisal] = useState(defaultAppraisal);

  /* Run this useEffect on first form load */
  useEffect(() => {
    const loadData = async () => {
      const currAppraisal: AppraisalObj = await fetchAppraisal(client, location.state);

      const formFields: IAppraisalAnswer = {
        sections: currAppraisal.form.sections.map(section => {
          const answers: FormAnswer[] = section.questions.map(question => {
            const answer: AnswerObj | undefined =
              currAppraisal.answers.find(answer => answer.question._id === question._id);

            const formAnswer: FormAnswer = {
              _id: answer?._id,
              questionId: question._id || '',
              type: question.type,
              openEndedAnswer: answer?.openEndedAnswer,
              ranking: answer?.rating,
            };
            return formAnswer;
          });
          return {
            title: section.title,
            questions: answers,
          };
        }),
      };

      setAppraisal(currAppraisal);
      form.setFieldsValue(formFields);
    };

    loadData();
  }, []);

  async function saveQuestionAnswer(formAnswer: FormAnswer) {
    if (formAnswer.openEndedAnswer === undefined && formAnswer.ranking === undefined) {
      return null;
    }

    let answer: AnswerType = {
      answerId: formAnswer.questionId,
      type: formAnswer.type,
      openEndedAnswer: formAnswer.openEndedAnswer,
      rating: formAnswer.ranking,
    };
    console.log(answer);

    try {
      if (formAnswer._id) {
        await client.put<AnswerResponse>(`${ANSWER_ROUTE}${formAnswer._id}`, answer);
      }
      else {
        await client
          .post<AnswerResponse>(ANSWER_ROUTE, answer)
          .then(response => answer = { ...answer, _id: response.data.data._id });
      }
    }
    catch (err) {
      console.error(err);
    }
    finally {
      return formAnswer._id ? null : answer._id;
    }
  }

  async function saveSectionAnswers(section: ISectionAnswer) {
    const ids: (string | undefined | null)[] =
      await Promise.all(section.questions.map(saveQuestionAnswer));
    return ids.filter(id => id !== null && id !== undefined);
  }

  async function saveAnswers(answers: IAppraisalAnswer, toSubmit: boolean) {
    const sIds: string[][] = await Promise.all(answers.sections.map(saveSectionAnswers));
    const ids: string[] = sIds.reduce(
      (prev: string[], curr: string[]) => [ ...prev, ...curr ],
      []
    );
    if (ids.length === 0 && !toSubmit) {
      return true;
    }

    const appraisalType: AppraisalType = appraisalObjToType(appraisal);
    const { _id, ...rest } = appraisalType;
    let newAppraisalType: AppraisalType = {
      ...rest,
      answers: [ ...appraisalType.answers, ...ids ],
      status: toSubmit ? AppraisalStatus.POST : AppraisalStatus.REVIEW,
    };

    try {
      await client.put<AppraisalResponse>(`${APPRAISAL_ROUTE}${location.state}`, newAppraisalType);
      return true;
    }
    catch (err) {
      console.error(err);
      return false;
    }
  }

  const handleSave = async () => {
    const result: boolean = await saveAnswers(form.getFieldsValue(), false);
    if (result) {
      message.success('Form successfully saved!');
      navigate('/dashboard');
    }
    else {
      message.error('Could not save the form. Please try again.');
    }
  }

  const handleSubmit = async (values: IAppraisalAnswer) => {
    const result: boolean = await saveAnswers(values, true);
    if (result) {
      message.success('Form successfully submitted!');
      navigate('/dashboard');
    }
    else {
      message.error('Could not submit the form. Please try again.');
    }
  };

  return (
    <Form
      className='form-container'
      form={form}
      scrollToFirstError
      layout='vertical'
      onFinish={handleSubmit}
    >
      <Form.List name='sections'>
        {sectionFields => (
          <>
            {sectionFields.map((sectionField, sectionIdx) => {
              const section: SectionObj = appraisal.form.sections[sectionIdx];

              return (
                <div key={sectionField.key}>
                  <div className='section-container'>
                    <h1>{section.title}</h1>
                    {section.description && <p><em>{section.description}</em></p>}
                  </div>
                  <Form.List name={[sectionField.name, 'questions']}>
                    {questionFields => (
                      <>
                        {questionFields.map((questionField, questionIdx) => {
                          const question: QuestionObj = section.questions[questionIdx];
                          const isRanking: boolean = question.type === QuestionType.RATING;

                          return (
                            <Collapse
                              key={questionField.key}
                              className='question-container'
                              ghost
                              defaultActiveKey={isRanking ? [] : [PANEL_KEY]}
                            >
                              <Panel
                                key={PANEL_KEY}
                                header={
                                  <div className='header-container'>
                                    <p
                                      className={`header ${
                                        question.required ? 'required-field' : ''
                                      }`}
                                    >
                                      {question.description}
                                    </p>
                                    {isRanking && (
                                      <Form.Item
                                        name={[questionField.name, 'ranking']}
                                        rules={[
                                          {
                                            required: isRanking && question.required,
                                            message: 'Ranking is required',
                                          },
                                        ]}
                                      >
                                        <Rate className='ranking' />
                                      </Form.Item>
                                    )}
                                  </div>
                                }
                              >
                                <Form.Item
                                  name={[questionField.name, 'openEndedAnswer']}
                                  hasFeedback
                                  rules={[
                                    {
                                      required: !isRanking && question.required,
                                      message: 'Input is required',
                                    },
                                  ]}
                                >
                                  <TextArea
                                    rows={4}
                                    placeholder={
                                      isRanking ? 'Your comments, if any' : 'Your response'
                                    }
                                  />
                                </Form.Item>
                              </Panel>
                            </Collapse>
                          );
                        })}
                      </>
                    )}
                  </Form.List>
                </div>
              );
            })}
          </>
        )}
      </Form.List>
      <div className='submit-container'>
        <Button
            type='default'
            className='reset'
            onClick={handleSave}
          >
            Save
          </Button>
        <Button
          type='primary'
          htmlType='submit'
          className='submit'
        >
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default AppraisalForm;
