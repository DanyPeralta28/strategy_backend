import { NestFactory} from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { DateInterceptor } from './common/interceptors/dateTransformer.interceptor';
import { CustomInterceptor } from './common/interceptors/transform.interceptor';
import { LoggerService } from './common/logger/logger.service';

import { HttpExceptionFilter } from './common/filters/http-exception.filter';

import { appUseReadmeHTLM } from './utils/md-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  appUseReadmeHTLM()

  const configService = app.get<ConfigService>(ConfigService);
  const logger = new Logger('Bootstrap');
  
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new DateInterceptor());
  app.useGlobalInterceptors(new CustomInterceptor());  

  const apiName = configService.get('api_prefix');
  app.setGlobalPrefix(apiName);   
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: true, 
    })
  );  

  app.enableCors()
  
  const config = new DocumentBuilder()
  .setTitle('Proyecto Scallingsoft')
  .setDescription('API Proyecto Scallingsoft NestJs.')
  .setContact('', '', '')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(apiName, app, document);

  await app.listen(process.env.PORT);
  logger.log(`App running on ${ process.env.ENV }`);
  logger.log(`App running on port ${ process.env.PORT }`);
  
  if ( process.env.FILE_LOG == 'true' )
  {
    app.useLogger(['log', 'error', 'warn', 'debug', 'verbose'] ) // new LoggerService
  }
  
}

bootstrap();
