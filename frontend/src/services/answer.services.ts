import { message } from "antd";
import { AxiosInstance } from "axios";

import AnswerObj, {
  AnswerResponse,
  AnswersResponse,
  defaultAnswer,
  ExtendAnswerType
} from "@/types/answer.type";
import { cleanQuestion } from "./question.service";

export function cleanAnswer(extendAnswer: ExtendAnswerType) {
  const { __v, answerId, ...rest } = extendAnswer;
  const answer: AnswerObj = {
    ...rest,
    question: cleanQuestion(answerId),
  };
  return answer;
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
    const response = await client.get<AnswerResponse>(`/answer/${id}`);
    return cleanAnswer(response.data.data);
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
    return responses.data.data.map(cleanAnswer);
  }
  catch (err) {
    message.error('Something went wrong. Please try again later.');
    console.error(`Error while retrieving answers: ${err}`);
    return [];
  }
};
