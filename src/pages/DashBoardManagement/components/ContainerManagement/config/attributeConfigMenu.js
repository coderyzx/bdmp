const attributeConfig = [
  {
    title: '基础配置',
    children: [
      {
        id: '基础配置0',
        label: '图表类型',
        inputType: 'select',
        field: 'chartType',
        options: [],
      },
      {
        id: '基础配置11',
        label: '图表名称',
        inputType: 'select',
        field: 'chart',
        options: [],
      },
      {
        id: '基础配置111',
        label: '标题',
        field: 'title',
        inputType: 'input',
      },
      {
        id: '基础配置21',
        label: '布局大小',
        field: 'span',
        inputType: 'input',
      },
      {
        id: '基础配置211',
        label: '图表高度',
        field: 'chartHeight',
        inputType: 'input',
      },
      {
        id: '基础配置31',
        label: '完整API',
        field: 'api',
        inputType: 'input',
      },
      {
        id: '基础配置41',
        label: '帮助信息',
        field: 'help',
        inputType: 'textarea',
      },
    ],
  },
  {
    title: '图表配置',
    children: [
      {
        id: '图表配置1',
        inputType: 'editor',
        field: 'chartsOptions',
        props: {},
        options: {},
      },
    ],
  },
];

export default attributeConfig;
