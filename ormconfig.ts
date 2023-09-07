import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dbEnumTs from './src/enum/db.enum';
import getConfiguration from './src/configuration';

function connectionOptions() {
  const config = (key: string) => getConfiguration('config')['db'][key];
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
  // migration:generate 执行和检测路径
  // 在执行 migration:generate 之前需要先执行 migration:create
  // 有了初始的 migration:create 后执行的 migration:generate 需要在更新的表（模块）xx.module 中imports:[TypeOrmModule.forFeature([Device])](导入entity)
  migrations: ['./src/migrations/**/*{.js,.ts}'],
  subscribers: [],
} as DataSourceOptions);
