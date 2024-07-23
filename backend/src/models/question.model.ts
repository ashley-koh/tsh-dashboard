import mongoose, { Schema, Types } from 'mongoose';
import { Question } from '@/interfaces/question.interface';

const questionSchema: Schema = new Schema({
  _id: {
    type: Types.ObjectId,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  type: {
    type: Number,
    required: true,
  },

  required: {
    type: Boolean,
    required: true,
  },
});

const questionModel = mongoose.model<Question>('Question', questionSchema);
export default questionModel;
