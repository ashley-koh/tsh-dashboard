import { Types } from 'mongoose';

export interface Appraisal {
  _id: Types.ObjectId;
  manageeId: Types.ObjectId;
  managerId: Types.ObjectId;
  formId: Types.ObjectId;
  status: string;
  answers: JSON;
  reviewId: Types.ObjectId;
  deadline: Date;
}

// {
//   "email" : "manager@gmail.com",
//   "password": "managerPassword1!",
//   "firstName" : "manager",
//   "lastName" : "tan",
//   "employeeId" : "managerId",
//   "role" : "head_of_department",
//   "jobTitle": "jobTitle",
//   "dept" : "hr",
//   "employmentStatus" : "full_time"
// }

// {
//   "manageeId" : "testForm",
//   "managerId": "a form to test functionality",
//   "formId" : "",
//   "status" : "",
//   "answers" : "["669dcb431473cb644544c69f", "669dcd85ca2ddc5400da8f0f"]",
//   "reviewId": "66961d6702a54f71cfaa5bd7",
//   "deadlline": ""
// }
