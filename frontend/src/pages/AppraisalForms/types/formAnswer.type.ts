import { QuestionType } from "@/types/question.type";

export type FormAnswer = {
  _id?: string;
  questionId: string;
  type: QuestionType;
  openEndedAnswer?: string;
  ranking?: number;
};

export type ISectionAnswer = {
  title: string;
  questions: FormAnswer[];
};

type IAppraisalAnswer = {
  sections: ISectionAnswer[],
};

export default IAppraisalAnswer;
