import services from '@/services';
import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';

const { selectPageLogin } = services.LogController;

export default () => {
  const columns: ProColumns<API.LogLogin>[] = [
    {
      dataIndex: 'ID',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '登录账户',
      dataIndex: 'username',
    },
    {
      title: '登录IP',
      dataIndex: 'ip',
      hideInSearch: true,
    },
    {
      title: '登录结果',
      dataIndex: 'result',
      valueType: 'select',
      valueEnum: {
        false: { text: '失败', status: 'Error' },
        true: { text: '成功', status: 'Success' },
      },
    },
    {
      title: '登录结果信息',
      key: 'resultMsg',
      dataIndex: 'resultMsg',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      valueType: 'date',
      hideInSearch: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.LogLogin>
        columns={columns}
        cardBordered
        request={async (params) => {
          const { data, success } = await selectPageLogin({
            ...params,
          });
          return {
            data: data?.records || [],
            total: data?.total || 0,
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
        pagination={{ pageSize: 5 }}
        dateFormatter="string"
      />
    </PageContainer>
  );
};
