/* global Cypress, cy */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginViaUi', (user) => {
  cy.visit('/')

  cy.get('select[name=userid]')
    .select(user.name)

  cy.get('button[name=join]').click()
  cy.get('span').contains(user.name).should('be.visible')

  cy.window().then((win) => {
    cy.window().its('game').and('have.property', 'ready').and('be.true')
    if (typeof win.game.scenes.current !== 'undefined') {
      cy.window().its('game').should('have.property', 'canvas').and('have.property', 'ready').and('be.true')
    } else {
      // If there is no scene arbitary delay
      cy.wait(1000)
    }
  })
})

Cypress.Commands.add('turnOffWarningsIfTheyExist', () => {
  cy.get('#notifications').then((notifications) => {
    const buttons = notifications.find('li.notification i')
    if (buttons.length) {
      buttons.trigger('click')
    }
  })
})

Cypress.Commands.add('openTab', (tab) => {
  cy.get('#sidebar-tabs').within(() => {
    cy.get(`a[data-tab=${tab}]`).click()
  })
})

Cypress.Commands.add('importFromCompendium', (compendium, item) => {
  cy.openTab('compendium')
  cy.get('.compendium-name').contains(compendium).trigger('click')
  cy.get('.entry-name').contains(item).rightclick()
  cy.get('.context-item').contains('Import Entry').click()

  // Close sheets which open automatically
  // TODO FIX waiting time for button actions to assign
  cy.wait(500)
  cy.get('.window-title').contains(item).siblings('.close').trigger('click')
})

Cypress.Commands.add('deleteActor', (actor) => {
  cy.openTab('actors')
  cy.get('.document-name').contains(actor).rightclick()
  cy.get('.context-item').contains('Delete').click()
  cy.get('.yes').click()
})

Cypress.Commands.add('getActor', (actor) => {
  cy.openTab('actors')
  return cy.get('.document-name').contains(actor)
})

Cypress.Commands.add('ifActorExists', (actor) => {
  cy.openTab('actors')
  cy.get('.document-name').then(($body) => {
    return $body.find(`a:contains("${actor}")`).length > 0
  })
})
