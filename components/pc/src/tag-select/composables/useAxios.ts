import axios, { AxiosInstance, AxiosResponse } from 'axios';

export const BASE_URL: string = process.env.NODE_ENV === 'development' ? '/api' : ''
export const $apiCustomerBaseUrl = '/api-customer'

export const createAxios = (): AxiosInstance => {
  const instance = axios.create();

  // 添加response拦截器，处理返回数据
  instance.interceptors.response.use((response: AxiosResponse) => {
    return response.data;
  }, (error) => {
    return Promise.reject(error);
  });

  return instance;
};
