const crearCuentaButton = 'body > jhi-main > div.container-fluid > div > jhi-home > div > div.col-md-9 > div > div:nth-child(2) > a';
const loginTextBox = 'input[id="login"]';
const mailTextBox = '#email';
const passwordTextBox = '#password';
const confirmPasswordTextBox = '#confirmPassword';
const confirmFormButton = 'body > jhi-main > div.container-fluid > div > jhi-register > div > div:nth-child(2) > div > form > button';

const login = Cypress.env('DUMMY_LOGIN') ?? 'dummy';
const mail = Cypress.env('DUMMY_MAIL') ?? 'dummy@localhost';
const password = Cypress.env('DUMMY_PASSWORD') ?? 'dummy';

const adminLogin = Cypress.env('ADMIN_LOGIN') ?? 'admin';
const adminPassword = Cypress.env('ADMIN_PASSWORD') ?? 'admin';

describe('user testing', () => {
  afterEach(() => {
    cy.login(adminLogin, adminPassword);
    cy.authenticatedRequest({
      method: 'DELETE',
      url: `/api/admin/users/${login}`,
    });
    cy.visit('');
    cy.clickOnLogoutItem();
  });

  it('create user', () => {
    cy.visit('');

    cy.get(crearCuentaButton).click();
    cy.get(loginTextBox).type(login);
    cy.get(mailTextBox).type(mail);
    cy.get(passwordTextBox).type(password);
    cy.get(confirmPasswordTextBox).type(password);

    // Deberia encontrarse habilitado despues de llenar el form
    cy.get(confirmFormButton).should('be.enabled');
    cy.get(confirmFormButton).click();
  });
});
