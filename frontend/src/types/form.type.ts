import SectionObj from "./section.type";

export type FormType = {
  _id?: string;
  name: string;
  sections: string[];
};

type FormObj = {
  _id?: string;
  name: string;
  sections: SectionObj[];
};

export const defaultForm: FormObj = {
  name: '',
  sections: [],
};

export default FormObj;
