enum QuestionType {
  OPEN_ENDED = 0,
  RATING = 1,
}

type Question = {
  _id?: string,
  description: string,
  type: number,
  required: boolean,
};

export default Question;
export { QuestionType };