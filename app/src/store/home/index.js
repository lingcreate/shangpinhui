// home模块的小仓库
import Vue from 'vue'
import Vuex from 'vuex'

// 引入api
import { reqCategoryList, reqBannerList, reqFloorList } from "@/api";

Vue.use(Vuex);
// 仓库数据存储的地方
const state = {
    // 三级联动数据
    categoryList: [],
    bannerList: [],
    floorList: [],
};
// 完成业务逻辑，也可以处理异步
const actions = {
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data)
        }
    },
    async bannerList({ commit }) {
        let result = await reqBannerList();
        if (result.code == 200) {
            commit("BANNERLIST", result.data)
        }
    },
    async floorList({ commit }) {
        let result = await reqFloorList();
        if (result.code == 200) {
            commit("FLOORLIST", result.data)
        }
    }
};
// mutations 修改state的唯一手段
const mutations = {
    CATEGORYLIST(state, data) {
        state.categoryList = data;
        // api获取到的数据中多了一个“运动健康”,设置数组长度进行删减
        state.categoryList.length = 16;
    },
    BANNERLIST(state, data) {
        state.bannerList = data;
    },
    FLOORLIST(state, data) {
        state.floorList = data;
    }
};
// 可以理解为计算属性，让组件获取仓库的数据更加方便
const getters = {}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}