import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },

  appraisals: {
    type: [String],
    required: true,
  },

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

  hashedPassword: {
    type: String,
    required: true,
  },
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
