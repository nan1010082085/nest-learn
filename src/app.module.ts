import { Global, Logger, Module } from '@nestjs/common';
import { TestaModule } from './testa/testa.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from './common/http/http.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Joi from 'joi';
import Configuration from './configuration';
import { ConfigDbEnum } from './enum/db.enum';
import { LogsModule } from './logs/logs.module';
import { RolosModule } from './rolos/rolos.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [Configuration],
      validationSchema: Joi.object({
        DB: Joi.object({
          DB_TYPE: Joi.string().valid('mysql', 'postgres'),
          DB_HOST: Joi.string().ip(),
          DB_PORT: Joi.number().default(3306),
          DB_USERNAME: Joi.string().required(),
          DB_PASSWORD: Joi.string().required(),
          DB_DATABASE: Joi.string().required(),
          DB_SYNC: Joi.boolean().default(false),
        }),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = (key: string) => configService.get(`db.${key}`);
        return {
          type: config(ConfigDbEnum.DB_TYPE),
          host: config(ConfigDbEnum.DB_HOST),
          port: config(ConfigDbEnum.DB_PORT),
          username: config(ConfigDbEnum.DB_USERNAME),
          password: config(ConfigDbEnum.DB_PASSWORD),
          database: config(ConfigDbEnum.DB_DATABASE),
          entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
          // entities: [User, UserLogs, Roles, UserProfile],
          // 初始化使用，用于同步 schema 到数据库
          synchronize: config(ConfigDbEnum.DB_SYNC),
          // autoLoadEntities: true,
          // sql 语句错误日志
          // logging: process.env.NODE_ENV === 'development',
        } as TypeOrmModuleOptions;
      },
    }),
    HttpModule.forRoot({ isGlobal: true }),
    LogsModule,
    UserModule,
    TestaModule,
    RolosModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
