import { message } from "antd";
import { AxiosInstance } from "axios";

import FormObj, {
  ExtendFormObj,
  FormResponse,
  FormType,
  FormsResponse,
  defaultForm
} from "@/types/form.type";
import { cleanSection } from "./section.services";

export function cleanForm(extendForm: ExtendFormObj) {
  const { __v, sections, ...rest } = extendForm;
  const form: FormObj = {
    ...rest,
    sections: sections.map(cleanSection),
  };
  return form;
};

/**
 * Converts a form object into a form type.
 *
 * @param formObj The form object on frontend.
 *
 * @returns The form type to push to backend.
 */
export function formObjToType(formObj: FormObj) {
  const sections: string[] = [];
  formObj.sections.forEach(section => {
    if (section._id !== undefined) {
      sections.push(section._id);
    }
  });

  const formType: FormType = {
    ...formObj,
    sections: sections,
  };
  return formType;
};

/**
 * Retrieves a specific form from backend by its ID.
 *
 * @param client The axios client to retrieve data from.
 * @param id The ID of the form object to retrieve.
 *
 * @returns Promise of form object.
 */
export async function fetchForm(client: AxiosInstance, id: string) {
  try {
    const response = await client.get<FormResponse>(`/form/${id}`);
    return cleanForm(response.data.data);
  }
  catch (err) {
    message.error('Something went wrong. Please try again later.');
    console.error(`Error while retrieving form: ${err}`);
    return defaultForm;
  }
};

/**
 * Retrieve all forms from backend.
 *
 * @param client The axios client to retrieve data from.
 *
 * @returns Promise of list of forms.
 */
export async function fetchForms(client: AxiosInstance) {
  try {
    const responses = await client.get<FormsResponse>('/form');
    return responses.data.data.map(cleanForm);
  }
  catch (err) {
    message.error('Something went wrong. Please try again later.');
    console.error(`Error while retrieving forms: ${err}`);
    return [];
  }
};
