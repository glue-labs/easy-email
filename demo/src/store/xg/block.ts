import createSliceState from '../common/createSliceState';
import { ICustomBlock, block } from '@demo/services/xg/block';

export default createSliceState({
  name: 'block',
  initialState: null as ICustomBlock[] | null,
  reducers: {
    set: (state, action) => {
      return action.payload;
    },
  },
  effects: {
    fetch: async (state, { categoryId }) => {
      const data = await block.getBlockList({
        categoryId,
      });

      return data;
    }
  },
});
