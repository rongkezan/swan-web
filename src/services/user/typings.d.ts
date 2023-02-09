declare namespace API_USER {
  
  type UserVo = {
    id?: string;
    username?: string;
    phone?: string;
    realName?: string;
    avatar?: string;
    gender?: number;
    status?: number;
    createTime?: string;
    updateTime?: string;
    roles?: Array<RoleVo>;
    perms?: Array<PermVo>;
  }

  type RoleVo = {
    id?: string;
    roleName?: string;
    orderNum?: number;
    status?: number;
    createTime?: string;
    updateTime?: string;
    perms?: Array<PermVo>;
  }

  type PermVo = {
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
    children?: Array<PermVo>;
  }
}
