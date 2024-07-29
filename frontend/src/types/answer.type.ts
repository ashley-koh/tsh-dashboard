import QuestionObj, { defaultQuestion, QuestionType } from "./question.type";

export type AnswerType = {
  _id?: string;
  answerId: string;
  type: QuestionType;
  openEndedAnswer: string;
  rating: number;
};

type AnswerObj = {
  _id?: string;
  question: QuestionObj;
  type: QuestionType;
  openEndedAnswer: string;
  rating: number;
};

export const defaultAnswer: AnswerObj = {
  question: defaultQuestion,
  type: QuestionType.OPEN_ENDED,
  openEndedAnswer: '',
  rating: 0,
};

export default AnswerObj;
