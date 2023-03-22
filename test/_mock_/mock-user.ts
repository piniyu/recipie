import type { User } from '@prisma/client'

export const mockBotUser: User = {
  id: 'bot',
  email: 'bot@email.com',
  name: 'Bot',
  password:
    '$argon2i$v=19$m=16,t=2,p=1$RFNwaW5GWGJ3N2taRHRBUw$6APaFPBnqz1fveog0tEsZQ', // password:0000
  hashedRt: '',
}

export const mockUsers: User[] = [
  {
    id: 'testuser0',
    email: 'test@test.com',
    name: 'testuser0',
    password:
      '$argon2i$v=19$m=16,t=2,p=1$aXpoMk5yQjRGSVBoS1JSSA$hiDFC+CRQdjn3GJtgQ6c7w', // password:1234
    hashedRt: '',
  },
  {
    id: 'testuser1',
    email: 'test2@test.com',
    name: 'testuser1',
    password:
      '$argon2i$v=19$m=16,t=2,p=1$aXpoMk5yQjRGSVBoS1JSSA$/M5BSFZw3P+lMFq9wznl6Q', // password:22345
    hashedRt: '',
  },
  {
    id: 'testuser2',
    email: 'test3@test.com',
    name: 'testuser2',
    password:
      '$argon2i$v=19$m=16,t=2,p=1$RFNwaW5GWGJ3N2taRHRBUw$GuRD/0pdu1g4bxWvcnog/w', // password: 9999
    hashedRt: '',
  },
]
