import reducer, {
  setGreeting,
  setGreetings,
  setPagination,
  setLoading,
} from './appSlice';

import GREETINGS from '../__fixtures__/greetings';

describe('app reducers', () => {
  describe('setGreeting', () => {
    it('changes main greeting', () => {
      const initial = {
        greeting: '',
      };

      const state = reducer(initial, setGreeting('안녕!'));

      expect(state.greeting).toBe('안녕!');
    });
  });

  describe('setGreetings', () => {
    it('changes greeting list', () => {
      const initial = {
        greetings: [],
      };

      const state = reducer(initial, setGreetings(GREETINGS));

      expect(state.greetings).toEqual(GREETINGS);
    });
  });

  describe('setPagination', () => {
    it('changes pagination', () => {
      const initial = {
        pagination: {
          pageSize: 5,
          current: 1,
          total: 0,
        },
      };

      const pagination = {
        pageSize: 10,
        current: 2,
        total: 30,
      };

      const state = reducer(initial, setPagination({ ...pagination }));

      expect(state.pagination).toEqual(pagination);
    });
  });

  describe('setLoading', () => {
    it('changes loading state', () => {
      const initial = {
        loading: false,
      };

      const loading = true;

      const state = reducer(initial, setLoading(loading));

      expect(state.loading).toBe(loading);
    });
  });
});
