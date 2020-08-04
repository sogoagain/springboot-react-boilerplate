import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Form } from 'antd';

import MainTitle from '../components/MainTitle';
import GreetingForm from '../components/GreetingForm';
import Greetings from '../components/Greetings';

import { registerGreeting, setPagination, getGreetings } from '../features/appSlice';

export default function HelloWorldContainer() {
  const dispatch = useDispatch();
  const {
    greeting, greetings, pagination, loading,
  } = useSelector((state) => state.app);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    dispatch(registerGreeting(values));
    form.resetFields();
  };

  const handleChange = ({ current, pageSize }) => {
    dispatch(setPagination({ current, pageSize, total: pagination.total }));
    dispatch(getGreetings());
  };

  return (
    <div>
      <MainTitle title={greeting} />
      <GreetingForm
        form={form}
        onSubmit={handleSubmit}
      />
      <Greetings
        greetings={greetings}
        loading={loading}
        pagination={{
          ...pagination,
          defaultCurrent: 1,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
        onChange={handleChange}
      />
    </div>
  );
}
