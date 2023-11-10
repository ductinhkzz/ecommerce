import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';
import { validationOptions } from './validators';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.get('FE_CORS').split(','),
    credentials: true,
  });
  app.use(cookieParser());
  app.enableShutdownHooks();
  app.setGlobalPrefix(configService.get<string>('API_PREFIX'));
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT ?? 5500);
}
bootstrap();
