import { message } from "antd";
import { AxiosInstance } from "axios";

import QuestionObj from "@/types/question.type";
import SectionObj, {
  SectionResponse,
  SectionType,
  SectionsResponse,
  defaultSection
} from "@/types/section.type";
import { fetchQuestion } from "./question.service";

/**
 * Converts a section type into a section object.
 *
 * @param client The axios client to retrieve data from.
 * @param sectionType The section type retrieved from backend.
 *
 * @returns The section object on frontend.
 */
export function sectionTypeToObj(client: AxiosInstance, sectionType: SectionType) {
  const questions: QuestionObj[] = [];
  sectionType.questions.forEach(async questionId => {
    const question: QuestionObj = await fetchQuestion(client, questionId);
    questions.push(question);
  });

  const sectionObj: SectionObj = {
    ...sectionType,
    questions: questions,
  };
  return sectionObj;
}

/**
 * Converts a section object into a section type.
 *
 * @param sectionObj The section object on frontend.
 *
 * @returns The section type to push to backend.
 */
export function sectionObjToType(sectionObj: SectionObj) {
  const questions: string[] = [];
  sectionObj.questions.forEach(question => {
    if (question._id !== undefined) {
      questions.push(question._id);
    }
  });

  const sectionType: SectionType = {
    ...sectionObj,
    questions: questions,
  };
  return sectionType;
};

/**
 * Retrieves a specific section from backend by its ID.
 *
 * @param client The axios client to retrieve data from.
 * @param id The ID of the section object to retrieve.
 *
 * @returns Promise of section object.
 */
export async function fetchSection(client: AxiosInstance, id: string) {
  try {
    const responses = await client.get<SectionResponse>(`/formSection/${id}`);
    return responses.data.data;
  }
  catch (err) {
    message.error('Something went wrong. Please try again later.');
    console.error(`Error while retrieving section: ${err}`);
    return defaultSection;
  }
};

/**
 * Retrieve all sections from backend.
 *
 * @param client The axios client to retrieve data from.
 *
 * @returns Promise of list of sections.
 */
export async function fetchSections(client: AxiosInstance) {
  try {
    const responses = await client.get<SectionsResponse>('/formSection');
    return responses.data.data;
  }
  catch (err) {
    message.error('Something went wrong. Please try again later.');
    console.error(`Error while retrieving sections: ${err}`);
    return [];
  }
};
