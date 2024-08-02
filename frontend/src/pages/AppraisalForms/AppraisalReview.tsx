import React, { useEffect, useState } from "react";
import { Location, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Collapse,
  Form,
  FormInstance,
  Input,
  message,
  Rate,
  Slider,
  Typography
} from "antd";
import { AxiosError } from "axios";

import AnswerObj from "@/types/answer.type";
import AppraisalObj, {
  AppraisalResponse,
  AppraisalStatus,
  AppraisalType,
  defaultAppraisal
} from "@/types/appraisal.type";
import { ErrorResponse } from "@/types/auth.type";
import { QuestionType } from "@/types/question.type";
import axiosClient from "@/lib/axiosInstance";
import {
  APPRAISAL_ROUTE,
  appraisalObjToType,
  fetchAppraisal
} from "@/services/appraisal.services";
import './AppraisalForm.css';

type IAppraisalReview = {
  review: string;
  rating: number;
};

const { Panel } = Collapse;
const { TextArea } = Input;
const { Title, Paragraph } = Typography;
const PANEL_KEY = 'panel';

const AppraisalReview: React.FC = () => {
  const client = axiosClient();
  const [form]: [FormInstance<IAppraisalReview>] = Form.useForm();
  const location: Location<string> = useLocation();
  const navigate = useNavigate();

  const [appraisal, setAppraisal] = useState(defaultAppraisal);

  /* Run this useEffect on first form load */
  useEffect(() => {
    const loadData = async () => {
      const currAppraisal: AppraisalObj = await fetchAppraisal(client, location.state);
      setAppraisal(currAppraisal);
    };

    loadData();
  }, []);

  const handleSubmit = (review: IAppraisalReview) => {
    const appraisalType: AppraisalType = appraisalObjToType(appraisal);
    const { _id, ...rest } = appraisalType;
    let newAppraisalType: AppraisalType = {
      ...rest,
      comments: review.review,
      // rating: review.rating,
      status: AppraisalStatus.COMPLETE,
    };

    client
      .put<AppraisalResponse>(`${APPRAISAL_ROUTE}${location.state}`, newAppraisalType)
      .then(() => {
        message.success('Review submitted successfully!');
        navigate('/dashboard');
      })
      .catch((err: AxiosError<ErrorResponse>) => {
        message.error('Failed to submit review. Please try again.');
        console.error(err);
      });
  };

  return (
    <>
      <Typography>
        <Title level={2}>
          {`Review ${appraisal.managee.name}'s Submission: ${appraisal.form.name}`}
        </Title>
        {appraisal.form.sections.map(section => (
          <div key={section._id || section.title}>
            <div className='section-container'>
              <Title level={3}>
                {section.title}
              </Title>
              <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
                {section.description || ''}
              </Paragraph>
            </div>
            <>
              {section.questions.map(question => {
                const answer: AnswerObj | undefined =
                  appraisal.answers.find(answer => answer.question._id === question._id);
                const isRanking: boolean = question.type === QuestionType.RATING;

                return (
                  <Collapse
                    key={question._id || question.description}
                    className='question-container'
                    ghost
                    defaultActiveKey={isRanking ? [] : [PANEL_KEY]}
                  >
                    <Panel
                      key={PANEL_KEY}
                      header={
                        <div className='header-container'>
                          <Title level={4}>
                            {question.description}
                          </Title>
                          {isRanking && (
                            <Rate
                              className='ranking'
                              disabled
                              defaultValue={answer?.rating || 0}
                            />
                          )}
                        </div>
                      }
                    >
                      <Paragraph
                        copyable={{ text: answer?.openEndedAnswer || '' }}
                        ellipsis={{ rows: 3, expandable: true, symbol: 'more' }}
                      >
                        {`${isRanking ? 'Comments Provided' : 'Answer'}: ` +
                         `${answer?.openEndedAnswer || ''}`}
                      </Paragraph>
                    </Panel>
                  </Collapse>
                );
              })}
            </>
          </div>
        ))}
      </Typography>
      <Form
        form={form}
        scrollToFirstError
        layout='vertical'
        onFinish={handleSubmit}
      >
        <Form.Item
          name='review'
          label='Your Review'
          hasFeedback
          rules={[{ required: true, message: 'Review is required' }]}
        >
          <TextArea
            rows={4}
            placeholder='Enter your review here'
          />
        </Form.Item>
        <Form.Item
          name='rating'
          label='Your Final Rating'
          rules={[{ required: true, message: 'Rating is required' }]}
        >
          <Slider defaultValue={50} tooltip={{ open: true }} />
        </Form.Item>
        <div className='submit-container'>
          <Button
              type='default'
              className='reset'
              onClick={() => navigate('/dashboard')}
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
        </div>
      </Form>
    </>
  )
};

export default AppraisalReview;
