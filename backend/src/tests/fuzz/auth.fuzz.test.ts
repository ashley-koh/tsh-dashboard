import { it, fc } from '@fast-check/jest';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import { CreateUserDto } from '@dtos/users';
import AuthRoute from '@routes/auth.route';
import App from '@app';
import { neverFailingPredicateIfFuzzing } from '../../../jest.setup';

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
  // rating: fc.nat({ max: 100 }),
});

describe('Testing Auth fuzz', () => {
  describe('[POST] /signup', () => {
    it.prop({ userData: UserRecord }, { verbose: 2 })(
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
            // .then((res) => console.log(res.status, res.body));
            .expect(201)
        );
      }),
    );
  });
});
