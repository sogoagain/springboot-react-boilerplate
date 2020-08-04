import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import thunk from 'redux-thunk';

import reducer from './reducer';
import history from './history';

const store = configureStore({
  reducer,
  middleware: [thunk.withExtraArgument({ history }), ...getDefaultMiddleware()],
});

export default store;
