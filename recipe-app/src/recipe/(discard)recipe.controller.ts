import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { ListAllEntities } from './dto/list-all-entities';

@Controller('recipe')
export class RecipeController {
  @Post('create')
  create(@Body() createRecipeDto: CreateRecipeDto) {
    
    return 'This action creates a new recipe';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
