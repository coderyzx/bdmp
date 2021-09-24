const MenusConfig = [
  // {
  //   name: '通用',
  //   id: 'default',
  //   path: 'default',
  //   theme: 'light',
  //   children: [
  //     {
  //       name: '用户看板',
  //       path: 'userDashboard',
  //       id: 'userDashboard',
  //     },
  //     {
  //       name: '页面信息',
  //       path: 'pageInfoBashboard',
  //       id: 'pageInfoBashboard',
  //     },
  //     {
  //       name: '客户端分布',
  //       path: 'clinetDashboard',
  //       id: 'clinetDashboard',
  //     },
  //     {
  //       name: '用户留存',
  //       path: 'retentionDashboard',
  //       id: 'retentionDashboard',
  //     },
  //     {
  //       name: '错误统计',
  //       path: 'errorDashboard',
  //       id: 'errorDashboard',
  //     },
  //     {
  //       name: '页面浏览排名',
  //       path: 'rankDashboard',
  //       id: 'rankDashboard',
  //     },
  //     {
  //       name: '页面访问次数',
  //       path: 'pvDashboard',
  //       id: 'pvDashboard',
  //     },
  //     {
  //       name: '用来测试单接口多图划分',
  //       path: 'testing',
  //       id: 'testing',
  //     },
  //   ],
  // },
  {
    name: '仪表盘',
    id: 'gloabl',
    path: 'gloabl',
    type: 'horizontal',
    theme: 'dark',
    children: [
      {
        name: '用户访问分析',
        path: 'page2',
        id: 'page2',
      },
      {
        name: '页面分析',
        path: 'page3',
        id: 'page3',
      },
      {
        name: '用户留存',
        path: 'retentionDashboard',
        id: 'retentionDashboard',
        defaultTime: '7',
        timeName: '最近七天',
      },
      {
        name: '错误统计',
        path: 'errorDashboard',
        id: 'errorDashboard',
      },
      {
        name: '用户路径分析',
        path: 'userPath',
        id: 'userPath',
      },
      {
        name: '示例图表模板',
        path: 'page1',
        id: 'page1',
      },
      // {
      //   name: '示例图表模板',
      //   path: 'all',
      //   id: 'all',
      // },
    ],
  },
  {
    name: '仪表盘',
    id: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '仪表盘管理',
        path: 'dashboardManagement',
        id: 'dashboardManagement',
      },
    ],
  },
  // {
  //   name: '图表配置管理',
  //   id: 'chartsAdmin',
  //   path: 'chartsAdmin',
  //   children: [
  //     {
  //       name: '图表类型列表',
  //       path: 'chartType',
  //       id: 'chartType',
  //     },
  //     {
  //       name: '图表展示组件',
  //       path: 'chartMamagement',
  //       id: 'chartMamagement',
  //     },
  //   ],
  // },
  {
    name: '元数据管理',
    id: 'properties',
    path: 'properties',
    link: '/properties',
  },
  {
    name: '模板库',
    id: 'chartsAdmin',
    path: 'chartsAdmin',
    children: [
      {
        name: '图表类型列表',
        path: 'chartType',
        id: 'chartType',
      },
      {
        name: '图表展示组件',
        path: 'chartManagement',
        id: 'chartManagement',
      },
    ],
  },
  {
    name: '测评报告',
    id: 'gloabl3',
    path: 'gloabl3',
    type: 'horizontal',
    theme: 'dark',
  },
  {
    name: '数据加工厂',
    id: 'gloabl4',
    path: 'gloabl4',
    type: 'horizontal',
    theme: 'dark',
    link: 'http://10.2.18.95:8000/hue/accounts/login?next=/hue/editor/%3Ftype%3Dimpala',
  },
];

export default MenusConfig;
