import mongoose from 'mongoose';
import request from 'supertest';
import App from '@app';
import FormsRoute from '@routes/form.route';
import { CreateFormDto } from '@/dtos/form.dto';

beforeAll(async () => {
  jest.setTimeout(10000);
});
afterAll(async () => {
  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 500);
  });
});

describe('Testing Form', () => {
  describe('[GET] /form', () => {
    it('response findAll Form', async () => {
      const formsRoute = new FormsRoute();
      const { forms } = formsRoute.formController.formService;

      // Mock the populate method
      const populateMock = jest.fn().mockReturnValue([
        {
          _id: 'qpwoeiruty',
          name: 'testName1',
          sections: [
            { _id: '1000001', title: 'Section 1' },
            { _id: '1000002', title: 'Section 2' },
          ],
        },
        {
          _id: 'alskdjfhg',
          name: 'testName2',
          sections: [
            { _id: '1000003', title: 'Section 3' },
            { _id: '1000004', title: 'Section 4' },
          ],
        },
        {
          _id: 'zmxncbv',
          name: 'testName3',
          sections: [
            { _id: '1000005', title: 'Section 5' },
            { _id: '1000006', title: 'Section 6' },
          ],
        },
      ]);

      // Mock the find method to return an object with the populate method
      forms.find = jest.fn().mockReturnValue({
        populate: populateMock,
      });
      mongoose.connect = jest.fn();
      const app = new App([formsRoute]);

      return request(app.getServer())
        .get(`${formsRoute.path}`)
        .expect(200)
        .then((response) => {
          expect(response.body.data).toEqual([
            {
              _id: 'qpwoeiruty',
              name: 'testName1',
              sections: [
                { _id: '1000001', title: 'Section 1' },
                { _id: '1000002', title: 'Section 2' },
              ],
            },
            {
              _id: 'alskdjfhg',
              name: 'testName2',
              sections: [
                { _id: '1000003', title: 'Section 3' },
                { _id: '1000004', title: 'Section 4' },
              ],
            },
            {
              _id: 'zmxncbv',
              name: 'testName3',
              sections: [
                { _id: '1000005', title: 'Section 5' },
                { _id: '1000006', title: 'Section 6' },
              ],
            },
          ]);
          expect(response.body.message).toBe('findAll forms');
        });
    });
  });

  describe('[GET] /forms/:id', () => {
    it('response findOne Form', async () => {
      const formId = 'qpwoeiruty';

      const formsRoute = new FormsRoute();
      const { forms } = formsRoute.formController.formService;

      const populateMock = jest.fn().mockResolvedValue({
        _id: formId,
        name: 'testName1',
        sections: [
          { _id: '1000001', title: 'Section 1' },
          { _id: '1000002', title: 'Section 2' },
        ],
      });

      forms.findOne = jest.fn().mockReturnValue({
        populate: populateMock,
      });

      mongoose.connect = jest.fn();
      const app = new App([formsRoute]);
      return request(app.getServer())
        .get(`${formsRoute.path}/${formId}`)
        .expect(200)
        .then((response) => {
          expect(response.body.data).toEqual({
            _id: formId,
            name: 'testName1',
            sections: [
              { _id: '1000001', title: 'Section 1' },
              { _id: '1000002', title: 'Section 2' },
            ],
          });
          expect(response.body.message).toBe('findOne form');
        });
    });
  });

  describe('[POST] /forms', () => {
    it('response Create Form', async () => {
      const formData: CreateFormDto = {
        name: 'testName1',
        sections: ['1000001', '1000002'],
      };

      const formId = '60706478aad6c9ad19a31c84';

      const formsRoute = new FormsRoute();
      const { forms } = formsRoute.formController.formService;

      forms.create = jest.fn().mockReturnValue({
        _id: formId,
        ...formData,
      });

      const populateMock = jest.fn().mockReturnValue({
        _id: formId,
        name: 'testName1',
        sections: [
          { _id: '1000001', title: 'Section 1' },
          { _id: '1000002', title: 'Section 2' },
        ],
      });

      forms.findById = jest.fn().mockReturnValue({
        populate: populateMock,
      });

      mongoose.connect = jest.fn();
      const app = new App([formsRoute]);
      return request(app.getServer())
        .post(`${formsRoute.path}`)
        .send(formData)
        .expect(201)
        .then((response) => {
          expect(response.body.data).toEqual({
            _id: formId,
            name: 'testName1',
            sections: [
              { _id: '1000001', title: 'Section 1' },
              { _id: '1000002', title: 'Section 2' },
            ],
          });
          expect(response.body.message).toBe('created form');
        });
    });
  });

  describe('[PUT] /forms/:id', () => {
    it('response Update Form', async () => {
      const formId = '60706478aad6c9ad19a31c84';
      const formData: CreateFormDto = {
        name: 'testName1',
        sections: ['1000001', '1000002'],
      };

      const formsRoute = new FormsRoute();
      const { forms } = formsRoute.formController.formService;

      const populateMock = jest.fn().mockReturnValue({
        _id: formId,
        name: 'testName1',
        sections: [
          { _id: '1000001', title: 'Section 1' },
          { _id: '1000002', title: 'Section 2' },
        ],
      });

      forms.findByIdAndUpdate = jest.fn().mockReturnValue({
        populate: populateMock,
      });

      mongoose.connect = jest.fn();
      const app = new App([formsRoute]);
      return request(app.getServer())
        .put(`${formsRoute.path}/${formId}`)
        .send(formData)
        .expect(200)
        .then((response) => {
          expect(response.body.data).toEqual({
            _id: formId,
            name: 'testName1',
            sections: [
              { _id: '1000001', title: 'Section 1' },
              { _id: '1000002', title: 'Section 2' },
            ],
          });
          expect(response.body.message).toBe('updated form');
        });
    });
  });

  describe('[DELETE] /forms/:id', () => {
    it('response Delete Form', async () => {
      const formId = 'qpwoeiruty';

      const formsRoute = new FormsRoute();
      const { forms } = formsRoute.formController.formService;

      const populateMock = jest.fn().mockReturnValue({
        _id: formId,
        name: 'testName1',
        sections: [
          { _id: '1000001', title: 'Section 1' },
          { _id: '1000002', title: 'Section 2' },
        ],
      });

      forms.findByIdAndDelete = jest.fn().mockReturnValue({
        populate: populateMock,
      });

      mongoose.connect = jest.fn();
      const app = new App([formsRoute]);
      return request(app.getServer())
        .delete(`${formsRoute.path}/${formId}`)
        .expect(200)
        .then((response) => {
          expect(response.body.data).toEqual({
            _id: formId,
            name: 'testName1',
            sections: [
              { _id: '1000001', title: 'Section 1' },
              { _id: '1000002', title: 'Section 2' },
            ],
          });
          expect(response.body.message).toBe('deleted form');
        });
    });
  });
});
