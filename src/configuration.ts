import { existsSync, readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { merge } from 'lodash';
import { ConfigObject } from '@nestjs/config';
import { log } from 'console';

const DEFAULT_CONFIG = 'config.yml';
const DEVELOPMENT_CONFIG = 'config.development.yml';
const PRODUCTION_CONFIG = 'config.production.yml';
const ENV = process.env.NODE_ENV === 'development';
const CURRENT = ENV ? DEVELOPMENT_CONFIG : PRODUCTION_CONFIG;

// typeorm -c ormconfig 在无node环境下路径拼接 './src/'
// 运行环境 or 生产环境 config文件层级在root/ 拼接路径为 '..'
const prefixPath = (type: 'app' | 'config' = 'app') => {
  if (type === 'app' || (process.env.NODE_ENV && type === 'config')) {
    return '..';
  }
  if (!process.env.NODE_ENV) {
    return './src/';
  }
  return '..';
};

function getConfiguration(type: 'app' | 'config') {
  const paramConfigByYml = (yml: string): ConfigObject => {
    const dir = join(__dirname, `${prefixPath(type)}/config`, yml);
    if (existsSync(dir)) {
      const ymlFIle = readFileSync(dir, 'utf8');
      return yaml.load(ymlFIle);
    }
    return {};
  };
  return merge(paramConfigByYml(DEFAULT_CONFIG), paramConfigByYml(CURRENT));
}

export default getConfiguration;
