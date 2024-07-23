import { NextFunction, Request, Response } from 'express';
import { CreateEmailDto } from '@dtos/email.dto';
// import { Email } from '@interfaces/email.interface';
import EmailService from '@services/email.service';

class EmailController {
  public emailService = new EmailService();

  public sendEmail = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const emailData: CreateEmailDto = req.body;
      const { recipients, subject, body } = emailData;
      const sendEmailData: string = await this.emailService.sendEmail(
        recipients,
        subject,
        body,
      );

      res.status(201).json({ data: sendEmailData, message: 'email sent' });
    } catch (error) {
      next(error);
    }
  };
}

export default EmailController;
