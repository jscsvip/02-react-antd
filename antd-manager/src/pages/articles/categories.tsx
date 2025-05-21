import React from 'react';
import { PageContainer, ProTable, ProColumns } from '@ant-design/pro-components';

type DataType = {
    id: string,
    name: string,
    dec: string
}

function ArticleCategories() {
    const column: ProColumns<DataType>[] = [
        {
            title: '序号',
            dataIndex: 'id',
            width: 200,
        },
        {
            title: '名字',
            dataIndex: 'name',
        },
        {
            title: '简介',
            dataIndex: 'dec',
        },
        {
            title: '图片',
            dataIndex: 'dec',
        },
        {
            title: '操作',
            hideInSearch: true,
        },
    ]
    return <PageContainer>
        <ProTable
            rowKey="id"
            columns={column}></ProTable>
    </PageContainer>
}

export default ArticleCategories;