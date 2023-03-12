import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)
import { reqUserAddress, reqTrade } from "@/api";

const state = {
    tradeInfo: {},
    address: [],
};
const actions = {
    // 获取交易信息
    async GetTrade({ commit }) {
        let result = await reqTrade();
        console.log(result);
        if (result.code == 200) {
            commit('GETTRADE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error)
        }
    },

    // 获取用户地址信息
    async GetUserAddress({ commit }) {
        let result = await reqUserAddress()
        console.log(result);
        if (result.code == 200) {
            commit('GETUSERADDRESS', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error)
        }
    }
};
const mutations = {
    GETTRADE(state, data) {
        state.tradeInfo = data
    },
    GETUSERADDRESS(state, data) {
        state.address = data
    }
};
const getters = {};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}