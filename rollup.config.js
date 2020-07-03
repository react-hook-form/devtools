import { createRollupConfig } from './rollup/createRollupConfig';
import pkg from './package.json';

const name = 'index';
const umdName = 'ReactHookFormDevTools';
const options = [
  {
    name,
    umdName,
    format: 'cjs',
    env: 'development',
    input: pkg.source,
  },
  {
    name,
    umdName,
    format: 'esm',
    input: pkg.source,
  },
  {
    name,
    umdName,
    format: 'umd',
    env: 'development',
    input: pkg.source,
  },
];

export default options.map((option) => createRollupConfig(option));
