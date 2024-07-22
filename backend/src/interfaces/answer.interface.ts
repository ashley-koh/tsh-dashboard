import { Types } from 'mongoose';

export interface Answer {
  _id: Types.ObjectId;
  questions: Types.ObjectId[];
  type: number;
  openEndedAnswer: string;
  closedAnswer: number;
}
