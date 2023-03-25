import { defineConfig } from 'cypress'
import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient({
//   log: ['query', 'info', 'warn', 'error'],
// })

export default defineConfig({
  env: {
    DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/postgres',
    SESSION_SECRET: "this's a secret",
  },
  viewportWidth: 1024,
  viewportHeight: 768,
  e2e: {
    setupNodeEvents: (on, config) => {
      const isDev = config.watchForFileChanges
      const port = process.env.PORT ?? (isDev ? '3000' : '8811')
      const configOverrides: Partial<Cypress.PluginConfigOptions> = {
        baseUrl: `http://localhost:${port}`,
        video: !process.env.CI,
        screenshotOnRunFailure: !process.env.CI,
      }

      // on('before:run', async () => {
      //   // Connect to the database before running the tests
      //   await prisma.$connect()
      // })

      // on('after:run', async () => {
      //   // Disconnect from the database after running the tests
      //   await prisma.$disconnect()
      // })
      // To use this:
      // cy.task('log', whateverYouWantInTheTerminal)
      on('task', {
        log: message => {
          console.log(message)

          return null
        },
      })

      return { ...config, ...configOverrides }
    },
  },
})
