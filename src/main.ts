import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlMiddleware } from './common/middlewares/graphql.middleware';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  app.use(graphqlMiddleware)
  await app.listen(3000);
}
bootstrap();
