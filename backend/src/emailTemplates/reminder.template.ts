import EmailService from '../services/email.service';

// Define the function to create a reminder email
class ReminderTemplate {
  emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  async sendAppraisalReminder(
    recipientName: string,
    recipientEmail: string,
    date: string,
  ): Promise<string> {
    const subject = 'Upcoming Appraisal Reminder';
    const body = `
      <p>Dear ${recipientName},</p>
      <p>This is a reminder that your appraisal is scheduled for ${date}.</p>
      <p>Please ensure that you are prepared for the meeting.</p>
      <p>Best regards,<br>Your Company</p>
    `;

    try {
      const result = await this.emailService.sendEmail(
        recipientEmail,
        subject,
        body,
      );
      return result;
    } catch (error) {
      throw new Error(`Failed to send reminder email: ${error.message}`);
    }
  }
}

export default ReminderTemplate;
