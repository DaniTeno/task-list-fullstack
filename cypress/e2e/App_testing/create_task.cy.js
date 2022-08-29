describe('Creating a task', () => {
  it('testing', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Log in').click()
    cy.get('input#username').type('daniel_tenorio_13@hotmail.com')
    cy.get('input[type="password"]').type('Abc12345')
    cy.contains('Continue').click()
    cy.get('input[type="text"]').click().type('Testing E2E with cypress')
    cy.get('span.MuiSlider-markLabel').last().click()
    cy.get('button.css-1uguvh8-MuiButtonBase-root-MuiButton-root').click()
    cy.contains('Log out').click()
  })
})