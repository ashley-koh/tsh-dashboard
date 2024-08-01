import { message } from "antd";
import { AxiosInstance } from "axios";

import SectionObj, {
  ExtendSectionObj,
  SectionResponse,
  SectionType,
  SectionsResponse,
  defaultSection
} from "@/types/section.type";
import { cleanQuestion } from "./question.service";

export const SECTION_ROUTE = '/formSections/';

export function cleanSection(extendSection: ExtendSectionObj) {
  const { __v, questions, ...rest } = extendSection;
  const section: SectionObj = {
    ...rest,
    questions: questions.map(cleanQuestion),
  };
  return section;
};

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
    const response = await client.get<SectionResponse>(
      `${SECTION_ROUTE}${id}`,
      { withCredentials: true },
    );
    return cleanSection(response.data.data);
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
    const responses = await client.get<SectionsResponse>(
      SECTION_ROUTE,
      { withCredentials: true },
    );
    return responses.data.data.map(cleanSection);
  }
  catch (err) {
    message.error('Something went wrong. Please try again later.');
    console.error(`Error while retrieving sections: ${err}`);
    return [];
  }
};
