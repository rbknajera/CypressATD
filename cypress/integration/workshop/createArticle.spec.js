describe('Create Article', () => {
    beforeEach(function () {
        cy.fixture('LoginData/loginData').as('data')
    })

    it('LoginTC05 - Should be able to create an article', function () {
        cy.loginPost()
        cy.visit('/')
    })
})