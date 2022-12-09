import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('FriendAssoc e2e test', () => {
  const friendAssocPageUrl = '/friend-assoc';
  const friendAssocPageUrlPattern = new RegExp('/friend-assoc(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const friendAssocSample = {};

  let friendAssoc;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/friend-assocs+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/friend-assocs').as('postEntityRequest');
    cy.intercept('DELETE', '/api/friend-assocs/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (friendAssoc) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/friend-assocs/${friendAssoc.id}`,
      }).then(() => {
        friendAssoc = undefined;
      });
    }
  });

  it('FriendAssocs menu should load FriendAssocs page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('friend-assoc');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('FriendAssoc').should('exist');
    cy.url().should('match', friendAssocPageUrlPattern);
  });

  describe('FriendAssoc page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(friendAssocPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create FriendAssoc page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/friend-assoc/new$'));
        cy.getEntityCreateUpdateHeading('FriendAssoc');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', friendAssocPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/friend-assocs',
          body: friendAssocSample,
        }).then(({ body }) => {
          friendAssoc = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/friend-assocs+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [friendAssoc],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(friendAssocPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details FriendAssoc page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('friendAssoc');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', friendAssocPageUrlPattern);
      });

      it('edit button click should load edit FriendAssoc page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('FriendAssoc');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', friendAssocPageUrlPattern);
      });

      it('edit button click should load edit FriendAssoc page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('FriendAssoc');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', friendAssocPageUrlPattern);
      });

      it('last delete button click should delete instance of FriendAssoc', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('friendAssoc').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', friendAssocPageUrlPattern);

        friendAssoc = undefined;
      });
    });
  });

  describe('new FriendAssoc page', () => {
    beforeEach(() => {
      cy.visit(`${friendAssocPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('FriendAssoc');
    });

    it('should create an instance of FriendAssoc', () => {
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        friendAssoc = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', friendAssocPageUrlPattern);
    });
  });
});
