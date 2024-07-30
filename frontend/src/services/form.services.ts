import { message } from "antd";
import { AxiosInstance } from "axios";

import FormObj, {
  FormResponse,
  FormType,
  FormsResponse,
  defaultForm
} from "@/types/form.type";
import SectionObj from "@/types/section.type";
import { fetchSection } from "./section.services";

/**
 * Converts a form type into a form object.
 *
 * @param client The axios client to retrieve data from.
 * @param formType The form type retrieved from backend.
 *
 * @returns The form object on frontend.
 */
export function formTypeToObj(client: AxiosInstance, formType: FormType) {
  const sections: SectionObj[] = [];
  formType.sections.forEach(async sectionId => {
    const section: SectionObj = await fetchSection(client, sectionId);
    sections.push(section);
  });

  const formObj: FormObj = {
    ...formType,
    sections: sections,
  };
  return formObj;
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
    const responses = await client.get<FormResponse>(`/form/${id}`);
    return responses.data.data;
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
    return responses.data.data;
  }
  catch (err) {
    message.error('Something went wrong. Please try again later.');
    console.error(`Error while retrieving forms: ${err}`);
    return [];
  }
};
