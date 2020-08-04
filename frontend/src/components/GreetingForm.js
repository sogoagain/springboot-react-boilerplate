import React from 'react';

import { Form, Input, Button } from 'antd';

export default function GreetingForm({ form, onSubmit }) {
  return (
    <Form
      layout="inline"
      form={form}
      onFinish={onSubmit}
      style={{
        marginBottom: '3em',
        flexWrap: 'wrap',
        textAlign: 'center',
        justifyContent: 'center',
      }}
    >
      <Form.Item
        name="greetings"
        label="greetings"
        rules={[
          {
            required: true,
            message: 'Please enter the information',
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
