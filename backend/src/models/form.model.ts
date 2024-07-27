import mongoose, { Schema } from 'mongoose';
import { Form } from '@/interfaces/form.interface';

const formSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },

  sections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FormSection',
      required: true,
    },
  ],
});

const formModel = mongoose.model<Form>('Form', formSchema);
export default formModel;
