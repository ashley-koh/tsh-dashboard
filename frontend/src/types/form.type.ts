import BaseResponse from "./response.type";
import SectionObj, { ExtendSectionObj } from "./section.type";

type BaseForm = {
  _id?: string;
  name: string;
};

export type FormType = BaseForm & {
  sections: string[];
};

type FormObj = BaseForm & {
  sections: SectionObj[];
};

/** Backend response object */
export type ExtendFormObj = BaseForm & {
  __v: number;
  sections: ExtendSectionObj[];
};

export type FormResponse = BaseResponse & {
  data: ExtendFormObj;
};

export type FormsResponse = BaseResponse & {
  data: ExtendFormObj[];
};

export const defaultForm: FormObj = {
  name: '',
  sections: [],
};

export default FormObj;
