import { Types } from 'mongoose';

export interface Appraisal {
  _id: Types.ObjectId;
  manageeId: string;
  managerId: string;
  formId: string;
  status: string;
  reviewId: string;
  deadline: Date;
}
