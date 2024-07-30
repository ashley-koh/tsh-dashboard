import BaseResponse from "./response.type";
import QuestionObj from "./question.type";

/** Section type retrieved from backend. */
export type SectionType = {
  _id?: string;
  title: string;
  description?: string;
  questions: string[];
};

/** Section object used on frontend. */
type SectionObj = {
  _id?: string;
  title: string;
  description?: string;
  questions: QuestionObj[];
};

export type SectionResponse = BaseResponse & {
  data: SectionObj;
};

export type SectionsResponse = BaseResponse & {
  data: SectionObj[];
};

export const defaultSection: SectionObj = {
  title: '',
  questions: [],
};

export default SectionObj;
