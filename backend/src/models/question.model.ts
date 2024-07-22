import mongoose, { Schema } from 'mongoose';
import { Question } from '@/interfaces/question.interface';

const questionSchema: Schema = new Schema({
  type: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
});

const questionModel = mongoose.model<Question>('Question', questionSchema);
export default questionModel;
