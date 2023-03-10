// user登录、注册仓库
import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex)

import { reqRegisterCode, reqCheckRegister, reqLogin, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'
const state = {
    code: '',
    token: getToken(),
    userInfo: {}
}
const actions = {
    // 获取验证码
    async getRegisterCode({ commit }, phone) {
        let result = await reqRegisterCode(phone);
        if (result.code == 200) {
            commit('GETREGISTERCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject('请求失败')
        }
    },

    // 检查注册
    async getCheckRegister({ commit }, data) {
        let result = await reqCheckRegister(data)
        if (result.code == 200) {
            return '注册成功'
        } else {
            return Promise.reject(result.message)
        }
    },

    // 登录
    async postLogin({ commit }, data) {
        let result = await reqLogin(data)
        console.log(result);
        if (result.code == 200) {
            // 本地存储token
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject('密码或账号错误')
        }
    },

    // 获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            commit('GETUSERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject('token过期，获取用户信息失败')
        }
    },

    // 退出登录
    async getLogout({ commit }) {
        let result = await reqLogout()
        if (result.code == 200) {
            // 清除本地数据
            commit('GETLOGOUT')
            return 'ok'
        } else {
            return Promise.reject(new Error)
        }
    }
}
const mutations = {
    // 验证码
    GETREGISTERCODE(state, data) {
        state.code = data
    },
    // 用户信息
    GETUSERINFO(state, data) {
        state.userInfo = data;
    },
    // 退出登录
    GETLOGOUT(state) {
        removeToken();
        state.token = ''
        state.userInfo = {}
    }

}
const getters = {}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}