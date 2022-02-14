import Axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { interceptorsConfig, requestConfig } from './type';
import { ElLoading } from 'element-plus';
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading';

const DEFAULT_LOADING = false;

export class GzRequest {
  instance: AxiosInstance;
  interceptors?: interceptorsConfig;
  loading?: LoadingInstance;
  showLoading?: boolean;
  constructor(config: requestConfig) {
    // 创建axios实例
    this.instance = Axios.create(config);
    // 保存基本信息
    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;
    // 使用拦截器
    // 1.从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch,
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch,
    );
    // 2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      config => {
        console.log('全局请求拦截');
        if (this.showLoading) {
          this.loading = ElLoading.service({
            text: '加载中......',
            background: 'rgba(0, 0, 0, 0.5)',
          });
        }
        return config;
      },
      err => {
        console.log(err);
      },
    );
    this.instance.interceptors.response.use(
      res => {
        console.log('全局响应拦截');
        // 将loading移除
        this.loading?.close();
        return res.data;
      },
      err => {
        console.log(err);
        // 将loading移除
        this.loading?.close();
      },
    );
  }

  request<T>(config: requestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      console.log('单个请求的拦截');
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      // 2.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = false;
      }
      this.instance
        .request<any, T>(config)
        .then(res => {
          // 1.单个请求对数据的处理
          console.log(res);
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING;
          // 3.将结果resolve返回出去
          resolve(res);
        })
        .catch(err => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING;
          reject(err);
        });
    });
  }
  get<T>(config: requestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' });
  }
  post<T>(config: requestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' });
  }
  delete<T>(config: requestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' });
  }
  patch<T>(config: requestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'PATCH' });
  }
}
