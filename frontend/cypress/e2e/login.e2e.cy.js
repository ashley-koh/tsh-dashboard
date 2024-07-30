describe('login page', () => {
  const emailInput = 'email-input';
  const passwordInput = 'password-input';
  const errorAlert = 'invalid-alert';
  const buttonSubmit = 'login-form-button';

  beforeEach(() => {
    cy.viewport('macbook-16');
    cy.visit('/login');
  });

  it('invalid email and/or password', () => {
    cy.dataCy(emailInput).type('no_user@email.com');
    cy.dataCy(passwordInput).type('12345');
    cy.dataCy(buttonSubmit).click();
    cy.dataCy(errorAlert).should('exist');
  });

  it('valid email and password', () => {
    cy.dataCy(emailInput).type(Cypress.env('email'));
    cy.dataCy(passwordInput).type(Cypress.env('password'), { log: false });
    cy.dataCy(buttonSubmit).click();
    cy.url().should('include', '/home');
  });
});