import { it, fc } from '@fast-check/jest';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import { CreateUserDto } from '@dtos/users';
import AuthRoute from '@routes/auth.route';
import App from '@app';
import { AuthLoginDto } from '@dtos/auth';
import { User } from '@/interfaces/users.interface';
import {
  getSession,
  setSession,
  neverFailingPredicateIfFuzzing,
} from '../../jest.setup';

beforeAll(async () => {
  jest.setTimeout(10000);
});
afterAll(async () => {
  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 500);
  });
});

const UserRecord: fc.Arbitrary<CreateUserDto> = fc.record({
  appraisals: fc.array(fc.uuid()),
  mobileNo: fc
    .integer({ min: 80_000_000, max: 90_000_000 })
    .map((n) => String(n)),
  email: fc.emailAddress(),
  password: fc.base64String({ minLength: 8 }),
  name: fc.string(),
  employeeId: fc.base64String(),
  employmentStatus: fc.constantFrom('full_time', 'part_time', 'intern', 'temp'),
  role: fc.constantFrom('employee', 'head_of_department', 'business_owner'),
  jobTitle: fc.string(),
  dept: fc.string(),
});

describe('Testing Auth', () => {
  describe('[POST] /signup', () => {
    it.prop({ userData: UserRecord })(
      'response should have the Create userData',
      neverFailingPredicateIfFuzzing(async ({ userData }) => {
        const authRoute = new AuthRoute();
        const { users } = authRoute.authController.authService;

        users.findOne = jest.fn().mockReturnValue(null);
        users.create = jest.fn().mockReturnValue({
          _id: '60706478aad6c9ad19a31c84',
          password: await bcrypt.hash(userData.password, 10),
          ...userData,
        });

        mongoose.connect = jest.fn();
        const app = new App([authRoute]);
        return (
          request(app.getServer())
            .post(`${authRoute.path}signup`)
            .send(userData)
            // .then((res) => console.log(res.status));
            .expect(201)
        );
      }),
    );
  });

  describe('[POST] /login', () => {
    it('response should have the Set-Cookie header with the Authorization token', async () => {
      const userData: AuthLoginDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4!',
      };

      const authRoute = new AuthRoute();
      const { users } = authRoute.authController.authService;

      users.findOne = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });

      mongoose.connect = jest.fn();
      const app = new App([authRoute]);
      return request(app.getServer())
        .post(`${authRoute.path}login`)
        .send(userData)
        .expect('Set-Cookie', /^Authorization=.+/)
        .then((res) => setSession(res.header.Authorization));
    });
  });

  describe('[POST] /logout', () => {
    it('logout Set-Cookie Authorization=; Max-age=0', async () => {
      const userData: User = {
        appraisals: [],
        name: 'test',
        dept: 'hr',
        role: 'business_owner',
        employeeId: '1234567890',
        jobTitle: 'admin',
        employmentStatus: 'full_time',
        mobileNo: '98765432',
        _id: '60706478aad6c9ad19a31c84',
        email: 'test@email.com',
        password: await bcrypt.hash('q1w2e3r4!', 10),
      };

      const authRoute = new AuthRoute();
      const { users } = authRoute.authController.authService;

      users.findOne = jest.fn().mockReturnValue(userData);

      mongoose.connect = jest.fn();
      const app = new App([authRoute]);

      request(app.getServer())
        .post(`${authRoute.path}logout`)
        .send(userData)
        .set('Authorization', getSession())
        // .set(
        //   'Set-Cookie',
        //   'Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ; Max-age=60',
        // )
        // .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ', { "type": "bearer"})
        .expect('Set-Cookie', /^Authorization=; Max-age=0/)
        .expect(200);
    });
  });
});
