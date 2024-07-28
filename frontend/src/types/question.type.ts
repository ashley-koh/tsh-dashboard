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

export const defaultQuestion: QuestionObj = {
  description: '',
  type: QuestionType.OPEN_ENDED,
  required: false,
};

export default QuestionObj;
