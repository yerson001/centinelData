import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const PORT = process.env.PORT ?? 3000;
  const HOST = '192.168.18.22';  // Asegúrate de que esta IP sea la correcta de tu máquina en la red

  await app.listen(PORT, HOST);  // ESTA LÍNEA DEBE ESTAR ACTIVA

  console.log(`Application is running on http://${HOST}:${PORT}`);
}
bootstrap();

