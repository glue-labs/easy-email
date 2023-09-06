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
        console.log(data, 'SFF');
        data = JSON.parse(data);
        console.log(data, 'Adta');
        return data;
      } catch (error) {
        console.log('Error', error);
        throw error;
      }
    },
  }
});
