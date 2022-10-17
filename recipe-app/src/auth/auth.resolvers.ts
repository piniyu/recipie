// resolvers of graphql
import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { UserInput } from 'src/users/dto/user-input.dto';
import { AuthService } from './auth.service';
import { LoginResult } from './interfaces/login.model';
import { Tokens } from './interfaces/tokens.model';


@Resolver('Auth')
export class AuthResolvers {
  constructor(private readonly authService: AuthService) {}

  @Query(returns => LoginResult)
  async login(@Args('loginAttempt') loginAttempt: UserInput): Promise<LoginResult | undefined> {
    return this.authService.login(loginAttempt);
  }

  @Query(returns => Boolean)
  async logout(@Args('userId') userId: string): Promise<Boolean> {
    return this.authService.logout(userId);
  }

  @Mutation(returns => Tokens)
  async signUp(@Args('signUpInput') signUpInput: UserInput): Promise<Tokens> {
    return this.authService.signUp(signUpInput);
  }

  @Mutation(returns => Tokens)
  async renewTokens(@Args('userId') userId: string, @Args('rt') rt: string): Promise<Tokens> {
    return this.authService.refreshTokens(userId, rt);
  }

  // @Mutation('deleteRecipe')
  // async delete(@Args('id') id: string): Promise<Recipe> {
  //   return this.recipeService.delete(id);
  // }
}