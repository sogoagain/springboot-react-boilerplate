import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import { act } from 'react-dom/test-utils';

import '../__mocks__/matchMedia.mock';

import { Form } from 'antd';

import GreetingForm from './GreetingForm';

describe('GreetingForm', () => {
  const handleSubmit = jest.fn();

  function WrappedForm() {
    const [form] = Form.useForm();
    return (
      <GreetingForm
        form={form}
        onSubmit={handleSubmit}
      />
    );
  }

  beforeEach(() => {
    handleSubmit.mockClear();
  });

  it('submit greeting', async () => {
    render(<WrappedForm />);

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/greetings/), { target: { value: 'Hello world!' } });
      fireEvent.submit(screen.getByRole('button', { Name: 'Submit' }));
    });

    expect(handleSubmit).toBeCalledWith({ greetings: 'Hello world!' });
  });
});
