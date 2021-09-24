const retentionDashboard = [
  {
    id: 'retention',
    title: '用户留存分析',
    align: 'center',
    api: 'retention',
    hasParams: true,
    curType: 'retention',
    needFormat: true,
    clickOpen: true,
    pageSize: 90,
    help: '指定时间活跃（即访问）的用户，在之后第N天，再次访问的用户数占比',
    linkTo: 'retentionUserListDashboard',
    apiKeys: 'firstTime,retentionTime',
    formatAPIKeys: 'retentionTime',
    tableSource: {
      row: 'first_time',
      col: 'title',
    },
  },
];

export default retentionDashboard;
