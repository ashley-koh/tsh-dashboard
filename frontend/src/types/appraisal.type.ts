import dayjs from "dayjs";

import AnswerObj from "./answer.type";
import FormObj, { defaultForm } from "./form.type";
import User, { defaultUser } from "./user.type";

export enum AppraisalStatus {
  REVIEW = "in review",
  POST = "post review",
  COMPLETE = "completed",
};

export type AppraisalType = {
  _id?: string;
  manageeId: string;
  managerId: string;
  formId: string;
  status: AppraisalStatus;
  deadline: Date;
  answers: string[];
  comments: string;
};

type AppraisalObj = {
  _id?: string;
  managee: User;
  manager: User;
  form: FormObj;
  status: AppraisalStatus;
  deadline: Date;
  answers: AnswerObj[];
  comments: string;
};

export const defaultAppraisal: AppraisalObj = {
  managee: defaultUser,
  manager: defaultUser,
  form: defaultForm,
  status: AppraisalStatus.REVIEW,
  deadline: dayjs().toDate(),
  answers: [],
  comments: '',
};

export default AppraisalObj;
