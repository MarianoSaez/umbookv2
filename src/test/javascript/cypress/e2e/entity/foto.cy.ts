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

describe('Foto e2e test', () => {
  const fotoPageUrl = '/foto';
  const fotoPageUrlPattern = new RegExp('/foto(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const fotoSample = {};

  let foto;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/fotos+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/fotos').as('postEntityRequest');
    cy.intercept('DELETE', '/api/fotos/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (foto) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/fotos/${foto.id}`,
      }).then(() => {
        foto = undefined;
      });
    }
  });

  it('Fotos menu should load Fotos page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('foto');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Foto').should('exist');
    cy.url().should('match', fotoPageUrlPattern);
  });

  describe('Foto page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(fotoPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Foto page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/foto/new$'));
        cy.getEntityCreateUpdateHeading('Foto');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fotoPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/fotos',
          body: fotoSample,
        }).then(({ body }) => {
          foto = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/fotos+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [foto],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(fotoPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Foto page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('foto');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fotoPageUrlPattern);
      });

      it('edit button click should load edit Foto page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Foto');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fotoPageUrlPattern);
      });

      it('edit button click should load edit Foto page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Foto');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fotoPageUrlPattern);
      });

      it('last delete button click should delete instance of Foto', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('foto').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fotoPageUrlPattern);

        foto = undefined;
      });
    });
  });

  describe('new Foto page', () => {
    beforeEach(() => {
      cy.visit(`${fotoPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Foto');
    });

    it('should create an instance of Foto', () => {
      cy.get(`[data-cy="caption"]`).type('mobile').should('have.value', 'mobile');

      cy.get(`[data-cy="fecha"]`).type('2022-12-08T04:43').blur().should('have.value', '2022-12-08T04:43');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        foto = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', fotoPageUrlPattern);
    });
  });
});
