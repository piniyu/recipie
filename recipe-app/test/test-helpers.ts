import { PrismaService } from '../src/prisma/prisma.service'
import { mockBotUser, mockUsers } from './_mocks_/mock-user'

class TestHelper {
  async createUsers(prisma: PrismaService) {
    await prisma.user.create({ data: mockBotUser })
    return await prisma.$transaction(
      mockUsers.map(e => prisma.user.create({ data: e })),
    )
  }
}

export const testHelper = new TestHelper()
