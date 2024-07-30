import BaseResponse from "./response.type";
import QuestionObj, { ExtendQuestionObj } from "./question.type";

type BaseSection = {
  _id?: string;
  title: string;
  description?: string;
};

/** Section type retrieved from backend. */
export type SectionType = BaseSection & {
  questions: string[];
};

/** Section object used on frontend. */
type SectionObj = BaseSection & {
  questions: QuestionObj[];
};

/** Backend response object */
export type ExtendSectionObj = BaseSection & {
  __v: number;
  questions: ExtendQuestionObj[];
};

export type SectionResponse = BaseResponse & {
  data: ExtendSectionObj;
};

export type SectionsResponse = BaseResponse & {
  data: ExtendSectionObj[];
};

export const defaultSection: SectionObj = {
  title: '',
  questions: [],
};

export default SectionObj;
