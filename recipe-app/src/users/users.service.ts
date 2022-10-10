import {
    BadRequestException,
    forwardRef,
    Inject,
    Injectable,
  } from '@nestjs/common';
// import { AuthService } from '../auth/auth.service';
import { User as PrismaUser } from '@prisma/client';
import { UserInput } from './dto/user-input.dto';
// import { GQLRecipe } from 'src/recipe/recipe.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './models/user.model';

// export type GQLUser = {
//   id: string,
//   email: string,
//   name: string | null,
// }

// export type User = any;
  
@Injectable()
export class UsersService {
constructor(
    private prisma: PrismaService,
//   private authService: AuthService,
) {
}

private readonly users = [
  {
    userId: 1,
    username: 'john',
    password: 'changeme',
  },
  {
    userId: 2,
    username: 'maria',
    password: 'guess',
  },
];

// async findOne(username: string): Promise<User | undefined> {
//   return this.users.find(user => user.username === username);
// }

/**
 * Creates a user
 *
 * @param {CreateUserInput} createUserInput username, email, and password. Username and email must be
 * unique, will throw an email with a description if either are duplicates
 * @returns {Promise<UserDocument>} or throws an error
 * @memberof UsersService
 */
async create(createUserInput: UserInput): Promise<User> {
  const {email, name, password } = createUserInput
  const existingUser = await this.prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    throw new Error('This email address has been registered.')
  }
  const createdUser = await this.prisma.user.create({
    data: {
        email,
        name,
        password,
    }
  })
  return this._parse(createdUser);
}

async findOneById(id: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUniqueOrThrow({
        where: { id },
    })
    if (user === undefined){
      return undefined
    }
    return this._parse(user)
}
// ---------------------------------------------------------
/**
 * Returns a user by their unique email address or undefined
 *
 * @param {string} email address of user, not case sensitive
 * @returns {(Promise<UserDocument | undefined>)}
 * @memberof UsersService
 */
async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUniqueOrThrow({
        where: { email },
    })
    if (user === undefined){
      return undefined
    }
    return this._parse(user)
}
// ----------------------------------------------------------
/**
 * Deletes all the users in the database, used for testing
 *
 * @returns {Promise<void>}
 * @memberof UsersService
 */
// async deleteAllUsers(): Promise<void> {
//     await this.userModel.deleteMany({});
// }

_parse(prismaUser: PrismaUser): User {
  return {
    id: prismaUser.id,
    email: prismaUser.email,
    name: prismaUser.name != null? prismaUser.name: undefined,
  }
}

}
