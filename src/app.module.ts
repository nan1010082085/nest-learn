import { Global, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from './common/http/http.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import Configuration from './configuration';
import { LogsModule } from './logs/logs.module';
import { connectionParams } from 'ormconfig';
import { RolesModule } from './roles/roles.module';

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
    HttpModule.forRoot({ isGlobal: true }),
    UserModule,
    LogsModule,
    RolesModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
