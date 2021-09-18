import userColumns from '@/constants/dashboardConfig/userColumns';

const osUserListDashboard = [
  {
    id: 'ovuList',
    text: '指定操作系统下版本用户列表',
    align: 'center',
    api: 'ovuList',
    hasParams: true,
    curType: 'table',
    columns: userColumns,
  },
];

export default osUserListDashboard;
