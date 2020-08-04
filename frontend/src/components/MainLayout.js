import React from 'react';

import { Layout } from 'antd';

const { Content, Footer } = Layout;

export default function MainLayout({ children }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '0 50px' }}>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Spring Boot, React Boilerplate ©2020 Created by sogoagain
      </Footer>
    </Layout>
  );
}
