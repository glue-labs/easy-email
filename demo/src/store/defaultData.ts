import createSliceState from './common/createSliceState';
import { component } from '@demo/services/component';
import { IBlockData } from 'easy-email-core';

export default createSliceState({
  name: 'defaultData',
  initialState: [] as Record<string, any>,
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
        return data;
      } catch (error) {
        throw error;
      }
    },
  }
});
