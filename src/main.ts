import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlMiddleware } from './common/middlewares/graphql.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(graphqlMiddleware)
  await app.listen(3000);
}
bootstrap();
