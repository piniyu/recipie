import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UsersResolvers } from './users.resolvers'
import { UsersService } from './users.service'

@Module({
  providers: [UsersResolvers, UsersService],
  imports: [PrismaModule],
  exports: [UsersService],
})
export class UsersModule {}
