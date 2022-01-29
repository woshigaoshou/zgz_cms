import { createApp } from 'vue';
import { globalRegister } from '@/global';
import 'normalize.css';
import '@/assets/css/index.scss';
import App from './App.vue';
import router from '@/router/index';
import store from '@/store/index';
// import instance from '@/service/index';

const app = createApp(App);
// registerApp(app);
app.use(globalRegister);
app.use(router);
app.use(store);

app.mount('#app');

store.dispatch('login/loadLoginInfo');

// instance.request({
//   url: '/goods',
//   method: 'GET',
//   headers: {},
//   interceptors: {
//     requestInterceptor: config => {
//       console.log('单独请求的config');
//       if (!config.headers) config.headers = {};
//       config.headers['token'] = '1123';
//       return config;
//     },
//   },
// });
