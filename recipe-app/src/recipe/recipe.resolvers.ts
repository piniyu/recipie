// resolvers of graphql
import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { Recipe, RecipeInput } from 'src/graphql.schema';
// import { PubSub } from 'graphql-subscriptions';
import { RecipeService } from './recipe.service';
import { RecipeInputDto } from './dto/create-recipe.dto';

// const pubSub = new PubSub();

@Resolver('Recipe')
export class RecipeResolvers {
  constructor(private readonly recipeService: RecipeService) {}

  @Query('recipeById')
  async getRecipeById(@Args('id') id: string): Promise<Recipe> {
    return this.recipeService.findById(id);
  }

  @Query('latestRecipes')
  async post(): Promise<Recipe[]> {
    return this.recipeService.getLatest();
  }

  @Mutation('createRecipe')
  async createRecipe(@Args('content') content: RecipeInputDto): Promise<Recipe> {
    return this.recipeService.create(content);
  }

  @Mutation('updateRecipe')
  async updateRecipe(@Args('id') id: string, @Args('id') content: RecipeInputDto,): Promise<Recipe> {
    return this.recipeService.update(id, content);
  }

  @Mutation('deleteRecipe')
  async delete(@Args('id') id: string): Promise<Recipe> {
    return this.recipeService.delete(id);
  }
}