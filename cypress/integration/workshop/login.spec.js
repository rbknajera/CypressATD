describe('Login tests', function () {

    beforeEach(function () {
        cy.fixture('LoginData/loginData').as('data')
        cy.visit('/')
    })

    it('LoginTC01 - Should be able to login with valid credentials', function () {
        cy.contains('a.nav-link', 'Sign in').click()
        cy.get('[type="email"]').type(this.data.conduit.email)
        cy.get('[type="password"]').type(this.data.conduit.password)
        cy.get('[type="submit"]').click()
        cy.contains(this.data.conduit.username).should('be.visible')
        cy.contains('a.nav-link', 'Your Feed').should('have.class', 'active')
        cy.contains('a.nav-link', 'Global Feed').should('not.have.class', 'active')
        cy.url().should('not.contain', '/login')
    })

    it('LoginTC02 - Should be able to login with valid credentials - arrow function', () => {
        cy.contains('a.nav-link', 'Sign in').click()
        cy.get('@data').then((data) => {
            cy.get('[type="email"]').type(data.conduit.email)
            cy.get('[type="password"]').type(data.conduit.password)
            cy.get('[type="submit"]').click()
            cy.contains(data.conduit.username).should('be.visible')
            cy.contains('a.nav-link', 'Your Feed').should('have.class', 'active')
            cy.contains('a.nav-link', 'Global Feed').should('not.have.class', 'active')
            cy.url().should('not.contain', '/login')
        })
    })

    it('LoginTC03 - Should be able to login with valid credentials - custom command', function () {
        cy.login()
        cy.contains(this.data.conduit.username).should('be.visible')
        cy.contains('a.nav-link', 'Your Feed').should('have.class', 'active')
        cy.contains('a.nav-link', 'Global Feed').should('not.have.class', 'active')
        cy.url().should('not.contain', '/login')
    })

    it('LoginTC03 - Should be able to login with valid credentials - custom command POST login', function () {
        cy.loginPost()
        cy.visit('/')
        cy.contains(this.data.conduit.username).should('be.visible')
        cy.contains('a.nav-link', 'Your Feed').should('have.class', 'active')
        cy.contains('a.nav-link', 'Global Feed').should('not.have.class', 'active')
        cy.url().should('not.contain', '/login')
    })
})