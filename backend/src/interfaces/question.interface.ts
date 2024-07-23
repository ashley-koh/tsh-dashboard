import { Types } from 'mongoose';

export interface Question {
  _id: Types.ObjectId;
  description: string;
  type: number;
  required: boolean;
}
