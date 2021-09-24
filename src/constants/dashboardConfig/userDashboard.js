import lineDefualtConfing from '@/constants/line/config';

const userDashboard = [
  {
    id: 'nu',
    text: '新增用户',
    api: 'userNu',
    hasParams: true,
    curType: 'card',
  },
  {
    id: 'overall',
    text: '累计用户',
    api: 'overall',
    hasParams: true,
    curType: 'card',
  },
  {
    id: 'userUa',
    text: '活跃用户',
    api: 'userUa',
    hasParams: true,
    curType: 'card',
  },
  {
    id: 'uatTrend',
    text: '活跃用户走势',
    subtext: '活跃用户的走势图',
    align: 'center',
    api: 'uatTrend',
    hasParams: true,
    curType: 'line',
    ...lineDefualtConfing,
  },
  {
    id: 'nuTrend',
    text: '新增用户走势',
    subtext: '新增用户的走势图',
    align: 'center',
    api: 'nuTrend',
    hasParams: true,
    curType: 'line',
    ...lineDefualtConfing,
  },
  {
    id: 'overallTrend',
    text: '累计用户增长趋势',
    subtext: '累计用户增长趋势的图',
    align: 'center',
    api: 'overallTrend',
    hasParams: true,
    curType: 'line',
    ...lineDefualtConfing,
  },
];

export default userDashboard;
