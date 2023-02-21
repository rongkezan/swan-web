import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { ActionType, ModalForm, ProColumns, ProForm, ProFormRadio, ProFormText, PageContainer, ProFormDigit } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Form, message, Popconfirm, Space, Tree } from 'antd';
import services from '@/services';
import { useEffect, useRef, useState } from 'react';
import { STATUS_OPTIONS } from '@/constants';
import { deleteRole } from '@/services/user/UserController';

const { saveRole, selectListPermOptions, selectPageRole } = services.UserController;

export default () => {

  const [form] = Form.useForm<API.Role>();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const [modalTreeData, setModalTreeData] = useState<any>([])

  const [checkedPermKeys, setCheckedPermKeys] = useState<string[]>()

  const actionRef = useRef<ActionType>();

  useEffect(() => {
    const loadPermOptions = async () => {
      const res = await selectListPermOptions();
      if (res.success) {
        setModalTreeData(res.data)
      } else {
        message.error(res.msg)
      }
    }
    loadPermOptions();
  }, [])

  const onCheckPermissions = (checkedKeys: any) => {
    setCheckedPermKeys(checkedKeys)
  }

  const onEdit = (record: API.Role) => {
    form.resetFields()
    form.setFieldsValue(record)
    setCheckedPermKeys(record.perms?.map(perm => (perm.id)) as string[])
    setIsModalOpen(true)
  }

  const onAdd = () => {
    setIsModalOpen(true)
    form.resetFields()
    setCheckedPermKeys([])
  }

  const onDelete = async (record: API.Role) => {
    const res = await deleteRole({ id: record.id as string })
    if (res.success) {
      message.success(res.msg)
      actionRef.current?.reload?.()
    } else {
      message.error(res.msg)
    }
  }

  const onFinish = async (record: API.Role) => {
    const res = await saveRole({
      ...record,
      permIds: checkedPermKeys as string[]
    })
    if (res.success) {
      message.success('提交成功');
      actionRef.current?.reload?.()
      return true;
    } else {
      message.error(res.msg)
      return false;
    }
  }

  const columns: ProColumns<API.Role>[] = [
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
      <ModalForm<API.Role>
        title="用户信息"
        width={400}
        form={form}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        autoFocusFirstInput
        onFinish={onFinish}
        initialValues={{ orderNum: 1, status: true }}
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
          <Form.Item label="菜单权限" name="permIds">
            <Tree
              checkable
              onCheck={onCheckPermissions}
              checkedKeys={checkedPermKeys}
              treeData={modalTreeData}
            />
          </Form.Item>
        </ProForm.Group>
      </ModalForm>
      <ProTable<API.Role>
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
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={onAdd}>
            新建
          </Button>
        ]}
      />
    </PageContainer>
  );
};
