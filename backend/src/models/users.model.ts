import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema({
  name: {
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

  employeeID: {
    type: String,
    required: true,
    unique: true,
  },

  role: {
    type: String,
    required: true,
  },

  jobTitle: {
    type: String,
    required: true,
  },

  dept: {
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
