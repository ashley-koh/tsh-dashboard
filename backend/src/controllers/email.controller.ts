import { NextFunction, Request, Response } from 'express';
import { CreateEmailDto } from '@dtos/email.dto';
import ReminderTemplate from '../emailTemplates/reminder.template';
import ConfirmationTemplate from '../emailTemplates/confirmation.templates';

class EmailController {
  public reminderTemplate = new ReminderTemplate();

  public confirmationTemplate = new ConfirmationTemplate();

  public sendEmail = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const emailData: CreateEmailDto = req.body;
      const { type, recipientName, recipientEmail, deadline } = emailData;
      if (type === 'reminder') {
        const sendEmailData: string =
          await this.reminderTemplate.sendAppraisalReminder(
            recipientName,
            recipientEmail,
            deadline,
          );
        res.status(201).json({ data: sendEmailData, message: 'email sent' });
      } else {
        const sendEmailData: string =
          await this.confirmationTemplate.sendConfirmationEmail(
            recipientName,
            recipientEmail,
            deadline,
          );
        res.status(201).json({ data: sendEmailData, message: 'email sent' });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default EmailController;
