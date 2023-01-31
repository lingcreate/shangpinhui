import Vue from 'vue'
import App from './App.vue'
// 注册全局三级联动组件
import TypeNav from "@/components/TypeNav/TypeNav.vue"
Vue.component('TypeNav', TypeNav)

Vue.config.productionTip = false

// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
new Vue({
  render: h => h(App),
  // 注册路由
  router,
  store
}).$mount('#app')
