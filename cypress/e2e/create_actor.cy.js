describe('Gamemaster can create a new Actor', () => {
  it('passes', () => {
    cy.loginViaUi({ name: 'Gamemaster' })
    cy.turnOffWarningsIfTheyExist()

    cy.get('#sidebar-tabs').within(() => {
      cy.get('a[data-tab=actors]').click()
    })

    cy.get('button').contains('Create Actor').click()
    cy.get('select[name=type]').should('have.value', 'character')
    cy.get('input[name=name]').type('Abdul')
    // Cypress sometimes jumps too quickly to the next step and text is not finished...
    cy.wait(50)
    cy.get('button').contains('Create New Actor').click()

    cy.get('.app.window-app.coc7.sheetV2.actor.character').should('be.visible')
    cy.get('.infos').within(() => {
      cy.get('input[name=name]').should('have.value', 'Abdul')
    })
  })
})
