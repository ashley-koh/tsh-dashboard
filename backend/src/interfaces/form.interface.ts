import { Types } from 'mongoose';

export interface Form {
  _id: Types.ObjectId;
  name: string;
  sections: string[];
}
