import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_NAME = 'config.yml';
const defaultFilePath = join(__dirname, '../config', YAML_CONFIG_NAME);

export default () => {
  return yaml.load(readFileSync(defaultFilePath, 'utf8'));
};
