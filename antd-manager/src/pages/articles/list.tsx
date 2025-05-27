import React, { useEffect, useRef, useState } from 'react';
import { PageContainer, ProTable, ProColumns,ModalForm,ProForm,ProFormText, ActionType, ProFormTextArea, ProFormItem } from '@ant-design/pro-components';
import { loadDataAPI, addModelAPI, delByIdAPI, editModelAPI, delManyByIdsAPI } from '@/services/articles';
import { Button, message, Popconfirm, Space, Image } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import MyUpload from '@/components/my-upload';
import { dalImg } from '@/utils/tools';

type DataType = {
    id: string;
    title: string;
    dec: string;
    coverImage: string;
}

function ArticleList() {
    const actionRef = useRef<ActionType>(null); //用来绑定表单的内置事件
    const [myForm] = ProForm.useForm(); // 获取当前表单实例
    const [currentId, setCurrentId] = useState('');   // 当前编辑的id,判断是新增还是编辑
    const [isShowEdit, setIsShowEdit] = useState(false);
    const [selectIds, setSelectIds] = useState<string>(''); // 选中的id
    const [imageUrl, setImageUrl] = useState<string>('');
    useEffect(() => {
        // 关闭弹窗时重置表单
        if (!isShowEdit) {
            myForm.resetFields(); // 重置表单
            setCurrentId('');
            setImageUrl('');
        }
    }, [isShowEdit])
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
            title: '标题',
            dataIndex: 'title',
        },
        {
            title: '简介',
            dataIndex: 'desc',
            // hideInSearch: true,
        },
        // {
        //     title: '内容',
        //     dataIndex: 'content',
        //     hideInSearch: true,
        // },
        {
            title: '图片',
            dataIndex: 'coverImage',
            hideInSearch: true,
            render: (text) => {
                console.log(text);
                if (text==='-') {
                    return <span>{text}</span>
                }else{
                    return <Image src={dalImg(text as string)} alt="" width={100} height={100} />
                }
            }
        },
        {
            title: '操作',
            hideInSearch: true,
            render: (text, record) => {
                return <Space>
                    <Button type="primary" icon={<EditOutlined/>} size='small' onClick={
                        () => {
                            setIsShowEdit(true);
                            setCurrentId(record.id);
                            setImageUrl(record.coverImage);
                            myForm.setFieldsValue(record); // 给表单赋值,回显数据
                        }
                    }>编辑</Button>
                    <Popconfirm
                        title="确认删除?"
                        onConfirm={async () => {
                            console.log(record);
                            await delByIdAPI(record.id).then((res) => {
                                // console.log(res);
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
            form={myForm}
            open={isShowEdit}
            onOpenChange={setIsShowEdit}
            modalProps={{
                maskClosable: false,
                destroyOnClose: true,
                width: 600,
            }}
            onFinish={
                async (values) => {
                    // console.log(values);
                    if(currentId) {
                        await editModelAPI(currentId, {...values,coverImage:imageUrl})
                        message.success('编辑成功');
                    }else{
                        await addModelAPI( {...values,coverImage:imageUrl})
                        message.success('添加成功');
                    }
                    setIsShowEdit(false);
                        // message.success('添加成功');
                        // 刷新表格
                    actionRef.current?.reload();
                    
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
                <ProFormText name="title" label="标题" rules={
                    [
                        {
                            required: true,
                            message: '请输入标题',
                        }
                    ]
                }/>
                <ProFormItem label="图片">
                    <MyUpload
                        imageUrl={imageUrl}
                        setImageUrl={setImageUrl}
                    ></MyUpload>
                </ProFormItem>
                <ProFormTextArea name="desc" label="简介" />
                <ProFormTextArea name="content" label="内容" />
                {/* <ProFormText name="img" label="图片" /> */}
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
            rowSelection={{
                type: 'checkbox',
                onChange: (selecteRowKeys) => {
                    setSelectIds(selecteRowKeys.join(','));
                    console.log(selecteRowKeys); // 选中的id
                },
            }}
            headerTitle={
                <>
                <Space>
                <Button 
                    type="primary" 
                    icon={<PlusOutlined/>} 
                    size='small' 
                    onClick={
                        () => {
                            setIsShowEdit(true);
                        }
                    }>新增</Button>
                    <Popconfirm  title="确认删除?"
                        onConfirm={
                            async () => {
                                await delManyByIdsAPI(selectIds).then((res) => {
                                    // console.log(res);
                                    message.success('删除成功');
                                    // 刷新表格
                                    actionRef.current?.reload();
                                })
                            }
                        }>
                        <Button 
                        type="primary" 
                        icon={<DeleteOutlined/>} 
                        size='small' 
                        danger 
                        style={{display:selectIds===''?'none':''}}
                        >批量删除</Button>
                    </Popconfirm>
                
                </Space>
                    
                    
                </>
                
            }
            options={{
                setting: {
                    listsHeight: 400,
                },
                density: true,
                fullScreen: true,
                reload: true,
            }}
            dateFormatter="string"
        ></ProTable>
    </PageContainer>
}

export default ArticleList;