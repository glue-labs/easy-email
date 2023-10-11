import { combineReducers } from '@reduxjs/toolkit';

import user from './user';
import template from './xg/template';
import block from './xg/block';
import extraBlocks from './extraBlocks';
import toast from './common/toast';
import loading from './common/loading';
import email from './email';
import component from './component';

const rootReducer = combineReducers({
  user: user.reducer,
  template: template.reducer,
  block: block.reducer,
  extraBlocks: extraBlocks.reducer,
  toast: toast.reducer,
  email: email.reducer,
  loading: loading.reducer,
  component: component.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;