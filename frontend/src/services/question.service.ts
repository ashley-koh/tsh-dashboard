import { message } from "antd";
import { AxiosInstance } from "axios";

import QuestionObj, {
  ExtendQuestionObj,
  QuestionResponse,
  QuestionsResponse,
  defaultQuestion
} from "@/types/question.type";

export const QUESTION_ROUTE = '/questions/';

export function cleanQuestion(extendQuestion: ExtendQuestionObj) {
  const { __v, ...rest } = extendQuestion;
  const question: QuestionObj = rest;
  return question;
};

/**
 * Retrieves a specific question from backend by its ID.
 *
 * @param client The axios client to retrieve data from.
 * @param id The ID of the question object to retrieve.
 *
 * @returns Promise of question object.
 */
export async function fetchQuestion(client: AxiosInstance, id: string) {
  try {
    const response = await client.get<QuestionResponse>(`${QUESTION_ROUTE}${id}`);
    return cleanQuestion(response.data.data);
  }
  catch (err) {
    message.error('Something went wrong. Please try again later.');
    console.error(err);
    return defaultQuestion;
  }
};

/**
 * Retrieve all questions from backend.
 *
 * @param client The axios client to retrieve data from.
 *
 * @returns Promise of list of questions.
 */
export async function fetchQuestions(client: AxiosInstance) {
  try {
    const responses = await client.get<QuestionsResponse>(QUESTION_ROUTE);
    return responses.data.data.map(cleanQuestion);
  }
  catch (err) {
    message.error('Something went wrong. Please try again later.');
    console.error(`Error while retrieving questions: ${err}`);
    return [];
  }
};
