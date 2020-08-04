import React from 'react';

import { render, screen } from '@testing-library/react';

import NotFound from './NotFound';

describe('NotFound', () => {
  it('renders message', () => {
    render(<NotFound />);

    expect(screen.getByText(/Sorry, the page you visited does not exist./)).toBeInTheDocument();
  });
});
