const pageInfoBashboard = [
  {
    id: 'pageInfo',
    text: '页面信息分布',
    align: 'center',
    api: 'pageInfo',
    hasParams: false,
    curType: 'table',
    filterNum: 0,
    filterName: 'url',
    columns: [
      {
        title: '页面地址',
        dataIndex: 'url',
        width: 500,
        key: 'url',
      },
      {
        title: '作为入口页的次数',
        dataIndex: 'enter_cnt',
        key: 'enter_cnt',
        render: text => `${text || 0}`,
        sorter: (a, b) => a.enter_cnt - b.enter_cnt,
      },
      {
        title: '有多少用户从这个页面进入',
        dataIndex: 'enter_user_cnt',
        key: 'enter_user_cnt',
        render: text => `${text || 0}`,
        sorter: (a, b) => a.enter_user_cnt - b.enter_user_cnt,
      },
      {
        title: '作为出口页的次数',
        dataIndex: 'leave_cnt',
        key: 'leave_cnt',
        render: text => `${text || 0}`,
        sorter: (a, b) => a.leave_cnt - b.leave_cnt,
      },
      {
        title: '页面退出率',
        dataIndex: 'leave_ratio',
        key: 'leave_ratio',
        render: text => `${text || 0}%`,
        sorter: (a, b) => a.leave_ratio - b.leave_ratio,
      },
      {
        title: '有多少用户从这个页面出去',
        dataIndex: 'leave_user_cnt',
        key: 'leave_user_cnt',
        render: text => `${text || 0}`,
        sorter: (a, b) => a.leave_user_cnt - b.leave_user_cnt,
      },
    ],
  },
];

export default pageInfoBashboard;
