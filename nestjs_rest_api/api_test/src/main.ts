import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({
    origin: "*",
    methods: 'GET, POST, PUT, DELETE',
    credentials: true
  })
  app.useGlobalPipes(new ValidationPipe);

  //swagger 
  const options = new DocumentBuilder()
    .setTitle('hycnc-server docs')
    .setDescription('hycnc-server API description')
    .setVersion('1.0')
    .addTag('hycnc-server')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());

  await app.listen(6071, () => {
    console.log("listen 6071 port");
  });
}
bootstrap();
