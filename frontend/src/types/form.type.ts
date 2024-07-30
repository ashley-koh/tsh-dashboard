import BaseResponse from "./response.type";
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

export type FormResponse = BaseResponse & {
  data: FormObj;
};

export type FormsResponse = BaseResponse & {
  data: FormObj[];
};

export const defaultForm: FormObj = {
  name: '',
  sections: [],
};

export default FormObj;
