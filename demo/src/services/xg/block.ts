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

export const block = {
  async getBlock(id: number | string, userId: number): Promise<ICustomBlock> {
    return request.get<ICustomBlock>('/components/' + id, {
      params: {
        user_id: userId,
      },
    });
  },
  async getBlockList({
    size,
    page,
    categoryId,
  }: {
    page?: number;
    size?: number;
    categoryId?: string;
  }): Promise<Array<ICustomBlock>> {
    return request.get<Array<ICustomBlock>>('/components', {
      params: {
        page,
        size,
        category_type: categoryId,
      },
    });
  },
  async updateTemplate(
    id: number,
    data: {
      templateHtml: any;
      templateMjml: any;
      templateJson: ICustomBlockJson;
      attributeJson: IAttributeJson;
      categoryId?: string;
      userId: string;
    }
  ): Promise<ICustomBlock> {
    return request.put<ICustomBlock>('/components/user/template/' + id, {
      ...data,
    });
  },
  async deleteTemplate(id: number): Promise<string> {
    return request.delete('/components/user/template/' + id);
  },
};

export interface ListResponse<T> {
  list: T[];
  count: number;
}

interface IChildrenJson {
  type: string;
  data: {
    value: any;
  },
  attributes: Record<string, string>;
  children: IChildrenJson;
}

interface ICustomBlockJson {
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

interface IAttributeJson {
  block: string;
  label: string;
  name: string;
  attribute: string;
}

export interface ICustomBlock {
  type: string;
  templateJson: ICustomBlockJson;
  attributeJson: Array<IAttributeJson>;
}
