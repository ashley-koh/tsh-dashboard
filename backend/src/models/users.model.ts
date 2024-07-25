import mongoose, { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema({
  appraisals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appraisal',
      required: true,
    },
  ],

  name: {
    type: String,
    required: true,
  },

  dept: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
  },

  mobileNo: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  employeeId: {
    type: String,
    required: true,
    unique: true,
  },

  jobTitle: {
    type: String,
    required: true,
  },

  employmentStatus: {
    type: String,
    required: true,
  },
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
