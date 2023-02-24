import Footer from '@/components/Footer';
import services from '@/services';
import { signUp } from '@/services/UserController';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ModalForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history, SelectLang, useModel } from '@umijs/max';
import { message, Space, Tabs } from 'antd';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../config/defaultSettings';

const { signIn } = services.UserController;

const Lang = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  return (
    <div className={langClassName} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    const res = await signIn(values);
    if (res.success) {
      message.success(res.msg);
      window.localStorage.setItem('token', `${res.data}`);
      await fetchUserInfo();
      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/');
      return;
    } else {
      message.error(res.msg);
    }
  };

  const onFinish = async (values: API.User) => {
    const res = await signUp(values);
    if (res.success) {
      message.success('提交成功');
      return true;
    } else {
      message.error(res.msg);
      return false;
    }
  };

  return (
    <div className={containerClassName}>
      <ModalForm<API.User>
        title="注册"
        width={400}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        autoFocusFirstInput
        onFinish={onFinish}
        initialValues={{ gender: 1 }}
      >
        <ProFormText
          width="md"
          name="username"
          label="用户名"
          rules={[{ required: true, message: '请输入用户名!' }]}
        />
        <ProFormText.Password
          width="md"
          name="password"
          label="密码"
          rules={[{ required: true, message: '请输入密码!' }]}
        />
        <ProFormText.Password
          width="md"
          name="confirmPassword"
          label="确认密码"
          rules={[{ required: true, message: '请输入确认密码!' }]}
        />
      </ModalForm>
      <Helmet>
        <title>登录页 - {Settings.title}</title>
      </Helmet>
      <Lang />
      <div style={{ flex: '1', padding: '32px 0' }}>
        <LoginForm
          contentStyle={{ minWidth: 280, maxWidth: '75vw' }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="Ant Design"
          subTitle="Ant Design Subtitle"
          initialValues={{ autoLogin: true }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs activeKey="account" centered items={[{ key: 'account', label: '账户密码登录' }]} />

          <>
            <ProFormText
              name="username"
              fieldProps={{ size: 'large', prefix: <UserOutlined /> }}
              placeholder="用户名"
              rules={[{ required: true, message: '请输入用户名!' }]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{ size: 'large', prefix: <LockOutlined /> }}
              placeholder="密码"
              rules={[{ required: true, message: '请输入密码！' }]}
            />
          </>

          <div style={{ marginBottom: 24 }}>
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <Space style={{ float: 'right' }}>
              <a
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                注册
              </a>
            </Space>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
