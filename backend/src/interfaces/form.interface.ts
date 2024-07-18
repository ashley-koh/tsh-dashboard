import { Types } from 'mongoose';

export interface Form {
  questions: Types.ObjectId[]; // Array of ObjectIds referencing Question documents
}
