import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RecipeResolvers } from './recipe.resolvers';
import { RecipeService } from './recipe.service';

describe('RecipeService', () => {
  let service: RecipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [RecipeResolvers, RecipeService],
        imports: [PrismaModule],
    }).compile();

    service = module.get<RecipeService>(RecipeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
