import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import getConfiguration from './configuration';
import { connectionParams } from '../ormconfig';
import { JwtAuthGuard } from './guards/jwt.guard';
import modules from './module';
import dynamicModules from './dynamic-module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [() => getConfiguration('app')],
      validationSchema: Joi.object({
        DB: Joi.object({
          DB_TYPE: Joi.string().valid('mysql', 'postgres'),
          DB_HOST: Joi.alternatives().try(
            Joi.string().ip(),
            Joi.string().domain(),
          ),
          DB_PORT: Joi.number().default(3306),
          DB_USERNAME: Joi.string().required(),
          DB_PASSWORD: Joi.string().required(),
          DB_DATABASE: Joi.string().required(),
          DB_SYNC: Joi.boolean().default(false),
        }),
      }),
    }),
    TypeOrmModule.forRoot(connectionParams),
    ...dynamicModules,
    ...modules,
  ],
  controllers: [],
  providers: [
    // 在任意模块中使用下列KEY都可以注册全局守卫
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
  exports: [],
})
export class AppModule {}
