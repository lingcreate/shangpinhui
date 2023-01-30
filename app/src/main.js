import Vue from 'vue'
import App from './App.vue'
// 注册全局三级联动组件
import TypeNav from "@/views/Home/TypeNav/TypeNav.vue"
Vue.component('TypeNav', TypeNav)

Vue.config.productionTip = false

// 引入路由
import router from '@/router'
new Vue({
  render: h => h(App),
  // 注册路由
  router,
}).$mount('#app')
