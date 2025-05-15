import { defineConfig } from '@umijs/max';
// 开发的环境变量
export default defineConfig({
     // 用来添加自定义 环境变量
  define:{
    SERVER_URL: 'http://localhost:3000'
  }
})