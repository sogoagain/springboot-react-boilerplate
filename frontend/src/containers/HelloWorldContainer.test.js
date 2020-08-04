import React from 'react';

import { render, screen } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import HelloWorldContainer from './HelloWorldContainer';

import GREETINGS from '../__fixtures__/greetings';

import '../__mocks__/matchMedia.mock';

jest.mock('react-redux');
jest.mock('../models/HelloModel');

describe('RestaurantContainer', () => {
  const dispatch = jest.fn();

  function renderHelloWorldContainer() {
    return render(<HelloWorldContainer />);
  }

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      app: {
        greeting: '',
        greetings: GREETINGS,
        pagination: {
          pageSize: 5,
          current: 1,
          total: 0,
        },
        loading: false,
      },
    }));
  });

  it('renders hello world', async () => {
    renderHelloWorldContainer();

    expect(screen.getByText(/Say Hello!/)).toBeInTheDocument();
  });
});
