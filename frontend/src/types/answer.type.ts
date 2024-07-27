import QuestionObj, { defaultQuestion } from "./question.type";

export type AnswerType = {
  _id?: string;
  answerId: string;
  type: number;
  openEndedAnswer: string;
  rating: number;
};

type AnswerObj = {
  _id?: string;
  question: QuestionObj;
};

export const defaultAnswer: AnswerObj = {
  question: defaultQuestion,
};

export default AnswerObj;
