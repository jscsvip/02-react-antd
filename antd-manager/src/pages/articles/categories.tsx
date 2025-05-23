import React, { useRef } from 'react';
import { PageContainer, ProTable, ProColumns,ModalForm,ProForm,ProFormText, ActionType, ProFormTextArea } from '@ant-design/pro-components';
import { loadDataAPI, addModelAPI, delByIdAPI } from '@/services/article-categories';
import { Button, message, Popconfirm, Space, Image } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

type DataType = {
    id: string;
    name: string;
    dec: string;
    img: string;
}

function ArticleCategories() {
    const actionRef = useRef<ActionType>(null); //用来绑定表单的内置事件
    const [isShowEdit, setIsShowEdit] = React.useState(false);
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
            renderText: (text, record, index, action) => {
                // 根据当前页码和每页条数计算实际序号
                const pageInfo = action?.pageInfo;
                if (pageInfo) {
                    const { current, pageSize } = pageInfo;
                    return (current - 1) * pageSize + index + 1;
                }
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
                console.log(text);
                if (text==='-') {
                    return <span>{text}</span>
                }else{
                    return <Image src={text as string} alt="" width={100} height={100} />
                }
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
                        onConfirm={async () => {
                            console.log(record);
                            await delByIdAPI(record.id).then((res) => {
                                console.log(res);
                                message.success('删除成功');
                                // 刷新表格
                                actionRef.current?.reload();
                            })
                        }}
                    >
                        <Button type="primary" icon={<DeleteOutlined/>} size='small' danger>删除</Button>
                    </Popconfirm>
                </Space>
            }
        },
    ]
    return <PageContainer>
        <ModalForm title="编辑" 
            open={isShowEdit}
            onOpenChange={setIsShowEdit}
            modalProps={{
                maskClosable: false,
                destroyOnClose: true,
                width: 600,
            }}
            onFinish={
                async (values) => {
                    console.log(values);
                    addModelAPI(values).then((res) => {
                        console.log(res);
                        setIsShowEdit(false);
                        message.success('添加成功');
                        // 刷新表格
                        actionRef.current?.reload();
                    });
                }
            }
        >
            {/* <ProForm
                labelCol={{ span: 4 }}
                onFinish={
                    (values) => {
                        console.log(values);
                    }
                }
            > */}
                <ProFormText name="name" label="名字" rules={
                    [
                        {
                            required: true,
                            message: '请输入名字',
                        }
                    ]
                }/>
                <ProFormTextArea name="desc" label="简介" />
                <ProFormTextArea name="content" label="内容" />
                <ProFormText name="img" label="图片" />
            {/* </ProForm> */}
        </ModalForm>
        <ProTable
            actionRef={actionRef}
            rowKey="id"
            columns={column}
            request={loadDataAPI}
            pagination={{
                pageSize: 10
            }}
            headerTitle={
                <Button 
                type="primary" 
                icon={<PlusOutlined/>} 
                size='small' 
                onClick={
                    () => {
                        setIsShowEdit(true);
                    }
                }>新增</Button>
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