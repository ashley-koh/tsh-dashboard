import mongoose, { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const appraisalSchema: Schema = new Schema({
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

const appraisalModel = model<User & Document>('Appraisal', appraisalSchema);

export default appraisalModel;
