import BaseResponse from "./response.type";
import QuestionObj, {
  QuestionType,
  defaultQuestion
} from "./question.type";

export type AnswerType = {
  _id?: string;
  answerId: string;
  type: QuestionType;
  openEndedAnswer?: string;
  rating?: number;
};

type AnswerObj = {
  _id?: string;
  question: QuestionObj;
  type: QuestionType;
  openEndedAnswer?: string;
  rating?: number;
};

export type AnswerResponse = BaseResponse & {
  data: AnswerObj;
};

export type AnswersResponse = BaseResponse & {
  data: AnswerObj[];
};

export const defaultAnswer: AnswerObj = {
  question: defaultQuestion,
  type: QuestionType.OPEN_ENDED,
  openEndedAnswer: '',
};

export default AnswerObj;
