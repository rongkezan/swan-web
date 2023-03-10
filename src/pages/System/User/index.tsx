import UploadAvatar from '@/components/Upload/UploadAvatar';
import { GENDER_OPTIONS, STATUS_OPTIONS } from '@/constants';
import services from '@/services';
import { EditOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumns,
  ProForm,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';
import { useEffect, useRef, useState } from 'react';

const { selectPageUser, updateUser, selectListRole } = services.UserController;

export default () => {
  const [form] = Form.useForm<API.User>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [roleOptions, setRoleOptions] = useState<Array<API.Role>>([]);

  const [imgUrl, setImgUrl] = useState<string>();

  const actionRef = useRef<ActionType>();

  useEffect(() => {
    const loadRoles = async () => {
      const res = await selectListRole({});
      if (res.success) {
        setRoleOptions(res.data as Array<API.Role>);
      } else {
        message.error(res.msg);
      }
    };
    loadRoles();
  }, []);

  const onEdit = (values: API.User) => {
    form.resetFields();
    form.setFieldsValue({
      ...values,
      roleIds: values.roles?.map((role) => role.roleId),
    });
    setImgUrl(values.avatar);
    setIsModalOpen(true);
  };

  const onFinish = async (values: API.User) => {
    const res = await updateUser({
      ...values,
      avatar: imgUrl,
    });
    if (res.success) {
      message.success('提交成功');
      actionRef.current?.reload?.();
      return true;
    } else {
      message.error(res.msg);
      return false;
    }
  };

  const columns: ProColumns<API.User>[] = [
    {
      dataIndex: 'ID',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '真实姓名',
      dataIndex: 'realName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        null: { text: '全部', status: 'Processing' },
        false: { text: '禁用', status: 'Error' },
        true: { text: '启用', status: 'Success' },
      },
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      valueType: 'date',
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
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          />
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ModalForm<API.User>
        title="用户信息"
        form={form}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        autoFocusFirstInput
        onFinish={onFinish}
        initialValues={{ gender: 1, status: true }}
      >
        <ProForm.Group>
          <ProFormText width="md" name="id" label="用户ID" disabled />
          <ProFormText width="md" name="username" label="用户名" disabled />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="md" name="phone" label="手机号" placeholder="请输入" />
          <ProFormText width="md" name="realName" label="真实姓名" placeholder="请输入" />
        </ProForm.Group>
        <ProFormSelect
          name="roleIds"
          label="角色"
          mode="multiple"
          options={roleOptions.map((role) => ({ label: role.roleName, value: role.id }))}
        />
        <ProForm.Group>
          <ProFormRadio.Group name="gender" label="性别" options={GENDER_OPTIONS} />
          <ProFormRadio.Group name="status" label="状态" options={STATUS_OPTIONS} />
          <Form.Item label="头像">
            <UploadAvatar imgUrl={imgUrl} setImgUrl={setImgUrl} />
          </Form.Item>
        </ProForm.Group>
      </ModalForm>
      <ProTable<API.User>
        columns={columns}
        cardBordered
        actionRef={actionRef}
        request={async (params) => {
          const { data, success } = await selectPageUser({
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
