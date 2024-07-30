export type FormQuestion = {
  _id?: string;
  question: string;
  type: boolean;
  required: boolean;
};

export type FormSection = {
  _id?: string;
  sectionTitle: string;
  sectionDescription: string;
  questions: FormQuestion[];
};

type IAppraisalForm = {
  _id?: string;
  formTitle: string;
  sections: FormSection[];
};

export default IAppraisalForm;
