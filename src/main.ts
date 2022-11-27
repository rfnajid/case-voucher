import { NestApplication, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app/app.module';

const envPath = process.env.NODE_ENV ? '.env.' + process.env.NODE_ENV : '.env';
require('dotenv').config({ path: envPath });

export const SWAGGER_API_ROOT = 'swagger';
export const SWAGGER_API_NAME = 'API';
export const SWAGGER_API_DESCRIPTION = 'API Vouchers Documentation';
export const SWAGGER_API_CURRENT_VERSION = '1.0';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(
    AppModule
  );

  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document);
  app.enableCors();

  await app.listen(parseInt(process.env.PORT), '0.0.0.0');
}
bootstrap();