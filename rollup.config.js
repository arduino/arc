import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';
import scss from 'rollup-plugin-scss';
import autoprefixer from 'autoprefixer';
import styles from "rollup-plugin-styles";

import pkg from './package.json';
import path from "path";

export default [{
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
      // scss({
      //   include: ["/**/themes/index.scss"],
      //   output: `${pkg.files}/themes/style.css` ,
      // }),
      postcss({
        plugins: [autoprefixer],
        minimize: true,
        sourceMap: true,
        extract: true,
        preserve: true,
      }),
      image(),
      resolve(),
      typescript(),
      commonjs(),
    ],
  },
  {
    input: path.resolve(__dirname, 'src/themes', 'themes.js'),
    output: {
      file: path.resolve(__dirname, 'dist/themes', 'themes.js'),
      format: 'es'
    },
    plugins: [ // rollup plugins
      styles ({
        plugins: [autoprefixer({/* your options */})], // postcss plugins
      }),
    ],
  }
  
  // {
  //   input: path.resolve(__dirname, 'src/themes', 'themes.scss'),
  //   // output: {
  //     // file: path.resolve(__dirname, 'dist/themes', 'themes'),
  //     // format: 'es'
  //   // },
  //   plugins: [
  //     scss(
  //       {
  //         include: ["/**/themes/themes.scss"],
  //         output: `dist/themes/themes.css`,
  //         //processor: () => postcss([autoprefixer()]),
  //         includePaths: [
  //           path.join(__dirname, '../../node_modules/'),
  //           'node_modules/'
  //         ]
  //       }
  //     )
  //   ]
  // }
];