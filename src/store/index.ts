import { createStore, Store, useStore as useVuexStore } from 'vuex';
import { IRootState, IStoreType } from './types';
import login from './modules/login/login';
import system from './modules//main/system/system';
import { getPageInfo } from '@/service/main/system/system';

const store = createStore<IRootState>({
  state: {
    entireDepartment: [],
    entireRole: [],
    entireMenu: [],
  },
  getters: {},
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list.map((item: any) => ({
        ...item,
        label: item.name,
        value: item.id,
      }));
    },
    changeEntireRole(state, list) {
      state.entireRole = list.map((item: any) => ({
        ...item,
        label: item.name,
        value: item.id,
      }));
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list;
    },
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 1.请求部门和角色数据
      const departmentResult = await getPageInfo('/department/list', {
        offset: 0,
        size: 1000,
      });
      const { list: departmentList } = departmentResult.data;
      const roleResult = await getPageInfo('/role/list', {
        offset: 0,
        size: 1000,
      });
      const { list: roleList } = roleResult.data;

      const menuResult = await getPageInfo('/menu/list', {});
      const { list: menuList } = menuResult.data;

      // 2.保存数据
      commit('changeEntireDepartment', departmentList);
      commit('changeEntireRole', roleList);
      commit('changeEntireMenu', menuList);
    },
  },
  modules: {
    login,
    system,
  },
});

// export function useStore() {
//   return useVuexStore<IStoreType>();
// }

// :后面的接口，作为返回类型
export function useStore(): Store<IStoreType> {
  return useVuexStore();
}

export function setupStore() {
  store.dispatch('login/loadLoginInfo');
  // store.dispatch('getInitialDataAction');
}

export default store;
