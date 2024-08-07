/// <reference types="cypress" />
import InfoHome from "../pages/InfoHome/InfoHome";
import {
  EmploymentStatusLabels,
  DepartmentLabels,
  RoleLables,
} from "../types/user.type";
import { message } from 'antd';
import {mockForm,mockAppraisal,mockFetchAppraisal, testUser, testEmployee, mountWithAuth, mockFetchUser, mockFetchForm} from "./MockAuthProvider";
import { LMS } from "@/data/mockData";

let moduleProgress = 0;
    const numberOfModules = LMS.modules.length;
    for (const module of LMS.modules) {
      moduleProgress += module.progress;
    }
    const averageModuleProgress = moduleProgress / numberOfModules;
    const appraisalrating=mockAppraisal.rating as number;
    const supposedRating=averageModuleProgress*0.5+appraisalrating*0.5;

describe("<InfoHome />", () => {
  const accountdetails = "account-details";
  const moduleprogress = "module-progress";
  const overallrating = "overall-rating";

  beforeEach(() => {
    cy.viewport("macbook-16");

    mockFetchAppraisal(mockAppraisal)
    mockFetchUser(testEmployee);
    mockFetchUser(testUser);
    mockFetchForm(mockForm);
    cy.stub(message, 'error').as('messageError');
    mountWithAuth(<InfoHome />, testEmployee);
  });

  it("renders AccountDetails component", () => {
    
    cy.dataCy(accountdetails).should("exist");
  });

  it("renders AccountDetails component user details", () => {
    cy.dataCy(accountdetails).contains(testEmployee.name).should("exist");
    cy.dataCy(accountdetails)
      .contains(RoleLables[testEmployee.role])
      .should("exist");
    cy.dataCy(accountdetails)
      .contains(DepartmentLabels[testEmployee.dept])
      .should("exist");
    cy.dataCy(accountdetails).contains(testEmployee.employeeId).should("exist");
    cy.dataCy(accountdetails)
      .contains(EmploymentStatusLabels[testEmployee.employmentStatus])
      .should("exist");
    cy.dataCy(accountdetails).contains(testEmployee.mobileNo).should("exist");
    cy.dataCy(accountdetails).contains(testEmployee.email).should("exist");
  });

  it("renders ModuleProgress component", () => {
    cy.dataCy(moduleprogress).should("exist");
  });

  it("renders due message for modules with dueIn < 10", () => {
    cy.dataCy(moduleprogress).contains("Due in 7 days").should("exist");
    cy.dataCy(moduleprogress).contains("Due in 21 days").should("not.exist");
  });

  it("renders ModuleProgress component details", () => {
    cy.dataCy(moduleprogress).contains(LMS.modules[0].name).should("exist");
    cy.dataCy(moduleprogress).contains(LMS.modules[1].name).should("exist");
    cy.dataCy(moduleprogress).contains(LMS.modules[2].name).should("exist");
    cy.dataCy(moduleprogress).contains(LMS.modules[3].name).should("exist");
    cy.dataCy(moduleprogress).contains(LMS.modules[4].name).should("exist");
  });


  it("renders ModuleProgress component progress", () => {
    cy.dataCy(moduleprogress).contains(LMS.modules[0].progress).should("exist");
    cy.dataCy(moduleprogress).contains(LMS.modules[1].progress).should("exist");
    cy.dataCy(moduleprogress).contains(LMS.modules[2].progress).should("exist");
    cy.dataCy(moduleprogress).contains(LMS.modules[3].progress).should("exist");
    cy.dataCy(moduleprogress).contains(LMS.modules[4].progress).should("exist");
  });

  it("renders OverallRating component", () => {
    cy.dataCy(overallrating).should("exist");
  });

  it("calculates overall rating correctly", () => {
    cy.dataCy(overallrating).should('exist');
    cy.wait(15000); //to wait for overall rating calculation to load
    cy.dataCy(overallrating).should('contain.text',`Overall Rating${supposedRating}%`).should('exist');
  });
});
