import React from 'react';

import { Table } from 'antd';

export default function Greetings({
  greetings, loading, pagination, onChange,
}) {
  return (
    <Table
      columns={[
        {
          title: 'ID',
          dataIndex: 'id',
        },
        {
          title: 'GREETINGS',
          dataIndex: 'greetings',
        },
      ]}
      rowKey="id"
      dataSource={greetings}
      loading={loading}
      pagination={pagination}
      onChange={onChange}
      scroll={{ y: 'calc(45vh)' }}
    />
  );
}
