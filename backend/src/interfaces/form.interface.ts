import { Types } from 'mongoose';

export interface Form {
  _id: Types.ObjectId;
  questions: Types.ObjectId[]; // Array of ObjectIds referencing Question documents
}
