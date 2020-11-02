import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // 등록되지 않은 식별자가 오면 error
      forbidNonWhitelisted: true, // 등록되지 않은 식별자를 아예 걸러냄
      transform: true             // url을 통해 오는 값을 @Param에 연결된 변수의 형으로 바꿔줌
    })
  );
  await app.listen(3000);
}
bootstrap();
