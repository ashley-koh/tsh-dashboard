import mongoose from 'mongoose';
import request from 'supertest';
import { CreateAnswerDto } from '@dtos/answer.dto';
import App from '@app';
import AnswersRoute from '@routes/answer.route';

beforeAll(async () => {
  jest.setTimeout(10000);
});
afterAll(async () => {
  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 500);
  });
});

describe('Testing Answers', () => {
  describe('[GET] /answers', () => {
    it('response findAll Answers', async () => {
      const answersRoute = new AnswersRoute();
      const { answers } = answersRoute.answerController.answerService;

      answers.find = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue([
          {
            _id: '10000001',
            answerId: {
              _id: '66a48c45cd769096b25930c5',
              description: 'Question 1',
            },
            type: 0,
            openEndedAnswer: 'testAnswer1',
            rating: 1,
          },
          {
            _id: '10000002',
            answerId: {
              _id: '66a48c45cd769096b25930c6',
              description: 'Question 2',
            },
            type: 1,
            openEndedAnswer: 'testAnswer2',
            rating: 2,
          },
          {
            _id: '10000003',
            answerId: {
              _id: '66a48c45cd769096b25930c7',
              description: 'Question 3',
            },
            type: 0,
            openEndedAnswer: 'testAnswer3',
            rating: 3,
          },
        ]),
      });

      mongoose.connect = jest.fn();
      const app = new App([answersRoute]);

      return request(app.getServer())
        .get(`${answersRoute.path}`)
        .expect(200)
        .then((response) => {
          expect(response.body.data).toEqual([
            {
              _id: '10000001',
              answerId: {
                _id: '66a48c45cd769096b25930c5',
                description: 'Question 1',
              },
              type: 0,
              openEndedAnswer: 'testAnswer1',
              rating: 1,
            },
            {
              _id: '10000002',
              answerId: {
                _id: '66a48c45cd769096b25930c6',
                description: 'Question 2',
              },
              type: 1,
              openEndedAnswer: 'testAnswer2',
              rating: 2,
            },
            {
              _id: '10000003',
              answerId: {
                _id: '66a48c45cd769096b25930c7',
                description: 'Question 3',
              },
              type: 0,
              openEndedAnswer: 'testAnswer3',
              rating: 3,
            },
          ]);
          expect(response.body.message).toBe('findAll answer');
        });
    });
  });

  describe('[GET] /answers/:id', () => {
    it('response findOne Answer', async () => {
      const answerId = '10000001';

      const answersRoute = new AnswersRoute();
      const { answers } = answersRoute.answerController.answerService;

      const populateMock = jest.fn().mockReturnValue({
        _id: answerId,
        answerId: {
          _id: '66a48c45cd769096b25930c5',
          description: 'Question 1',
        },
        type: 0,
        openEndedAnswer: 'testAnswer1',
        rating: 1,
      });

      answers.findOne = jest.fn().mockReturnValue({
        populate: populateMock,
      });

      mongoose.connect = jest.fn();
      const app = new App([answersRoute]);
      return request(app.getServer())
        .get(`${answersRoute.path}/${answerId}`)
        .expect(200)
        .then((response) => {
          expect(response.body.data).toEqual({
            _id: answerId,
            answerId: {
              _id: '66a48c45cd769096b25930c5',
              description: 'Question 1',
            },
            type: 0,
            openEndedAnswer: 'testAnswer1',
            rating: 1,
          });
          expect(response.body.message).toBe('findOne answer');
        });
    });
  });

  describe('[POST] /answers', () => {
    it('response Create Answer', async () => {
      const answerData: CreateAnswerDto = {
        answerId: '66a48c45cd769096b25930c5',
        type: 0,
        openEndedAnswer: 'testAnswer1',
        rating: 1,
      };
      const answerId = '60706478aad6c9ad19a31c84';

      const answersRoute = new AnswersRoute();
      const { answers } = answersRoute.answerController.answerService;

      const populateMock = jest.fn().mockReturnValue({
        _id: answerId,
        answerId: {
          _id: '66a48c45cd769096b25930c5',
          description: 'Question 1',
        },
        type: 0,
        openEndedAnswer: 'testAnswer1',
        rating: 1,
      });

      answers.create = jest.fn().mockReturnValue({
        _id: answerId,
        ...answerData,
      });

      answers.findById = jest.fn().mockReturnValue({
        populate: populateMock,
      });

      mongoose.connect = jest.fn();
      const app = new App([answersRoute]);
      return request(app.getServer())
        .post(`${answersRoute.path}`)
        .send(answerData)
        .expect(201)
        .then((response) => {
          expect(response.body.data).toEqual({
            _id: answerId,
            answerId: {
              _id: '66a48c45cd769096b25930c5',
              description: 'Question 1',
            },
            type: 0,
            openEndedAnswer: 'testAnswer1',
            rating: 1,
          });
          expect(response.body.message).toBe('created answer');
        });
    });
  });

  describe('[PUT] /answers/:id', () => {
    it('response Update Answer', async () => {
      const answerId = '60706478aad6c9ad19a31c84';
      const answerData: CreateAnswerDto = {
        answerId: '66a48c45cd769096b25930c5',
        type: 0,
        openEndedAnswer: 'testAnswer1',
        rating: 1,
      };

      const answersRoute = new AnswersRoute();
      const { answers } = answersRoute.answerController.answerService;

      answers.findByIdAndUpdate = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          _id: answerId,
          answerId: {
            _id: '66a48c45cd769096b25930c5',
            description: 'Question 1',
          },
          ...answerData,
        }),
      });

      mongoose.connect = jest.fn();
      const app = new App([answersRoute]);
      return request(app.getServer())
        .put(`${answersRoute.path}/${answerId}`)
        .send(answerData)
        .expect(200)
        .then((response) => {
          expect(response.body.data).toEqual({
            _id: answerId,
            answerId: {
              _id: '66a48c45cd769096b25930c5',
              description: 'Question 1',
            },
            ...answerData,
          });
          expect(response.body.message).toBe('updated answer');
        });
    });
  });

  describe('[DELETE] /answers/:id', () => {
    it('response Delete Answer', async () => {
      const answerId = '60706478aad6c9ad19a31c84';

      const answersRoute = new AnswersRoute();
      const { answers } = answersRoute.answerController.answerService;

      answers.findByIdAndDelete = jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue({
          _id: '60706478aad6c9ad19a31c84',
          answerId: {
            _id: '66a48c45cd769096b25930c5',
            description: 'Question 1',
          },
          type: 0,
          openEndedAnswer: 'testAnswer1',
          rating: 1,
        }),
      });

      mongoose.connect = jest.fn();
      const app = new App([answersRoute]);
      return request(app.getServer())
        .delete(`${answersRoute.path}/${answerId}`)
        .expect(200)
        .then((response) => {
          expect(response.body.data).toEqual({
            _id: '60706478aad6c9ad19a31c84',
            answerId: {
              _id: '66a48c45cd769096b25930c5',
              description: 'Question 1',
            },
            type: 0,
            openEndedAnswer: 'testAnswer1',
            rating: 1,
          });
          expect(response.body.message).toBe('deleted answer');
        });
    });
  });
});
