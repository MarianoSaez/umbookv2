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

describe('Comentario e2e test', () => {
  const comentarioPageUrl = '/comentario';
  const comentarioPageUrlPattern = new RegExp('/comentario(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const comentarioSample = {};

  let comentario;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/comentarios+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/comentarios').as('postEntityRequest');
    cy.intercept('DELETE', '/api/comentarios/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (comentario) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/comentarios/${comentario.id}`,
      }).then(() => {
        comentario = undefined;
      });
    }
  });

  it('Comentarios menu should load Comentarios page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('comentario');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Comentario').should('exist');
    cy.url().should('match', comentarioPageUrlPattern);
  });

  describe('Comentario page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(comentarioPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Comentario page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/comentario/new$'));
        cy.getEntityCreateUpdateHeading('Comentario');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', comentarioPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/comentarios',
          body: comentarioSample,
        }).then(({ body }) => {
          comentario = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/comentarios+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [comentario],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(comentarioPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Comentario page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('comentario');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', comentarioPageUrlPattern);
      });

      it('edit button click should load edit Comentario page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Comentario');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', comentarioPageUrlPattern);
      });

      it('edit button click should load edit Comentario page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Comentario');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', comentarioPageUrlPattern);
      });

      it('last delete button click should delete instance of Comentario', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('comentario').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', comentarioPageUrlPattern);

        comentario = undefined;
      });
    });
  });

  describe('new Comentario page', () => {
    beforeEach(() => {
      cy.visit(`${comentarioPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Comentario');
    });

    it('should create an instance of Comentario', () => {
      cy.get(`[data-cy="contenido"]`).type('Zimbabwe IB array').should('have.value', 'Zimbabwe IB array');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        comentario = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', comentarioPageUrlPattern);
    });
  });
});
