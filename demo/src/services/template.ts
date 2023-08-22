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
  async getTemplate(id: number | string, userId: number): Promise<any> {
    return request.get<any>('/components/' + id, {
      params: {
      id
      },
    });
  },
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
  templateJson?: ITemplateJson;
  templateMjml?: any;
  imagePreview?: string;
  createdAt: string;
  updatedAt: string;
}

interface IChildrenJson {
  type: string;
  data: {
    value: any;
  },
  attributes: Record<string, string>;
  children: IChildrenJson;
}

interface ITemplateJson {
  tag: string;
  name: string;
  type: string;
  defaultData: {
    type: string;
    data: {
      value: any;
    },
    attributes: Record<string, string>;
    children: IChildrenJson;
  };
  validParentType: Array<string>;
}



