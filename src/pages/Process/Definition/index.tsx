import services from '@/services';
import { startProcess } from '@/services/ProcessController';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { message, Space } from 'antd';
import { useRef } from 'react';

const { getDefinitions } = services.ProcessController;

export default () => {
  const { initialState } = useModel('@@initialState');

  const { currentUser } = initialState || {};

  const actionRef = useRef<ActionType>();

  const onStartProcess = async (record: API.ProcessDefinition) => {
    const res = await startProcess({
      key: record.key,
      variables: [
        {
          key: 'userId',
          value: currentUser?.id,
        },
      ],
    });
    if (res.success) {
      message.success('发起流程成功，任务ID:' + res.data?.id);
    } else {
      message.error(res.msg);
    }
  };

  const columns: ProColumns<API.ProcessDefinition>[] = [
    {
      title: 'Key',
      dataIndex: 'key',
      width: 100,
    },
    {
      title: '名称',
      dataIndex: 'name',
      hideInSearch: true,
      width: 100,
    },
    {
      title: '描述',
      dataIndex: 'description',
      hideInSearch: true,
      width: 300,
    },
    {
      title: '版本',
      dataIndex: 'version',
      hideInSearch: true,
      width: 100,
    },
    {
      title: '部署ID',
      dataIndex: 'deploymentId',
      hideInSearch: true,
      width: 300,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      fixed: 'right',
      width: 100,
      render: (_, record) => {
        return (
          <Space>
            <a onClick={() => onStartProcess(record)}>发起</a>
          </Space>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.ProcessDefinition>
        columns={columns}
        cardBordered
        actionRef={actionRef}
        request={async (params) => {
          const { data, success } = await getDefinitions(params);
          return {
            data: data || [],
            success,
          };
        }}
        columnsState={{
          persistenceKey: 'user-table',
          persistenceType: 'localStorage',
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
          syncToUrl: (values) => {
            return values;
          },
        }}
        pagination={false}
        dateFormatter="string"
      />
    </PageContainer>
  );
};
