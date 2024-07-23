describe('login page', () => {
  const emailInput = 'email-input';
  const emailError = 'email-validate';
  const passwordInput = 'password-input';
  const passwordError = 'password-validate';
  const inputError = 'div.ant-form-item-explain-error';
  const errorAlert = 'invalid-alert';
  const buttonSubmit = 'login-form-button';

  beforeEach(() => {
    cy.viewport('macbook-16');
    cy.visit('/');
  });

  it('visible input fields', () => {
    cy.dataCy(emailInput).should('exist');
    cy.dataCy(passwordInput).should('exist');
    cy.dataCy(buttonSubmit).should('exist');
  });

  it('invisible fields', () => {
    cy.dataCy(emailError).get(inputError).should('not.exist');
    cy.dataCy(passwordError).get(inputError).should('not.exist');
    cy.dataCy(errorAlert).should('not.exist');
  })

  it('missing email and password input', () => {
    cy.dataCy(buttonSubmit).click();
    cy.dataCy(emailError).get(inputError).should('exist');
    cy.dataCy(passwordError).get(inputError).should('exist');
  });

  it('email input validation', () => {
    cy.dataCy(emailInput).type('not an email');
    cy.dataCy(emailError).get(inputError).should('exist');
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