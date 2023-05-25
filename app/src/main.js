import Vue from 'vue'
import App from './App.vue'
// 注册全局三级联动组件
import TypeNav from "@/components/TypeNav/TypeNav.vue"
import CarouseShow from "./components/Carouse/Carouse.vue";
import PagiNation from '@/components/Pagination/PagiNation.vue'
Vue.component('TypeNav', TypeNav)
Vue.component('CarouseShow', CarouseShow)
Vue.component('PagiNation', PagiNation)
Vue.config.productionTip = false
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入MockServe.js数据
import '@/mock/mockServe'
// 引入swiper样式
import 'swiper/css/swiper.css'
import * as API from '@/api'
// 引入element-ui
import { MessageBox } from 'element-ui';
new Vue({
  render: h => h(App),
  beforeCreate() {
    // 注册全局事件总线
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API
    Vue.prototype.$msgbox = MessageBox
    Vue.prototype.$alert = MessageBox.alert
  },
  // 注册路由
  router,
  store,
}).$mount('#app')