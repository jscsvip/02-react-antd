import React from 'react';
import { PageContainer, ProTable, ProColumns } from '@ant-design/pro-components';
import { loadDataAPI } from '@/services/article-categories';
import { Button, Popconfirm, Space } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

type DataType = {
    id: string;
    name: string;
    dec: string;
    img: string;
}

function ArticleCategories() {
    const column: ProColumns<DataType>[] = [
        {
            title: '序号',
            width: 80,
            hideInSearch: true,
            /*
                自定义渲染
                第一个参数：当前列的值
                第二个参数：当前行的数据
                第三个参数：当前行的索引                
            */
            renderText: (text, record, index) => {
                return index + 1;
            }
        },
        {
            title: '名字',
            dataIndex: 'name',
        },
        {
            title: '简介',
            dataIndex: 'desc',
            hideInSearch: true,
        },
        // {
        //     title: '内容',
        //     dataIndex: 'content',
        //     hideInSearch: true,
        // },
        {
            title: '图片',
            dataIndex: 'img',
            hideInSearch: true,
            render: (text) => {
                return <img src={text as string} alt="" width={100} />
            }
        },
        {
            title: '操作',
            hideInSearch: true,
            render: (text, record) => {
                return <Space>
                    <Button type="primary" icon={<EditOutlined/>} size='small'>编辑</Button>
                    <Popconfirm
                        title="确认删除?"
                        onConfirm={() => {
                            console.log(record);
                        }}
                    >
                        <Button type="primary" icon={<DeleteOutlined/>} size='small' danger>删除</Button>
                    </Popconfirm>
                </Space>
            }
        },
    ]
    return <PageContainer>
        <ProTable
            rowKey="id"
            columns={column}
            request={loadDataAPI}
            headerTitle={
                <Button type="primary" icon={<PlusOutlined/>} size='small'>新增</Button>
            }
            toolBarRender={() => []}
            options={{
                setting: {
                    listsHeight: 400,
                },
                density: true,
                fullScreen: true,
                reload: true,
            }}
            search={false}
            dateFormatter="string"
        ></ProTable>
    </PageContainer>
}

export default ArticleCategories;