// @ts-ignore
/* eslint-disable */

import { POST_METHOD } from '@/constants';
import { request } from '@umijs/max';

export const selectPageLogin = async (
  body: {
    username?: string;
    result?: boolean;
  } & API.PageParam,
) => {
  return request<API.Result<API.Page<API.LogLogin>>>('/log/selectPageLogin', {
    method: POST_METHOD,
    data: body,
  });
};

export const selectPageOperation = async (
  body: {
    username?: string;
    url?: string;
    description?: string;
  } & API.PageParam,
) => {
  return request<API.Result<API.Page<API.LogOperation>>>('/log/selectPageOperation', {
    method: POST_METHOD,
    data: body,
  });
};
