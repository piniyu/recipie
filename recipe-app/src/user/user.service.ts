import {
    BadRequestException,
    forwardRef,
    Inject,
    Injectable,
  } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserInputDto } from './dto/user-input.dto';
import { GQLRecipe } from 'src/recipe/recipe.service';
import { PrismaService } from 'src/prisma/prisma.service';

export type GQLUser = {
  id: string,
  email: string,
  name: string | null,
}
  
@Injectable()
export class UsersService {
constructor(
    private prisma: PrismaService,
//   private authService: AuthService,
) {

}

/**
 * Creates a user
 *
 * @param {CreateUserInput} createUserInput username, email, and password. Username and email must be
 * unique, will throw an email with a description if either are duplicates
 * @returns {Promise<UserDocument>} or throws an error
 * @memberof UsersService
 */
async create(createUserInput: UserInputDto): Promise<GQLUser> {
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
  return createdUser;
}

async findOneById(id: string): Promise<GQLUser | undefined> {
    return this.prisma.user.findUniqueOrThrow({
        where: { id },
    })
}
// ---------------------------------------------------------
/**
 * Returns a user by their unique email address or undefined
 *
 * @param {string} email address of user, not case sensitive
 * @returns {(Promise<UserDocument | undefined>)}
 * @memberof UsersService
 */
async findOneByEmail(email: string): Promise<GQLUser | undefined> {
    return this.prisma.user.findUniqueOrThrow({
        where: { email },
    })
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
}
