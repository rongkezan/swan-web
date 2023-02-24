declare namespace API {
  type Result<T> = {
    code?: number;
    success?: boolean;
    msg?: string;
    traceId?: string;
    data?: T;
  };

  type Page<T> = {
    total?: number;
    size?: number;
    current?: number;
    totalPage?: number;
    records?: T[];
  };

  type PageParam = {
    current?: number;
    pageSize?: number;
  };

  type User = {
    id?: string;
    username?: string;
    phone?: string;
    realName?: string;
    avatar?: string;
    gender?: number;
    status?: number;
    createTime?: string;
    updateTime?: string;
    roles?: { roleId: string; roleName: string }[];
    roleIds?: string[];
    perms?: Perm[];
    [key: string]: any;
  };

  type Role = {
    id?: string;
    roleName?: string;
    orderNum?: number;
    status?: number;
    createTime?: string;
    updateTime?: string;
    perms?: Perm[];
    permIds: string[];
    [key: string]: any;
  };

  type Perm = {
    id?: string;
    parentId?: string;
    permName?: string;
    permKey?: string;
    permType?: string;
    orderNum?: number;
    status?: number;
    createTime?: string;
    updateTime?: string;
    children?: Perm[];
    [key: string]: any;
  };

  type LogLogin = {
    id?: string;
    username?: string;
    ip?: string;
    result?: string;
    resultMsg?: string;
    createTime?: string;
    updateTime?: string;
    [key: string]: any;
  };

  type LogOperation = {
    id?: string;
    username?: string;
    ip?: string;
    url?: string;
    headers?: string;
    queryString?: string;
    args?: string;
    classMethod?: string;
    description?: string;
    createTime?: string;
    updateTime?: string;
    [key: string]: any;
  };

  type LoginParams = {
    username?: string;
    password?: string;
  };
}
