// @ts-ignore
/* eslint-disable */

import { POST_METHOD } from '@/constants';
import { request } from '@umijs/max';

export const startProcess = async (body: {
  key?: string;
  variables?: API.ProcessTaskVariable[];
}) => {
  return request<API.Result<API.StartProcessDefinitionResult>>('/process/start', {
    method: POST_METHOD,
    data: body,
  });
};

export const completeTask = async (body: { id: string }) => {
  return request<API.Result<void>>('/process/completeTask', {
    method: POST_METHOD,
    data: body,
  });
};

export const getDefinitions = async (
  body: {
    key?: string;
  } & API.PageParam,
) => {
  return request<API.Result<API.ProcessDefinition[]>>('/process/getDefinitions', {
    method: POST_METHOD,
    data: body,
  });
};

export const getTasks = async () => {
  return request<API.Result<API.ProcessTask[]>>('/process/getTasks', {
    method: POST_METHOD,
  });
};

export const getHistoryTasks = async () => {
  return request<API.Result<API.ProcessHistoryTask[]>>('/process/getHistoryTasks', {
    method: POST_METHOD,
  });
};

export const getTaskVariables = async (body: { id: string }) => {
  return request<API.Result<API.ProcessTaskVariable[]>>('/process/getTaskVariables', {
    method: POST_METHOD,
    data: body,
  });
};
