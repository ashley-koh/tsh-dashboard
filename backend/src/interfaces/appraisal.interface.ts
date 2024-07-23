import { Types } from 'mongoose';

export interface Appraisal {
  _id: Types.ObjectId;
  manageeId: Types.ObjectId;
  managerId: Types.ObjectId;
  formId: Types.ObjectId;
  status: string;
  answers: JSON;
  reviewId: Types.ObjectId;
  deadline: Date;
}
