import services from '@/services';
import { SmallDashOutlined } from '@ant-design/icons';
import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Descriptions, Modal } from 'antd';
import moment from 'moment';
import { useState } from 'react';

const { selectPageOperation } = services.LogController;

export default () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [detail, setDetail] = useState<API.LogOperation>();

  const onShowMore = (values: API.LogOperation) => {
    setIsModalOpen(true);
    console.log(values);
    setDetail(values);
  };

  const columns: ProColumns<API.LogOperation>[] = [
    {
      dataIndex: 'ID',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '操作账户',
      dataIndex: 'username',
    },
    {
      title: '操作IP',
      dataIndex: 'ip',
      hideInSearch: true,
    },
    {
      title: '请求地址',
      dataIndex: 'url',
    },
    {
      title: '接口说明',
      dataIndex: 'description',
    },
    {
      title: '请求时间',
      key: 'createTime',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, record) => {
        return (
          <Button
            type="primary"
            shape="circle"
            icon={<SmallDashOutlined />}
            onClick={() => onShowMore(record)}
          />
        );
      },
    },
  ];

  return (
    <PageContainer>
      <Modal width="80%" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
        <Descriptions title="操作日志">
          <Descriptions.Item label="操作用户">{detail?.username}</Descriptions.Item>
          <Descriptions.Item label="操作IP">{detail?.ip}</Descriptions.Item>
          <Descriptions.Item label="请求地址">{detail?.url}</Descriptions.Item>
          <Descriptions.Item label="请求方法">{detail?.classMethod}</Descriptions.Item>
          <Descriptions.Item label="接口描述">{detail?.description}</Descriptions.Item>
          <Descriptions.Item label="请求时间">
            {moment(detail?.createTime).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="请求参数" span={3}>
            {detail?.queryString}
          </Descriptions.Item>
          <Descriptions.Item label="请求头" span={3}>
            {detail?.headers}
          </Descriptions.Item>
          <Descriptions.Item label="请求体" span={3}>
            {detail?.args}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
      <ProTable<API.LogOperation>
        columns={columns}
        cardBordered
        request={async (params) => {
          const { data, success } = await selectPageOperation({
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
