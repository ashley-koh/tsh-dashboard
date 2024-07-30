import BaseResponse from "./response.type";

export enum QuestionType {
  OPEN_ENDED = 0,
  RATING = 1,
};

type QuestionObj = {
  _id?: string;
  description: string;
  type: QuestionType;
  required: boolean;
};

/** Backend response object */
export type ExtendQuestionObj = QuestionObj & {
  __v: number;
};

export type QuestionResponse = BaseResponse & {
  data: ExtendQuestionObj;
};

export type QuestionsResponse = BaseResponse & {
  data: ExtendQuestionObj[];
};

export const defaultQuestion: QuestionObj = {
  description: '',
  type: QuestionType.OPEN_ENDED,
  required: false,
};

export default QuestionObj;
