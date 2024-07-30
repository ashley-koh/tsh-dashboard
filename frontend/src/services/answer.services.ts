import { message } from "antd";
import { AxiosInstance } from "axios";

import AnswerObj, {
  AnswerResponse,
  AnswersResponse,
  AnswerType,
  defaultAnswer
} from "@/types/answer.type";
import QuestionObj from "@/types/question.type";
import { fetchQuestion } from "./question.service";

/**
 * Converts an answer type into an answer object.
 *
 * @param client The axios client to retrieve data from.
 * @param answerType The answer type retrieved from backend.
 *
 * @returns The answer object on frontend.
 */
export async function answerTypeToObj(client: AxiosInstance, answerType: AnswerType) {
  const question: QuestionObj = await fetchQuestion(client, answerType.answerId);
  const answerObj: AnswerObj = {
    ...answerType,
    question: question,
  };
  return answerObj;
};

/**
 * Retrieves a specific answer from backend by its ID.
 *
 * @param client The axios client to retrieve data from.
 * @param id The ID of the answer object to retrieve.
 *
 * @returns Promise of answer object.
 */
export async function fetchAnswer(client: AxiosInstance, id: string) {
  try {
    const responses = await client.get<AnswerResponse>(`/answer/${id}`);
    return responses.data.data;
  }
  catch (err) {
    message.error('Something went wrong. Please try again later.');
    console.error(`Error while retrieving answer: ${err}`);
    return defaultAnswer;
  }
};

/**
 * Retrieve all answers from backend.
 *
 * @param client The axios client to retrieve data from.
 *
 * @returns Promise of list of answers.
 */
export async function fetchAnswers(client: AxiosInstance) {
  try {
    const responses = await client.get<AnswersResponse>('/answer');
    return responses.data.data;
  }
  catch (err) {
    message.error('Something went wrong. Please try again later.');
    console.error(`Error while retrieving answers: ${err}`);
    return [];
  }
};
