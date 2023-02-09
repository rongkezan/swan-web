import { POST_METHOD } from '@/constants'
import { request } from '@umijs/max'

export const profile = async (
    options?: { [key: string]: any }
) => {
    return request<API.Result<API_USER.UserVo>>('/user/profile', {
        method: POST_METHOD,
        ...(options || {})
    })
}

export const updateUser = async (
    params: {
        id: string;
        phone: string;
        realName: string;
        avatar: string;
        gender: number;
        status: number;
        roleIds: Array<string>;
        isUpdateStatus: boolean;
    },
    options?: { [key: string]: any }
) => {
    return request<API.Result<void>>('/user/updateUser', {
        method: POST_METHOD,
        data: { ...params },
        ...(options || {})
    });
}

export const selectPageUser = async (
    params: {
        id?: string;
        username?: string;
        realName?: string;
        phone?: string;
        status?: boolean;
        current?: number;
        pageSize?: number;
    },
    options?: { [key: string]: any }
) => {
    return request<API.Result<API.Page<API.UserVo>>>('/user/selectPageUser', {
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
    return request<API.Result<API.UserVo>>('/user/selectOneUser', {
        method: POST_METHOD,
        data: { ...params },
        ...(options || {})
    });
}
