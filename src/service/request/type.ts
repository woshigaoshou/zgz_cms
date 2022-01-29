import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface interceptorsConfig<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig,
  requestInterceptorCatch?: (err: any) => any,
  responseInterceptor?: (res: T) => T,
  responseInterceptorCatch?: (err: any) => any
}

export interface requestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: interceptorsConfig<T>,
  showLoading?: boolean
}
