import Vue from 'vue';
import Vuex from 'vuex';
import FontAwesome from './icon';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    FontAwesome,
    isSideMenu: false,
    menuList: [],
    scrollTop: 0,
    loginYN: true,
    loginInfo: {
      id: 1,
      name: '전상욱',
      phone: '010-0000-1111',
      isStudent: false,
    },
    // dbUrl: 'http://localhost:8082',
    // dbUrl2: 'http://localhost:8083',
    // dbUrl: 'http://192.168.0.12:8082',
    // dbUrl2: 'http://192.168.0.12:8083',
    // dbUrl: 'http://192.168.0.59:8082',
    // dbUrl2: 'http://192.168.0.59:8083',
    // dbUrl: 'http://192.168.0.90:8082',
    // dbUrl2: 'http://192.168.0.90:8083',
    dbUrl: 'http://bodyscanner.iptime.org:8082',
    dbUrl2: 'http://bodyscanner.iptime.org:8083',
  },
  mutations: {
    setMenuList: (state, payload) => state.menuList = payload,
    setSideMenu: (state, payload) => state.isSideMenu = payload,
    setLoginYN: (state, payload) => state.loginYN = payload,
    setScrollTop: (state, payload) => state.scrollTop = payload,
    setIsStudent: (state, payload) => state.loginInfo = { ...state.loginInfo, isStudent: payload },
  },
  actions: {
    setMenuList: ({ commit }, payload) => commit('setMenuList', payload),
    setSideMenu: ({ commit }, payload) => commit('setSideMenu', payload),
    setLoginYN: ({ commit }, payload) => commit('setLoginYN', payload),
    setScrollTop: ({commit}, payload) => commit('setScrollTop', payload),
    setIsStudent: ({commit}, payload) => commit('setIsStudent', payload),
  }
});

export const EventBus = new Vue();

export default store;