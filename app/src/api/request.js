// 对于axios进行二次封装
import axios from 'axios'
// 引入进度条插件
import nprogress from 'nprogress'
// 引入进度条样式
import "nprogress/nprogress.css"
import store from '@/store'

// 1、利用axios对象的方法create，创建axios实例
const requests = axios.create({
    baseURL: '/api',
    timeout: 5000,
})

// 添加请求拦截器
requests.interceptors.request.use((config) => {
    // config 配置对象，对象里面headers很重要
    nprogress.start()
    // if (localStorage.getItem('user_token')) {
    //     config.headers.userTempId = localStorage.getItem('user_token')
    // }
    // 将游客token添加到请求头中
    if (store.state.detail.uid) config.headers.userTempId = store.state.detail.uid
    return config;
})

// 添加响应拦截器
requests.interceptors.response.use((res) => {
    // 成功的回调函数：服务器响应的数据回来以后，响应拦截器可以检测到并处理一些事情
    nprogress.done()
    return res.data
}, (err) => {
    // 响应失败的回调函数
    return Promise.reject(new Error(err))
})


// 对外暴露
export default requests;