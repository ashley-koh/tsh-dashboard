import mongoose from 'mongoose';
import request from 'supertest';
import App from '@app';
import EmailsRoute from '@routes/email.route';
import { CreateEmailDto } from '@/dtos/email.dto';

beforeAll(async () => {
  jest.setTimeout(10000);
});
afterAll(async () => {
  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 500);
  });
});

describe('Testing Email', () => {
  describe('[POST] /email', () => {
    it('response sendOne Reminder Email', async () => {
      const emailsRoute = new EmailsRoute();
      const { emailService } = emailsRoute.emailController.reminderTemplate;

      const emailData: CreateEmailDto = {
        type: 'reminder',
        senderName: 'testName',
        senderEmail: 'testEmail@gmail.com',
        recipientName: 'testName1',
        recipientEmail: 'testEmail1@gmail.com',
        subject: 'testSubject',
        body: 'testBody',
        deadline: 'testDeadline',
      };

      emailService.sendEmail = jest
        .fn()
        .mockReturnValue(
          `Email sent successfully to ${emailData.recipientEmail}.`,
        );

      mongoose.connect = jest.fn();
      const app = new App([emailsRoute]);
      return request(app.getServer())
        .post(`${emailsRoute.path}`)
        .send(emailData)
        .expect(201)
        .then((response) => {
          expect(response.body.data).toEqual(
            `Email sent successfully to ${emailData.recipientEmail}.`,
          );
          expect(response.body.message).toBe('sent reminder email');
        });
    });
  });

  describe('[POST] /email', () => {
    it('response sendOne Confirmation Email', async () => {
      const emailsRoute = new EmailsRoute();
      const { emailService } = emailsRoute.emailController.confirmationTemplate;

      const emailData: CreateEmailDto = {
        type: 'confirmation',
        senderName: 'testName',
        senderEmail: 'testEmail@gmail.com',
        recipientName: 'testName1',
        recipientEmail: 'testEmail1@gmail.com',
        subject: 'testSubject',
        body: 'testBody',
        deadline: 'testDeadline',
      };

      emailService.sendEmail = jest
        .fn()
        .mockReturnValue(
          `Email sent successfully to ${emailData.recipientEmail}.`,
        );

      mongoose.connect = jest.fn();
      const app = new App([emailsRoute]);
      return request(app.getServer())
        .post(`${emailsRoute.path}`)
        .send(emailData)
        .expect(201)
        .then((response) => {
          expect(response.body.data).toEqual(
            `Email sent successfully to ${emailData.recipientEmail}.`,
          );
          expect(response.body.message).toBe('sent confirmation email');
        });
    });
  });
});
