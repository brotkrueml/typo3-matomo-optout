describe("Matomo Opt-Out", () => {
  beforeEach(() => {
    cy.clearCookies();
  });

  it('shows opt-out form on first call', () => {
    cy.visit('/');

    cy.get('#moo-no-tracking')
      .should('be.not.visible');

    cy.get('#moo-optout-form')
      .should('be.visible');

    cy.get('#moo-optout-form > :nth-child(1)')
      .should('contain', 'You may choose to prevent this website from aggregating and analyzing the actions you take here. Doing so will protect your privacy, but will also prevent the owner from learning from your actions and creating a better experience for you and other users.')

    cy.get('#moo-optout-form label')
      .should('contain', 'You are not opted out. Uncheck this box to opt-out.')

    cy.get('#moo-optout')
      .should('be.checked');
  });

  it('opts out when deactivating checkbox', () => {
    cy.visit('/');

    cy.get('#moo-optout')
      .click();

    cy.get('#moo-optout')
      .should('not.be.checked');

    cy.get('#moo-optout-form label')
      .should('contain', 'You are currently opted out. Check this box to opt-in.')

    cy.get('#moo-optout')
      .getCookie('mtm_consent_removed')
      .should('exist');
  });

  it('is opted-out when previously opted-out', () => {
    cy.visit('/');

    cy.get('#moo-optout')
      .click();

    cy.reload();

    cy.get('#moo-optout')
      .should('not.be.checked');

    cy.get('#moo-optout-form label')
      .should('contain', 'You are currently opted out. Check this box to opt-in.')
  });

  it('opting-in when previously opted-out', () => {
    cy.visit('/');

    cy.get('#moo-optout')
      .click();

    cy.reload();

    cy.get('#moo-optout')
      .click();

    cy.get('#moo-optout')
      .should('be.checked');

    cy.get('#moo-optout-form label')
      .should('contain', 'You are not opted out. Uncheck this box to opt-out.')

    cy.get('#moo-optout')
      .getCookie('mtm_consent_removed')
      .should('not.exist');
  });

  it('shows error message when no Matomo snippet is embedded', () => {
    cy.visit('/without-matomo-embedding');

    cy.get('#moo-no-tracking')
      .should('be.visible')
      .should('contain', 'Please add the Matomo tracking JavaScript to the website to display the Matomo opt-out form!');

    cy.get('#moo-optout-form')
      .should('be.not.visible');
  })

  it('shows message when Matomo is blocked', () => {
    cy.visit('/blocked-matomo-embedding');

    cy.get('#moo-no-tracking')
      .should('be.visible')
      .should('contain', 'No tracking because of disabled JavaScript or activated ad blocker.');

    cy.get('#moo-optout-form')
      .should('be.not.visible');
  });
});
