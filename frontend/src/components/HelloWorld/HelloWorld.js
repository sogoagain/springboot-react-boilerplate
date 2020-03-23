import React, {useEffect, useState} from 'react';

import {Result, Table, Form, Input, Button} from 'antd';
import {SmileOutlined} from '@ant-design/icons';
import HelloModel from "../../models/HelloModel";

const HelloWorld = () => {

    const [form] = Form.useForm();

    const [tableState, setTableState] = useState({
        loading: true,
        helloList: [],
        pagination: {
            pageSize: 5,
            current: 1,
            defaultCurrent: 1,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }
    });

    const [query, setQuery] = useState({
        size: tableState.pagination.pageSize,
        page: tableState.pagination.current,
    });

    const [greetings, setGreetings] = useState("");

    const [addCount, setAddCount] = useState(0);

    const getHelloList = async () => {
        setTableState({
            ...tableState,
            loading: true
        });

        const result = await HelloModel.list(query);

        setTableState({
            ...tableState,
            loading: false,
            helloList: result._embedded ? result._embedded.hello_list : [],
            pagination: {
                ...tableState.pagination,
                current: result.page.number + 1,
                total: result.page.total_elements,
            }
        });
    };

    const getFirstHello = async () => {
        const result = await HelloModel.get(1);
        setGreetings(result.greetings);
    };

    const onChange = (p) => {
        setTableState({
            ...tableState,
            pagination: {
                ...tableState.pagination,
                current: p.current,
                pageSize: p.pageSize,
            }
        });
        setQuery({
            ...query,
            size: p.pageSize,
            page: p.current,
        });
    };

    const onFinish = async (values) => {
        await HelloModel.add(values);
        setAddCount(addCount + 1);
        form.resetFields();
    };

    useEffect(() => {
        getHelloList();
        getFirstHello();
    }, [addCount, query]);

    return (
        <div>
            <Result
                className="hello-result"
                icon={<SmileOutlined/>}
                title={`${greetings}!`}
                subTitle="Say Hello!"
            />
            <Form
                form={form}
                layout="inline"
                onFinish={onFinish}
                className="hello-form"
            >
                <Form.Item
                    name="greetings"
                    label="GREETINGS"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter the information',
                        },
                    ]}
                    hasFeedback
                >
                    <Input/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <Table
                className="hello-table"
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
                dataSource={tableState.helloList}
                loading={tableState.loading}
                pagination={tableState.pagination}
                onChange={onChange}
                scroll={{y: 'calc(45vh)'}}
            />
        </div>
    );
};

export default HelloWorld;
