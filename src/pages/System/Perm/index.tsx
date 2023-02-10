import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { ActionType, ModalForm, ProColumns, ProForm, ProFormRadio, ProFormSelect, ProFormText, PageContainer } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';
import services from '@/services';
import { useEffect, useRef, useState } from 'react';
import { selectListRole } from '@/services/user/UserController';

const { selectPageUser, updateUser } = services.UserController;

export default () => {

  const [form] = Form.useForm<API_USER.User>();

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [roleOptions, setRoleOptions] = useState<Array<API_USER.User>>([])

  const actionRef = useRef<ActionType>();

  useEffect(() => {
    const loadRoles = async () => {
      const res = await selectListRole({})
      if (res.success) {
        setRoleOptions(res.data as Array<API_USER.User>)
      } else {
        message.error(res.msg)
      }
    }
    loadRoles()
  }, [])

  const onEdit = (values: API_USER.User) => {
    form.resetFields()
    form.setFieldsValue({
      ...values,
      roleIds: values.roles?.map(role => (role.roleId))
    })
    setIsModalOpen(true)
  }

  const onFinish = async (values: API_USER.User) => {
    const res = await updateUser(values)
    if (res.success) {
      message.success('提交成功');
      actionRef.current?.reload?.()
      return true;
    } else {
      message.error(res.msg)
      return false;
    }
  }

  const columns: ProColumns<API_USER.User>[] = [
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
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)} />
        )
      }
    },
  ];

  return (
    <PageContainer>
      <ModalForm<API_USER.User>
        title="用户信息"
        form={form}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        autoFocusFirstInput
        onFinish={onFinish}
      >
        <ProForm.Group>
          <ProFormText width="md" name="id" label="用户ID" disabled />
          <ProFormText width="md" name="username" label="用户名" disabled />
          <ProFormText width="md" name="phone" label="手机号" placeholder="请输入" />
          <ProFormText width="md" name="realName" label="真实姓名" placeholder="请输入" />
          <ProFormText width="md" name="avatar" label="头像" placeholder="请输入" />
          <ProFormSelect width="md"
            name="roleIds"
            label="角色"
            mode="multiple"
            options={roleOptions.map(role => ({ label: role.roleName, value: role.id }))}
          />
          <ProFormRadio.Group
            name="gender"
            label="性别"
            options={[
              {
                label: '男',
                value: 1,
              },
              {
                label: '女',
                value: 2,
              }
            ]}
          />
          <ProFormRadio.Group
            name="status"
            width="md"
            label="状态"
            options={[
              {
                label: '禁用',
                value: false,
              },
              {
                label: '启用',
                value: true,
              }
            ]}
          />
        </ProForm.Group>
      </ModalForm>
      <ProTable<API_USER.User>
        columns={columns}
        cardBordered
        actionRef={actionRef}
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
