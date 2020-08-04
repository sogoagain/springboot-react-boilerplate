import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import '../__mocks__/matchMedia.mock';

import Greetings from './Greetings';

import GREETINGS from '../__fixtures__/greetings';

const pagination = {
  size: 'small',
  pageSize: 1,
  defaultCurrent: 1,
};

describe('Greetings', () => {
  const handleChange = jest.fn();

  function renderGreetings() {
    return render(<Greetings
      greetings={GREETINGS}
      loading={false}
      pagination={pagination}
      onChange={handleChange}
    />);
  }

  beforeEach(() => {
    handleChange.mockClear();
  });

  it('renders greetings', () => {
    renderGreetings();

    expect(screen.getByRole('row', { Name: `${GREETINGS[0].id} ${GREETINGS[0].greetings}` }));
  });

  it('click page button', () => {
    renderGreetings();

    fireEvent.click(screen.getAllByRole('listitem')[2]);

    expect(handleChange).toBeCalledWith({
      current: 2,
      defaultCurrent: 1,
      pageSize: 1,
      size: 'small',
    }, {}, {}, {
      action: 'paginate',
      currentDataSource: GREETINGS,
    });
  });
});
