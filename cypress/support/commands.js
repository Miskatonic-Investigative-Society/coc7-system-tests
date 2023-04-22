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
