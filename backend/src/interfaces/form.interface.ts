import { Types } from 'mongoose';

export interface Form {
  _id: Types.ObjectId;
  name: string;
  description: string; // optional
  title: string;
  questions: Types.ObjectId[];
}
