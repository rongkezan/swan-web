// @ts-ignore
/* eslint-disable */

declare namespace API_COMMON {

  type Result<T> = {
    code?: number;
    success?: boolean;
    msg?: string;
    traceId?: string;
    data?: T
  }

  type Page<T> = {
    total?: number;
    size?: number;
    current?: number;
    totalPage?: number;
    records?: Array<T>;
  }

  type PageParam = {
    current?: number;
    pageSize?: number;
  }

  type IdParam = {
    id: string
  }
}
