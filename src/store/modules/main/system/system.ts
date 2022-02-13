import { Module } from 'vuex';
import { IRootState } from '@/store/types';
import {
  ISystemModule,
  IPageListPayload,
  IPageDataDeletePayLoad,
} from './types';
import {
  getPageInfo,
  deletePageData,
  createPageData,
  editPageData,
} from '@/service/main/system/system';

const pageUrlMap = {
  users: '/users/list',
  role: '/role/list',
  goods: '/goods/list',
  menu: '/menu/list',
};

const systemModule: Module<ISystemModule, IRootState> = {
  namespaced: true,
  state: {
    usersList: [],
    usersCount: 0,
    roleList: [],
    roleCount: 0,
    goodsList: [],
    goodsCount: 0,
    menuList: [],
    menuCount: 0,
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
    changeUsersList(state, usersList: any) {
      state.usersList = usersList;
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount;
    },
    changeRoleList(state, roleList: any) {
      state.roleList = roleList;
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount;
    },
    changeGoodsList(state, goodsList: any) {
      state.goodsList = goodsList;
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount;
    },
    changeMenuList(state, menuList: any) {
      state.menuList = menuList;
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount;
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
    async deletePageData({ commit }, payload: IPageDataDeletePayLoad) {
      const { pageName, id } = payload;
      const pageUrl = `/${pageName}/${id}`;
      await deletePageData(pageUrl);
    },
    async createPageData({ dispatch }, payload: any) {
      // 1.创建数据的请求
      const { pageName, newData } = payload;
      console.log(payload);

      const pageUrl = `/${pageName}`;
      await createPageData(pageUrl, newData);
    },
    async editPageData({ dispatch }, payload: any) {
      // 1.编辑数据的请求
      const { pageName, editData, id } = payload;
      console.log(editData);
      const pageUrl = `/${pageName}/${id}`;
      await editPageData(pageUrl, editData);
    },
  },
};

export default systemModule;
