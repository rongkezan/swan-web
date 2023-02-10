// @ts-ignore
/* eslint-disable */

declare namespace API_USER {

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
  }

  type Perm = {
    id?: string;
    parentId?: string;
    permName?: string;
    permKey?: string;
    permType?: string;
    orderNum?: number;
    routePath?: string;
    menuIcon?: string;
    status?: number;
    createTime?: string;
    updateTime?: string;
    children?: Perm[];
  }
}
