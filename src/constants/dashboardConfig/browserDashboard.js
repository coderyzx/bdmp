import pieDefualtConfing from '@/constants/pie/config';

const browserDashboard = [
  {
    id: 'browserVersion',
    text: '浏览器类型分布',
    subtext: '浏览器类型分布的图',
    align: 'center',
    api: 'browserVersion',
    hasParams: true,
    apiKeys: 'browserVersion',
    linkTo: 'browserUserListDashboard',
    curType: 'pie',
    ...pieDefualtConfing,
  },
];

export default browserDashboard;
