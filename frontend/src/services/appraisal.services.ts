import { message } from "antd";
import { AxiosInstance } from "axios";

import AnswerObj from "@/types/answer.type";
import AppraisalObj, {
  AppraisalResponse,
  AppraisalsResponse,
  AppraisalType,
  defaultAppraisal,
  ExtendAppraisalType
} from "@/types/appraisal.type";
import FormObj from "@/types/form.type";
import User from "@/types/user.type";
import { fetchAnswer } from "./answer.services";
import { fetchForm } from "./form.services";
import { fetchUser } from "./user.services";

export const APPRAISAL_ROUTE = '/appraisals/';

export function cleanAppraisal(extendAppraisal: ExtendAppraisalType) {
  const { __v, ...rest } = extendAppraisal;
  const appraisalType: AppraisalType = rest;
  return appraisalType;
};

/**
 * Converts an appraisal type into an appraisal object.
 *
 * @param client The axios client to retrieve data from.
 * @param appraisalType The appraisal type retrieved from backend.
 *
 * @returns The appraisal object on frontend.
 */
export async function appraisalTypeToObj(client: AxiosInstance, appraisalType: AppraisalType) {
  const { manageeId, managerId, formId, ...rest } = appraisalType;
  const managee: User = await fetchUser(client, manageeId);
  const manager: User = await fetchUser(client, managerId);
  const form: FormObj = await fetchForm(client, formId);

  const answers: AnswerObj[] = await Promise.all(
    appraisalType.answers.map(async answerId => {
      const answer: AnswerObj = await fetchAnswer(client, answerId);
      return answer;
    })
  );

  const appraisalObj: AppraisalObj = {
    ...rest,
    answers: answers,
    managee: managee,
    manager: manager,
    form: form,
  };
  return appraisalObj;
}

/**
 * Converts an appraisal object into an appraisal type.
 *
 * @param appraisalObj The appraisal object on frontend.
 *
 * @returns The appraisal type to push to backend.
 */
export function appraisalObjToType(appraisalObj: AppraisalObj) {
  const { managee, manager, form, ...rest } = appraisalObj;
  const answers: string[] = appraisalObj.answers
    .map(answer => answer._id || '')
    .filter(id => id.length > 0);

  const appraisalType: AppraisalType = {
    ...rest,
    answers: answers,
    manageeId: appraisalObj.managee._id || '',
    managerId: appraisalObj.manager._id || '',
    formId: appraisalObj.form._id || ''
  };
  return appraisalType;
}

/**
 * Retrieves a specific appraisal from backend by its ID.
 *
 * @param client The axios client to retrieve data from.
 * @param id The ID of the appraisal object to retrieve.
 *
 * @returns Promise of appraisal object.
 */
export async function fetchAppraisal(client: AxiosInstance, id: string) {
  try {
    const response = await client.get<AppraisalResponse>(`${APPRAISAL_ROUTE}${id}`);
    const appraisal: AppraisalObj =
      await appraisalTypeToObj(client, cleanAppraisal(response.data.data));
    return appraisal;
  }
  catch (err) {
    message.error('Something went wrong. Please try again later.');
    console.error(`Error while retrieving appraisal: ${err}`);
    return defaultAppraisal;
  }
}

/**
 * Retrieve all appraisals from backend.
 *
 * @param client The axios client to retrieve data from.
 *
 * @returns Promise of list of appraisals.
 */
export async function fetchAppraisals(client: AxiosInstance) {
  try {
    const responses = await client.get<AppraisalsResponse>(APPRAISAL_ROUTE);
    const appraisals: AppraisalObj[] = await Promise.all(
      responses.data.data.map(async appraisalType => {
        const appraisal: AppraisalObj =
          await appraisalTypeToObj(client, cleanAppraisal(appraisalType));
        return appraisal;
      })
    );
    return appraisals;
  }
  catch (err) {
    message.error('Something went wrong. Please try again later.');
    console.error(`Error while retrieving appraisals: ${err}`);
    return [];
  }
};
