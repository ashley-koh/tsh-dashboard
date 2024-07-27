import { message } from "antd";
import { AxiosInstance } from "axios";

import AnswerObj, { AnswerType, defaultAnswer } from "@/types/answer.type";
import AppraisalObj, { AppraisalType, defaultAppraisal } from "@/types/appraisal.type";
import FormObj, { defaultForm, FormType } from "@/types/form.type";
import QuestionObj, { defaultQuestion } from "@/types/question.type";
import SectionObj, { defaultSection, SectionType } from "@/types/section.type";
import User, { defaultUser } from "@/types/user.type";

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
    const responses = await client.get<{ data: QuestionObj, message: string }>(`/question/${id}`);
    return responses.data.data;
  }
  catch (err) {
    message.error('Something went wrong. Please try again later.');
    console.error(`Error while retrieving question: ${err}`);
    return defaultQuestion;
  }
}

/**
 * Retrieve all questions from backend.
 *
 * @param client The axios client to retrieve data from.
 *
 * @returns Promise of list of questions.
 */
export async function fetchQuestions(client: AxiosInstance) {
  try {
    const responses = await client.get<{ data: QuestionObj[], message: string }>('/question');
    return responses.data.data;
  }
  catch (err) {
    message.error('Something went wrong. Please try again later.');
    console.error(`Error while retrieving questions: ${err}`);
    return [];
  }
};

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
}

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
    const responses = await client.get<{ data: AnswerType, message: string }>(`/answer/${id}`);
    const answer: AnswerObj = await answerTypeToObj(client, responses.data.data);
    return answer;
  }
  catch (err) {
    message.error('Something went wrong. Please try again later.');
    console.error(`Error while retrieving answer: ${err}`);
    return defaultAnswer;
  }
}

/**
 * Retrieve all answers from backend.
 *
 * @param client The axios client to retrieve data from.
 *
 * @returns Promise of list of answers.
 */
export async function fetchAnswers(client: AxiosInstance) {
  const answers: AnswerObj[] = [];

  try {
    const responses = await client.get<{ data: AnswerType[], message: string }>('/answer');
    responses.data.data.forEach(async response => {
      const answer: AnswerObj = await answerTypeToObj(client, response);
      answers.push(answer);
    });
  }
  catch (err) {
    message.error('Something went wrong. Please try again later.');
    console.error(`Error while retrieving answers: ${err}`);
    return [];
  }
  finally {
    return answers
  }
};

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
}

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
    const responses = await client.get<{ data: SectionType, message: string }>(`/formSection/${id}`);
    return sectionTypeToObj(client, responses.data.data);
  }
  catch (err) {
    message.error('Something went wrong. Please try again later.');
    console.error(`Error while retrieving section: ${err}`);
    return defaultSection;
  }
}

/**
 * Retrieve all sections from backend.
 *
 * @param client The axios client to retrieve data from.
 *
 * @returns Promise of list of sections.
 */
export async function fetchSections(client: AxiosInstance) {
  const sections: SectionObj[] = [];

  try {
    const responses = await client.get<{ data: SectionType[], message: string }>('/formSection');
    responses.data.data.forEach(response => sections.push(sectionTypeToObj(client, response)));
  }
  catch (err) {
    message.error('Something went wrong. Please try again later.');
    console.error(`Error while retrieving sections: ${err}`);
  }
  finally {
    return sections;
  }
}

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
}

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
}

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
    const responses = await client.get<{ data: FormType, message: string }>(`/form/${id}`);
    return formTypeToObj(client, responses.data.data);
  }
  catch (err) {
    message.error('Something went wrong. Please try again later.');
    console.error(`Error while retrieving form: ${err}`);
    return defaultForm;
  }
}

/**
 * Retrieve all forms from backend.
 *
 * @param client The axios client to retrieve data from.
 *
 * @returns Promise of list of forms.
 */
export async function fetchForms(client: AxiosInstance) {
  const forms: FormObj[] = [];

  try {
    const responses = await client.get<{ data: FormType[], message: string }>('/form');
    responses.data.data.forEach(response => forms.push(formTypeToObj(client, response)));
  }
  catch (err) {
    message.error('Something went wrong. Please try again later.');
    console.error(`Error while retrieving forms: ${err}`);
  }
  finally {
    return forms;
  }
}

/**
 * Retrieves a specific user from backend by its ID.
 *
 * @param client The axios client to retrieve data from.
 * @param id The ID of the user object to retrieve.
 *
 * @returns Promise of user object.
 */
export async function fetchUser(client: AxiosInstance, id: string) {
  try {
    const responses = await client.get<{ data: User, message: string }>(`/user/${id}`);
    return responses.data.data;
  }
  catch (err) {
    message.error('Something went wrong. Please try again later.');
    console.error(`Error while retrieving user: ${err}`);
    return defaultUser;
  }
}

/**
 * Retrieve all users from backend.
 *
 * @param client The axios client to retrieve data from.
 *
 * @returns Promise of list of users.
 */
export async function fetchUsers(client: AxiosInstance) {
  try {
    const responses = await client.get<{ data: User[], message: string }>('/user');
    return responses.data.data;
  }
  catch (err) {
    message.error('Something went wrong. Please try again later.');
    console.error(`Error while retrieving users: ${err}`);
    return [];
  }
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
  const managee: User = await fetchUser(client, appraisalType.manageeId);
  const manager: User = await fetchUser(client, appraisalType.managerId);
  const form: FormObj = await fetchForm(client, appraisalType.formId);

  const answers: AnswerObj[] = [];
  appraisalType.answers.forEach(async answerId => {
    const answer: AnswerObj = await fetchAnswer(client, answerId);
    answers.push(answer);
  });

  const appraisalObj: AppraisalObj = {
    ...appraisalType,
    answers: answers,
    managee: managee,
    manager: manager,
    form: form
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
  const answers: string[] = appraisalObj.answers
    .map(answer => answer._id || '')
    .filter(id => id.length > 0);
  const appraisalType: AppraisalType = {
    ...appraisalObj,
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
    const responses = await client.get<{ data: AppraisalObj, message: string }>(`/appraisal/${id}`);
    return responses.data.data;
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
    const responses = await client.get<{ data: AppraisalObj[], message: string }>('/appraisal');
    return responses.data.data;
  }
  catch (err) {
    message.error('Something went wrong. Please try again later.');
    console.error(`Error while retrieving appraisals: ${err}`);
    return [];
  }
};
