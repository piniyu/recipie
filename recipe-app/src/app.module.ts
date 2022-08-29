import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CatsController } from './cats/cats.controller';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      playground: false,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
    }),
  ],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}
