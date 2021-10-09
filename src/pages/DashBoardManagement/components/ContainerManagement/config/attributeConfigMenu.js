const attributeConfig = [
  // {
    // title: '基础配置',
    // children: [
    //   {
    //     id: '基础配置111',
    //     label: '标题',
    //     field: 'title',
    //     inputType: 'input',
    //   },
    //   {
    //     id: '基础配置31',
    //     label: '完整API',
    //     field: 'api',
    //     inputType: 'input',
    //   },
    //   {
    //     id: '基础配置41',
    //     label: '帮助信息',
    //     field: 'help',
    //     inputType: 'textarea',
    //   },
    // ],
  // },
  {
    title: '数据配置',
    children: [
      {
        id: '数据关联',
        label: '数据关联',
        inputType: 'select',
        field: 'type',
      },
      {
        id: '数据源',
        label: '数据源',
        inputType: 'textarea',
        field: 'style',
      },
    ],
  },
];

export default attributeConfig;
