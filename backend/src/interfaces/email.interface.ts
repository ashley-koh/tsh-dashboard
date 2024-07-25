import { Types } from 'mongoose';

export interface Email {
  _id: Types.ObjectId;
  type: string;
  senderName: string;
  senderEmail: string;
  recipientName: string;
  recipientEmail: string;
  subject: string;
  body: string;
  deadline: string;
}
