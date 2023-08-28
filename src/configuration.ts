import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { merge } from 'lodash';

const DEFAULT_CONFIG = 'config.yml';
const DEVELOPMENT_CONFIG = 'config.development.yml';
const PRODUCTION_CONFIG = 'config.production.yml';

const ENV = process.env.NODE_ENV;
const CURRENT = ENV === 'development' ? DEVELOPMENT_CONFIG : PRODUCTION_CONFIG;

const paramConfigByYml = (yml) => {
  const dir = join(__dirname, '../../config', yml);
  const ymlFIle = readFileSync(dir, 'utf8');
  return yaml.load(ymlFIle);
};

const C = merge(paramConfigByYml(DEFAULT_CONFIG), paramConfigByYml(CURRENT));

export default () => C;
