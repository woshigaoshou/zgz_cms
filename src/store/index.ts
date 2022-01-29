import { createStore } from 'vuex';
import { IRootState } from './types';
import login from './modules/login/login';

const store = createStore<IRootState>({
  state: {
    name: '',
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login,
  },
});

export default store;
