import EmailService from '../services/email.service';

class ConfirmationTemplate {
  emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  async sendConfirmationEmail(
    recipientName: string,
    recipientEmail: string,
    date: string,
  ): Promise<string> {
    const subject = 'Appraisal Confirmation';
    const body = `
      <p>Dear ${recipientName},</p>
      <p>We are pleased to confirm that your appraisal was successfully completed on ${date}.</p>
      <p>Thank you for your participation.</p>
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
      throw new Error(`Failed to send confirmation email: ${error.message}`);
    }
  }
}

export default ConfirmationTemplate;
