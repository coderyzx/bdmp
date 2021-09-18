import userColumns from '@/constants/dashboardConfig/userColumns';

const browserUserListDashboard = [
  {
    id: 'bvuList',
    text: '指定浏览器下版本用户列表',
    align: 'center',
    api: 'bvuList',
    hasParams: true,
    curType: 'table',
    columns: userColumns,
  },
];

export default browserUserListDashboard;
