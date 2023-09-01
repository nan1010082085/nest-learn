import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from './common/http/http.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import Configuration from './configuration';
import { connectionParams } from 'ormconfig';
import { UserModule } from './module/user/user.module';
import { LogsModule } from './module/logs/logs.module';
import { RolesModule } from './module/roles/roles.module';
import { AuthModule } from './module/auth/auth.module';

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
    AuthModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
