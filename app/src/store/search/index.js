// search模块的小仓库
import Vue from 'vue'
import Vuex from 'vuex'
import { reqSearchList } from '@/api';

Vue.use(Vuex);
const state = {
    searchList: {},
};
const actions = {
    // 接口要求默认参数必须至少为空对象
    async SearchList({ commit }, params = {}) {
        let result = await reqSearchList(params)
        if (result.code == 200) {
            commit('SEARCHLIST', result.data)
        }
    }
};
const mutations = {
    SEARCHLIST(state, data) {
        state.searchList = data;
    }

};
const getters = {
    attrsList(state) {
        // 网络不好时返回空对象
        return state.searchList.attrsList || {};
    },
    goodsList(state) {
        return state.searchList.goodsList;
    },
    trademarkList(state) {
        return state.searchList.trademarkList;
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}