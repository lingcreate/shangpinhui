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
import { MessageBox, Form, FormItem, Input, Button, Checkbox } from 'element-ui';
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Checkbox)
// 懒加载插件
import VueLazyload from 'vue-lazyload'
import lazyImg from "@/assets/images/lazyImg.gif"
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: lazyImg,
})

new Vue({
  render: h => h(App),
  beforeCreate() {
    // 注册全局事件总线
    console.log('this', this);
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API
    Vue.prototype.$msgbox = MessageBox
    Vue.prototype.$alert = MessageBox.alert
  },
  // 注册路由
  router,
  store,
}).$mount('#app')