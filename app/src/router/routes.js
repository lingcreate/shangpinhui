// 引入一级路由组件
// import Home from '@/views/Home/HomeIndex'
// import Login from '@/views/Login/LoginIndex'
// import Register from '@/views/Register/RegisterIndex'
// import Search from '@/views/Search/SearchIndex'
// import Detail from '@/views/Detail'
// import AddCartSuccess from '@/views/AddCartSuccess'
// import ShopCart from '@/views/ShopCart'
// import Trade from '@/views/Trade'
// import Pay from '@/views/Pay'
// import PaySuccess from '@/views/PaySuccess'
// import Center from '@/views/Center'
// // 引入二级路由
// import MyOrder from '@/views/Center/MyOrder'
// import GroupOrder from '@/views/Center/GroupOrder'

const Home = () => import('@/views/Home/HomeIndex')
const Login = () => import('@/views/Login/LoginIndex')
const Register = () => import('@/views/Register/RegisterIndex')
const Search = () => import('@/views/Search/SearchIndex')
const Detail = () => import('@/views/Detail')
const AddCartSuccess = () => import('@/views/AddCartSuccess')
const ShopCart = () => import('@/views/ShopCart')
const Trade = () => import('@/views/Trade')
const Pay = () => import('@/views/Pay')
const PaySuccess = () => import('@/views/PaySuccess')
const Center = () => import('@/views/Center')
// 二级路由
const MyOrder = () => import('@/views/Center/MyOrder')
const GroupOrder = () => import('@/views/Center/GroupOrder')

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
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true }
    },
    {
        path: '/trade',
        component: Trade,
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next()
            } else {
                // 保持停留在当前路由
                console.log('不是从shopcart中进入，保持当前路由');
                next(false)
            }
        }
    },
    {
        path: '/pay',
        component: Pay,
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: { show: true }
    },
    {
        path: '/center',
        component: Center,
        children: [
            {
                path: 'myorder',
                component: MyOrder,
            },
            {
                path: 'grouporder',
                component: GroupOrder,
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ],
        meta: { show: true }
    },
    {
        // 由上至下匹配，未能找到路由
        path: '*',
        redirect: '/home'
    },

]

