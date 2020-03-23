import React from 'react';

import {Layout} from 'antd';
import HelloWorld from '../components/HelloWorld/HelloWorld';

const {Content, Footer} = Layout;

const App = () => {
    return (
        <Layout className="Layout">
            <Content className="Content">
                <HelloWorld/>
            </Content>
            <Footer className="Footer">Spring Boot, React Boilerplate ©2020 Created by sogoagain</Footer>
        </Layout>
    );
};

export default App;
