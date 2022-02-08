import { createStore, Store, useStore as useVuexStore } from 'vuex';
import { IRootState, IStoreType } from './types';
import login from './modules/login/login';
import system from './modules//main/system/system';

const store = createStore<IRootState>({
  state: {
    name: '',
  },
  getters: {},
  mutations: {},
  actions: {},
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
}

export default store;
