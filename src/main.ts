import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Enable CORS
    app.enableCors({
      origin: 'http://localhost:5173',
      methods: '*',
      allowedHeaders: 'Authorization, Content-Type, Accept',
    });
  
  await app.listen(3000);
}
bootstrap();
