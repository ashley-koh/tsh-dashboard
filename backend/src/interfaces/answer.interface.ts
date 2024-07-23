import { Types } from 'mongoose';

export interface Answer {
  _id: Types.ObjectId;
  question: Types.ObjectId[];
  type: number;
  openEndedAnswer: string;
  rating: number;
}
