import mongoose, { Schema } from 'mongoose';
import { Answer } from '@/interfaces/answer.interface';

const answerSchema: Schema = new Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },

  type: {
    type: Number,
    required: true,
  },

  openEndedAnswer: {
    type: String,
    validate: {
      validator(this: Answer, v: string) {
        return this.type !== 0 || !!v;
      },
    },
  },
  rating: {
    type: Number,
    validate: {
      validator(this: Answer, v: number) {
        return this.type !== 1 || !!v;
      },
    },
  },
});

const answerModel = mongoose.model<Answer>('Answer', answerSchema);
export default answerModel;
