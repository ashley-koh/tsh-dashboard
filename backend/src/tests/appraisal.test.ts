import mongoose from 'mongoose';
import request from 'supertest';
import { CreateAppraisalDto } from '@dtos/appraisal.dto';
import App from '@app';
import AppraisalsRoute from '@routes/appraisal.route';

beforeAll(async () => {
  jest.setTimeout(10000);
});
afterAll(async () => {
  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 500);
  });
});

describe('Testing Appraisals', () => {
  describe('[GET] /appraisals', () => {
    it('response findAll Answers', async () => {
      const appraisalsRoute = new AppraisalsRoute();
      const { appraisals } =
        appraisalsRoute.appraisalController.appraisalService;

      appraisals.find = jest.fn().mockReturnValue([
        {
          _id: '10000001',
          managerId: '2000001',
          manageeId: '2000002',
          formId: '3000001',
          status: 'in review',
          deadline: '14/05/2025',
          answers: ['4000001', '4000002'],
          comments: 'testComment1',
        },
        {
          _id: '10000002',
          managerId: '2000003',
          manageeId: '2000004',
          formId: '3000002',
          status: 'post review',
          deadline: '14/06/2025',
          answers: ['4000003', '4000004'],
          comments: 'testComment2',
        },
        {
          _id: '10000003',
          managerId: '2000005',
          manageeId: '2000006',
          formId: '3000003',
          status: 'completed',
          deadline: '14/07/2025',
          answers: ['4000005', '4000006'],
          comments: 'testComment3',
        },
      ]);

      mongoose.connect = jest.fn();
      const app = new App([appraisalsRoute]);

      return request(app.getServer())
        .get(`${appraisalsRoute.path}`)
        .expect(200)
        .then((response) => {
          expect(response.body.data).toEqual([
            {
              _id: '10000001',
              managerId: '2000001',
              manageeId: '2000002',
              formId: '3000001',
              status: 'in review',
              deadline: '14/05/2025',
              answers: ['4000001', '4000002'],
              comments: 'testComment1',
            },
            {
              _id: '10000002',
              managerId: '2000003',
              manageeId: '2000004',
              formId: '3000002',
              status: 'post review',
              deadline: '14/06/2025',
              answers: ['4000003', '4000004'],
              comments: 'testComment2',
            },
            {
              _id: '10000003',
              managerId: '2000005',
              manageeId: '2000006',
              formId: '3000003',
              status: 'completed',
              deadline: '14/07/2025',
              answers: ['4000005', '4000006'],
              comments: 'testComment3',
            },
          ]);
          expect(response.body.message).toBe('findAll appraisals');
        });
    });
  });

  describe('[GET] /appraisals/:id', () => {
    it('response findOne Appraisal', async () => {
      const appraisalId = '10000001';

      const appraisalsRoute = new AppraisalsRoute();
      const { appraisals } =
        appraisalsRoute.appraisalController.appraisalService;

      appraisals.findOne = jest.fn().mockReturnValue({
        _id: appraisalId,
        managerId: '2000001',
        manageeId: '2000002',
        formId: '3000001',
        status: 'in review',
        deadline: '14/05/2025',
        answers: ['4000001', '4000002'],
        comments: 'testComment1',
      });

      mongoose.connect = jest.fn();
      const app = new App([appraisalsRoute]);
      return request(app.getServer())
        .get(`${appraisalsRoute.path}/${appraisalId}`)
        .expect(200)
        .then((response) => {
          expect(response.body.data).toEqual({
            _id: appraisalId,
            managerId: '2000001',
            manageeId: '2000002',
            formId: '3000001',
            status: 'in review',
            deadline: '14/05/2025',
            answers: ['4000001', '4000002'],
            comments: 'testComment1',
          });
          expect(response.body.message).toBe('findOne appraisal');
        });
    });
  });

  describe('[POST] /appraisals', () => {
    it('response Create Appraisal', async () => {
      const appraisalData: CreateAppraisalDto = {
        managerId: '2000001',
        manageeId: '2000002',
        formId: '3000001',
        status: 'in review',
        deadline: '14/05/2025',
        answers: ['4000001', '4000002'],
        comments: 'testComment1',
      };
      const appraisalId = '60706478aad6c9ad19a31c84';

      const appraisalsRoute = new AppraisalsRoute();
      const { appraisals } =
        appraisalsRoute.appraisalController.appraisalService;

      appraisals.create = jest.fn().mockReturnValue({
        _id: appraisalId,
        ...appraisalData,
      });

      mongoose.connect = jest.fn();
      const app = new App([appraisalsRoute]);
      return request(app.getServer())
        .post(`${appraisalsRoute.path}`)
        .send(appraisalData)
        .expect(201)
        .then((response) => {
          expect(response.body.data).toEqual({
            _id: appraisalId,
            ...appraisalData,
          });
          expect(response.body.message).toBe('created appraisal');
        });
    });
  });

  describe('[PUT] /appraisals/:id', () => {
    it('response Update Appraisal', async () => {
      const appraisalId = '60706478aad6c9ad19a31c84';
      const appraisalData: CreateAppraisalDto = {
        managerId: '2000001',
        manageeId: '2000002',
        formId: '3000001',
        status: 'in review',
        deadline: '14/05/2025',
        answers: ['4000001', '4000002'],
        comments: 'testComment1',
      };

      const appraisalsRoute = new AppraisalsRoute();
      const { appraisals } =
        appraisalsRoute.appraisalController.appraisalService;

      appraisals.findByIdAndUpdate = jest.fn().mockReturnValue({
        _id: appraisalId,
        ...appraisalData,
      });

      mongoose.connect = jest.fn();
      const app = new App([appraisalsRoute]);
      return request(app.getServer())
        .put(`${appraisalsRoute.path}/${appraisalId}`)
        .send(appraisalData)
        .expect(200)
        .then((response) => {
          expect(response.body.data).toEqual({
            _id: appraisalId,
            ...appraisalData,
          });
          expect(response.body.message).toBe('updated appraisal');
        });
    });
  });

  describe('[DELETE] /appraisals/:id', () => {
    it('response Delete Appraisal', async () => {
      const appraisalId = '60706478aad6c9ad19a31c84';

      const appraisalsRoute = new AppraisalsRoute();
      const { appraisals } =
        appraisalsRoute.appraisalController.appraisalService;

      appraisals.findByIdAndDelete = jest.fn().mockReturnValue({
        _id: appraisalId,
        managerId: '2000001',
        manageeId: '2000002',
        formId: '3000001',
        status: 'in review',
        deadline: '14/05/2025',
        answers: ['4000001', '4000002'],
        comments: 'testComment1',
      });

      mongoose.connect = jest.fn();
      const app = new App([appraisalsRoute]);
      return request(app.getServer())
        .delete(`${appraisalsRoute.path}/${appraisalId}`)
        .expect(200)
        .then((response) => {
          expect(response.body.data).toEqual({
            _id: appraisalId,
            managerId: '2000001',
            manageeId: '2000002',
            formId: '3000001',
            status: 'in review',
            deadline: '14/05/2025',
            answers: ['4000001', '4000002'],
            comments: 'testComment1',
          });
          expect(response.body.message).toBe('deleted appraisal');
        });
    });
  });
});
