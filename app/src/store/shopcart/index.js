// shopcart模块仓库
import Vue from 'vue'
import Vuex from 'vuex'
import { reqShopList, reqAddCart, reqDeleteGood, reqChangeChecked } from '@/api'

Vue.use(Vuex)
const state = {
    shopList: []
};
const actions = {
    // 服务器根据本地的token返回相应的数据
    async getShopList({ commit }) {
        let result = await reqShopList()
        if (result.code == 200) {
            commit('GETSHOPLIST', result.data)
            return '获取shopList成功'
        } else {
            return Promise.reject('获取失败')
        }
    },
    // 在购物车页面进行修改购物数量
    async getAddCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddCart(skuId, skuNum)
        if (result.code == 200) {
            return '修改数量成功'
        } else {
            return Promise.reject(new Error)
        }
    },

    // 删除单个商品
    async deleteGood({ commit }, skuId) {
        let result = await reqDeleteGood(skuId)
        if (result.code == 200) {
            return '删除成功'
        } else {
            return Promise.reject(new Error)
        }
    },

    // 删除选中的商品
    async deleteSelected({ dispatch, getters }) {
        let promiseArr = []
        getters.cartInfoList.cartInfoList.forEach(item => {
            // 遍历商品数组，对选中的商品进行派发删除
            if (item.isChecked == 1) {
                let result = dispatch('deleteGood', item.skuId)
                promiseArr.push(result)
            }
        })
        return Promise.all(promiseArr)
    },

    // 修改产品选中状态
    async ChangeChecked({ commit }, { skuId, isChecked }) {
        let result = await reqChangeChecked(skuId, isChecked)
        if (result.code == 200) {
            return 'changed success'
        } else {
            return Promise.reject(new Error('change fault'))
        }
    },

    // 点击全选
    ChangeAllChecked({ dispatch, getters }, isChecked) {
        let goods = getters.cartInfoList.cartInfoList;
        let promiseArr = []
        goods.forEach((item) => {
            // 商品的状态与全选框状态不同才发送请求（通过判断减少不必要的请求）
            if (item.isChecked != isChecked) {
                // 这里不需要await，所有的promise状态会在promise.all里面判断
                let result = dispatch('ChangeChecked', { skuId: item.skuId, isChecked });
                promiseArr.push(result)
            }
        })
        return Promise.all(promiseArr)
    }
}

const mutations = {
    GETSHOPLIST(state, data) {
        state.shopList = data
    },
}
const getters = {
    cartInfoList(state) {
        return state.shopList[0] || {};
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}