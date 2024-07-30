import { message } from "antd";
import { AxiosInstance } from "axios";

import {
  QuestionResponse,
  QuestionsResponse,
  defaultQuestion
} from "@/types/question.type";

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
    const responses = await client.get<QuestionResponse>(`/questions/${id}`);
    return responses.data.data;
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
    const responses = await client.get<QuestionsResponse>('/questions');
    return responses.data.data;
  }
  catch (err) {
    message.error('Something went wrong. Please try again later.');
    console.error(`Error while retrieving questions: ${err}`);
    return [];
  }
};
