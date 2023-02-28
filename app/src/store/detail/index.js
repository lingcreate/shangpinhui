// detail模块的小仓库
import Vue from 'vue';
import Vuex from 'vuex'
import { reqGoodDetail } from '@/api'

Vue.use(Vuex);

const state = {
    detailList: {}
};
const actions = {
    async GetDetailList({ commit }, skuId) {
        let result = await reqGoodDetail(skuId);
        if (result.code == 200) {
            commit('GETDETAILLIST', result.data)
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