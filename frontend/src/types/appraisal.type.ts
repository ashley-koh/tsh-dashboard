import dayjs from "dayjs";

import AnswerObj from "./answer.type";
import BaseResponse from "./response.type";
import FormObj, { defaultForm } from "./form.type";
import User, { defaultUser } from "./user.type";

export enum AppraisalStatus {
  REVIEW = "in review",
  POST = "post review",
  COMPLETE = "completed",
};

type BaseAppraisal = {
  _id?: string;
  status: AppraisalStatus;
  deadline: Date;
  comments: string;
  rating?: number;
};

export type AppraisalType = BaseAppraisal & {
  manageeId: string;
  managerId: string;
  formId: string;
  answers: string[];
};

type AppraisalObj = BaseAppraisal & {
  managee: User;
  manager: User;
  form: FormObj;
  answers: AnswerObj[];
};

/** Backend response object */
export type ExtendAppraisalType = AppraisalType & {
  __v: number;
};

export type AppraisalResponse = BaseResponse & {
  data: ExtendAppraisalType;
};

export type AppraisalsResponse = BaseResponse & {
  data: ExtendAppraisalType[];
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
