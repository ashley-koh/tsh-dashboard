import QuestionObj from "./question.type";

/** Section type retrieved from backend. */
export type SectionType = {
  _id?: string;
  title: string;
  description: string;
  questions: string[];
};

/** Section object used on frontend. */
type SectionObj = {
  _id?: string;
  title: string;
  description: string;
  questions: QuestionObj[];
};

export const defaultSection: SectionObj = {
  title: '',
  description: '',
  questions: [],
};

export default SectionObj;
