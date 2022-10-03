// resolvers of graphql
import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { User } from 'src/graphql.schema';
import { UserInputDto } from './dto/user-input.dto';
import { UsersService } from './user.service';

// const pubSub = new PubSub();

@Resolver('User')
export class RecipeResolvers {
  constructor(private readonly userService: UsersService) {}

  @Query('findUserById')
  async getUserById(@Args('id') id: string): Promise<User | undefined> {
    return this.userService.findOneById(id);
  }

  @Query('findUserByEmail')
  async getUserByEmail(@Args('email') email: string): Promise<User | undefined> {
    return this.userService.findOneByEmail(email);
  }

  @Mutation('createUser')
  async createRecipe(@Args('input') input: UserInputDto): Promise<User> {
    return this.userService.create(input);
  }

  // @Mutation('updateRecipe')
  // async updateRecipe(@Args('id') id: string, @Args('id') content: RecipeInputDto,): Promise<Recipe> {
  //   return this.recipeService.update(id, content);
  // }

  // @Mutation('deleteRecipe')
  // async delete(@Args('id') id: string): Promise<Recipe> {
  //   return this.recipeService.delete(id);
  // }
}