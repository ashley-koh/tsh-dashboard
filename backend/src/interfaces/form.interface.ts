import { Types } from 'mongoose';

export interface Form {
  _id: Types.ObjectId;
  name: string;
  description: string; // optional
  section: {
    title: string;
    questions: string[];
  };
}
