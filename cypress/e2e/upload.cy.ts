import { faker } from '@faker-js/faker'

describe('upload tests', () => {
  afterEach(() => {
    cy.cleanupUser()
  })

  it('should allow you to register and login', () => {
    const loginForm = {
      email: `${faker.internet.userName()}@example.com`,
      password: faker.internet.password(),
    }
    cy.then(() => ({ email: loginForm.email })).as('user')

    cy.visitAndCheck('/')
    cy.get('[data-cy="login"]').click()
    cy.location('pathname').should('include', 'login')
    cy.get('[data-cy="email"]').should('not.be.empty')
    cy.get('[data-cy="password"]').should('not.be.empty')
    cy.get('[data-cy="submit"]').click()
    // cy.location('search').then(loc => {
    //   const searchParam = new URLSearchParams(loc)
    //   cy.visit(searchParam.get('redirectTo') ?? '')
    // })
    // cy.findByRole('link', { name: /sign up/i }).click()

    // cy.findByRole('textbox', { name: /email/i }).type(loginForm.email)
    // cy.findByLabelText(/password/i).type(loginForm.password)
    // cy.findByRole('button', { name: /create account/i }).click()

    // cy.findByRole('link', { name: /notes/i }).click()
    // cy.findByRole('button', { name: /logout/i }).click()
    // cy.findByRole('link', { name: /log in/i })
  })

  // it('should allow you to make a note', () => {
  //   const testNote = {
  //     title: faker.lorem.words(1),
  //     body: faker.lorem.sentences(1),
  //   }
  //   cy.login()
  //   cy.visitAndCheck('/')

  //   cy.findByRole('link', { name: /notes/i }).click()
  //   cy.findByText('No notes yet')

  //   cy.findByRole('link', { name: /\+ new note/i }).click()

  //   cy.findByRole('textbox', { name: /title/i }).type(testNote.title)
  //   cy.findByRole('textbox', { name: /body/i }).type(testNote.body)
  //   cy.findByRole('button', { name: /save/i }).click()

  //   cy.findByRole('button', { name: /delete/i }).click()

  //   cy.findByText('No notes yet')
  // })
})
