import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigModule, ConfigService } from '@nestjs/config';
import applicationConfig from 'configs/application.config';
async function loadConfig(): Promise<ConfigService> {
  const appContext = await NestFactory.createApplicationContext(
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      load: [applicationConfig],
    }),
  );

  return appContext.get<ConfigService>(ConfigService);
}


async function bootstrap() {
  const getConfig = await loadConfig();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  app.use(cookieParser());
  await app.listen(getConfig.get<number>('PORT'));
}
bootstrap();
