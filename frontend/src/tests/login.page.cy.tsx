/// <reference types="cypress" />

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AuthProvider from "@/context/auth/AuthContext";
import LoginPage from '@/pages/Login';

describe('<LoginPage />', () => {
  const emailInput = 'email-input';
  const emailError = 'email-validate';
  const passwordInput = 'password-input';
  const passwordError = 'password-validate';
  const inputError = 'div.ant-form-item-explain-error';
  const errorAlert = 'invalid-alert';
  const buttonSubmit = 'login-form-button';

  beforeEach(() => {
    cy.viewport('macbook-16');
    cy.mount(
      <React.StrictMode>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/home' element={<></>} />
            </Routes>
          </AuthProvider>
        </Router>
      </React.StrictMode>
    );
  });

  it('exists on url', () => {
    cy.url().should('include', '/login');
  });

  it('has visible input fields', () => {
    cy.dataCy(emailInput).should('exist');
    cy.dataCy(passwordInput).should('exist');
    cy.dataCy(buttonSubmit).should('exist');
  });

  it('has invisible fields', () => {
    cy.dataCy(emailError).get(inputError).should('not.exist');
    cy.dataCy(passwordError).get(inputError).should('not.exist');
    cy.dataCy(errorAlert).should('not.exist');
  })

  it('shows email and password are missing', () => {
    cy.dataCy(buttonSubmit).click();
    cy.dataCy(emailError).get(inputError).should('exist');
    cy.dataCy(passwordError).get(inputError).should('exist');
  });

  it('verifies invalid email input', () => {
    cy.dataCy(emailInput).type('not an email');
    cy.dataCy(emailError).get(inputError).should('exist');
  });

  it('verifies valid email input', () => {
    cy.dataCy(emailInput).type('user@email.com');
    cy.dataCy(emailError).get(inputError).should('not.exist');
  });

  it('invalid email and/or password', () => {
    // Intentionally mock invalid request response
    cy
      .intercept('POST', '/login', {
        statusCode: 409,
        body: {
          message: 'Error: Invalid email and/or password.',
        },
      })
      .as('loginRequest');

    cy.dataCy(emailInput).type('user@email.com');
    cy.dataCy(passwordInput).type('12345');
    cy.dataCy(buttonSubmit).click();

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 409);
    cy.dataCy(errorAlert).should('exist');
  });

  it('valid email and password', () => {
    cy.dataCy(emailInput).type(Cypress.env('email'));
    cy.dataCy(passwordInput).type(Cypress.env('password'), { log: false });
    cy.dataCy(buttonSubmit).click();

    cy.url().should('include', '/home');
  });
});
