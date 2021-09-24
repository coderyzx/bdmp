import userColumns from '@/constants/dashboardConfig/userColumns';

const retentionUserListDashboard = [
  {
    id: 'rvuList',
    text: '用户留存分析下的用户列表',
    align: 'center',
    api: 'rvuList',
    hasParams: true,
    curType: 'table',
    columns: userColumns,
  },
];

export default retentionUserListDashboard;
