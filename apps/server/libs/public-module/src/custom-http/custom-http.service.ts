import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Response } from './type';

const VERSION = 'v3';

export const DEFAULT_HEADERS = {
  // origin: 'https://copymanga.site',
  referer: 'com.copymanga.app-2.1.7',
  accept: 'application/json',
  'sec-fetch-mode': 'cors',
  'sec-fetch-dest': 'empty',
  'sec-fetch-site': 'cross-site',
  source: 'copyApp',
  platform: '3',
  'user-agent': 'COPY/2.1.7',
  webp: '1',
  version: '2.1.7',
  // device: 'QSR1.210802.001',
};

@Injectable()
export class CustomHttpService {
  private instance: AxiosInstance;

  constructor() {
    const instance = axios.create({
      timeout: 3000,
      maxRedirects: 5,
      baseURL: `https://api.mangacopy.com/api/${VERSION}`,
    });

    instance.interceptors.request.use((config) => {
      const { headers } = config;
      Object.assign(headers, DEFAULT_HEADERS);
      return config;
    });
    instance.interceptors.response.use((response) => {
      return response;
    });

    this.instance = instance;
  }

  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<Response<T>> {
    return (await this.instance.delete(url, config))?.data;
  }

  async get<T = any, C = any>(
    url: string,
    config?: AxiosRequestConfig<C>,
  ): Promise<Response<T>> {
    const response = await this.instance.get(url, config);
    console.log('respone', response);
    return response?.data;
  }

  getInstance() {
    return this.instance;
  }

  async head<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<Response<T>> {
    return (await this.instance.head(url, config))?.data;
  }

  async options<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<Response<T>> {
    return (await this.instance.options(url, config))?.data;
  }

  async patch<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<Response<T>> {
    return (await this.instance.patch(url, data, config))?.data;
  }

  async post<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<Response<T>> {
    return (await this.instance.post(url, data, config))?.data;
  }

  async put<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<Response<T>> {
    return (await this.instance.put(url, data, config))?.data;
  }
}
