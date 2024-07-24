import { SES_ACCESS_KEY, SES_REGION, SES_SECRET_KEY } from '../config/index';

// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
const AWS = require('aws-sdk');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: './.env.development.local' });

class EmailService {
  SES_CONFIG = {
    accessKeyId: SES_ACCESS_KEY, // ACCESS_KEY from .env.development
    secretAccessKey: SES_SECRET_KEY, // SECRET_KEY from .env.development
    region: SES_REGION, // SES_REGION from .env.development
  };

  ses = new AWS.SES(this.SES_CONFIG);

  sendEmail = async (
    recipients: string[],
    subject: string,
    body: string,
  ): Promise<string> => {
    const params = {
      Source: process.env.SES_SENDER,
      Destination: {
        ToAddresses: [recipients],
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: body,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
    };

    try {
      const data = await this.ses.sendEmail(params).promise();
      const info = `Email sent successfully with MessageId: ${data.MessageId} to ${recipients}`;
      return info;
    } catch (err) {
      const errorInfo = `Error sending email: ${err.message}`;
      throw new Error(errorInfo);
    }
  };
}

export default EmailService;
