// 引入路由组件
import Home from '@/views/Home/HomeIndex'
import Login from '@/views/Login/LoginIndex'
import Register from '@/views/Register/RegisterIndex'
import Search from '@/views/Search/SearchIndex'
import Detail from '@/views/Detail'

export default [
    {
        path: '/home',
        component: Home,
        meta: { show: true }
    },
    {
        path: '/login',
        component: Login,
        meta: { show: false }
    },
    {
        path: '/search/:keyword?',
        component: Search,
        meta: { show: true },
        name: 'search'
    },
    {
        path: '/register',
        component: Register,
        meta: { show: false }
    },
    {
        path: '/detail/:skuId?',
        component: Detail,
    },
    // 重定向路由
    {
        path: '/',
        redirect: '/home'
    },
]

