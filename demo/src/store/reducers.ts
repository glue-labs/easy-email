import { combineReducers } from '@reduxjs/toolkit';

import user from './user';
import template from './template';
import templateList from './templateList';
import extraBlocks from './extraBlocks';
import toast from './common/toast';
import loading from './common/loading';
import email from './email';
import component from './component';
import defaultData from './defaultData';

const rootReducer = combineReducers({
  user: user.reducer,
  template: template.reducer,
  templateList: templateList.reducer,
  extraBlocks: extraBlocks.reducer,
  toast: toast.reducer,
  email: email.reducer,
  loading: loading.reducer,
  component: component.reducer,
  defaultData: defaultData.reducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;