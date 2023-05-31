/* global cy, describe, expect, it, beforeEach */
describe('During combat', () => {
  beforeEach(() => {
    cy.loginViaUi({ name: 'Gamemaster' })
    cy.turnOffWarningsIfTheyExist()

    const charName = '1920 Character'
    const creatureName = 'Creature example'

    // Clean up the previous state
    cy.ifActorExists(charName).then((found) => found && cy.deleteActor(charName))
    cy.ifActorExists(creatureName).then((found) => found && cy.deleteActor(creatureName))

    // Set up the new state
    cy.importFromCompendium('Examples', charName)
    cy.importFromCompendium('Examples', creatureName)
  })

  it('actor can punch monster', () => {
    const char = cy.getActor('1920 Character')
    cy.wait(1000)

    // Drag tokens on the board - not working
    char
      .trigger('mousedown', { button: 0 })
      .wait(1000)
      .trigger('mousemove', -500, 0, { force: true })
      .trigger('mouseup', -500, 0, { force: true })
  })
})
