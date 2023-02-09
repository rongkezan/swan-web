import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import services from '@/services';

const { selectPageUser, selectOneUser, updateUser } = services.UserController;

const columns: ProColumns<API.UserVo>[] = [
    {
        dataIndex: 'ID',
        valueType: 'indexBorder',
        width: 48,
    },
    {
        title: '用户名',
        dataIndex: 'username'
    },
    {
        title: '手机号',
        dataIndex: 'phone'
    },
    {
        title: '真实姓名',
        dataIndex: 'realName'
    },
    {
        title: '状态',
        dataIndex: 'status'
    },
    {
        title: '创建时间',
        key: 'createTime',
        dataIndex: 'createTime',
        valueType: 'date',
        hideInSearch: true
    },
    // {
    //     title: '操作',
    //     valueType: 'option',
    //     key: 'option',
    //     render: (text, record, _, action) => [
    //         <a
    //             key="editable"
    //             onClick={() => {
    //                 action?.startEditable?.(record.id);
    //             }}
    //         >
    //             编辑
    //         </a>,
    //         <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
    //             查看
    //         </a>
    //     ],
    // },
];

export default () => {
    return (
        <ProTable<API.UserVo>
            columns={columns}
            cardBordered
            request={async (params) => {
                const { data, success } = await selectPageUser({
                    ...params
                });
                return {
                    data: data?.records || [],
                    total: data?.total || 0,
                    success
                }
            }}
            columnsState={{
                persistenceKey: 'user-table',
                persistenceType: 'localStorage'
            }}
            rowKey="id"
            search={{
                labelWidth: 'auto',
            }}
            options={{
                setting: {
                    listsHeight: 400,
                },
            }}
            form={{
                // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
                syncToUrl: (values, type) => {
                    console.log(values, type)
                    if (type === 'get') {
                        return {
                            ...values
                        };
                    }
                    return values;
                },
            }}
            pagination={{
                pageSize: 5,
                onChange: (page) => console.log(page),
            }}
            dateFormatter="string"
            toolBarRender={() => [
                <Button key="button" icon={<PlusOutlined />} type="primary">
                    新建
                </Button>
            ]}
        />
    );
};
