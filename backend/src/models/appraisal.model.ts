import mongoose, { model, Schema } from 'mongoose';
import { Appraisal } from '@interfaces/appraisal.interface';

const appraisalSchema: Schema = new Schema({
  manageeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    required: true,
  },

  status: {
    type: String,
    required: true,
  },

  answers: {
    type: JSON,
    required: true,
  },

  reviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    required: true,
  },

  deadline: {
    type: Date,
    required: true,
  },
});

const appraisalModel = model<Appraisal>('Appraisal', appraisalSchema);

export default appraisalModel;
