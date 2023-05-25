// 配置路由
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
// 使用插件
Vue.use(VueRouter);

// 重写路由方法
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;

// 重写push和replace方法去除控制台的警告信息
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

// 引入路由配置
import routes from '@/router/routes'

let router = new VueRouter({
    // 配置路由
    routes,
    // 路由滚动
    scrollBehavior() {
        return { y: 0 }
    }
})

// 路由守卫
router.beforeEach(async (to, form, next) => {
    let userInfo = store.state.user.userInfo.name;
    let token = localStorage.getItem('token')
    // 已登录
    if (token) {
        // 登录后还去登录页面
        if (to.path == '/login') {
            next('/')
        } else {
            if (userInfo) {
                next()
            } else {
                // 没有用户信息
                try {
                    // 获取用户信息
                    await store.dispatch("user/getUserInfo");
                    next()
                } catch (e) {
                    // token过期，清除token重新登录
                    await store.dispatch('user/getLogout');
                    alert('登录过期，请重新登录')
                    next('/login')
                }
            }
        }
    } else {
        // 未登录
        if (to.path.indexOf('/shopcart') != -1 || to.path.indexOf('/pay') != -1 || to.path.indexOf('/addcartsuccess') != -1 || to.path.indexOf('/center') != -1) {
            next(`/login?redirect=${to.path}`)
        }
        next()
    }
})


export default router;