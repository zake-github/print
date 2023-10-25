import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    // 别名
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // 本地运行配置，及反向代理
  server: {
    hmr: true,
    host: '127.0.0.1',
    // host: '0.0.0.0',
    port: 9527,
    open: false // 在服务器启动时自动在浏览器中打开应用
  }
});
