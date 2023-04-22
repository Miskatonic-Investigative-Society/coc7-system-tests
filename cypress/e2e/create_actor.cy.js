/* global cy, describe, expect, it */
describe('Gamemaster can create a new Actor', () => {
  it('passes', () => {
    cy.loginViaUi({ name: 'Gamemaster' })
    cy.turnOffWarningsIfTheyExist()

    cy.get('#sidebar-tabs').within(() => {
      cy.get('a[data-tab=actors]').click()
    })

    cy.window().then((win) => {
      const actorName = 'Abdul'

      const existingActors = win.game.actors.filter(a => a.name === actorName).map(a => a.id)
      cy.get('button').contains('Create Actor').click()
      cy.get('select[name=type]').should('have.value', 'character')
      cy.get('input[name=name]').type(actorName).then(() => {
        cy.get('button').contains('Create New Actor').click()

        cy.get('.app.window-app.coc7.sheetV2.actor.character').should('be.visible').invoke('attr', 'id').then((sheetID) => {
          cy.get('.infos').within(() => {
            cy.get('input[name=name]').should('have.value', actorName)
          })
          const newActors = win.game.actors.filter(a => a.name === actorName).map(a => a.id).filter(x => !existingActors.includes(x))
          expect(newActors.length).to.equal(1)
          const actor = win.game.actors.get(newActors[0])
          actor.sheet.close()
          actor.delete()
        })
      })
    })
  })
})
