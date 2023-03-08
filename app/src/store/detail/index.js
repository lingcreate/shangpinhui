// detail模块的小仓库
import Vue from 'vue';
import Vuex from 'vuex'
import { reqGoodDetail, reqAddCart } from '@/api'
import { CreateToken } from '@/utils/nanoid_token'


Vue.use(Vuex);

const state = {
    detailList: {},
    // 生成游客token
    uid: CreateToken(),
};
const actions = {
    async GetDetailList({ commit }, skuId) {
        let result = await reqGoodDetail(skuId);
        if (result.code == 200) {
            commit('GETDETAILLIST', result.data)
        }
    },
    async reqAddCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddCart(skuId, skuNum);
        if (result.code == 200) {
            return Promise.resolve('ok')
        } else {
            return Promise.reject(new Error)
        }
    }
};
const mutations = {
    GETDETAILLIST(state, data) {
        state.detailList = data;
    }
};
const getters = {
    categoryView() {
        return state.detailList.categoryView || {}
    },
    skuInfo() {
        return state.detailList.skuInfo || {}
    },
    spuSaleAttrList() {
        return state.detailList.spuSaleAttrList || {}
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}