import { Types } from 'mongoose';

export interface AppraisalForm {
  user: Types.ObjectId;
  headOfDept: Types.ObjectId;
  dateCreated: Date;
  reviewPeriod: string;
}
