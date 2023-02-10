import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { ActionType, ModalForm, ProColumns, ProForm, ProFormRadio, ProFormText, PageContainer, ProFormDigit } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, message, Popconfirm, Space, Tree } from 'antd';
import services from '@/services';
import { useEffect, useRef, useState } from 'react';
import { selectListPerm, selectPageRole } from '@/services/user/UserController';
import { STATUS_OPTIONS } from '@/constants';

const { saveRole } = services.UserController;

export default () => {

  const [form] = Form.useForm<API_USER.Role>();

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [modalTreeData, setModalTreeData] = useState([])

  const [checkedPermKeys, setCheckedPermKeys] = useState([])

  const actionRef = useRef<ActionType>();

  const onCheckPermissions = (checkedKeys: any) => {
    setCheckedPermKeys(checkedKeys)
  }

  const onEdit = (record: API_USER.Role) => {
    form.resetFields()
    form.setFieldsValue({
      ...record,
      permIds: record.perms?.map(perm => (perm.id))
    })
    setIsModalOpen(true)
  }

  const onDelete = (record: API_USER.Role) => {
    console.log(record)
  }

  const onFinish = async (record: API_USER.Role) => {
    const res = await saveRole(record)
    if (res.success) {
      message.success('提交成功');
      actionRef.current?.reload?.()
      return true;
    } else {
      message.error(res.msg)
      return false;
    }
  }

  const columns: ProColumns<API_USER.Role>[] = [
    {
      dataIndex: 'ID',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '角色名',
      dataIndex: 'roleName'
    },
    {
      title: '显示排序',
      dataIndex: 'orderNum'
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        null: { text: '全部', status: 'Processing' },
        false: { text: '禁用', status: 'Error' },
        true: { text: '启用', status: 'Success' }
      },
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      valueType: 'date',
      hideInSearch: true
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, record) => {
        return (
          <Space>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)} />
            <Popconfirm title="确认要删除吗" onConfirm={() => onDelete(record)} okText="确认" cancelText="取消">
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>

        )
      }
    },
  ];

  return (
    <PageContainer>
      <ModalForm<API_USER.Role>
        title="用户信息"
        width={400}
        form={form}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        autoFocusFirstInput
        onFinish={onFinish}
      >
        <ProForm.Group>
          <ProFormText width="md" name="id" label="角色ID" disabled />
          <ProFormText width="md" name="roleName" label="角色名" placeholder="请输入" />
          <ProFormDigit width="xs" name="orderNum" label="显示排序" placeholder="请输入" />
          <ProFormRadio.Group
            name="status"
            width="lg"
            label="状态"
            options={STATUS_OPTIONS}
          />
          <Form.Item label="菜单权限">
            <Tree
              checkable
              onCheck={onCheckPermissions}
              checkedKeys={checkedPermKeys}
              treeData={modalTreeData}
            />
          </Form.Item>

        </ProForm.Group>
      </ModalForm>
      <ProTable<API_USER.Role>
        columns={columns}
        cardBordered
        actionRef={actionRef}
        request={async (params) => {
          const { data, success } = await selectPageRole({
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
          syncToUrl: (values) => {
            return values;
          },
        }}
        pagination={{ pageSize: 5 }}
        dateFormatter="string"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => setIsModalOpen(true)}>
            新建
          </Button>
        ]}
      />
    </PageContainer>
  );
};
