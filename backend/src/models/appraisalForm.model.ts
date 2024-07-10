import mongoose, { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const appraisalFormSchema: Schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  headOfDept: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  dateCreated: {
    type: Date,
    required: true,
  },

  reviewPeriod: {
    type: String,
    required: true,
  },
});

const appraisalFormModel = model<User & Document>(
  'AppraisalForm',
  appraisalFormSchema,
);

export default appraisalFormModel;
