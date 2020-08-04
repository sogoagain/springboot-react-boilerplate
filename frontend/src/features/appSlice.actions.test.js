import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import { getGreeting, getGreetings, registerGreeting } from './appSlice';

import HelloModel from '../models/HelloModel';

import GREETINGS from '../__fixtures__/greetings';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../models/HelloModel');

describe('app actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      app: {
        greeting: '',
        greetings: [],
        pagination: {
          pageSize: 5,
          current: 1,
          total: 0,
        },
        loading: false,
      },
    });
  });

  describe('getGreeting', () => {
    beforeEach(() => {
      HelloModel.get.mockClear();
      HelloModel.get.mockReturnValue({
        greetings: GREETINGS[0],
      });
    });

    it('get first greeting', async () => {
      await store.dispatch(getGreeting());

      expect(HelloModel.get).toBeCalledWith(1);
    });
  });

  describe('getGreetings', () => {
    beforeEach(() => {
      HelloModel.list.mockClear();
      HelloModel.list.mockReturnValue({
        _embedded: {
          hello_list: GREETINGS,
        },
        page: {
          number: 2,
          total_elements: 30,
        },
      });
    });

    it('get greeting list', async () => {
      await store.dispatch(getGreetings());

      expect(HelloModel.list).toBeCalled();
    });
  });

  describe('registerGreeting', () => {
    it('register greeting', async () => {
      await store.dispatch(registerGreeting({ greetings: '안녕!' }));

      expect(HelloModel.add).toBeCalled();
    });
  });
});
