/* eslint-disable react-hooks/rules-of-hooks */
import Vue from 'vue';
import vuex from 'vuex';
import { Store } from './store';
import { useAlert, useForm } from './hook';
import axios from 'axios';

Vue.use(vuex);

export default new vuex.Store({
  state: {
    dbUrl: 'http://bpcp.liansoft.co.kr:8080/admin',
    loginYN: false,
    loginUser: {},
    userAuthority: [],
    isProgress: false,
    progressPercent: 0,
  },
  mutations: {
    setLoginYN: (state, payload) => state.loginYN = payload,
    setLoginUser: (state, payload) => state.loginUser = payload,
    setUserAuthority: (state, payload) => state.userAuthority = payload,
    setIsProgress: (state, payload) => state.isProgress = payload,
    setProgressPercent: (state, payload) => state.progressPercent = payload,
  },
  actions: {
    setLoginYN: ({ state, commit, dispatch }, payload) => {

      axios.post(state.dbUrl + '/LOGIN', useForm(payload)).then(({data}) => {
        console.log(data);
        if (!data.RESULT) return useAlert.error('로그인', data.DESCRIPTION);

        // LOGIN SUCCESS
        useAlert.success('로그인', data.MNGR_NM + '님 환영합니다.');
        Store.getMenu();
        commit('setLoginYN', true);
      });
    },
    setUserAuthority: ({ commit }, payload) => {
      
    },
    sessionFail: ({ commit }) => {
      useAlert.info('로그아웃', '로그아웃되었습니다.');
      console.log('세션이 만료되었습니다.');
      commit('setLoginYN', false);
    },
    setIsProgress: ({ commit }, payload) => commit('setIsProgress', payload),
    setProgressPercent: ({ commit }, payload) => commit('setProgressPercent', payload),
  }
});

