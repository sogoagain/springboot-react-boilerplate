import React from 'react';

import { render, screen } from '@testing-library/react';

import MainLayout from './MainLayout';

describe('MainLayout', () => {
  function renderMainLayout() {
    render(
      <MainLayout>
        <p>
          Hello World!
        </p>
      </MainLayout>,
    );
  }

  it('renders children', () => {
    renderMainLayout();

    expect(screen.getByText(/Hello World/)).toBeInTheDocument();
  });
});
