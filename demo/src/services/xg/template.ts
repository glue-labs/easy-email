import axios, { AxiosRequestConfig } from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
});

export const request = {
  async get<T>(url: string, config?: AxiosRequestConfig | undefined) {
    return axiosInstance.get<T>(url, config).then((data) => data.data);
  },
  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig | undefined
  ) {
    return axiosInstance.post<T>(url, data, config).then((data) => data.data);
  },
  async put<T>(url: string, data: any, config?: AxiosRequestConfig | undefined) {
    return axiosInstance.put<T>(url, data, config).then((data) => data.data);
  },
  async delete<T>(url: string, config?: AxiosRequestConfig | undefined) {
    return axiosInstance.delete<T>(url, config).then((data) => data.data);
  },
};

export const template = {
  async getTemplateList(): Promise<ITemplate[]> {
    return request.get<Array<ITemplate>>('/templates');
  },
  async getTemplateById(id: string): Promise<ITemplate> {
    return request.get<ITemplate>('/templates/' + id);
  }
};

export interface ListResponse<T> {
  list: T[];
  count: number;
}

export interface ITemplate {
  name: string;
  useCase: string;
  category: string;
  templatehtml?: any;
  templateJson?: any;
  templateMjml?: any;
  imagePreview?: string;
  createdAt: string;
  updatedAt: string;
}
