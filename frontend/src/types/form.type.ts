import Question from "./question.type";

type FormType = {
  _id?: string,
  name: string,
  sections: {
    title: string,
    description: string,
    questions: Question[],
  }[],
};

export default FormType;