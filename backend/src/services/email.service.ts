import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'; // ES Modules import
import {
  SES_ACCESS_KEY,
  SES_REGION,
  SES_SECRET_KEY,
  SES_SENDER,
} from '../config/index';

class EmailService {
  SES_CONFIG = {
    credentials: {
      accessKeyId: SES_ACCESS_KEY, // ACCESS_KEY from .env.development
      secretAccessKey: SES_SECRET_KEY, // SECRET_KEY from .env.development
    },
    region: SES_REGION, // SES_REGION from .env.development
  };

  client = new SESClient(this.SES_CONFIG);

  sendEmail = async (
    recipientEmail: string,
    subject: string,
    body: string,
  ): Promise<string> => {
    const input = {
      // SendEmailRequest
      Source: SES_SENDER, // required
      Destination: {
        // Destination
        ToAddresses: [
          // AddressList
          SES_SENDER,
        ],
        // CcAddresses: ['STRING_VALUE'],
        // BccAddresses: ['STRING_VALUE'],
      },
      Message: {
        // Message
        Subject: {
          // Content
          Data: subject, // required
          Charset: 'UTF-8',
        },
        Body: {
          // Body
          Text: {
            Data: body, // required
            Charset: 'UTF-8',
          },
          Html: {
            Data: body, // required
            Charset: 'UTF-8',
          },
        },
      },
    };

    try {
      const command = new SendEmailCommand(input);
      const response = await this.client.send(command);
      const info = `Email sent successfully with MessageId: ${response.MessageId} to ${recipientEmail}`;
      return info;
    } catch (err) {
      const errorInfo = `Error sending email: ${err.message}`;
      throw new Error(errorInfo);
    }
  };
}

export default EmailService;
