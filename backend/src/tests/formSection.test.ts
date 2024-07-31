import mongoose from 'mongoose';
import request from 'supertest';
import App from '@app';
import FormSectionsRoute from '@routes/formSection.route';
import { CreateFormSectionDto } from '@/dtos/formSection.dto';

beforeAll(async () => {
  jest.setTimeout(10000);
});
afterAll(async () => {
  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 500);
  });
});

describe('Testing Form Sections', () => {
  describe('[GET] /formSections', () => {
    it('response findAll Form Sections', async () => {
      const formSectionsRoute = new FormSectionsRoute();
      const { formSections } =
        formSectionsRoute.formSectionController.formSectionService;

      // Mock the populate method
      const populateMock = jest.fn().mockReturnValue([
        {
          _id: 'qpwoeiruty',
          title: 'title1',
          description: 'description1',
          questions: [
            { _id: '1000001', description: 'Question 1' },
            { _id: '1000002', description: 'Question 2' },
          ],
        },
        {
          _id: 'alskdjfhg',
          title: 'title2',
          description: 'description2',
          questions: [
            { _id: '1000003', description: 'Question 3' },
            { _id: '1000004', description: 'Question 4' },
          ],
        },
        {
          _id: 'zmxncbv',
          title: 'title3',
          description: 'description3',
          questions: [
            { _id: '1000005', description: 'Question 5' },
            { _id: '1000006', description: 'Question 6' },
          ],
        },
      ]);

      // Mock the find method to return an object with the populate method
      formSections.find = jest.fn().mockReturnValue({
        populate: populateMock,
      });
      mongoose.connect = jest.fn();
      const app = new App([formSectionsRoute]);

      return request(app.getServer())
        .get(`${formSectionsRoute.path}`)
        .expect(200)
        .then((response) => {
          expect(response.body.data).toEqual([
            {
              _id: 'qpwoeiruty',
              title: 'title1',
              description: 'description1',
              questions: [
                { _id: '1000001', description: 'Question 1' },
                { _id: '1000002', description: 'Question 2' },
              ],
            },
            {
              _id: 'alskdjfhg',
              title: 'title2',
              description: 'description2',
              questions: [
                { _id: '1000003', description: 'Question 3' },
                { _id: '1000004', description: 'Question 4' },
              ],
            },
            {
              _id: 'zmxncbv',
              title: 'title3',
              description: 'description3',
              questions: [
                { _id: '1000005', description: 'Question 5' },
                { _id: '1000006', description: 'Question 6' },
              ],
            },
          ]);
          expect(response.body.message).toBe('findAll formSection');
        });
    });
  });

  describe('[GET] /formSections/:id', () => {
    it('response findOne Form Section', async () => {
      const formSectionId = 'qpwoeiruty';

      const formSectionsRoute = new FormSectionsRoute();
      const { formSections } =
        formSectionsRoute.formSectionController.formSectionService;

      const populateMock = jest.fn().mockResolvedValue({
        _id: formSectionId,
        title: 'title1',
        description: 'description1',
        questions: [
          { _id: '1000001', description: 'Question 1' },
          { _id: '1000002', description: 'Question 2' },
        ],
      });

      formSections.findOne = jest.fn().mockReturnValue({
        populate: populateMock,
      });

      mongoose.connect = jest.fn();
      const app = new App([formSectionsRoute]);
      return request(app.getServer())
        .get(`${formSectionsRoute.path}/${formSectionId}`)
        .expect(200)
        .then((response) => {
          expect(response.body.data).toEqual({
            _id: formSectionId,
            title: 'title1',
            description: 'description1',
            questions: [
              { _id: '1000001', description: 'Question 1' },
              { _id: '1000002', description: 'Question 2' },
            ],
          });
          expect(response.body.message).toBe('findOne formSection');
        });
    });
  });

  describe('[POST] /formSections', () => {
    it('response Create Form Section', async () => {
      const formSectionData: CreateFormSectionDto = {
        title: 'title2',
        description: 'description2',
        questions: ['66a48c45cd769096b25930c5', '66a737f280f4ca78fb5d1174'],
      };
      const formSectionId = '60706478aad6c9ad19a31c84';

      const formSectionsRoutes = new FormSectionsRoute();
      const { formSections } =
        formSectionsRoutes.formSectionController.formSectionService;

      formSections.create = jest.fn().mockReturnValue({
        _id: formSectionId,
        ...formSectionData,
      });

      const populateMock = jest.fn().mockReturnValue({
        _id: formSectionId,
        title: 'title2',
        description: 'description2',
        questions: [
          { _id: '66a48c45cd769096b25930c5', description: 'Question 1' },
          { _id: '66a737f280f4ca78fb5d1174', description: 'Question 2' },
        ],
      });

      formSections.findById = jest.fn().mockReturnValue({
        populate: populateMock,
      });

      mongoose.connect = jest.fn();
      const app = new App([formSectionsRoutes]);
      return request(app.getServer())
        .post(`${formSectionsRoutes.path}`)
        .send(formSectionData)
        .expect(201)
        .then((response) => {
          expect(response.body.data).toEqual({
            _id: formSectionId,
            title: 'title2',
            description: 'description2',
            questions: [
              { _id: '66a48c45cd769096b25930c5', description: 'Question 1' },
              { _id: '66a737f280f4ca78fb5d1174', description: 'Question 2' },
            ],
          });
          expect(response.body.message).toBe('created formSection');
        });
    });
  });

  describe('[PUT] /formSections/:id', () => {
    it('response Update Form Section', async () => {
      const formSectionId = '60706478aad6c9ad19a31c84';
      const formSectionData: CreateFormSectionDto = {
        title: 'title2',
        description: 'description2',
        questions: ['66a48c45cd769096b25930c5', '66a737f280f4ca78fb5d1174'],
      };

      const formSectionsRoute = new FormSectionsRoute();
      const { formSections } =
        formSectionsRoute.formSectionController.formSectionService;

      const populateMock = jest.fn().mockReturnValue({
        _id: formSectionId,
        title: 'title2',
        description: 'description2',
        questions: [
          { _id: '66a48c45cd769096b25930c5', description: 'Question 1' },
          { _id: '66a737f280f4ca78fb5d1174', description: 'Question 2' },
        ],
      });

      formSections.findByIdAndUpdate = jest.fn().mockReturnValue({
        populate: populateMock,
      });

      mongoose.connect = jest.fn();
      const app = new App([formSectionsRoute]);
      return request(app.getServer())
        .put(`${formSectionsRoute.path}/${formSectionId}`)
        .send(formSectionData)
        .expect(200)
        .then((response) => {
          expect(response.body.data).toEqual({
            _id: formSectionId,
            title: 'title2',
            description: 'description2',
            questions: [
              { _id: '66a48c45cd769096b25930c5', description: 'Question 1' },
              { _id: '66a737f280f4ca78fb5d1174', description: 'Question 2' },
            ],
          });
          expect(response.body.message).toBe('updated formSection');
        });
    });
  });

  describe('[DELETE] /formSections/:id', () => {
    it('response Delete Form Section', async () => {
      const formSectionId = 'qpwoeiruty';

      const formSectionsRoute = new FormSectionsRoute();
      const { formSections } =
        formSectionsRoute.formSectionController.formSectionService;

      const populateMock = jest.fn().mockReturnValue({
        _id: formSectionId,
        title: 'title2',
        description: 'description2',
        questions: [
          { _id: '66a48c45cd769096b25930c5', description: 'Question 1' },
          { _id: '66a737f280f4ca78fb5d1174', description: 'Question 2' },
        ],
      });

      formSections.findByIdAndDelete = jest.fn().mockReturnValue({
        populate: populateMock,
      });

      mongoose.connect = jest.fn();
      const app = new App([formSectionsRoute]);
      return request(app.getServer())
        .delete(`${formSectionsRoute.path}/${formSectionId}`)
        .expect(200)
        .then((response) => {
          expect(response.body.data).toEqual({
            _id: formSectionId,
            title: 'title2',
            description: 'description2',
            questions: [
              { _id: '66a48c45cd769096b25930c5', description: 'Question 1' },
              { _id: '66a737f280f4ca78fb5d1174', description: 'Question 2' },
            ],
          });
          expect(response.body.message).toBe('deleted formSection');
        });
    });
  });
});
