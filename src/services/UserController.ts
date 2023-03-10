// @ts-ignore
/* eslint-disable */

import { POST_METHOD } from '@/constants';
import { request } from '@umijs/max';

/** 登录注册相关 */
export const profile = async () => {
  return request<API.Result<API.User>>('/user/profile', {
    method: POST_METHOD,
  });
};

export const signIn = async (body: { username?: string; password?: string }) => {
  return request<API.Result<void>>('/user/signIn', {
    method: POST_METHOD,
    data: body,
  });
};

export const signUp = async (body: {
  username?: string;
  password?: string;
  confirmPassword?: string;
}) => {
  return request<API.Result<void>>('/user/signUp', {
    method: POST_METHOD,
    data: body,
  });
};

/** 用户相关 */
export const updateUser = async (body: API.User) => {
  return request<API.Result<void>>('/user/updateUser', {
    method: POST_METHOD,
    data: body,
  });
};

export const selectPageUser = async (
  body: {
    username?: string;
    phone?: string;
    realName?: string;
    status?: number;
  } & API.PageParam,
) => {
  return request<API.Result<API.Page<API.User>>>('/user/selectPageUser', {
    method: POST_METHOD,
    data: body,
  });
};

/** 角色相关 */
export const saveRole = async (body: API.Role) => {
  return request<API.Result<void>>('/user/saveRole', {
    method: POST_METHOD,
    data: body,
  });
};

export const deleteRole = async (body: { id: string }) => {
  return request<API.Result<void>>('/user/deleteRole', {
    method: POST_METHOD,
    data: body,
  });
};

export const selectPageRole = async (
  body: {
    roleName?: string;
    status?: boolean;
  } & API.PageParam,
) => {
  return request<API.Result<API.Page<API.Role>>>('/user/selectPageRole', {
    method: POST_METHOD,
    data: body,
  });
};

export const selectListRole = async (body: { roleName?: string; status?: boolean }) => {
  return request<API.Result<API.User[]>>('/user/selectListRole', {
    method: POST_METHOD,
    data: body,
  });
};

/** 权限相关 */
export const savePerm = async (body: API.Perm) => {
  return request<API.Result<void>>('/user/savePerm', {
    method: POST_METHOD,
    data: body,
  });
};

export const deletePerm = async (body: { id: string }) => {
  return request<API.Result<void>>('/user/deletePerm', {
    method: POST_METHOD,
    data: body,
  });
};

export const selectListPerm = async (
  body: {
    permName?: string;
    permKey?: string;
    status?: boolean;
  } & API.PageParam,
) => {
  return request<API.Result<API.Perm[]>>('/user/selectListPerm', {
    method: POST_METHOD,
    data: body,
  });
};

export const selectListPermOptions = async () => {
  return request<API.Result<any>>('/user/selectListPermOptions', {
    method: POST_METHOD,
  });
};
