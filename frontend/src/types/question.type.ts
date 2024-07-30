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

export type QuestionResponse = BaseResponse & {
  data: QuestionObj;
};

export type QuestionsResponse = BaseResponse & {
  data: QuestionObj[];
};

export const defaultQuestion: QuestionObj = {
  description: '',
  type: QuestionType.OPEN_ENDED,
  required: false,
};

export default QuestionObj;
