import createSliceState from './common/createSliceState';
import { component } from '@demo/services/component';
import { IBlockData } from 'easy-email-core';

export default createSliceState({
  name: 'templateData',
  initialState: null as Record<string, any> | null,
  reducers: {
    set: (state, action) => {
      return action.payload;
    },
  },
  effects: {
    fetchById: async (
      state,
      id: number
    ) => {
      try {
        let data = await component.getTemplateData(id);
        data = JSON.parse(data.content.content) as IBlockData;
        return data;
      } catch (error) {
        throw error;
      }
    },
  }});
