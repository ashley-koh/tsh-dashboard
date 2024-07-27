import { Types } from 'mongoose';

export interface FormSection {
  _id: Types.ObjectId;
  title: string;
  description: string;
  questions: string[];
}
