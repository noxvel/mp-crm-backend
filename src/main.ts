import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { configService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  if (!configService.isProduction()) {
  
    const document = SwaggerModule.createDocument(app, new DocumentBuilder()
      .setTitle('MP API')
      .setDescription('My medical programs API')
      .setVersion('1.0')
      .addBearerAuth()
      .build());
  
    SwaggerModule.setup('docs', app, document);
  
  }
  await app.listen(configService.getPort());

}
bootstrap();