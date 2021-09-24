import lineDefualtConfing from '@/constants/line/config';

const pvDashboard = [
  {
    id: 'pv',
    text: '页面访问次数',
    subtext: '页面访问次数的走势图',
    align: 'center',
    api: 'pv',
    hasParams: true,
    curType: 'line',
    ...lineDefualtConfing,
  },
];

export default pvDashboard;
