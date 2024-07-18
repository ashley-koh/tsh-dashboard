import mongoose, { Schema } from 'mongoose';
import { Form } from '@/interfaces/form.interface';

const formSchema: Schema = new Schema({
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
  ],
});

const formModel = mongoose.model<Form>('Form', formSchema);
export default formModel;
