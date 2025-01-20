import { defineConfig } from 'vite'
import { fileURLToPath, URL } from "node:url";
import { resolve, dirname } from 'node:path'
import vue from '@vitejs/plugin-vue'
import removeConsole from "vite-plugin-remove-console";
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://vite.dev/config/
export default defineConfig({
  base: "/cubfe-bpmn-template/",
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {},
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'], // 添加 .vue 后缀
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [
      vue(),
      VueI18nPlugin({
        include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**'),
        fullInstall: false,
        compositionOnly: false,
      }),
      removeConsole()
  ],
  build: {
    chunkSizeWarningLimit: 3000,
  },
  server: {
    port: 3001, // 将端口修改为你想要的，例如 3001
    host: '0.0.0.0', // 可选：设置为局域网或外网可访问
    open: true // 可选：启动开发服务器时自动打开浏览器
  }
})

