import { mockFetchForm,mockUpdateUser,mockFetchAppraisal, mockFetchUser, mockFetchUsers, mockFetchAppraisals, mockFetchForms, mockForm,mockAppraisal, mockUsers, testEmployee, testUser, mountWithAuth } from "./MockAuthProvider";
import dayjs from "dayjs";
import Scheduler from "@/pages/AppraisalForms/Scheduler";
import { message } from 'antd';


describe('<Scheduler />', () => {
  const selectemployee = "select-employee";
  const selectdate = "select-date";
  const date = dayjs().hour(14).minute(30).second(0).millisecond(0);
  const dateToSelect = date.format('YYYY-MM-DD HH:mm:ss'); 
  const selectappraisal="select-appraisal";
  const submitschedule="submit";
  const successmessage="success-message";

  beforeEach(() => {
    cy.viewport("macbook-16");
    mockFetchUser(testUser);
    mockFetchUser(testEmployee);
    mockFetchUsers(mockUsers);
    mockFetchAppraisal(mockAppraisal)
    mockFetchAppraisals([mockAppraisal]);
    mockFetchForm(mockForm)
    mockFetchForms([mockForm]);
    cy.intercept('POST', '/appraisals/', {
      statusCode: 200,
      body: { success: true, data: mockAppraisal },
    }).as('postAppraisal');
    
    
    //there are error messages due to failure to connecting to backend, however
    //as this is frontend testing that should be able to function without the backend and
    //component testing has to be independent the errors are being stubbed
    
    cy.stub(message, 'error').as('messageError');
    mountWithAuth(<Scheduler onClose={() => console.log('Scheduler closed')} />, testUser);
  });
  it("shows error message with all missing fields",()=>{
    cy.dataCy(submitschedule).click();
    cy.get('.ant-form-item-explain')
      .should('contain.text', 'Please select an employee.')
      .and('contain.text', 'Please select a date.')
      .and('contain.text', 'Please select a form.');
  })
  it("shows error message with employee missing field",()=>{
    cy.dataCy(submitschedule).click();
    cy.dataCy(selectdate).click();
    cy.get('.ant-picker-time-panel-column').contains('14').click({force:true});
    cy.get('.ant-picker-time-panel-column').contains('30').click({force:true});
    cy.get('.ant-picker-ok').click();
    cy.dataCy(selectappraisal).click();
    cy.get('.ant-select-item-option').contains(mockForm.name).click();
    cy.get('.ant-form-item-explain')
      .should('contain.text', 'Please select an employee.')
  })
  it("shows error message with date missing field",()=>{
    cy.dataCy(submitschedule).click();
    cy.dataCy(selectemployee).click();
    cy.get('.ant-select-dropdown').contains(`${testEmployee.name}`).click();
    cy.dataCy(selectappraisal).click();
    cy.get('.ant-select-item-option').contains(mockForm.name).click();
    cy.get('.ant-form-item-explain')
      .should('contain.text', 'Please select a date.')
  })
  it("shows error message with appraisal missing field",()=>{
    cy.dataCy(submitschedule).click();
    cy.dataCy(selectemployee).click();
    cy.get('.ant-select-dropdown').contains(`${testEmployee.name}`).click();
    cy.dataCy(selectdate).click();
    cy.get('.ant-picker-time-panel-column').contains('14').click({force:true});
    cy.get('.ant-picker-time-panel-column').contains('30').click({force:true});
    cy.get('.ant-picker-ok').click();
    cy.get('.ant-form-item-explain')
      .should('contain.text', 'Please select a form.')
  })
  it("renders available employees upon clicking employee selector", () => {
    cy.dataCy(selectemployee).should("be.visible");
    cy.dataCy(selectemployee).click();
    cy.get('.ant-select-dropdown').should('be.visible');
    //check for employee
    cy.get('.ant-select-dropdown').contains(`${testEmployee.name}`).click();
  });
  it("renders available dates upon clicking date", () => {
    cy.dataCy(selectdate).should("be.visible");
    cy.dataCy(selectdate).click();
    
    cy.get('.ant-picker-time-panel-column').contains('14').click({force:true}); 
    cy.get('.ant-picker-time-panel-column').contains('30').click({force:true}); 
    cy.get('.ant-picker-ok').click();
    cy.dataCy(selectdate).should('have.value', `${dateToSelect}`);
  });
  it("renders available appraisal forms", () => {
    cy.dataCy(selectappraisal).should("be.visible");
    cy.dataCy(selectappraisal).click();
    cy.get('.ant-select-item-option').contains(mockForm.name).should('exist');
    cy.get('.ant-select-dropdown').should('be.visible');
    cy.get('.ant-select-item-option').contains(mockForm.name).click();
    cy.dataCy('select-appraisal').should('contain.text', mockForm.name);
  });
  it("is able to complete scheduler",()=>{
    mockUpdateUser(testUser);
    mockUpdateUser(testEmployee);
    cy.dataCy(selectemployee).click();
    cy.get('.ant-select-dropdown').contains(`${testEmployee.name}`).click();
    cy.dataCy(selectdate).click();
    cy.get('.ant-picker-time-panel-column').contains('14').click({force:true});
    cy.get('.ant-picker-time-panel-column').contains('30').click({force:true});
    cy.get('.ant-picker-ok').click();
    cy.dataCy(selectappraisal).click();
    cy.get('.ant-select-item-option').contains(mockForm.name).click();
    cy.dataCy(submitschedule).click();
    cy.wait('@postAppraisal', { timeout: 10000 });
    cy.dataCy(successmessage).should('be.visible')
  })
})