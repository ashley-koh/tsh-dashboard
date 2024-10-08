import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import { CreateUserDto } from '@dtos/users';
import UsersRoute from '@routes/users.route';
import App from '@app';
import UpdateUserDto from '@/dtos/users/users.update.dto';

beforeAll(async () => {
  jest.setTimeout(10000);
});
afterAll(async () => {
  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 500);
  });
});

describe('Testing Users', () => {
  describe('[GET] /users', () => {
    it('response findAll Users', async () => {
      const usersRoute = new UsersRoute();
      const { users } = usersRoute.usersController.userService;

      users.find = jest.fn().mockReturnValue([
        {
          _id: 'qpwoeiruty',
          email: 'a@email.com',
          password: await bcrypt.hash('q1w2e3r4!', 10),
        },
        {
          _id: 'alskdjfhg',
          email: 'b@email.com',
          password: await bcrypt.hash('a1s2d3f4!', 10),
        },
        {
          _id: 'zmxncbv',
          email: 'c@email.com',
          password: await bcrypt.hash('z1x2c3v4!', 10),
        },
      ]);

      mongoose.connect = jest.fn();
      const app = new App([usersRoute]);

      return request(app.getServer()).get(`${usersRoute.path}`).expect(200);
    });
  });

  describe('[GET] /users/:id', () => {
    it('response findOne User', async () => {
      const userId = 'qpwoeiruty';

      const usersRoute = new UsersRoute();
      const { users } = usersRoute.usersController.userService;

      users.findOne = jest.fn().mockReturnValue({
        _id: 'qpwoeiruty',
        email: 'a@email.com',
        password: await bcrypt.hash('q1w2e3r4!', 10),
      });

      mongoose.connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer())
        .get(`${usersRoute.path}/${userId}`)
        .expect(200);
    });
  });

  describe('[POST] /users', () => {
    it('response Create User', async () => {
      const userData: CreateUserDto = {
        appraisals: ['test1', 'test2'],
        mobileNo: '100000',
        email: 'test@email.com',
        password: 'q1w2e3r4',
        name: 'test',
        employeeId: '0123456789',
        employmentStatus: 'full_time',
        role: 'employee',
        jobTitle: 'testing example',
        dept: 'office of testing',
      };

      const usersRoute = new UsersRoute();
      const { users } = usersRoute.usersController.userService;

      users.findOne = jest.fn().mockReturnValue(null);
      users.create = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
        ...userData,
      });

      mongoose.connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer())
        .post(`${usersRoute.path}`)
        .send(userData)
        .expect(201);
    });
  });

  describe('[PUT] /users/:id', () => {
    it('response Update User', async () => {
      const userId = '60706478aad6c9ad19a31c84';
      const userData: UpdateUserDto = {
        appraisals: ['test1', 'test2'],
        mobileNo: '100000',
        email: 'test@email.com',
        name: 'test',
        employeeId: '0123456789',
        employmentStatus: 'full_time',
        role: 'employee',
        jobTitle: 'testing example',
        dept: 'office of testing',
      };

      const usersRoute = new UsersRoute();
      const { users } = usersRoute.usersController.userService;

      if (userData.email) {
        users.findOne = jest.fn().mockReturnValue({
          _id: userId,
          email: userData.email,
          ...userData,
        });
      }

      users.findByIdAndUpdate = jest.fn().mockReturnValue({
        _id: userId,
        email: userData.email,
        ...userData,
      });

      mongoose.connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer())
        .put(`${usersRoute.path}/${userId}`)
        .send(userData)
        .expect(200);
    });
  });

  describe('[DELETE] /users/:id', () => {
    it('response Delete User', async () => {
      const userId = '60706478aad6c9ad19a31c84';

      const usersRoute = new UsersRoute();
      const { users } = usersRoute.usersController.userService;

      users.findByIdAndDelete = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        email: 'test@email.com',
        password: await bcrypt.hash('q1w2e3r4!', 10),
      });

      mongoose.connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer())
        .delete(`${usersRoute.path}/${userId}`)
        .expect(200);
    });
  });
});
