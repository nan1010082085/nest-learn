import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import configuration from './src/configuration';
import * as dbEnumTs from './src/enum/db.enum';
import { log } from 'console';

function connectionOptions() {
  const config = (key: string) => configuration['db'][key];
  const entitiesDir = [__dirname + '/**/entities/*.entity{.ts,.js}'];
  return {
    type: config(dbEnumTs.ConfigDbEnum.DB_TYPE),
    host: config(dbEnumTs.ConfigDbEnum.DB_HOST),
    port: config(dbEnumTs.ConfigDbEnum.DB_PORT),
    username: config(dbEnumTs.ConfigDbEnum.DB_USERNAME),
    password: config(dbEnumTs.ConfigDbEnum.DB_PASSWORD),
    database: config(dbEnumTs.ConfigDbEnum.DB_DATABASE),
    entities: entitiesDir,
    // entities: [User, UserLogs, Roles, UserProfile],
    // 初始化使用，用于同步 schema 到数据库
    synchronize: config(dbEnumTs.ConfigDbEnum.DB_SYNC),
    // autoLoadEntities: true,
    // sql 语句错误日志
    // logging: process.env.NODE_ENV === 'development',
  } as TypeOrmModuleOptions;
}

const connectionParams = connectionOptions();

export { connectionParams };
export default new DataSource({
  ...connectionParams,
  migrations: ['src/migrations/**'],
  subscribers: [],
} as DataSourceOptions);
