import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { setup } from '../src/setup';
import dataSource from '../ormconfig';
import { DataSource } from 'typeorm';
import { log } from 'console';

export interface UseAppFactoryType {
  connection: DataSource;
  init: () => Promise<INestApplication>;
  initDB: () => Promise<void>;
  cleanup: () => Promise<void>;
  destroy: () => Promise<void>;
}

/**
 * 实例化Nest、数据库、
 * @param init     初始化nest app
 * @param initDB   初始化数据库
 * @param cleanup  清楚数据库数据
 * @param destroy  数据库注销
 * @returns {UseAppFactoryType}
 */
export function useAppFactory(): UseAppFactoryType {
  let app: INestApplication;
  let connection: DataSource;

  // 初始化App
  const init = async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    setup(app);

    await app.init();

    app.listen(3000);

    return app;
  };

  // 初始化数据库
  const initDB = async () => {
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }
    connection = dataSource;
  };

  // 清空数据
  const cleanup = async () => {
    const entities = connection.entityMetadatas;
    for (const entity of entities) {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    }
  };

  const destroy = async () => {
    connection.destroy();
  };

  return {
    connection,
    init,
    initDB,
    cleanup,
    destroy,
  };
}
