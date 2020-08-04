import { createSlice } from '@reduxjs/toolkit';

import HelloModel from '../models/HelloModel';

const { actions, reducer } = createSlice({
  name: 'app',
  initialState: {
    greeting: '',
    greetings: [],
    pagination: {
      pageSize: 5,
      current: 1,
      total: 0,
    },
    loading: false,
  },
  reducers: {
    setGreeting: (state, { payload: greeting }) => ({
      ...state,
      greeting,
    }),

    setGreetings: (state, { payload: greetings }) => ({
      ...state,
      greetings: [...greetings],
    }),

    setPagination: (state, { payload: { current, total, pageSize } }) => ({
      ...state,
      pagination: {
        ...state.pagination,
        pageSize,
        current,
        total,
      },
    }),

    setLoading: (state, { payload: loading }) => ({
      ...state,
      loading,
    }),
  },
});

export const {
  setGreeting,
  setGreetings,
  setPagination,
  setLoading,
} = actions;

export function getGreeting() {
  return async (dispatch) => {
    const { greetings } = await HelloModel.get(1);
    dispatch(setGreeting(greetings));
  };
}

export function getGreetings() {
  return async (dispatch, getState) => {
    const { app: { pagination } } = getState();

    dispatch(setLoading(true));

    // eslint-disable-next-line camelcase
    const { _embedded: { hello_list }, page } = await HelloModel.list({
      size: pagination.pageSize,
      page: pagination.current,
    });

    dispatch(setGreetings(hello_list));
    dispatch(setLoading(false));
    dispatch(setPagination({
      current: page.number + 1,
      total: page.total_elements,
      pageSize: pagination.pageSize,
    }));
  };
}

export function registerGreeting(values) {
  return async (dispatch) => {
    await HelloModel.add(values);
    dispatch(getGreetings());
  };
}

export default reducer;
