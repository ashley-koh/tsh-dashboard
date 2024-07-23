import { Types } from 'mongoose';

export interface Email {
  _id: Types.ObjectId;
  type: string;
  sender: string;
  recipients: string[];
  subject: string;
  body: string;
  createdAt: Date;
  status: 'sent' | 'pending' | 'failed';
}
