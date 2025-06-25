import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const PORT = process.env.PORT || 3003;
  await app.listen(PORT, '0.0.0.0');

  console.log(`🚀 App corriendo en http://0.0.0.0:${PORT}`);
}
bootstrap();

