import ts from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import babel from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import vue from 'rollup-plugin-vue';
import replace from '@rollup/plugin-replace';

export default [
  {
    input: 'src/packages/PrintModel/index.ts',
    output: [
      {
        file: 'dist/index.esm.js',
        format: 'es'
      },
      {
        file: 'dist/index.cjs.js',
        format: 'es'
      },
      {
        input: 'src/packages/PrintModel/index.ts',
        file: 'dist/index.js',
        format: 'umd',
        name: 'print-model'
      }
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      alias({
        entries: [
          {
            find: '@',
            replacement: new URL('./src', import.meta.url).pathname
          }
        ]
      }),
      nodeResolve(),
      commonjs(),
      ts({
        check: false // 需使用 rollup-plugin-typescript2
      }), // 而不是 @rollup/plugin-typescript
      vue(),
      postcss(),
      babel({
        // 指定 babel 处理文件类型
        babelHelpers: 'bundled', // 如果 vue 存在 jsx 语法，
        extensions: ['.js', '.vue'] // 则会从 babel.config.js, 调用 @vue/babel-plugin-jsx 处理
      })
    ],
    // 排除不需要混入代码中的第三方依赖
    external: ['vue', 'element-plus']
  }
];
