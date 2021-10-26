export const auths = [
  {
    id: 'device-simulator',
    name: 'dsad',
    describe: '',
    status: 0,
    actions: [
      {
        action: 'query',
        name: '查询列表',
        describe: '查询列表',
      },
      {
        action: 'get',
        name: '查询明细',
        describe: '查询明细',
      },
    ],
  },
  {
    id: 'vis-configuration',
    name: '组态管理',
    status: 1,
    actions: [
      {
        action: 'query',
        name: '查询列表',
        describe: '查询列表',
      },
      {
        action: 'get',
        name: '查询明细',
        describe: '查询明细',
      },
    ],
  },
  {
    id: 'message-gateway',
    name: '消息网关',
    describe: '',
    status: 1,
    actions: [],
  },
  {
    id: 'ceshi',
    name: '测试',
    status: 1,
    actions: [
      {
        action: 'query',
        name: '查询列表',
        describe: '查询列表',
      },
      {
        action: 'get',
        name: '查询明细',
        describe: '查询明细',
      },
      {
        action: 'add',
        name: '新增',
        describe: '新增',
      },
      {
        action: 'update',
        name: '修改',
        describe: '修改',
      },
      {
        action: 'delete',
        name: '删除',
        describe: '删除',
      },
      {
        action: 'import',
        name: '导入',
        describe: '导入',
      },
      {
        action: 'export',
        name: '导出',
        describe: '导出',
      },
    ],
  },
  {
    id: 'protocol-supports',
    name: '协议管理',
    status: 1,
    actions: [
      {
        action: 'query',
        name: '查询列表',
        describe: '查询列表',
      },
    ],
  },
  {
    id: 'network-simulator',
    name: '网络模拟器',
    describe: '',
    status: 1,
    actions: [
      {
        action: 'query',
        name: '查询',
        describe: '查询',
        properties: {
          supportDataAccessTypes: [],
        },
      },
    ],
  },
  {
    id: 'certificate',
    name: '证书管理',
    describe: '',
    status: 1,
    actions: [
      {
        action: 'query',
        name: '查询',
        describe: '查询',
        properties: {
          supportDataAccessTypes: [],
        },
      },
    ],
  },
  {
    id: 'dueros-product',
    name: '小度产品管理',
    describe: '',
    status: 1,
    actions: [
      {
        action: 'query',
        name: '查询',
        describe: '查询',
        properties: {
          supportDataAccessTypes: [],
        },
      },
    ],
  },
  {
    id: 'device-product',
    name: 'device-product',
    status: 1,
    actions: [
      {
        action: 'query',
        name: '查询列表',
        describe: '查询列表',
      },
    ],
  },
  {
    id: 'device-group',
    name: '设备分组',
    describe: '',
    status: 1,
    actions: [
      {
        action: 'query',
        name: '查询',
        describe: '查询',
        properties: {
          supportDataAccessTypes: [],
        },
      },
    ],
  },
  {
    id: 'onenet-product',
    name: 'OneNet产品管理',
    describe: '',
    status: 1,
    actions: [
      {
        action: 'enable',
        name: '启用',
        describe: '启用',
        properties: {
          supportDataAccessTypes: [],
        },
      },
      {
        action: 'disable',
        name: '禁用',
        describe: '禁用',
        properties: {
          supportDataAccessTypes: [],
        },
      },
      {
        action: 'query',
        name: '查询',
        describe: '查询',
        properties: {
          supportDataAccessTypes: [],
        },
      },
      {
        action: 'save',
        name: '保存',
        describe: '保存',
        properties: {
          supportDataAccessTypes: [],
        },
      },
      {
        action: 'delete',
        name: '删除',
        describe: '删除',
        properties: {
          supportDataAccessTypes: [],
        },
      },
    ],
  },
  {
    id: 'rule-model',
    name: '规则引擎-模型',
    describe: '',
    status: 1,
    actions: [
      {
        action: 'query',
        name: '查询',
        describe: '查询',
        properties: {
          supportDataAccessTypes: [],
        },
      },
    ],
  },
  {
    id: 'device-firmware-manager',
    name: '设备固件信息管理',
    describe: '',
    status: 1,
    actions: [
      {
        action: 'query',
        name: '查询',
        describe: '查询',
        properties: {
          supportDataAccessTypes: [],
        },
      },
    ],
  },
  {
    id: 'device-alarm',
    name: '设备告警',
    describe: '',
    status: 1,
    actions: [
      {
        action: 'query',
        name: '查询',
        describe: '查询',
        properties: {
          supportDataAccessTypes: [],
        },
      },
    ],
  },
  {
    id: 'edge-product',
    name: '边缘网关产品管理',
    describe: '',
    status: 1,
    actions: [
      {
        action: 'query',
        name: '查询',
        describe: '查询',
        properties: {
          supportDataAccessTypes: [],
        },
      },
      {
        action: 'save',
        name: '保存',
        describe: '保存',
        properties: {
          supportDataAccessTypes: [],
        },
      },
      {
        action: 'delete',
        name: '删除',
        describe: '删除',
        properties: {
          supportDataAccessTypes: [],
        },
      },
    ],
  },
  {
    id: 'menu',
    name: '菜单管理',
    describe: '',
    status: 1,
    actions: [
      {
        action: 'query',
        name: '查询',
        describe: '查询',
        properties: {
          supportDataAccessTypes: [],
        },
      },
    ],
  },
  {
    id: 'opc-point',
    name: 'OPC-UA设备点位',
    describe: '',
    status: 1,
    actions: [
      {
        action: 'query',
        name: '查询',
        describe: '查询',
        properties: {
          supportDataAccessTypes: [],
        },
      },
      {
        action: 'save',
        name: '保存',
        describe: '保存',
        properties: {
          supportDataAccessTypes: [],
        },
      },
      {
        action: 'delete',
        name: '删除',
        describe: '删除',
        properties: {
          supportDataAccessTypes: [],
        },
      },
    ],
  },
  {
    id: 'firmware-manager',
    name: '固件管理',
    describe: '',
    status: 1,
    actions: [
      {
        action: 'query',
        name: '查询',
        describe: '查询',
        properties: {
          supportDataAccessTypes: [],
        },
      },
    ],
  },
  {
    id: 'permission',
    name: '权限管理',
    describe: '',
    status: 1,
    actions: [
      {
        action: 'query',
        name: '查询',
        describe: '查询',
        properties: {
          supportDataAccessTypes: [],
        },
      },
      {
        action: 'save',
        name: '保存',
        describe: '保存',
        properties: {
          supportDataAccessTypes: [],
        },
      },
      {
        action: 'grant',
        name: '赋权',
        describe: '赋权',
        properties: {
          supportDataAccessTypes: [],
        },
      },
      {
        action: 'delete',
        name: '删除',
        describe: '删除',
        properties: {
          supportDataAccessTypes: [],
        },
      },
    ],
  },
  {
    id: 'device-opt-api',
    name: '设备操作API',
    describe: '',
    status: 1,
    actions: [
      {
        action: 'read-property',
        name: '读取属性',
        describe: '读取属性',
        properties: {
          supportDataAccessTypes: [],
        },
      },
    ],
  },
  {
    id: 'device-gateway',
    name: '设备网关',
    describe: '',
    status: 1,
    actions: [
      {
        action: 'query',
        name: '查询',
        describe: '查询',
        properties: {
          supportDataAccessTypes: [],
        },
      },
    ],
  },
  {
    id: 'big-screen',
    name: '大屏管理',
    status: 1,
    actions: [
      {
        action: 'query',
        name: '查询',
        describe: '查询',
      },
    ],
  },
  {
    id: 'open-api',
    name: 'openApi客户端',
    describe: '',
    status: 1,
    actions: [
      {
        action: 'query',
        name: '查询',
        describe: '查询',
        properties: {
          supportDataAccessTypes: [],
        },
      },
    ],
  },
  {
    id: 'datasource-config',
    name: '数据源配置',
    describe: '',
    status: 1,
    actions: [
      {
        action: 'query',
        name: '查询',
        describe: '查询',
        properties: {
          supportDataAccessTypes: [],
        },
      },
      {
        action: 'save',
        name: '保存',
        describe: '保存',
        properties: {
          supportDataAccessTypes: [],
        },
      },
      {
        action: 'delete',
        name: '删除',
        describe: '删除',
        properties: {
          supportDataAccessTypes: [],
        },
      },
    ],
  },
  {
    id: 'system-config',
    name: '系统配置',
    describe: '',
    status: 1,
    actions: [
      {
        action: 'query',
        name: '查询',
        describe: '查询',
        properties: {
          supportDataAccessTypes: [],
        },
      },
    ],
  },
  {
    id: 'rule-instance',
    name: '规则引擎-实例',
    describe: '',
    status: 1,
    actions: [
      {
        action: 'query',
        name: '查询',
        describe: '查询',
        properties: {
          supportDataAccessTypes: [],
        },
      },
    ],
  },
  {
    id: 'media-channel',
    name: '流媒体通道',
    describe: '',
    status: 1,
    actions: [
      {
        action: 'query',
        name: '查询',
        describe: '查询',
        properties: {
          supportDataAccessTypes: [],
        },
      },
    ],
  },
  {
    id: 'dictionary',
    name: '数据字典',
    describe: '',
    status: 1,
    actions: [
      {
        action: 'query',
        name: '查询',
        describe: '查询',
        properties: {
          supportDataAccessTypes: [],
        },
      },
    ],
  },
  {
    id: 'report-config',
    name: '报表开发',
    describe: '',
    status: 1,
    actions: [
      {
        action: 'query',
        name: '查询',
        describe: '查询',
        properties: {
          supportDataAccessTypes: [],
        },
      },
    ],
  },
  {
    id: 'ctwing-product',
    name: 'Ctwing产品管理',
    describe: '',
    status: 1,
    actions: [
      {
        action: 'enable',
        name: '启用',
        describe: '启用',
        properties: {
          supportDataAccessTypes: [],
        },
      },
      {
        action: 'disable',
        name: '禁用',
        describe: '禁用',
        properties: {
          supportDataAccessTypes: [],
        },
      },
      {
        action: 'query',
        name: '查询',
        describe: '查询',
        properties: {
          supportDataAccessTypes: [],
        },
      },
      {
        action: 'save',
        name: '保存',
        describe: '保存',
        properties: {
          supportDataAccessTypes: [],
        },
      },
      {
        action: 'delete',
        name: '删除',
        describe: '删除',
        properties: {
          supportDataAccessTypes: [],
        },
      },
    ],
  },
];
