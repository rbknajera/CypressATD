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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("", (originalFn, url, options) => { ... })

const apiUrl = Cypress.env('apiUrl')

Cypress.Commands.add('login', (user = { email: 'fulanito@hotmail.com', password: 'fulanito' }) => {
    //Display of the Command in Test Runner
    const log = Cypress.log({
        name: "auth",
        displayName: "AUTH",
        message: [` 🔐 Authenticating | ${user.email}`],
        autoEnd: false
    })

    cy.contains('a.nav-link', 'Sign in').click()
    cy.get('[type="email"]').type(user.email)
    cy.get('[type="password"]').type(user.password, { sensitive: true })
    cy.get('[type="submit"]').click()
    cy.contains('fulanito').should('be.visible')

    log.end()
})

// a custom Cypress command to login using XHR call
// and then set the received token in the local storage
// can log in with default user or with a given one
Cypress.Commands.add('loginPost', (user = { email: 'fulanito@hotmail.com', password: 'fulanito' }) => {
    cy.getLoginToken(user).then(token => {
        localStorage.setItem('jwt', token)
        // with this token set, when we visit the page
        // the web application will have the user logged in
    })
})

// custom Cypress command to simply return a token after logging in
// useful to perform authorized API calls
Cypress.Commands.add('getLoginToken', (user = { email: 'fulanito@hotmail.com', password: 'fulanito' }) => {
    return cy.request('POST', `${apiUrl}/api/users/login`, {
            user: Cypress._.pick(user, ['email', 'password'])
        }).its('body.user.token').should('exist')
})