// api接口统一管理
import requests from "./request";
import mockRequest from './mockAjax'

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

export const reqChangeChecked = (skuId, isChecked) => {
    return requests({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: 'get'
    })
}
