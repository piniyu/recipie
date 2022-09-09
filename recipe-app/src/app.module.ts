import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CatsController } from './cats/cats.controller';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'), // to automatically generate ts definition
        outputAs: 'class',
      },
      debug: false,
      playground: false,
    }),
  ],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}
