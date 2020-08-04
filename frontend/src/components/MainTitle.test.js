import React from 'react';

import { render, screen } from '@testing-library/react';

import MainTitle from './MainTitle';

describe('MainTitle', () => {
  it('renders title', () => {
    render(<MainTitle title="THIS IS TITLE" />);

    expect(screen.getByText(/THIS IS TITLE/)).toBeInTheDocument();
  });
});
