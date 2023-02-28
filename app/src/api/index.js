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