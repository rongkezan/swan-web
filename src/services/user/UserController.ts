// @ts-ignore
/* eslint-disable */

import { POST_METHOD } from '@/constants'
import { request } from '@umijs/max'

/** 登录注册相关 */
export const profile = async () => {
  return request<API_COMMON.Result<API_USER.User>>('/user/profile', {
    method: POST_METHOD
  })
}

export const signIn = async (
  body: {
    username?: string;
    password?: string;
  }
) => {
  return request<API_COMMON.Result<void>>('/user/signIn', {
    method: POST_METHOD,
    data: body
  });
}

export const signUp = async (
  body: {
    username?: string;
    password?: string;
  }
) => {
  return request<API_COMMON.Result<void>>('/user/signUp', {
    method: POST_METHOD,
    data: body
  });
}

/** 用户相关 */
export const updateUser = async (
  body: API_USER.User
) => {
  return request<API_COMMON.Result<void>>('/user/updateUser', {
    method: POST_METHOD,
    data: body
  });
}

export const selectPageUser = async (
  body: {
    username?: string;
    phone?: string;
    realName?: string;
    status?: number;
  } & API_COMMON.PageParam
) => {
  return request<API_COMMON.Result<API_COMMON.Page<API_USER.User>>>('/user/selectPageUser', {
    method: POST_METHOD,
    data: body
  });
}

/** 角色相关 */
export const saveRole = async (
  body: API_USER.Role
) => {
  return request<API_COMMON.Result<void>>('/user/saveRole', {
    method: POST_METHOD,
    data: body
  });
}

export const updateRoleStatus = async (
  body: API_USER.Role
) => {
  return request<API_COMMON.Result<void>>('/user/updateRoleStatus', {
    method: POST_METHOD,
    data: body
  });
}

export const deleteRole = async (
  body: API_COMMON.IdParam
) => {
  return request<API_COMMON.Result<void>>('/user/deleteRole', {
    method: POST_METHOD,
    data: body
  });
}

export const selectPageRole = async (
  body: {
    roleName?: string;
    status?: boolean;
  } & API_COMMON.PageParam
) => {
  return request<API_COMMON.Result<API_USER.Role>>('/user/selectPageRole', {
    method: POST_METHOD,
    data: body
  })
}

export const selectListRole = async (
  body: {
    roleName?: string;
    status?: boolean;
  }
) => {
  return request<API_COMMON.Result<API_USER.Role[]>>('/user/selectListRole', {
    method: POST_METHOD,
    data: body
  })
}

/** 权限相关 */
export const savePerm = async (
  body: API_USER.Perm
) => {
  return request<API_COMMON.Result<void>>('/user/savePerm', {
    method: POST_METHOD,
    data: body
  });
}

export const deletePerm = async (
  body: API_COMMON.IdParam
) => {
  return request<API_COMMON.Result<void>>('/user/deletePerm', {
    method: POST_METHOD,
    data: body
  });
}

export const selectListPerm = async (
  body: {
    permName?: string;
    permKey?: string;
    status?: boolean;
  }
) => {
  return request<API_COMMON.Result<API_USER.Perm[]>>('/user/selectListPerm', {
    method: POST_METHOD,
    data: body
  })
}
