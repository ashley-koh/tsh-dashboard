interface IAppraisalForm {
  formTitle: string;
  sections: {
    sectionTitle: string;
    sectionDescription: string;
    questions: {
      _id?: string;
      question: string;
      type: boolean;
      required: boolean;
    }[];
  }[];
};

export default IAppraisalForm;
