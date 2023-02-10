import { POST_METHOD } from '@/constants'
import { request } from '@umijs/max'

export const profile = async (
  options?: { [key: string]: any }
) => {
  return request<API_COMMON.Result<API_USER.User>>('/user/profile', {
    method: POST_METHOD,
    ...(options || {})
  })
}

export const updateUser = async (
  params: API_USER.User,
  options?: { [key: string]: any }
) => {
  return request<API_COMMON.Result<void>>('/user/updateUser', {
    method: POST_METHOD,
    data: { ...params },
    ...(options || {})
  });
}

export const selectPageUser = async (
  params: API_USER.User & API_COMMON.PageParams,
  options?: { [key: string]: any }
) => {
  return request<API_COMMON.Result<API_COMMON.Page<API_USER.User>>>('/user/selectPageUser', {
    method: POST_METHOD,
    data: { ...params },
    ...(options || {})
  });
}

export const selectOneUser = async (
  params: {
    id: string;
  },
  options?: { [key: string]: any }
) => {
  return request<API_COMMON.Result<API_USER.User>>('/user/selectOneUser', {
    method: POST_METHOD,
    data: { ...params },
    ...(options || {})
  });
}

export const selectPageRole = async (
  params: {
    roleName?: string;
    status?: boolean;
  },
  options?: { [key: string]: any }
) => {
  return request<API_COMMON.Result<API_USER.Role>>('/user/selectPageRole', {
    method: POST_METHOD,
    data: { ...params },
    ...(options || {})
  })
}

export const selectListRole = async (
  params: {
    roleName?: string;
    status?: boolean;
  },
  options?: { [key: string]: any }
) => {
  return request<API_COMMON.Result<API_USER.Role[]>>('/user/selectListRole', {
    method: POST_METHOD,
    data: { ...params },
    ...(options || {})
  })
}

export const selectListPerm = async (
  params: {
    permName?: string;
    permKey?: string;
    status?: boolean;
  },
  options?: { [key: string]: any }
) => {
  return request<API_COMMON.Result<Array<API_USER.Perm>>>('/user/selectListPerm', {
    method: POST_METHOD,
    data: { ...params },
    ...(options || {})
  })
}
