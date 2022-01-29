import { TIME_OUT, BASE_URL } from './request/config';
import { GzRequest } from './request';
import storage from '@/utils/storage';

const instance = new GzRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: config => {
      console.log('实例拦截');

      const token = storage.getCache('token');
      if (token) {
        if (!config.headers) config.headers = {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
  },
});

export default instance;
