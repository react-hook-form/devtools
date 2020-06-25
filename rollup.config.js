import external from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import pkg from './package.json';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    json(),
    typescript({
      clean: true,
    }),
    commonjs(),
    resolve(),
    sourcemaps(),
  ],
};
