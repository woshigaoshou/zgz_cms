import { Module } from 'vuex';
import {
  accountLogin,
  fetchUserInfo,
  fetchUserMenus,
} from '@/service/login/login';
import { ILoginState } from './types';
import { IRootState } from '../../types';
import storage from '@/utils/storage';
import router from '@/router';
import { handleRoutes, mapMenusToPermissions } from '@/utils/handleRoutes';

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: [],
    };
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus;
      const routes = handleRoutes(userMenus);
      routes.forEach(route => {
        // console.log(route);

        router.addRoute('main', route);
      });

      // 获取用户按钮的权限
      const permissions = mapMenusToPermissions(userMenus);
      state.permissions = permissions;
    },
  },
  actions: {
    async loginAction({ commit, dispatch }, payload) {
      // console.log(payload);
      // console.log('action');
      const loginResult = await accountLogin(payload);
      const { id, token } = loginResult.data;
      commit('changeToken', token);
      storage.setCache('token', token);
      dispatch('getInitialDataAction', null, { root: true });

      const userInfoResult = await fetchUserInfo(id);
      const userInfo = userInfoResult.data;
      commit('changeUserInfo', userInfo);
      storage.setCache('userInfo', userInfo);

      const userMenusResult = await fetchUserMenus(id);
      const userMenus = userMenusResult.data;
      commit('changeUserMenus', userMenus);
      storage.setCache('userMenus', userMenus);

      router.replace('/main');
    },
    loadLoginInfo({ commit, dispatch }, payload) {
      const token = storage.getCache('token');
      if (token) {
        commit('changeToken', token);
        dispatch('getInitialDataAction', null, { root: true });
      }

      const userInfo = storage.getCache('userInfo');
      if (userInfo) commit('changeUserInfo', userInfo);

      const userMenus = storage.getCache('userMenus');
      if (userMenus) commit('changeUserMenus', userMenus);
    },
  },
};

export default loginModule;
