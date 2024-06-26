import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { AlbumsModule } from './modules/albums/albums.module';
import { TodosModule } from './modules/todos/todos.module';
import { JsonplaceholderModule } from './common/services/jsonplaceholder/jsonplaceholder.module';
import configuration from './config/configuration';
import { graphqlMiddleware } from './common/middlewares/graphql.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      playground: true,
      introspection: true,
      // definitions: {
      //   path: join(process.cwd(), 'src/graphql.ts'),
      //   outputAs: 'class'
      // },
    }),
    UserModule,
    PostsModule,
    AlbumsModule,
    TodosModule,
    JsonplaceholderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(graphqlMiddleware)
      .forRoutes('graphql')
  }
}
