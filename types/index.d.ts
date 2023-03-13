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

  type ProcessDefinition = {
    id?: string;
    key?: string;
    category?: string;
    description?: string;
    name?: string;
    version?: string;
    resource?: string;
    deploymentId?: string;
    diagram?: string;
    suspended?: string;
    tenantId?: string;
    versionTag?: string;
    historyTimeToLive?: string;
    startableInTasklist?: string;
  };

  type ProcessTask = {
    id?: string;
    name?: string;
    assignee?: string;
    created?: string;
    due?: string;
    followUp?: string;
    lastUpdated?: string;
    delegationState?: string;
    description?: string;
    executionId?: string;
    owner?: string;
    parentTaskId?: string;
    priority?: string;
    processDefinitionId?: string;
    processInstanceId?: string;
    taskDefinitionKey?: string;
    caseExecutionId?: string;
    caseInstanceId?: string;
    caseDefinitionId?: string;
    suspended?: string;
    formKey?: string;
    camundaFormRef?: string;
    tenantId?: string;
  };

  type ProcessHistoryTask = {
    id?: string;
    processDefinitionKey?: string;
    processDefinitionId?: string;
    processInstanceId?: string;
    executionId?: string;
    caseDefinitionKey?: string;
    caseDefinitionId?: string;
    caseInstanceId?: string;
    caseExecutionId?: string;
    activityInstanceId?: string;
    name?: string;
    description?: string;
    deleteReason?: string;
    owner?: string;
    assignee?: string;
    startTime?: string;
    endTime?: string;
    duration?: string;
    taskDefinitionKey?: string;
    priority?: string;
    due?: string;
    parentTaskId?: string;
    followUp?: string;
    tenantId?: string;
    removalTime?: string;
    rootProcessInstanceId?: string;
  };

  type ProcessTaskVariable = {
    key?: string;
    type?: string;
    value?: string;
  };

  type StartProcessDefinitionResult = {
    id?: string;
    definitionId?: string;
    businessKey?: string;
    caseInstanceId?: string;
    ended?: string;
    suspended?: string;
    tenantId?: string;
  };
}
