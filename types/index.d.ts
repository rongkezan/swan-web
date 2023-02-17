declare namespace API {
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
    records?: T[];
  }

  type PageParam = {
    current?: number;
    pageSize?: number;
  }

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
    roles?: { roleId: string, roleName: string }[];
    roleIds?: string[];
    perms?: Perm[];
    [key: string]: any;
  }

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
  }

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
  }
}
