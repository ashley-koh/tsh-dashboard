import EmailService from '../services/email.service';

// Define the function to create a reminder email
class ReminderTemplate {
  emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  async sendAppraisalReminder(
    employeeName: string,
    appraisalDate: string,
    employeeEmail: string,
  ): Promise<string> {
    const subject = 'Upcoming Appraisal Reminder';
    const body = `
      <p>Dear ${employeeName},</p>
      <p>This is a reminder that your appraisal is scheduled for ${appraisalDate}.</p>
      <p>Please ensure that you are prepared for the meeting.</p>
      <p>Best regards,<br>Your Company</p>
    `;

    try {
      const result = await this.emailService.sendEmail(
        [employeeEmail],
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
