import { Types } from 'mongoose';

export interface Answer {
  _id: Types.ObjectId;
  answerId: string;
  type: number;
  openEndedAnswer: string;
  rating: number;
}
