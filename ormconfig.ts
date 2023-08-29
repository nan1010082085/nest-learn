import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import configuration from 'src/configuration';
import { ConfigDbEnum } from 'src/enum/db.enum';
import { DataSource, DataSourceOptions } from 'typeorm';

function connectionOptions() {
  const config = (key: string) => configuration()['db'][key];
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
    logging: process.env.NODE_ENV === 'development',
  } as TypeOrmModuleOptions;
}

const connectionParams = connectionOptions();

export { connectionParams };
export default new DataSource({
  ...connectionParams,
  migrations: ['src/migrations/**'],
  subscribers: [],
} as DataSourceOptions);
