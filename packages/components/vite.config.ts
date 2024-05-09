/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config https://vitest.dev/config
export default defineConfig({
  plugins: [react(), tsconfigPaths(), dts()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: '.vitest/setup',
    include: ['**/test.{ts,tsx}']
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'main',
      // the proper extensions will be added
      fileName: 'main',
      formats: ['es']
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom'] // 外部依赖
      // output: [
      // Provide global variables to use in the UMD build
      // for externalized deps
      // {
      //   format: 'es',
      //   entryFileNames: '[name].mjs',
      //   preserveModules: true,
      //   exports: undefined,
      //   dir: resolve(__dirname, `es`),
      //   preserveModulesRoot: 'src'
      // },
      // // CommonJS 模块格式的编译
      // {
      //   format: 'cjs',
      //   entryFileNames: '[name].js',
      //   //让打包目录和我们目录对应
      //   preserveModules: true,
      //   exports: 'named',
      //   //配置打包根目录
      //   dir: resolve(__dirname, `lib`),
      //   preserveModulesRoot: 'src'
      // }
      // ]
    }
  }
});
