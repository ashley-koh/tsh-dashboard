import BaseResponse from "./response.type";
import QuestionObj, {
  ExtendQuestionObj,
  QuestionType,
  defaultQuestion
} from "./question.type";

type BaseAnswerType = {
  _id?: string;
  type: QuestionType;
  openEndedAnswer?: string;
  rating?: number;
};

export type AnswerType = BaseAnswerType & {
  answerId: string;
};

type AnswerObj = BaseAnswerType & {
  question: QuestionObj;
};

/** Backend response object */
export type ExtendAnswerType = BaseAnswerType & {
  __v: number;
  answerId: ExtendQuestionObj;
};

export type AnswerResponse = BaseResponse & {
  data: ExtendAnswerType;
};

export type AnswersResponse = BaseResponse & {
  data: ExtendAnswerType[];
};

export const defaultAnswer: AnswerObj = {
  question: defaultQuestion,
  type: QuestionType.OPEN_ENDED,
  openEndedAnswer: '',
};

export default AnswerObj;
