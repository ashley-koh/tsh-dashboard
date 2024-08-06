/// <reference types="cypress" />

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createContext, useContext } from "react";
import {
  EmploymentStatusLabels,
  DepartmentLabels,
  RoleLables,
  RoleOptions,
  DepartmentOptions,
  EmploymentStatusOptions,
  ExtendUser,
} from "../../src/types/user.type";
import User from "../../src/types/user.type";
import { AuthContext } from "../../src/context/auth/AuthContext";
import AppraisalObj, {
    AppraisalStatus,
    defaultAppraisal,
    ExtendAppraisalType
  } from "@/types/appraisal.type";
  import FormObj, { ExtendFormObj } from "@/types/form.type";
import dayjs from "dayjs";
import BaseAppraisal from "@/types/appraisal.type";
import AnswerObj, { ExtendAnswerType } from "@/types/answer.type";
import { ExtendQuestionObj, QuestionType } from "@/types/question.type";

export const testUser: ExtendUser = {
  __v:0,
  password: "password",
  appraisals: [],
  _id: "6d4f82c1a9b4e316c7a0925e",
  name: "Test",
  email: "test@gmail.com",
  employeeId: "5b4e23a0d6c9f2178a4e9f0d",
  role: RoleOptions.OWNER,
  jobTitle: "admin",
  dept: DepartmentOptions.HR,
  mobileNo: "number",
  employmentStatus: EmploymentStatusOptions.FULL_TIME,
};

export const testEmployee: ExtendUser = {
    __v:2,
    password: "password",
  appraisals: [],
  _id: "5b4e23a0d6c9f2178a4e9f0d",
  name: "Test Employee",
  email: "testemployee@gmail.com",
  employeeId: "employeeid",
  role: RoleOptions.EMPLOYEE,
  jobTitle: "admin",
  dept: DepartmentOptions.HR,
  mobileNo: "number",
  employmentStatus: EmploymentStatusOptions.FULL_TIME,
};
export const mockForm: ExtendFormObj= {
    __v:10,
     _id: 'testformid',
    name: "tester form",
    sections: [],
  };

  export const mockAppraisal: ExtendAppraisalType = {
    __v: 0,
    rating: 85,
    _id: 'mockappraisal',
    manageeId: "5b4e23a0d6c9f2178a4e9f0d",
    managerId: "6d4f82c1a9b4e316c7a0925e",
    formId: 'testformid',
    status: AppraisalStatus.COMPLETE,
    deadline: dayjs().add(1, "hour").toDate(),
    answers: [],
    comments: "good",
  };

  export const mockpendingAppraisal: ExtendAppraisalType = {
    __v: 0,
    rating: 85,
    _id: 'mockpendingappraisal',
    manageeId: "5b4e23a0d6c9f2178a4e9f0d",
    managerId: "6d4f82c1a9b4e316c7a0925e",
    formId: 'testformid',
    status: AppraisalStatus.REVIEW,
    deadline: dayjs().add(1, "day").toDate(),
    answers: [],
    comments: "good",
  };


export const mockUsers = [testUser, testEmployee];

testUser.appraisals = ['mockappraisal'];
testEmployee.appraisals = ['mockappraisal'];

const MockAuthProvider: React.FC<{ user: User; children: React.ReactNode }> = ({
  user,
  children,
}) => {
  const authContextValue = {
    user: user,
    authenticated: true,
    loading: false,
    loginAction: () => Promise.resolve(),
    logout: () => Promise.resolve(),
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const mountWithAuth = (component: React.ReactNode, user: User) => {
  return cy.mount(
    <Router>
      <MockAuthProvider user={user}>{component}</MockAuthProvider>
    </Router>
  );
};

export const mockFetchUser = (user: ExtendUser) => {
    cy.intercept("GET", `/user/${user._id}`, (req) => {
      req.reply({
        statusCode: 200,
        body: { data: user },
      });
    }).as("fetchUser");
};

   
export const mockFetchUsers = (users: ExtendUser[]) => {
    cy.intercept('GET', '/user/', {
      statusCode: 200,
      body: {
        data: users
      }
    }).as('fetchUsers');
   };
export const mockFetchAppraisal = (appraisal: ExtendAppraisalType) => {
    cy.intercept("GET", `/appraisals/${appraisal._id}`, (req) => {
        console.log("Intercepted request:", req.url);
        req.reply({
          statusCode: 200,
          body: {data:appraisal},
        });
      }).as("fetchAppraisal");
   };
   
export const mockFetchAppraisals = (appraisals: ExtendAppraisalType[]) => {
    cy.intercept("GET", "/appraisals", (req) => {
      console.log("Intercepted /appraisals request:", req.url); 
      req.reply({
        statusCode: 200,
        body: { data: appraisals },
      });
    }).as("fetchAppraisals");
   };

export const mockFetchForm = (form: FormObj) => {
    console.log("fetching form")
    cy.intercept('GET', `/form/${form._id}`, {
      statusCode: 200,
      body: { data: form },
    }).as('fetchForm');
   };
   
   
export const mockFetchForms = (forms: FormObj[]) => {
    cy.intercept('GET', '/form/', {
      statusCode: 200,
      body: { data: forms },
    }).as('fetchForms');
   };
   
export const mockUpdateUser = (user: User) => {
  cy.intercept('PUT', `/user/${user._id}`, {
    statusCode: 200,
    body: user,
  }).as('updateUser');
};

export const mockFetchAnswer = (answer: ExtendAnswerType) => {
    cy.intercept("GET", `/answers/${answer._id}`, (req) => {
      console.log("Intercepted request:", req.url);
      req.reply({
        statusCode: 200,
        body: {
          data: answer, 
        },
      });
    }).as("fetchAnswer");
  };