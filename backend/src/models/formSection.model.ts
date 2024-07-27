import mongoose, { Schema } from 'mongoose';
import { FormSection } from '@/interfaces/formSection.interface';

const sectionSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: false,
  },

  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
  ],
});

const formSectionModel = mongoose.model<FormSection>(
  'FormSection',
  sectionSchema,
);
export default formSectionModel;
