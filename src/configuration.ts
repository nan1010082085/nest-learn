import { existsSync, readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { merge } from 'lodash';
import { ConfigObject } from '@nestjs/config';

const DEFAULT_CONFIG = 'config.yml';
const DEVELOPMENT_CONFIG = 'config.development.yml';
const PRODUCTION_CONFIG = 'config.production.yml';
const ENV = process.env.NODE_ENV === 'development';
const CURRENT = ENV ? DEVELOPMENT_CONFIG : PRODUCTION_CONFIG;

// config文件在运行时路径在 root/config 由 configuration 获取path前缀为 '..'
// config在非运行时路径在 root/src/ 由 configuration 获取path前缀为 './src/'
const prefixPath = (type: 'app' | 'config' = 'app') => {
  if (type === 'app' || (process.env.NODE_ENV && type === 'config')) {
    return '..';
  }
  if (!process.env.NODE_ENV) {
    return '.';
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
