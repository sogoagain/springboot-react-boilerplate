import React from 'react';

import { Result } from 'antd';

import { SmileOutlined } from '@ant-design/icons';

export default function MainTitle({ title }) {
  return (
    <Result
      icon={<SmileOutlined />}
      title={title}
      subTitle="Say Hello!"
    />
  );
}
