import { User } from '@prisma/client'

export const mockBotUser: User = {
  id: 'bot',
  email: 'bot@email.com',
  favoriteId: 'bot',
  name: 'Bot',
  password: '123',
  hashedRt: '',
}

export const mockUsers: User[] = [
  {
    id: 'testuser0',
    email: 'aaa@aaa.com',
    favoriteId: '0',
    name: 'testuser0',
    password: '123',
    hashedRt: '',
  },
  {
    id: 'testuser1',
    email: 'bbb@bbb.com',
    favoriteId: '1',
    name: 'testuser1',
    password: '123',
    hashedRt: '',
  },
  {
    id: 'testuser2',
    email: 'ccc@ccc.com',
    favoriteId: '2',
    name: 'testuser2',
    password: '123',
    hashedRt: '',
  },
  {
    id: 'testuser3',
    email: 'ddd@ddd.com',
    favoriteId: '3',
    name: 'testuser3',
    password: '123',
    hashedRt: '',
  },
  {
    id: 'testuser4',
    email: 'eee@eee.com',
    favoriteId: '4',
    name: 'testuser4',
    password: '123',
    hashedRt: '',
  },
]
