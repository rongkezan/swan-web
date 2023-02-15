import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { ActionType, ModalForm, ProColumns, ProForm, ProFormRadio, ProFormText, PageContainer, ProFormTreeSelect, ProFormDigit } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Form, message, Popconfirm, Space } from 'antd';
import services from '@/services';
import { useRef, useState } from 'react';
import { STATUS_OPTIONS } from '@/constants';

const { deletePerm, savePerm, selectListPerm, selectListPermOptions } = services.UserController;

export default () => {

  const [form] = Form.useForm<API_USER.Perm>();

  const [isModalOpen, setIsModalOpen] = useState(false)

  const actionRef = useRef<ActionType>();

  const onEdit = (values: API_USER.Perm) => {
    form.resetFields()
    form.setFieldsValue({
      ...values,
      parent: values.parentId
    })
    setIsModalOpen(true)
  }

  const onFinish = async (values: API_USER.Perm) => {
    console.log(values)
    const res = await savePerm(values)
    if (res.success) {
      message.success('提交成功');
      actionRef.current?.reload?.()
      return true;
    } else {
      message.error(res.msg)
      return false;
    }
  }

  const onDelete = async (values: API_USER.Perm) => {
    const res = await deletePerm({ id: values.id as string });
    if (res.success) {
      message.success(res.msg)
      actionRef.current?.reload?.()
    } else {
      message.error(res.msg)
    }
  }

  const onAdd = async () => {
    form.resetFields()
    setIsModalOpen(true)
  }

  const columns: ProColumns<API_USER.Perm>[] = [
    {
      title: '权限名称',
      dataIndex: 'permName'
    },
    {
      title: '权限标识',
      dataIndex: 'permType'
    },
    {
      title: '显示顺序',
      dataIndex: 'orderNum',
      hideInSearch: true
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
      <ModalForm<API_USER.Perm>
        title="权限信息"
        form={form}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        autoFocusFirstInput
        onFinish={onFinish}
        initialValues={{ permType: 'C', status: true, parent: { value: 0 }, orderNum: 1 }}
      >
        <ProFormText width="md" name="id" label="权限ID" disabled hidden />
        <ProForm.Group>
          <ProFormTreeSelect
            width="md"
            name="parentId"
            label="父权限"
            request={async () => {
              const res = await selectListPermOptions()
              if (res.success) {
                const arr = res.data
                arr?.push({
                  value: '0',
                  label: '顶层菜单'
                })
                return arr
              } else {
                message.error(res.msg)
                return []
              }
            }}
          />
        <ProFormText width="md" name="permName" label="权限名称" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="md" name="permKey" label="权限标识" placeholder="请输入" />
          <ProFormDigit width="md" name="orderNum" label="显示顺序" placeholder="请输入" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormRadio.Group width="md" name="permType" label="权限类型"
            options={[
              {
                label: '目录',
                value: 'C'
              },
              {
                label: '菜单',
                value: 'M'
              },
              {
                label: '功能',
                value: 'F'
              }
            ]} />
          <ProFormRadio.Group
            name="status"
            width="md"
            label="状态"
            options={STATUS_OPTIONS}
          />
        </ProForm.Group>
      </ModalForm>
      <ProTable<API_USER.Perm>
        columns={columns}
        cardBordered
        actionRef={actionRef}
        request={async (params) => {
          const { data, success } = await selectListPerm({
            ...params
          });
          return {
            data: data || [],
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
