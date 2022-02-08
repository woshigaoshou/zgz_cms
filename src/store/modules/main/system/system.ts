import { Module } from 'vuex';
import { IRootState } from '@/store/types';
import { ISystemModule, IPageListPayload } from './types';
import { getPageInfo } from '@/service/main/system/system';

const pageUrlMap = {
  user: '/users/list',
  role: '/role/list',
};

const systemModule: Module<ISystemModule, IRootState> = {
  namespaced: true,
  state: {
    userList: [],
    userCount: 0,
    roleList: [],
    roleCount: 0,
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => (state as any)[`${pageName}List`];
    },
    pageListCount(state) {
      return (pageName: string) => (state as any)[`${pageName}Count`];
    },
  },
  mutations: {
    changeUserList(state, userList: any) {
      state.userList = userList;
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount;
    },
    changeRoleList(state, roleList: any) {
      state.roleList = roleList;
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount;
    },
  },
  actions: {
    async getPageInfo({ commit }, payload: IPageListPayload) {
      const pageUrl = (pageUrlMap as any)[`${payload.pageName}`];
      console.log(pageUrl);

      const pageInfo = await getPageInfo(pageUrl, payload.queryInfo);
      const { list, totalCount } = pageInfo.data;

      const changePageName =
        payload.pageName.slice(0, 1).toUpperCase() + payload.pageName.slice(1);
      commit(`change${changePageName}List`, list);
      commit(`change${changePageName}Count`, totalCount);
    },
  },
};

export default systemModule;
