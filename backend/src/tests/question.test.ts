import mongoose from 'mongoose';
import request from 'supertest';
import { CreateQuestionDto } from '@dtos/question.dto';
import App from '@app';
import QuestionsRoute from '@routes/question.route';

beforeAll(async () => {
  jest.setTimeout(10000);
});
afterAll(async () => {
  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 500);
  });
});

describe('Testing Questions', () => {
  describe('[GET] /questions', () => {
    it('response findAll Questions', async () => {
      const questionsRoute = new QuestionsRoute();
      const { questions } = questionsRoute.questionController.questionService;

      questions.find = jest.fn().mockReturnValue([
        {
          _id: 'qpwoeiruty',
          description: 'description1',
          type: 0,
          required: true,
        },
        {
          _id: 'alskdjfhg',
          description: 'description2',
          type: 1,
          required: true,
        },
        {
          _id: 'zmxncbv',
          description: 'description3',
          type: 0,
          required: false,
        },
      ]);

      mongoose.connect = jest.fn();
      const app = new App([questionsRoute]);

      return request(app.getServer())
        .get(`${questionsRoute.path}`)
        .expect(200)
        .then((response) => {
          expect(response.body.data).toEqual([
            {
              _id: 'qpwoeiruty',
              description: 'description1',
              type: 0,
              required: true,
            },
            {
              _id: 'alskdjfhg',
              description: 'description2',
              type: 1,
              required: true,
            },
            {
              _id: 'zmxncbv',
              description: 'description3',
              type: 0,
              required: false,
            },
          ]);
          expect(response.body.message).toBe('findAll question');
        });
    });
  });

  describe('[GET] /questions/:id', () => {
    it('response findOne Question', async () => {
      const questionId = 'qpwoeiruty';

      const questionRoutes = new QuestionsRoute();
      const { questions } = questionRoutes.questionController.questionService;

      questions.findOne = jest.fn().mockReturnValue({
        _id: 'qpwoeiruty',
        description: 'description1',
        type: '0',
        required: 'true',
      });

      mongoose.connect = jest.fn();
      const app = new App([questionRoutes]);
      return request(app.getServer())
        .get(`${questionRoutes.path}/${questionId}`)
        .expect(200)
        .then((response) => {
          expect(response.body.data).toEqual({
            _id: 'qpwoeiruty',
            description: 'description1',
            type: '0',
            required: 'true',
          });
          expect(response.body.message).toBe('findOne question');
        });
    });
  });

  describe('[POST] /questions', () => {
    it('response Create Question', async () => {
      const questionData: CreateQuestionDto = {
        description: 'description1',
        type: 0,
        required: true,
      };
      const questionId = '60706478aad6c9ad19a31c84';

      const questionRoutes = new QuestionsRoute();
      const { questions } = questionRoutes.questionController.questionService;

      questions.findOne = jest.fn().mockReturnValue(null);
      questions.create = jest.fn().mockReturnValue({
        _id: questionId,
        ...questionData,
      });

      mongoose.connect = jest.fn();
      const app = new App([questionRoutes]);
      return request(app.getServer())
        .post(`${questionRoutes.path}`)
        .send(questionData)
        .expect(201)
        .then((response) => {
          expect(response.body.data).toEqual({
            _id: questionId,
            ...questionData,
          });
          expect(response.body.message).toBe('created question');
        });
    });
  });

  describe('[PUT] /questions/:id', () => {
    it('response Update Question', async () => {
      const questionId = '60706478aad6c9ad19a31c84';
      const questionData: CreateQuestionDto = {
        description: 'description1',
        type: 0,
        required: true,
      };

      const questionRoutes = new QuestionsRoute();
      const { questions } = questionRoutes.questionController.questionService;

      questions.findByIdAndUpdate = jest.fn().mockReturnValue({
        _id: questionId,
        ...questionData,
      });

      mongoose.connect = jest.fn();
      const app = new App([questionRoutes]);
      return request(app.getServer())
        .put(`${questionRoutes.path}/${questionId}`)
        .send(questionData)
        .expect(200)
        .then((response) => {
          expect(response.body.data).toEqual({
            _id: questionId,
            ...questionData,
          });
          expect(response.body.message).toBe('updated question');
        });
    });
  });

  describe('[DELETE] /questions/:id', () => {
    it('response Delete Question', async () => {
      const questionId = 'qpwoeiruty';

      const questionsRoute = new QuestionsRoute();
      const { questions } = questionsRoute.questionController.questionService;

      questions.findByIdAndDelete = jest.fn().mockReturnValue({
        _id: 'qpwoeiruty',
        description: 'description1',
        type: '0',
        required: 'true',
      });

      mongoose.connect = jest.fn();
      const app = new App([questionsRoute]);
      return request(app.getServer())
        .delete(`${questionsRoute.path}/${questionId}`)
        .expect(200)
        .then((response) => {
          expect(response.body.data).toEqual({
            _id: 'qpwoeiruty',
            description: 'description1',
            type: '0',
            required: 'true',
          });
          expect(response.body.message).toBe('deleted question');
        });
    });
  });
});
