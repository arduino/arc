import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

import pkg from './package.json';
import path from 'path';

export default [
  // generate components exports (JS + CSS)
  {
    input: pkg.source,
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
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    plugins: [
      postcss({
        plugins: [autoprefixer],
        minimize: true,
        sourceMap: true,
        extract: false,
        preserve: false,
      }),
      image(),
      resolve(),
      typescript(),
      commonjs(),
    ],
  },
  // Generate standalone themes.css file (CSS only)
  {
    input: path.resolve(__dirname, 'src/themes', 'themes.scss'),
    output: {
      file: path.resolve(__dirname, 'dist/themes', 'themes.css'),
      format: 'es'
    },
    plugins: [
      postcss({
        plugins: [autoprefixer],
        extract: true,
        preserve: true,
      }),
    ],
  }
];
