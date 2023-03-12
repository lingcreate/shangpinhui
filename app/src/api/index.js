// api接口统一管理
import requests from "./request";
import mockRequest from './mockAjax'
import { mock } from "mockjs";

// 三级联动接口 (分别暴露)
export const reqCategoryList = () => {
    // 发请求
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get',
    })
}

// 获取banner Mock数据
export const reqBannerList = () => mockRequest.get('/banner')
export const reqFloorList = () => mockRequest.get('/floor')

// 获取搜索模块数据
export const reqSearchList = (params) => {
    return requests({
        url: '/list',
        method: 'post',
        data: params,
    })
}

// 获取商品详情
export const reqGoodDetail = (skuId) => {
    return requests({
        url: `/item/${skuId}`,
        method: 'get',
    })
}

// 加入购物车请求
export const reqAddCart = (skuId, skuNum) => {
    return requests({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: 'post'
    })
}

// 请求购物车列表
export const reqShopList = () => {
    return requests({
        url: '/cart/cartList',
        method: 'get'
    })
}

// 删除购物车商品
export const reqDeleteGood = (skuId) => {
    return requests({
        url: `/cart/deleteCart/${skuId}`,
        method: 'delete'
    })
}

// 购物车选中状态
export const reqChangeChecked = (skuId, isChecked) => {
    return requests({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: 'get'
    })
}

// 注册获取验证码
export const reqRegisterCode = (phone) => {
    return requests({
        url: `/user/passport/sendCode/${phone}`,
        method: 'get'
    })
}

// 完成注册
export const reqCheckRegister = (data) => {
    return requests({
        url: '/user/passport/register',
        method: 'post',
        data
    })
}

// 登录
export const reqLogin = (data) => {
    return requests({
        url: '/user/passport/login',
        method: 'post',
        data
    })
}

// 获取用户信息
export const reqUserInfo = () => {
    return requests({
        url: '/user/passport/auth/getUserInfo',
        method: 'get'
    })
}

// 退出登录
export const reqLogout = () => {
    return requests({
        url: '/user/passport/logout',
        method: 'GET'
    })
}

// 获取用户mock地址信息
export const reqUserAddress = () => {
    return mockRequest({
        url: '/user/userAddress/auth/findUserAddressList',
        method: 'get'
    })
}

// 获取订单交易页信息
export const reqTrade = () => {
    return requests({
        url: '/order/auth/trade',
        method: 'get'
    })
}

// 获取订单列表
export const reqOrderList = (page, limit) => {
    return requests({
        url: `/order/auth/${page}/${limit}`,
        method: 'get'
    })
}