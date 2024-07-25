import { Types } from 'mongoose';

export interface Appraisal {
  _id: Types.ObjectId;
  manageeId: string;
  managerId: string;
  formId: Types.ObjectId;
  status: string;
  reviewId: Types.ObjectId;
  deadline: Date;
}
