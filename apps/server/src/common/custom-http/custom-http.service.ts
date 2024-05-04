import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { CustomResponse } from './type';

const VERSION = 'v3';

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
      Object.assign(headers, {
        origin: 'https://copymanga.site',
        accept: 'application/json',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'sec-fetch-site': 'cross-site',
        'user-agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
      });
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
  ): Promise<CustomResponse<T>> {
    return (await this.instance.delete(url, config))?.data;
  }

  async get<T = any, C = any>(
    url: string,
    config?: AxiosRequestConfig<C>,
  ): Promise<CustomResponse<T>> {
    return (await this.instance.get(url, config))?.data;
  }

  getInstance() {
    return this.instance;
  }

  async head<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<CustomResponse<T>> {
    return (await this.instance.head(url, config))?.data;
  }

  async options<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<CustomResponse<T>> {
    return (await this.instance.options(url, config))?.data;
  }

  async patch<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<CustomResponse<T>> {
    return (await this.instance.patch(url, data, config))?.data;
  }

  async post<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<CustomResponse<T>> {
    return (await this.instance.post(url, data, config))?.data;
  }

  async put<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<CustomResponse<T>> {
    return (await this.instance.put(url, data, config))?.data;
  }
}
