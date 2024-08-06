import React from "react";
import DepartmentStatistics from "../pages/Statistics";
import Dashboard from "@/pages/AppraisalForms/Dashboard";
import { mockUpdateUser,mockFetchAppraisal, mockFetchUser, mockFetchUsers, mockFetchAppraisals, mockFetchForms, mockFetchForm, mockForm,mockAppraisal, mockUsers, testEmployee, testUser, mountWithAuth, mockpendingAppraisal } from "./MockAuthProvider";
import { message } from 'antd';


describe("<Dashboard />", () => {
  const scheduleappraisalbutton = "schedule-appraisal-button";
  const scheduler = "scheduler";
  const formcreatorbutton='form-selector-button';
  const formselector='form-selector'
  const selectform="select-form"
  const events="events"
  

  beforeEach(() => {
    cy.viewport("macbook-16");
    mockFetchUser(testUser);
    mockFetchUser(testEmployee);
    mockFetchAppraisals([mockAppraisal, mockpendingAppraisal]);
    mockFetchForm(mockForm);
    mockFetchForms([mockForm]);
    mountWithAuth(<Dashboard />, testUser);

  });
  
  
  
  it("renders events component", () => {
    cy.dataCy(events).should("exist");
  });

  it("renders scheduler upon click", () => {
    cy.dataCy(scheduleappraisalbutton).should("be.visible");
    cy.dataCy(scheduleappraisalbutton).click(); 
    cy.dataCy(scheduler).should("be.visible");
  });
  it("renders form creator", ()=>{
    cy.dataCy(formcreatorbutton).should("be.visible");
    cy.dataCy(formcreatorbutton).click();
    cy.dataCy(formselector).should("be.visible");
  })
  it("renders forms in form creator",()=>{
    cy.dataCy(formcreatorbutton).click();
    cy.dataCy(selectform).click();
    cy.get('.ant-select-dropdown').should('be.visible');
    cy.get('.ant-select-dropdown').contains(`${mockForm.name}`).click();
  })
  it("displays 'To review' status appraisals", () => {
    cy.wait('@fetchAppraisals',{timeout:10000});
    cy.dataCy(events).should(($events) => {
      expect($events.text()).to.include("To review");
    });
  });
  it("displays 'Complete' status appraisals", () => {
    cy.wait('@fetchAppraisals',{timeout:10000});
    cy.dataCy(events).should(($events) => {
      expect($events.text()).to.include("[COMPLETE]");
    });
  });
});
