import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from './common/common.module';
import { FeaturesModule } from './features/features.module';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IMySQLConfiguration } from './config/interfaces/env.interface';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mysqlConfig = configService.get<IMySQLConfiguration>('clientsRepository');

        return {
          type: 'mysql',
          host: mysqlConfig.host,
          port: mysqlConfig.port,
          username: mysqlConfig.username,
          password: mysqlConfig.password,
          database: mysqlConfig.database,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          retryAttempts: 3,
          retryDelay: 3000,
        };
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    CommonModule,
    FeaturesModule,
  ],
})
export class AppModule {}
