import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import image from "@rollup/plugin-image";
import postcss from "rollup-plugin-postcss";

import pkg from "./package.json";

export default {
  input: pkg.source,

  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    postcss({
      plugins: [],
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
};
